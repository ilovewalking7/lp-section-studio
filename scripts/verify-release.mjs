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
 *   4. 静的 HTML を無作為に数件、実ブラウザで開いて描画とスタイルを実測
 *   5. スタジオが HTTP 越しに開けるか
 *
 * 4 について: この HTML は cdn.tailwindcss.com を読む作りだが、検査環境から
 * 外部 CDN には出られない。そこで CDN の代わりに、HTML が宣言している
 * tailwind.config と同じ設定でローカルに組んだ Tailwind を差し込む。
 * トークンの値（--card など）は HTML 自身が持つ <style> から来るので、
 * 「配布物に埋め込んだ設定が効いているか」はこの方法で確かめられる。
 */
import { existsSync, mkdtempSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
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
// Vite が public/ を丸ごと dist/ にコピーするので、放っておくと registry/ と
// html/ が studio/ の中に二重で入る（12MB の無駄＋注入前の古い HTML が混ざる）
check(!existsSync(join(PKG, "studio/r")), "studio/r が無い（registry/ と重複するため）");
check(!existsSync(join(PKG, "studio/html")), "studio/html が無い（html/ と重複するため）");
// html/ の全件に Tailwind 設定が入っているか（1件でも漏れると色が出ない）
const htmlFiles = readdirSync(join(PKG, "html")).filter((f) => f.endsWith(".html"));
const notInjected = htmlFiles.filter(
  (f) => !readFileSync(join(PKG, "html", f), "utf-8").includes("tailwind.config")
);
check(notInjected.length === 0, "html  全件に Tailwind のトークン設定が入っている",
  notInjected.length ? `${notInjected.length} 件が未注入: ${notInjected.slice(0, 3).join(", ")}` : `${htmlFiles.length} 件`);
// MCP が返す HTML も同じであること
const mcpNotInjected = mcpData.items.filter((i) => i.html && !i.html.includes("tailwind.config")).length;
check(mcpNotInjected === 0, "mcp  返す HTML にも同じ設定が入っている",
  mcpNotInjected ? `${mcpNotInjected} 件が未注入` : `${mcpData.items.filter((i) => i.html).length} 件`);

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

console.log("\n【4】静的 HTML を実ブラウザで開いて実測");

// CDN の代わりに使う Tailwind を、HTML が宣言している設定と同じ内容で組む。
// 入力 CSS には :root を入れない（トークンは HTML 側の <style> から来るはず）。
const cssDir = join(work, "_css");
execFileSync("mkdir", ["-p", cssDir]);
const tw = resolve(ROOT, "node_modules/.bin/tailwindcss");
let simCss = null;
if (existsSync(tw)) {
  const cfgSrc = readFileSync(resolve(ROOT, "tailwind.config.js"), "utf-8")
    .replace(/content:\s*\[[^\]]*\]/, `content: ["${join(PKG, "html")}/*.html"]`);
  writeFileSync(join(cssDir, "cdn-sim.config.js"), cfgSrc);
  writeFileSync(join(cssDir, "in.css"), "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
  execFileSync(tw, ["-c", join(cssDir, "cdn-sim.config.js"), "-i", join(cssDir, "in.css"), "-o", join(cssDir, "cdn-sim.css")],
    { stdio: ["ignore", "ignore", "ignore"] });
  simCss = readFileSync(join(cssDir, "cdn-sim.css"), "utf-8");
  ok("CDN 相当の Tailwind をローカルに構築", `${(simCss.length / 1024).toFixed(0)} KB`);
} else {
  ng("tailwindcss が見つからない（npm install が必要）");
}

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

if (simCss) {
  // 無作為に選ぶ（毎回違う組み合わせを見るため）。ただし 1 件は必ず
  // セマンティックトークン（bg-card など）を使うものにする。埋め込んだ
  // Tailwind 設定が効いているかは、それを使う HTML でしか確かめられない。
  const standalone = htmlIndex.items.filter((i) => i.standalone);
  // <head> に埋めた設定の中にもトークン名が出てくるので、<body> だけを見る。
  // 対象は下の SAMPLE_MEASURE が DOM から拾えるクラスに合わせてある
  // （拾えないクラスを選んでしまうと、色を実測できず検査にならない）。
  const usesToken = (id) => {
    const html = readFileSync(join(PKG, "html", `${id}.html`), "utf-8");
    const body = html.slice(html.indexOf("<body"));
    return /(?:^|[\s"])(?:bg-(?:card|primary|muted|background)|text-(?:muted-foreground|card-foreground|foreground|primary))(?:[\s"]|$)/.test(
      body
    );
  };
  const tokenPool = standalone.filter((i) => usesToken(i.id));
  const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];
  const picked = tokenPool.length > 0 ? [pick(tokenPool)] : [];
  while (picked.length < Math.min(SAMPLES, standalone.length)) {
    const c = pick(standalone);
    if (!picked.some((p) => p.id === c.id)) picked.push(c);
  }
  ok("トークンを使う standalone HTML", `${tokenPool.length} 件 / ${standalone.length} 件（うち1件を必ず検査）`);

  /** ページの中で走らせる測定式（静的HTML用） */
  const SAMPLE_MEASURE = `(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const q = (sel) => document.querySelector(sel);
    // 背景トークンが無ければ文字色トークンを見る（どちらも素の Tailwind には無い）
    const bgEl = q('[class*="bg-card"], [class*="bg-primary"], [class*="bg-muted"], [class*="bg-background"]');
    const fgEl = q('[class*="text-muted-foreground"], [class*="text-card-foreground"], [class*="text-foreground"], [class*="text-primary"]');
    const tokenEl = bgEl ?? fgEl;
    const styled = [...document.body.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el);
      return s.backgroundColor !== "rgba(0, 0, 0, 0)" || s.borderTopWidth !== "0px" || s.padding !== "0px";
    });
    return {
      elements: document.body.querySelectorAll("*").length,
      styled: styled.length,
      text: document.body.innerText.trim().length,
      height: document.body.scrollHeight,
      width: document.documentElement.scrollWidth,
      rootVar: getComputedStyle(document.documentElement).getPropertyValue("--card").trim(),
      tokenClass: tokenEl
        ? [...tokenEl.classList].find((c) =>
            /^(bg-(card|primary|muted|background)|text-(muted-foreground|card-foreground|foreground|primary))$/.test(c)
          )
        : null,
      // 背景トークンなら背景色を、文字色トークンなら文字色を測る
      tokenBg: tokenEl ? (bgEl ? cs(tokenEl).backgroundColor : cs(tokenEl).color) : null,
      fontSize: cs(q("h1, h2, h3, p, span, div")).fontSize,
    };
  })()`;

  for (const item of picked) {
    // Tailwind 無し／有りの2回測って差を見る。「スタイルが当たっている」を
    // 絶対値のしきい値で決めると、要素数の少ない部品や SVG の多い部品で
    // 判定がぶれるので、同じページの前後比較で判断する。
    const measureOnce = async (withCss) => {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      // 外部 CDN には出られないので握りつぶし、同等の CSS を後から差し込む
      await page.route("https://cdn.tailwindcss.com**", (r) =>
        r.fulfill({ contentType: "text/javascript", body: "" })
      );
      await page.goto(`file://${join(PKG, "html", `${item.id}.html`)}`, { waitUntil: "load" });
      if (withCss) await page.addStyleTag({ content: simCss });
      // CSS を後から差し込むと transition-colors 等が走り出し、getComputedStyle が
      // 補間中の値（背景が rgba(255,255,255,0.17) など）を返して測定が揺れる。
      // 測る前にアニメーションを止めて確定値にする。
      await page.addStyleTag({
        content: "*, *::before, *::after { transition: none !important; animation: none !important; }",
      });
      await page.waitForTimeout(120);
      const m = await page.evaluate(SAMPLE_MEASURE);
      await page.close();
      return m;
    };
    const bare = await measureOnce(false);
    const m = await measureOnce(true);

    const detail =
      `要素${m.elements} / 文字${m.text} / 高さ${m.height}px / 幅${m.width}px / ` +
      `スタイル付き ${bare.styled}→${m.styled} / --card="${m.rootVar}" / ` +
      `${m.tokenClass ?? "トークン未使用"}=${m.tokenBg ?? "-"} / font=${m.fontSize}`;
    // 真っ白でないこと
    const blank = m.elements < 3 || m.height < 40 || m.text === 0;
    // Tailwind を入れた前後で見た目が変わること（＝クラスが効いている）
    const unstyled = m.styled <= bare.styled && m.height === bare.height;
    // 埋め込んだトークン定義が届いているか（--card が空なら <style> が効いていない）
    const tokensMissing = m.rootVar === "";
    // トークンが解決したか。素の状態（Tailwind 無し）と同じ色のままなら、
    // そのクラスは何も効いていない＝定義が届いていない。
    const tokenBroken = m.tokenClass !== null && m.tokenBg === bare.tokenBg;
    check(!blank && !unstyled && !tokensMissing && !tokenBroken, item.id, detail);
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
