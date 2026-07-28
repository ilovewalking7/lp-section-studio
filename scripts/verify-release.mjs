/**
 * 配布用 ZIP を実際に展開して中身を検める。
 *
 * 出品前に「入っているつもり」で出さないための検査。数えるだけでなく、
 * 静的 HTML を実ブラウザで開いて**本当に描画されるか**まで見る。
 *
 *   node scripts/verify-release.mjs
 *   node scripts/verify-release.mjs --zip release/lp-section-studio-v1.0.0.zip
 *   node scripts/verify-release.mjs --samples 5
 *
 * 見るもの:
 *   1. 想定したディレクトリと件数が揃っているか
 *   2. 顧客に渡してはいけないもの（node_modules/.git/.env 等）が入っていないか
 *   3. README と LICENSE が入っていて、両方の版のライセンスが読み取れるか
 *   4. 静的 HTML を無作為に数件、**外部通信を遮断した**実ブラウザで開いて色を実測
 *   5. スタジオが HTTP 越しに開けるか
 *
 * 4 について: 「注入した文字列があるか」を見ても、色が出るかは分からない。
 * CSS は書き出し時にコンパイルして埋め込んであるので、ブラウザをオフラインにし
 * 外部リクエストを abort した上で getComputedStyle を読む。bg-card が透明でなく、
 * text-muted-foreground が真っ黒でないことを実測できて初めて「自己完結している」
 * と言える。
 */
import { existsSync, mkdtempSync, rmSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";

const ROOT = resolve(import.meta.dirname, "..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
};
const ZIP = resolve(ROOT, arg("zip", "release/lp-section-studio-v1.0.0.zip"));
const SAMPLES = Number(arg("samples", 3));

if (!existsSync(ZIP)) {
  console.error(`${relative(ROOT, ZIP)} がありません。先に node scripts/build-release.mjs を実行してください。`);
  process.exit(1);
}

const fails = [];
const ok = (label, detail = "") => console.log(`  OK   ${label}${detail ? `  ${detail}` : ""}`);
const ng = (label, detail = "") => {
  console.log(`  NG   ${label}${detail ? `  ${detail}` : ""}`);
  fails.push(label);
};
const check = (cond, label, detail) => (cond ? ok(label, detail) : ng(label, detail));

const work = mkdtempSync(join(tmpdir(), "lpss-verify-"));
console.log(`${relative(ROOT, ZIP)} を ${work} に展開します…\n`);
execFileSync("unzip", ["-q", ZIP, "-d", work]);
const roots = readdirSync(work);
if (roots.length !== 1) {
  console.error(`ZIP の最上位が1ディレクトリではありません: ${roots.join(", ")}`);
  process.exit(1);
}
const PKG = join(work, roots[0]);

// ──────────────────────────────────────────────────────────────────────────
// 1. 件数
// ──────────────────────────────────────────────────────────────────────────

/** 拡張子つきのファイルを再帰的に数える */
function countFiles(dir, ext) {
  if (!existsSync(dir)) return -1;
  return readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith(ext)).length;
}

console.log("【1】中身の件数");
const htmlIndex = JSON.parse(readFileSync(join(PKG, "html/index.json"), "utf-8"));
const expect = {
  components: 880,
  html: 880,
  registry: 885,
  standalone: 397,
};
check(countFiles(join(PKG, "components/demos"), ".tsx") === expect.components,
  `components/demos  ${expect.components} 件`, `実測 ${countFiles(join(PKG, "components/demos"), ".tsx")}`);
check(countFiles(join(PKG, "html"), ".html") === expect.html,
  `html  ${expect.html} 件`, `実測 ${countFiles(join(PKG, "html"), ".html")}`);
check(countFiles(join(PKG, "registry"), ".json") === expect.registry,
  `registry  ${expect.registry} 件`, `実測 ${countFiles(join(PKG, "registry"), ".json")}`);
check(htmlIndex.total === expect.html && htmlIndex.standalone === expect.standalone,
  `html/index.json  total=${expect.html} standalone=${expect.standalone}`,
  `実測 total=${htmlIndex.total} standalone=${htmlIndex.standalone}`);

