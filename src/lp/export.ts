/**
 * ミセテLP の書き出しエンジン。テンプレ + 回答から、そのまま保存して開ける
 * 1枚の完結HTML（CSSはビルド時コンパイル済みのものをインライン埋め込み・
 * 外部依存はGoogle Fontsのみ）を組み立てる。
 */
import { createElement } from "react";
import { registry } from "@/registry";
import { formatHtml } from "@/lib/vanilla";
import { escapeHtml, swapHtml } from "./swap";
import { SITE_URL } from "./lpPlan";
import type { IndustryTemplate, LpAnswers } from "./types";
import lpCss from "./lp.css?raw";

/** renderToStaticMarkup の最小型（react-dom/server.browser を遅延ロード） */
type ServerRenderer = { renderToStaticMarkup: (el: unknown) => string };

/** Free プランの書き出しに付ける固定バッジ（Tailwind非依存のインラインstyleで自己完結） */
function badgeHtml(): string {
  return `<div style="padding:14px 0;text-align:center;font-family:sans-serif;font-size:12px;color:#8a8a8a;background:#f5f5f5;">
  <a href="${SITE_URL}/lp" style="color:#8a8a8a;text-decoration:underline;" target="_blank" rel="noopener noreferrer">Made with ミセテLP</a>
</div>
`;
}

/** 許可するCTAリンク先スキーム（それ以外・空文字は変換しない＝死にリンク化を防ぐ） */
const ALLOWED_CTA_HREF_RE = /^(?:tel:|mailto:|https:|http:|#)/;

/**
 * スワップ適用後のセクションHTMLに対し、CTAボタンをリンク化する後処理。
 * inner に（エスケープ済み）ctaLabel を含む `<button ...>...</button>` を
 * `<a ...href="ctaHref"...>...</a>` に変換する（属性は維持しつつ type/disabled は除去）。
 * ctaHref が許可スキーム（tel:/mailto:/https:/http:/#）でない・空文字の場合は変換しない。
 */
export function linkifyCta(html: string, ctaLabel: string, ctaHref: string): string {
  if (!ALLOWED_CTA_HREF_RE.test(ctaHref)) return html;
  const escapedLabel = escapeHtml(ctaLabel);
  const escapedHref = escapeHtml(ctaHref);
  return html.replace(
    /<button([^>]*)>([\s\S]*?)<\/button>/g,
    (match, attrs: string, inner: string) => {
      if (!inner.includes(escapedLabel)) return match;
      // Tailwind のバリアント記法（例: disabled:opacity-50）を属性名と誤認しないよう、
      // 除去対象は「後続が = か 空白/終端」の実属性としての出現のみに限定する。
      const cleanedAttrs = attrs
        .replace(/\s+type="[^"]*"(?=\s|$)/g, "")
        .replace(/\s+disabled(?:="[^"]*")?(?=\s|$)/g, "");
      return `<a${cleanedAttrs} href="${escapedHref}">${inner}</a>`;
    }
  );
}

/**
 * 連結済みドキュメントの最後の </footer> の直前（＝フッター要素内の末尾）に
 * バッジを挿入する。</footer> が見つからない場合は </body> の直前へフォールバックする。
 */
function insertBeforeFooterClose(html: string, badge: string): string {
  if (!badge) return html;
  const footerIdx = html.lastIndexOf("</footer>");
  if (footerIdx !== -1) {
    return html.slice(0, footerIdx) + badge + html.slice(footerIdx);
  }
  const bodyIdx = html.lastIndexOf("</body>");
  if (bodyIdx !== -1) {
    return html.slice(0, bodyIdx) + badge + html.slice(bodyIdx);
  }
  return html + badge;
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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=M+PLUS+Rounded+1c:wght@400;700;800&display=swap"
      rel="stylesheet"
    />
    <!-- ビルド時コンパイル済みCSS（npm run lp:css 生成物）をそのまま埋め込む。CDN不要・オフラインでもフォント以外は崩れない -->
    <style>${lpCss}</style>
  </head>
  <body>
${body}
  </body>
</html>`;
}

/**
 * テンプレ + 回答から書き出し用の1枚HTMLを組み立てる。
 * 1. document.documentElement.lang を "ja" に固定する（デモの言語分岐のため。呼び出し側
 *    （LpBuilder のマウント効果 / テストの beforeEach 等）が lang のライフサイクルを
 *    所有しているため、ここでは固定するだけで退避・復元はしない。書き出し内で
 *    退避/復元まで行うと、書き出し中に画面遷移した場合に呼び出し側の管理と競合し
 *    lang を誤って上書きするレースが生まれるため）
 * 2. 各セクションを実レンダリング（renderToStaticMarkup）→ swapHtml で文言を差し替え
 *    → linkifyCta でCTAボタンをリンク化
 * 3. 連結し、title/meta/OGP(proのみ)/Google Fonts/インラインCSS/バッジ(freeのみ)付きの
 *    1枚HTMLに包む
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

  document.documentElement.lang = "ja";

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
    const swapped = swapHtml(markup, section.swaps, a);
    rendered.push(linkifyCta(swapped, a.ctaLabel, a.ctaHref));
  }

  const doc = wrapDocument(rendered.join("\n"), a, opts.pro);
  const withBadge = insertBeforeFooterClose(doc, opts.pro ? "" : badgeHtml());
  return formatHtml(withBadge);
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
