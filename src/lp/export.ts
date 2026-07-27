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
import PhotoShowcase from "./sections/PhotoShowcase";
import type { IndustryTemplate, LpAnswers, RawSwap, SectionSlot } from "./types";
import lpCss from "./lp.css?raw";

/** renderToStaticMarkup の最小型（react-dom/server.browser を遅延ロード） */
type ServerRenderer = { renderToStaticMarkup: (el: unknown) => string };

/**
 * 実際に描画する1項目。既存デモのセクション（demo）と、ミセテLP独自の
 * 写真セクション（photos = PhotoShowcase）を判別可能な形で並べる。
 */
export type LpRenderItem =
  | { kind: "demo"; slot: SectionSlot }
  | { kind: "photos" };

/**
 * テンプレ + 回答から「実際に描画する項目の並び」を組み立てる純関数。
 * プレビュー（LpPreview）と書き出し（buildLpDocument）の両方がこれを使い、
 * 並び順・表示ON/OFFの判定を一箇所に集約する（二重実装の防止）。
 *
 * - hiddenSections に id が含まれるセクションは除外する
 * - 写真セクションは photoSection.afterSectionId のセクションの直後に挿入する。
 *   該当セクションが（非表示等で）並びに無い場合は末尾へ回す
 * - 写真が0枚のとき、および hiddenSections に photoSection.id が含まれるときは
 *   写真セクションを挿入しない
 */
export function buildRenderPlan(
  t: IndustryTemplate,
  a: LpAnswers
): LpRenderItem[] {
  const hidden = new Set(a.hiddenSections);
  const items: LpRenderItem[] = t.sections
    .filter((slot) => !hidden.has(slot.id))
    .map((slot) => ({ kind: "demo", slot }));

  const showPhotos = a.photos.length > 0 && !hidden.has(t.photoSection.id);
  if (!showPhotos) return items;

  const anchor = items.findIndex(
    (item) =>
      item.kind === "demo" && item.slot.id === t.photoSection.afterSectionId
  );
  if (anchor === -1) items.push({ kind: "photos" });
  else items.splice(anchor + 1, 0, { kind: "photos" });
  return items;
}

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
 * スワップ適用後のセクションHTMLに対し、rawSwaps（HTML断片ごとの完全一致置換）を順に適用する。
 * SectionSlot.rawSwaps が無いセクションはそのまま返す。全出現を置換する（split/join）。
 * プレビュー（SwapBoundary）はテキストノード単位でしか置換できないため、rawSwaps は
 * この書き出しパスでのみ適用される既知の制約がある（docs/LP-BUILDER.md参照）。
 */
export function applyRawSwaps(
  html: string,
  rawSwaps: RawSwap[] | undefined,
  a: LpAnswers
): string {
  if (!rawSwaps || rawSwaps.length === 0) return html;
  let out = html;
  for (const raw of rawSwaps) {
    out = out.split(raw.fromHtml).join(raw.toHtml(a));
  }
  return out;
}

/**
 * スワップ適用後のセクションHTMLに対し、CTAボタンをリンク化する後処理。
 * inner に（エスケープ済み）ctaLabel を含む `<button ...>...</button>` を
 * `<a ...href="ctaHref"...>...</a>` に変換する（属性は維持しつつ type/disabled は除去）。
 * また、同じく inner にctaLabelを含む `<a ...href="#"...>...</a>`（クリニックテンプレの
 * ミニマル系デモのようにCTAが元々 <button> ではなく "#" のダミーリンクの場合）の
 * href="#" だけを ctaHref に書き換える（既に "#" 以外の実リンク先を持つ <a> は対象外）。
 * ctaHref が許可スキーム（tel:/mailto:/https:/http:/#）でない・空文字の場合は変換しない。
 */