const mcpData = JSON.parse(readFileSync(join(PKG, "mcp/data/components.json"), "utf-8"));
check(mcpData.edition === "full" && mcpData.included === 880,
  "mcp  全部入り版 880 件", `実測 edition=${mcpData.edition} included=${mcpData.included}`);
check(existsSync(join(PKG, "mcp/src/index.js")) && existsSync(join(PKG, "mcp/package.json")),
  "mcp  サーバ本体と package.json");
check(existsSync(join(PKG, "studio/index.html")), "studio  ビルド済み index.html");
// 依存プリミティブ（これが無いと 880 件はコンパイルできない）
for (const p of ["components/ui/button.tsx", "components/lib/utils.ts", "components/registry/types.ts", "components/theme/tokens.css"]) {
  check(existsSync(join(PKG, p)), `components  ${p}`);
}

// ──────────────────────────────────────────────────────────────────────────
// 2. 混入してはいけないもの
// ──────────────────────────────────────────────────────────────────────────

console.log("\n【2】顧客に渡してはいけないものが入っていないか");
const all = readdirSync(PKG, { recursive: true }).map(String);
const forbidden = [
  [/(^|[/\\])node_modules([/\\]|$)/, "node_modules"],
  [/(^|[/\\])\.git([/\\]|$)/, ".git"],
  [/(^|[/\\])\.env($|[/\\.])/, ".env"],
  [/(^|[/\\])\.claude([/\\]|$)/, ".claude"],
  [/\.tsbuildinfo$/, "*.tsbuildinfo"],
  [/\.log$/, "*.log"],
  [/(^|[/\\])package-lock\.json$/, "package-lock.json"],
  [/(^|[/\\])\.DS_Store$/, ".DS_Store"],
  [/(^|[/\\])crawler([/\\]|$)/, "crawler/"],
];
for (const [re, label] of forbidden) {
  const hit = all.filter((f) => re.test(f));
  check(hit.length === 0, `${label} が無い`, hit.length ? `${hit.length} 件混入: ${hit.slice(0, 3).join(", ")}` : "");
}
// Vite が public/ を丸ごと dist/ にコピーするので、放っておくと registry/ が
// studio/ の中に二重で入る（6MB の無駄）
check(!existsSync(join(PKG, "studio/r")), "studio/r が無い（registry/ と重複するため）");
// 逆に studio/html は要る。スタジオのバニラHTML書き出しは、その場で作らず
// /html/<id>.html を取りに行く（ブラウザでは Tailwind をコンパイルできない）。
check(existsSync(join(PKG, "studio/html/index.json")),
  "studio/html がある（バニラHTML書き出しが取りに行く先）");

