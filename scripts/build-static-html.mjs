/**
 * React 抜きの静的 HTML を全件書き出す。
 *
 * このリポジトリの売りの一つは「React が要らない現場でも使える」こと。
 * renderToStaticMarkup で描画結果だけを取り出すので、出力に react も babel も
 * 入らない。Tailwind の CDN を1行読むだけで、HTML を貼れば表示される。
 *
 * ただし全部が静的で成立するわけではない。状態や操作を持つコンポーネントは
 * 静的化すると見た目だけになる。そこで meta に interactive 判定を持たせ、
 * 「純表示（そのまま使える）」と「要 React（見た目のみ）」を分けて記録する。
 * 売り文句に使う数字はここから取る。
 *
 *   node scripts/build-static-html.mjs             全件
 *   node scripts/build-static-html.mjs --limit 20  先頭20件（動作確認用）
 *
 * 出力: public/html/<id>.html と public/html/index.json
 */
import { createServer } from "vite";
import { chromium } from "playwright";
import { existsSync, readdirSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};
const LIMIT = arg("limit", Infinity);
const OUT = resolve(process.cwd(), "public/html");

/** 状態や操作を持つか（＝静的化すると見た目だけになるか）をソースから判定する */
const INTERACTIVE = /\buseState\b|\buseEffect\b|\buseReducer\b|\buseRef\b|\bonClick=|\bonChange=|\bonMouseEnter=|\bonSubmit=/;

async function launchChromium() {
  try {
    return await chromium.launch();
  } catch (err) {
    const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
    if (!root || !existsSync(root)) throw err;
    for (const dir of readdirSync(root)) {
      if (!dir.startsWith("chromium")) continue;
      for (const rel of [
        "chrome-linux/chrome",
        "chrome-linux/headless_shell",
        "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
      ]) {
        const bin = join(root, dir, rel);
        if (existsSync(bin)) return await chromium.launch({ executablePath: bin });
      }
    }
    throw err;
  }
}

/** manifest から id → {path, name, category} を作る */
function readManifest() {
  const src = readFileSync(resolve(process.cwd(), "src/registry/manifest.ts"), "utf-8");
  return JSON.parse(src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1));
}

const manifest = readManifest();
const byId = new Map(manifest.map((e) => [e.id, e]));

const server = await createServer({ server: { port: 0 }, logLevel: "error" });
await server.listen();
const { port } = server.httpServer.address();

const browser = await launchChromium();
const page = await browser.newPage();

mkdirSync(OUT, { recursive: true });
const index = [];
let failed = 0;

try {
  await page.goto(`http://localhost:${port}/overflow.html`, { waitUntil: "load" });
  await page.waitForFunction(() => typeof window.__staticHtml === "function", {
    timeout: 60_000,
  });
  const ids = (await page.evaluate(() => window.__ids)).slice(0, LIMIT);
  console.log(`${ids.length} 件を静的 HTML に書き出します…`);

  for (const [i, id] of ids.entries()) {
    const meta = byId.get(id);
    if (!meta) continue;
    let html;
    try {
      html = await Promise.race([
        page.evaluate((componentId) => window.__staticHtml(componentId), id),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("15秒を超えました")), 15_000)
        ),
      ]);
    } catch (e) {
      console.error(`  NG  ${id}: ${String(e).slice(0, 100)}`);
      failed++;
      continue;
    }
    writeFileSync(join(OUT, `${id}.html`), html);
    const source = readFileSync(
      resolve(process.cwd(), "src/registry", meta.path.replace("./", "")),
      "utf-8"
    );
    index.push({
      id,
      name: meta.name,
      category: meta.category,
      // 純表示のものは HTML を貼るだけで完成する。
      // 要 React のものは静的化すると見た目だけになる（操作は動かない）。
      standalone: !INTERACTIVE.test(source),
      bytes: html.length,
    });
    if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/${ids.length} 件…`);
  }
} finally {
  await browser.close();
  await server.close();
}

const standalone = index.filter((e) => e.standalone).length;
writeFileSync(
  join(OUT, "index.json"),
  JSON.stringify(
    { total: index.length, standalone, items: index.sort((a, b) => a.id.localeCompare(b.id)) },
    null,
    2
  ) + "\n"
);

console.log(
  `\n静的 HTML: ${index.length} 件を書き出しました（失敗 ${failed} 件）。\n` +
    `  うち ${standalone} 件は React 無しでそのまま動きます。\n` +
    `  残り ${index.length - standalone} 件は状態や操作を持つため、静的版は見た目のみです。`
);
if (failed) process.exit(1);