export function linkifyCta(html: string, ctaLabel: string, ctaHref: string): string {
  if (!ALLOWED_CTA_HREF_RE.test(ctaHref)) return html;
  const escapedLabel = escapeHtml(ctaLabel);
  const escapedHref = escapeHtml(ctaHref);
  const withButtons = html.replace(
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
  return withButtons.replace(
    /<a([^>]*)>([\s\S]*?)<\/a>/g,
    (match, attrs: string, inner: string) => {
      if (!inner.includes(escapedLabel)) return match;
      if (!attrs.includes('href="#"')) return match;
      const nextAttrs = attrs.replace('href="#"', `href="${escapedHref}"`);
      return `<a${nextAttrs}>${inner}</a>`;
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

/** JSON-LD（schema.org LocalBusiness 系）の最小構造。空の項目は出力しない */
interface JsonLdDoc {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  telephone?: string;
  address?: { "@type": "PostalAddress"; streetAddress: string };
  openingHours?: string;
  areaServed?: string;
}

/** #rrggbb 形式のブランドカラーだけを通す（HTML属性・SVGへ差し込むため）。不正値は黒 */
function safeAccent(hex: string): string {
  return /^#[0-9a-fA-F]{3,8}$/.test(hex) ? hex : "#111111";
}

/**
 * 構造化データ（JSON-LD）を <script type="application/ld+json"> として組み立てる。
 * 検索結果に営業時間・電話・住所を出すため、利用者の回答をそのまま schema.org へ写す。
 *
 * セキュリティ: JSON.stringify の結果に利用者入力の "</script>" が含まれると
 * script要素がそこで閉じてしまい任意のHTML（＝XSS）を注入できてしまう。
 * `<` `>` `&` を \uXXXX へエスケープして閉じタグ注入を防ぐ（JSONとしては等価）。
 */
function jsonLdHtml(t: IndustryTemplate, a: LpAnswers): string {
  const doc: JsonLdDoc = {
    "@context": "https://schema.org",
    "@type": t.schemaType,
    name: a.shopName,
  };
  if (a.intro) doc.description = a.intro;
  if (a.phone) doc.telephone = a.phone;
  if (a.address) {
    doc.address = { "@type": "PostalAddress", streetAddress: a.address };
  }
  if (a.hours) doc.openingHours = a.hours;
  if (a.area) doc.areaServed = a.area;
  // image は意図的に入れない。写真は data URI で本文に埋め込まれており、検索エンジンの
  // クローラは data URI を画像URLとして解決できない（リッチリザルトに使われない）。
  // 一方 JSON-LD に入れると同じ数百KBがHTMLに二重に載るだけなので、容量だけが増える。

  const json = JSON.stringify(doc)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
  return `<script type="application/ld+json">${json}</script>`;
}

/**
 * 店名の先頭1文字をブランドカラーの角丸タイルに描いた favicon（SVG data URI）。
 * 外部ファイル無しで完結させるため、SVGをURLエンコードして href に直接埋め込む。
 * 文字は利用者入力なのでXMLエスケープしてから差し込む。
 */
function faviconHref(t: IndustryTemplate, a: LpAnswers): string {
  const initial = escapeHtml([...a.shopName.trim()][0] ?? "L");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" rx="14" fill="${safeAccent(t.accentHex)}"/>` +
    `<text x="32" y="44" text-anchor="middle" font-family="sans-serif" font-size="38" fill="#ffffff">${initial}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** <html>...</html> の完結ドキュメントに包む */
function wrapDocument(
  body: string,
  t: IndustryTemplate,
  a: LpAnswers,
  pro: boolean
): string {
  const title = `${a.shopName}｜${a.tagline}`;
  // og:image は出力しない。写真は data URI で本文に埋め込まれているが、SNSのクローラは
  // data URI を取得できずサムネイルにできないため、数百KBを二重に載せるだけになる。
  // （公開URL上の実画像を指せるようになるホスト型公開＝M2で対応する）
  const ogp = pro
    ? `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(a.intro)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(a.shopName)}" />
    <meta property="og:locale" content="ja_JP" />`
    : "";
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(a.intro)}" />${ogp}
    <meta name="theme-color" content="${escapeHtml(safeAccent(t.accentHex))}" />
    <link rel="icon" type="image/svg+xml" href="${faviconHref(t, a)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=M+PLUS+Rounded+1c:wght@400;700;800&display=swap"
      rel="stylesheet"
    />
    ${jsonLdHtml(t, a)}
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
 * 2. buildRenderPlan の並び（非表示セクションを除外し、写真セクションを差し込んだもの）に
 *    従って各項目を実レンダリング（renderToStaticMarkup）
 *    - デモのセクション: swapHtml で文言を差し替え → applyRawSwaps で書き出し専用の
 *      生HTML置換（rawSwaps）を適用 → linkifyCta でCTAボタンをリンク化
 *    - 写真セクション: PhotoShowcase を回答の写真で描画するだけ（内容は利用者入力そのもので
 *      デモの素文言を含まないため、swap/rawSwap/linkifyCta は適用しない）
 * 3. 連結し、title/meta/JSON-LD/favicon/theme-color/OGP(proのみ)/Google Fonts/
 *    インラインCSS/バッジ(freeのみ)付きの1枚HTMLに包む
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
  for (const item of buildRenderPlan(t, a)) {
    if (item.kind === "photos") {
      rendered.push(
        server.renderToStaticMarkup(
          createElement(PhotoShowcase, {
            photos: a.photos,
            theme: t.photoSection.theme,
            eyebrow: t.photoSection.eyebrow,
            heading: t.photoSection.heading,
          })
        )
      );
      continue;
    }
    const section = item.slot;
    const entry = registry.find((e) => e.id === section.demoId);
    if (!entry) {
      throw new Error(
        `registry にセクション "${section.demoId}" が見つかりません（npm run manifest を確認）`
      );
    }
    const Comp = await entry.load();
    const markup = server.renderToStaticMarkup(createElement(Comp));
    const swapped = swapHtml(markup, section.swaps, a);
    const rawApplied = applyRawSwaps(swapped, section.rawSwaps, a);
    rendered.push(linkifyCta(rawApplied, a.ctaLabel, a.ctaHref));
  }

  const doc = wrapDocument(rendered.join("\n"), t, a, opts.pro);
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
