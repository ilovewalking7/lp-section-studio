/**
 * 横スクロール検査。
 *
 * jsdom には描画エンジンが無いので、幅が溢れているかはテストでは分からない。
 * ここだけは実ブラウザ（Chromium）で幅 375px（iPhone SE 相当）に固定し、
 * 各コンポーネントを描画して「ページが横に動くか」を測る。
 *
 * 判定は documentElement.scrollWidth > clientWidth。
 * マーキーやカルーセルのように中身が意図的に幅を超える部品でも、
 * 自前の overflow-hidden で閉じ込めていればページは動かないので通る。
 * 閉じ込め忘れだけが落ちる。
 *
 * ── 既知の未修正分について ──
 * 検査の導入時点で 880 個中 26 個がはみ出していた。直すまで CI を赤にし
 * 続けると検査自体が無視されるので overflow-baseline.json に列挙して一時的に
 * 許容する。ただし新規混入は即失敗、直したのに一覧に残っていても失敗させる
 * ので、一覧は減る方向にしか動かない。
 *
 *   node scripts/check-overflow.mjs            幅 375 で全件
 *   node scripts/check-overflow.mjs --width 768
 *   node scripts/check-overflow.mjs --limit 50  先頭50件だけ（動作確認用）
 *   node scripts/check-overflow.mjs --update-baseline   一覧を再生成
 */
import { createServer } from "vite";
import { chromium } from "playwright";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Chromium を起動する。CI では `npx playwright install chromium` で入った
 * 既定の場所が使われる。環境に別ビルドの Chromium が用意されている場合
 * （PLAYWRIGHT_BROWSERS_PATH にバージョン違いが置いてある等）は、
 * それを探して実行ファイルを直接指定する。
 */
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
        if (existsSync(bin)) {
          console.log(`既定の Chromium が見つからないため ${bin} を使います。`);
          return await chromium.launch({ executablePath: bin });
        }
      }
    }
    throw err;
  }
}

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};
const WIDTH = arg("width", 375);
const LIMIT = arg("limit", Infinity);
/** 端数のにじみを違反にしないための許容幅(px) */
const TOLERANCE = 1;

const server = await createServer({ server: { port: 0 }, logLevel: "error" });
await server.listen();
const { port } = server.httpServer.address();
const base = `http://localhost:${port}`;

const browser = await launchChromium();
const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 } });

const failures = [];
let checked = 0;
try {
  await page.goto(`${base}/overflow.html`, { waitUntil: "load" });
  await page.waitForFunction(() => typeof window.__mount === "function", {
    timeout: 60_000,
  });
  const ids = await page.evaluate(() => window.__ids);
  const targets = ids.slice(0, LIMIT);
  console.log(`幅 ${WIDTH}px で ${targets.length} 件を検査します…`);

  for (const id of targets) {
    let result;
    try {
      result = await page.evaluate(async (componentId) => {
        await window.__mount(componentId);
        const d = document.documentElement;
        return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth };
      }, id);
    } catch (e) {
      failures.push({ id, reason: `描画に失敗: ${String(e).slice(0, 120)}` });
      continue;
    }
    checked++;
    const over = result.scrollWidth - result.clientWidth;
    if (over > TOLERANCE) {
      failures.push({
        id,
        reason: `${over}px はみ出し（内容 ${result.scrollWidth}px / 画面 ${result.clientWidth}px）`,
      });
    }
    await page.evaluate(() => window.__unmount());
  }
} finally {
  await browser.close();
  await server.close();
}

const BASELINE_PATH = resolve(process.cwd(), "src/registry/overflow-baseline.json");
if (process.argv.includes("--update-baseline")) {
  writeFileSync(
    BASELINE_PATH,
    JSON.stringify(failures.map((f) => f.id).sort(), null, 2) + "\n"
  );
  console.log(`overflow-baseline.json に ${failures.length} 件を記録しました。`);
  process.exit(0);
}

const baseline = existsSync(BASELINE_PATH)
  ? JSON.parse(readFileSync(BASELINE_PATH, "utf-8"))
  : [];
const known = new Set(baseline);
const fresh = failures.filter((f) => !known.has(f.id));
const fixed = baseline.filter((id) => !failures.some((f) => f.id === id));

if (fresh.length) {
  console.error(`\n横スクロール: 新たに ${fresh.length} 件が画面幅 ${WIDTH}px を超えました。\n`);
  for (const f of fresh) console.error(`  NG  ${f.id}: ${f.reason}`);
  console.error(
    `\n中身が広い部品（マーキー・カルーセル・表）は、外側の要素に ` +
      `overflow-x-hidden か overflow-x-auto を付けてページ側に漏らさないでください。`
  );
  process.exit(1);
}
if (fixed.length) {
  console.error(
    `\n直ったのに overflow-baseline.json に残っています。削除してください:\n` +
      fixed.map((id) => `  ${id}`).join("\n")
  );
  process.exit(1);
}
console.log(
  `横スクロール: ${checked} 件を幅 ${WIDTH}px で検査、新規のはみ出しはありません。` +
    (baseline.length ? `（既知 ${baseline.length} 件は overflow-baseline.json 参照）` : "")
);