// html/ の全件で CSS が埋まっていて、外部を読む記述が残っていないか。
// 1件でも漏れるとその部品だけ色が出ない／オフラインで壊れる。
/** 外部からリソースを読む記述。<a href> や SVG の名前空間 URL は当たらない。 */
const EXTERNAL_RESOURCE =
  /<script[^>]+\bsrc\s*=\s*["']\s*(?:https?:)?\/\/|<link[^>]+\bhref\s*=\s*["']\s*(?:https?:)?\/\/|<(?:img|iframe|video|audio|source|embed)[^>]+\bsrc\s*=\s*["']\s*(?:https?:)?\/\/|@import[^;]*(?:https?:)?\/\/|url\(\s*["']?(?:https?:)?\/\//i;
/**
 * コンパイル済みの実CSSが埋まっているか。
 * `--tw-border-spacing-x` は Tailwind の preflight が必ず出す変数なので、
 * 部品が持つ独自の <style>（@keyframes 用など）と取り違えない。
 */
const hasCompiledCss = (html) =>
  html.includes("<style>") &&
  html.includes("--tw-border-spacing-x") &&
  html.includes("--card:");
const selfContained = (html) => hasCompiledCss(html) && !EXTERNAL_RESOURCE.test(html);

const htmlFiles = readdirSync(join(PKG, "html")).filter((f) => f.endsWith(".html"));
const notEmbedded = htmlFiles.filter(
  (f) => !hasCompiledCss(readFileSync(join(PKG, "html", f), "utf-8"))
);
check(notEmbedded.length === 0, "html  全件に CSS が埋め込まれている",
  notEmbedded.length ? `${notEmbedded.length} 件が未埋め込み: ${notEmbedded.slice(0, 3).join(", ")}` : `${htmlFiles.length} 件`);
const external = htmlFiles.filter((f) =>
  EXTERNAL_RESOURCE.test(readFileSync(join(PKG, "html", f), "utf-8"))
);
check(external.length === 0, "html  外部を読む記述が1つも無い（CDN・Webフォント含む）",
  external.length ? `${external.length} 件に残存: ${external.slice(0, 3).join(", ")}` : `${htmlFiles.length} 件`);
// MCP が返す HTML も同じであること
const mcpBroken = mcpData.items.filter((i) => i.html && !selfContained(i.html)).length;
check(mcpBroken === 0, "mcp  返す HTML も同じく自己完結している",
  mcpBroken ? `${mcpBroken} 件が壊れている` : `${mcpData.items.filter((i) => i.html).length} 件`);

// ──────────────────────────────────────────────────────────────────────────
// 3. README と LICENSE
// ──────────────────────────────────────────────────────────────────────────

console.log("\n【3】README と LICENSE");
check(existsSync(join(PKG, "README.md")), "README.md がある");
check(existsSync(join(PKG, "LICENSE")), "LICENSE がある");
check(existsSync(join(PKG, "mcp/LICENSE")), "mcp/LICENSE がある");
if (existsSync(join(PKG, "LICENSE"))) {
  const lic = readFileSync(join(PKG, "LICENSE"), "utf-8");
  check(/【無料版】/.test(lic) && /個人利用・非商用/.test(lic), "LICENSE  無料版（個人利用・非商用）が読み取れる");
  check(/【買い切り版】/.test(lic) && /商用・非商用を問わず/.test(lic), "LICENSE  買い切り版（商用可）が読み取れる");
  check(/--- English ---/.test(lic) && !/公開前に用意する/.test(lic), "LICENSE  英訳が入っている（プレースホルダのままでない）");
}

// ──────────────────────────────────────────────────────────────────────────
// 4. 静的 HTML を実ブラウザで開く
// ──────────────────────────────────────────────────────────────────────────

console.log("\n【4】静的 HTML を外部通信を遮断した実ブラウザで開いて実測");

const { chromium } = await import(resolve(ROOT, "node_modules/playwright/index.mjs"));
async function launch() {
  const bins = [
    process.env.PLAYWRIGHT_CHROMIUM,
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  ].filter(Boolean);
  for (const b of bins) if (existsSync(b)) return chromium.launch({ executablePath: b });
  return chromium.launch();
}
const browser = await launch();

{
  // 標本は無作為（毎回違う組み合わせを見るため）。ただし bg-card を使うもの・
  // text-muted-foreground を使うものを必ず1件ずつ含める。この2つは素の Tailwind
  // には無いトークンなので、色が出るかはそれを使う HTML でしか確かめられない。
  const bodyOf = (id) => {
    const html = readFileSync(join(PKG, "html", `${id}.html`), "utf-8");
    return html.slice(html.indexOf("<body"));
  };
  /** class 属性を分解して完全一致で見る（bg-card-foreground などを拾わないため） */
  const usesClass = (id, cls) => {
    for (const m of bodyOf(id).matchAll(/class="([^"]*)"/g)) {
      if (m[1].split(/\s+/).includes(cls)) return true;
    }
    return false;
  };

  const standalone = htmlIndex.items.filter((i) => i.standalone);
  const cardPool = standalone.filter((i) => usesClass(i.id, "bg-card"));
  const mutedPool = standalone.filter((i) => usesClass(i.id, "text-muted-foreground"));
  const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];
  const picked = [];
  const add = (item) => {
    if (item && !picked.some((p) => p.id === item.id)) picked.push(item);
  };
  add(pick(cardPool));
  add(pick(mutedPool));
  while (picked.length < Math.min(SAMPLES, standalone.length)) add(pick(standalone));
  check(cardPool.length > 0 && mutedPool.length > 0, "固有トークンを使う standalone HTML がある",
    `bg-card ${cardPool.length} 件 / text-muted-foreground ${mutedPool.length} 件 / standalone ${standalone.length} 件`);

  /**
   * ページの中で走らせる測定式。
   * 実在の要素に加えて、素の <div class="bg-card text-muted-foreground"> を
   * 対照として差し込み、そのページの <style> だけでトークンが解けるかを直に測る。
   *
   * 対照が意味を持つのは、そのページが実際にそのクラスを使っている時だけ。
   * CSS は1枚ぶんだけコンパイルしてあるので、使っていないクラスの定義は
   * （意図どおり）入っていない。使っていないページで対照が透明なのは正常。
   */
  const SAMPLE_MEASURE = `(() => {
    const has = (cls) =>
      [...document.body.querySelectorAll("*")].find((el) => el.classList.contains(cls));
    const bgEl = has("bg-card");
    const fgEl = has("text-muted-foreground");
    const out = {
      elements: document.body.querySelectorAll("*").length,
      text: document.body.innerText.trim().length,
      height: document.body.scrollHeight,
      width: document.documentElement.scrollWidth,
      styles: document.querySelectorAll("style").length,
      rules: [...document.styleSheets].reduce((n, s) => { try { return n + s.cssRules.length; } catch { return n; } }, 0),
      cardVar: getComputedStyle(document.documentElement).getPropertyValue("--card").trim(),
      bgCard: bgEl ? getComputedStyle(bgEl).backgroundColor : null,
      mutedFg: fgEl ? getComputedStyle(fgEl).color : null,
    };
    const probe = document.createElement("div");
    probe.className = "bg-card text-muted-foreground";
    probe.textContent = "probe";
    document.body.appendChild(probe);
    const ps = getComputedStyle(probe);
    out.probeBg = ps.backgroundColor;
    out.probeFg = ps.color;
    probe.remove();
    return out;
  })()`;

  const TRANSPARENT = "rgba(0, 0, 0, 0)";
  const BLACK = "rgb(0, 0, 0)";

  for (const item of picked) {
    // offline: true で本当に外に出られない状態にし、さらに http(s) は abort する。
    // ここで色が出れば「1枚で完結している」ことの実証になる。
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      offline: true,
    });
    const outside = [];
    await context.route(
      (url) => url.protocol === "http:" || url.protocol === "https:",
      (route) => {
        outside.push(route.request().url());
        return route.abort();
      }
    );
    const page = await context.newPage();
    // route を通らない経路（file:// 以外の何か）も取りこぼさないよう直に数える
    page.on("request", (r) => {
      const u = r.url();
      if (!u.startsWith("file:") && !u.startsWith("data:") && !u.startsWith("blob:")) {
        outside.push(u);
      }
    });
    await page.goto(`file://${join(PKG, "html", `${item.id}.html`)}`, { waitUntil: "load" });
    await page.waitForTimeout(80);
    const m = await page.evaluate(SAMPLE_MEASURE);
    await context.close();

    const detail =
      `要素${m.elements} / 文字${m.text} / 高さ${m.height}px / 幅${m.width}px / ` +
      `style${m.styles}枚 ${m.rules}ルール / --card="${m.cardVar}" / ` +
      `bg-card=${m.bgCard ?? "未使用"} / text-muted-foreground=${m.mutedFg ?? "未使用"} / ` +
      `対照 bg=${usesClass(item.id, "bg-card") ? m.probeBg : "対象外"} ` +
      `fg=${usesClass(item.id, "text-muted-foreground") ? m.probeFg : "対象外"} / ` +
      `外部要求 ${outside.length}件`;
    // 真っ白でないこと
    const blank = m.elements < 3 || m.height < 40 || m.text === 0;
    // CSS が実際に届いていること
    const noCss = m.styles === 0 || m.rules < 20 || m.cardVar === "";
    // 実在の要素で、bg-card が透明でない／text-muted-foreground が真っ黒でない
    const bgBroken = m.bgCard !== null && m.bgCard === TRANSPARENT;
    const fgBroken = m.mutedFg !== null && m.mutedFg === BLACK;
    // 対照要素でも同じこと（マークアップの都合に左右されない直接の証明）。
    // そのクラスを使っているページに限る。
    const probeBroken =
      (usesClass(item.id, "bg-card") && m.probeBg === TRANSPARENT) ||
      (usesClass(item.id, "text-muted-foreground") && m.probeFg === BLACK);
    check(
      !blank && !noCss && !bgBroken && !fgBroken && !probeBroken && outside.length === 0,
      item.id,
      detail
    );
  }
}

