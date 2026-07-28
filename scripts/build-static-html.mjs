/**
 * React 抜きの静的 HTML を全件書き出す。
 *
 * このリポジトリの売りの一つは「React が要らない現場でも使える」こと。
 * renderToStaticMarkup で描画結果だけを取り出すので、出力に react も babel も
 * 入らない。HTML を貼れば表示される。
 *
 * **CSS も外部に頼らない。** 以前は `cdn.tailwindcss.com` を1行読ませていたが、
 * 「1枚で完結」と言いながら開くたびに外部へ取りに行く作りで、オフライン・
 * 社内網・CDN障害で色が消える（Tailwind 自身も Play CDN を本番非推奨としている）。
 * そこで 1件ずつ、**その HTML だけを content にした Tailwind をコンパイル**して
 * <style> に埋め込む。全880件の和集合は 339KB あって全件に埋めると 300MB 近くに
 * なるが、個別なら 1件 8KB 前後で収まる（大半は preflight）。
 *
 * Tailwind は毎回プロセスを起こすと 880 回で数十分かかるので、postcss プラグインと
 * して**この1プロセスの中から**回す。実測で全件 100 秒前後。
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
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { existsSync, readdirSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};
const LIMIT = arg("limit", Infinity);
const OUT = resolve(process.cwd(), "public/html");

// ──────────────────────────────────────────────────────────────────────────
// Tailwind のコンパイル（1件ぶん）
// ──────────────────────────────────────────────────────────────────────────

const TW_CONFIG = (
  await import(pathToFileURL(resolve(process.cwd(), "tailwind.config.js")).href)
).default;
// 入力はスタジオ本体と同じ src/index.css。@tailwind の3層に加えて
// :root / .dark のトークンと body の既定スタイルが入っているので、
// 出力1本で「スタジオで見たとおり」になる。
const INPUT_CSS = readFileSync(resolve(process.cwd(), "src/index.css"), "utf-8");

/**
 * PostCSS の AST 上で空白とコメントを落とす。
 * cssnano を足せば済むが新規依存を増やしたくないので、stringifier の
 * raws を潰すだけで済ませる。実測で 14.4KB → 8.3KB。
 */
const compact = () => ({
  postcssPlugin: "compact",
  OnceExit(root) {
    root.walkComments((c) => c.remove());
    root.walk((node) => {
      node.raws.before = "";
      if (node.type === "decl") {
        node.raws.between = ":";
        delete node.raws.value;
      } else if (node.type === "rule") {
        node.raws.between = "";
        node.raws.after = "";
        node.raws.semicolon = false;
        delete node.raws.selector;
      } else if (node.type === "atrule") {
        node.raws.afterName = " ";
        node.raws.between = "";
        node.raws.after = "";
        node.raws.semicolon = false;
        delete node.raws.params;
      }
    });
    root.raws.after = "";
  },
});
compact.postcss = true;

/** この HTML 1枚だけを content にして Tailwind を通し、実CSSを返す */
async function compileCss(html) {
  const result = await postcss([
    tailwindcss({ ...TW_CONFIG, content: [{ raw: html, extension: "html" }] }),
    autoprefixer(),
    compact(),
  ]).process(INPUT_CSS, { from: undefined });
  return result.css;
}

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
let cssSlot = "";
let cssMs = 0;
let cssBytes = 0;

try {
  await page.goto(`http://localhost:${port}/overflow.html`, { waitUntil: "load" });
  await page.waitForFunction(() => typeof window.__staticHtml === "function", {
    timeout: 60_000,
  });
  const ids = (await page.evaluate(() => window.__ids)).slice(0, LIMIT);
  // CSS の差し込み位置は src/lib/vanilla.ts が決める。文字列を二重に持つと
  // 片方だけ直したときに黙って CSS 無しの HTML が出るので、実物を貰う。
  cssSlot = await page.evaluate(() => window.__cssSlot);
  if (!cssSlot) throw new Error("window.__cssSlot が取れませんでした");
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
    if (!html.includes(cssSlot)) {
      throw new Error(
        `${id}: CSS の差し込み位置 ${cssSlot} が HTML にありません（src/lib/vanilla.ts を確認）`
      );
    }
    // ここで初めて外部依存が消える。content はこの HTML 自身。
    const t = Date.now();
    const css = await compileCss(html);
    cssMs += Date.now() - t;
    cssBytes += css.length;
    html = html.replace(cssSlot, `<style>\n${css}\n    </style>`);
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

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log(
  `\n静的 HTML: ${index.length} 件を書き出しました（失敗 ${failed} 件）。\n` +
    `  うち ${standalone} 件は React 無しでそのまま動きます。\n` +
    `  残り ${index.length - standalone} 件は状態や操作を持つため、静的版は見た目のみです。\n` +
    `  CSS の埋め込み: ${(cssMs / 1000).toFixed(0)} 秒 / 1件あたり CSS ${kb(
      cssBytes / Math.max(1, index.length)
    )}・HTML ${kb(index.reduce((a, e) => a + e.bytes, 0) / Math.max(1, index.length))}\n` +
    `  外部への参照はありません（CDN も Web フォントも読みません）。`
);
if (failed) process.exit(1);
