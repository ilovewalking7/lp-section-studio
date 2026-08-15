// 静的プリレンダ: ビルド済み SSR バンドル（dist-ssr/entry-server.js）で
// マーケ面を HTML 化し、ルートごとに dist/<route>/index.html を生成する。
//
// 目的:
//   - 空の <div id="root"> しか無い SPA を、クローラ／JS無効環境でも読める
//     “中身入り HTML” にする（SEO 対策の核）。
//   - ハッシュではなくパス（/, /studio）で個別 URL を持たせる。
//
// クライアントは createRoot で改めて描画するため、ここで埋めた HTML は
// あくまで初期 HTML（クローラ向け）。ハイドレーションはしない。

import { readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const SSR_DIR = resolve(ROOT, "dist-ssr");
// VITE_SITE_URL が設定されていればそれを優先する（未設定時は既定値のまま・挙動据え置き）。
const ORIGIN = process.env.VITE_SITE_URL ?? "https://app-035-studio.pages.dev";

/** 各ルートのメタ（日本語をデフォルト言語として静的化）。 */
const ROUTES = [
  {
    route: "home",
    out: "index.html",
    ssr: "home",
    robots: "index, follow",
    url: `${ORIGIN}/`,
    title: "LP Section Studio — React が要らない現場でも使える UI 部品 880（MIT・無料）",
    description:
      "880 コンポーネントすべて MIT ライセンスで無料。うち 397 個は React も Babel も含まない静的 HTML として書き出せるので、PHP・Rails・Hugo・WordPress にもそのまま貼れます。全件が a11y・コントラスト・キーボード・横スクロールの4検査をCIで毎回通過。MCP サーバー同梱。",
  },
  {
    route: "studio",
    out: "studio/index.html",
    ssr: null, // スタジオは SEO 対象外: 本文は静的化せずシェルのみ
    robots: "noindex, follow",
    url: `${ORIGIN}/studio`,
    title: "スタジオ — LP Section Studio",
    description:
      "880+ のLPセクションと3Dコンポーネントを、ライブプレビューしながら検索・コピーできるスタジオ。",
  },
];

const escAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const escHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTitle(html, v) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(v)}</title>`);
}
function setMetaContent(html, key, v) {
  const re = new RegExp(`(<meta\\s+${key}\\s+content=")[^"]*(")`);
  if (!re.test(html)) {
    console.warn(`[prerender] meta not found for ${key} — skipped`);
    return html;
  }
  return html.replace(re, `$1${escAttr(v)}$2`);
}
function setLinkHref(html, key, v) {
  const re = new RegExp(`(<link\\s+${key}\\s+href=")[^"]*(")`);
  return html.replace(re, `$1${escAttr(v)}$2`);
}

function applyMeta(html, r) {
  html = setTitle(html, r.title);
  html = setMetaContent(html, 'name="description"', r.description);
  html = setMetaContent(html, 'name="robots"', r.robots);
  html = setLinkHref(html, 'rel="canonical"', r.url);
  html = setMetaContent(html, 'property="og:url"', r.url);
  html = setMetaContent(html, 'property="og:title"', r.title);
  html = setMetaContent(html, 'property="og:description"', r.description);
  html = setMetaContent(html, 'name="twitter:title"', r.title);
  html = setMetaContent(html, 'name="twitter:description"', r.description);
  return html;
}

async function findSsrEntry() {
  const direct = resolve(SSR_DIR, "entry-server.js");
  if (existsSync(direct)) return direct;
  // 念のため: 出力名が違う場合は dist-ssr 内の .js を拾う
  const files = await readdir(SSR_DIR);
  const js = files.find((f) => f.endsWith(".js"));
  if (!js) throw new Error("dist-ssr に entry-server の出力が見つかりません");
  return resolve(SSR_DIR, js);
}

async function main() {
  const templatePath = resolve(DIST, "index.html");
  const template = await readFile(templatePath, "utf8");

  const { render } = await import(pathToFileURL(await findSsrEntry()).href);

  for (const r of ROUTES) {
    let html = applyMeta(template, r);

    if (r.ssr) {
      const body = render(r.ssr);
      // 本文を #root に注入。プリレンダ済みなので noscript フォールバックは外す。
      html = html.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${body}</div>`
      );
      html = html.replace(/\s*<noscript>[\s\S]*?<\/noscript>/, "");
    }

    const outPath = resolve(DIST, r.out);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(
      `[prerender] ${r.route.padEnd(8)} → dist/${r.out.padEnd(18)} (${kb} KB${r.ssr ? ", prerendered" : ", shell"})`
    );
  }

  // SSR 中間生成物は配信不要なので削除
  await rm(SSR_DIR, { recursive: true, force: true });
  console.log("[prerender] done");
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