// ──────────────────────────────────────────────────────────────────────────
// 5. スタジオ
// ──────────────────────────────────────────────────────────────────────────

console.log("\n【5】スタジオ（HTTP 越し）");

/** ページの中で走らせる測定式。cssRules は「CSS が実際に届いたか」の判定に使う。 */
const MEASURE = `(() => ({
  elements: document.body.querySelectorAll("*").length,
  text: document.body.innerText.trim().length,
  height: document.body.scrollHeight,
  bodyBg: getComputedStyle(document.body).backgroundColor,
  cssRules: [...document.styleSheets].reduce((n, s) => { try { return n + s.cssRules.length; } catch { return n; } }, 0),
}))()`;

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };
const studioDir = join(PKG, "studio");
const srv = createServer((req, res) => {
  const p = join(studioDir, decodeURIComponent(req.url.split("?")[0]));
  const file = existsSync(p) && statSync(p).isDirectory() ? join(p, "index.html") : p;
  if (!existsSync(file)) return void res.writeHead(404).end();
  const ext = file.slice(file.lastIndexOf("."));
  res.writeHead(200, { "content-type": MIME[ext] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => srv.listen(0, r));
const port = srv.address().port;
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const m = await page.evaluate(MEASURE);
  // 自ドメイン以外（フォント CDN 等）の失敗は検査環境の都合なので除く
  const local = failed.filter((u) => u.includes("localhost"));
  check(m.elements > 50 && m.text > 100 && m.cssRules > 500 && local.length === 0,
    "studio  HTTP 越しに描画される",
    `要素${m.elements} / 文字${m.text} / CSSルール${m.cssRules} / 高さ${m.height}px / ローカル読み込み失敗${local.length}件`);
  await page.close();
}
{
  // README が「HTTP サーバで開いてください」と書いている根拠を実測で残す。
  // 真っ白にはならない（index.html は事前描画済み）が、CSS も JS も
  // /assets/... の絶対パスなので読めず、素の HTML が並ぶだけになる。
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  await page.goto(`file://${join(studioDir, "index.html")}`, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const m = await page.evaluate(MEASURE);
  const assetsFailed = failed.filter((u) => u.startsWith("file:///assets/"));
  check(m.cssRules < 100 && assetsFailed.length >= 2,
    "studio  file:// ではスタイルが当たらない（README の注意書きどおり）",
    `要素${m.elements} / CSSルール${m.cssRules} / body背景=${m.bodyBg} / 読み込み失敗 ${assetsFailed.length}件`);
  await page.close();
}
srv.close();
await browser.close();

// ──────────────────────────────────────────────────────────────────────────

const zipMb = (statSync(ZIP).size / 1024 / 1024).toFixed(1);
console.log(`\nZIP: ${relative(ROOT, ZIP)}  ${zipMb} MB / 展開後 ${all.filter((f) => statSync(join(PKG, f)).isFile()).length} ファイル`);
rmSync(work, { recursive: true, force: true });

if (fails.length > 0) {
  console.error(`\n${fails.length} 件が NG:\n` + fails.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log("\nすべて OK。");
