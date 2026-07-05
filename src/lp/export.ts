/**
 * ミセテLP の書き出しエンジン。テンプレ + 回答から、そのまま保存して開ける
 * 1枚の完結HTML（Tailwind CDN 付き）を組み立てる。
 */
import { createElement } from "react";
import { registry } from "@/registry";
import { formatHtml } from "@/lib/vanilla";
import { escapeHtml, swapHtml } from "./swap";
import { SITE_URL } from "./lpPlan";
import type { IndustryTemplate, LpAnswers } from "./types";

/** renderToStaticMarkup の最小型（react-dom/server.browser を遅延ロード） */
type ServerRenderer = { renderToStaticMarkup: (el: unknown) => string };

/** Free プランの書き出しに付ける固定バッジ（Tailwind非依存のインラインstyleで自己完結） */
function badgeHtml(): string {
  return `<div style="padding:14px 0;text-align:center;font-family:sans-serif;font-size:12px;color:#8a8a8a;background:#f5f5f5;">
  <a href="${SITE_URL}/lp" style="color:#8a8a8a;text-decoration:underline;" target="_blank" rel="noopener noreferrer">Made with ミセテLP</a>
</div>
`;
}

/** 連結済みHTMLの最後の <footer ...> 要素の直前にバッジを挿入する（見つからなければ末尾に追記） */
function insertBeforeFooter(html: string, badge: string): string {
  if (!badge) return html;
  const idx = html.lastIndexOf("<footer");
  if (idx === -1) return html + badge;
  return html.slice(0, idx) + badge + html.slice(idx);
}

/** <html>...</html> の完結ドキュメントに包む */
function wrapDocument(body: string, a: LpAnswers, pro: boolean): string {
  const title = `${a.shopName}｜${a.tagline}`;
  const ogp = pro
    ? `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(a.intro)}" />
    <meta property="og:type" content="website" />`
    : "";
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(a.intro)}" />${ogp}
    <!-- これ1行で Tailwind のクラスがそのまま効く（ビルド不要） -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
${body}
  </body>
</html>`;
}

/**
 * テンプレ + 回答から書き出し用の1枚HTMLを組み立てる。
 * 1. document.documentElement.lang を "ja" に固定する（デモの言語分岐のため。finallyで復元）
 * 2. 各セクションを実レンダリング（renderToStaticMarkup）→ swapHtml で文言を差し替え
 * 3. 連結し、title/meta/OGP(proのみ)/Tailwind CDN/バッジ(freeのみ)付きの1枚HTMLに包む
 * 4. formatHtml で整形する
 */
export async function buildLpDocument(
  t: IndustryTemplate,
  a: LpAnswers,
  opts: { pro: boolean }
): Promise<string> {
  const server = (await import(
    "react-dom/server.browser"
  )) as unknown as ServerRenderer;

  const prevLang = document.documentElement.lang;
  document.documentElement.lang = "ja";
  try {
    const rendered: string[] = [];
    for (const section of t.sections) {
      const entry = registry.find((e) => e.id === section.demoId);
      if (!entry) {
        throw new Error(
          `registry にセクション "${section.demoId}" が見つかりません（npm run manifest を確認）`
        );
      }
      const Comp = await entry.load();
      const markup = server.renderToStaticMarkup(createElement(Comp));
      rendered.push(swapHtml(markup, section.swaps, a));
    }

    const body = insertBeforeFooter(
      rendered.join("\n"),
      opts.pro ? "" : badgeHtml()
    );
    return formatHtml(wrapDocument(body, a, opts.pro));
  } finally {
    document.documentElement.lang = prevLang;
  }
}

/** 生成済みHTMLをファイルとしてダウンロードさせる（Blob + createObjectURL） */
export function downloadHtml(filename: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
