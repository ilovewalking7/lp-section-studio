import { createElement, type ComponentType } from "react";
import { beforeAll, describe, expect, it } from "vitest";
import { registry } from "@/registry";
import { escapeHtml, swapHtml } from "./swap";
import { clinicTemplate, ryokanTemplate, salonTemplate } from "./templates";
import type { IndustryTemplate } from "./types";
import lpCss from "./lp.css?raw";

/** renderToStaticMarkup の最小型（react-dom/server.browser を遅延ロード） */
type ServerRenderer = { renderToStaticMarkup: (el: unknown) => string };
let server: ServerRenderer;

beforeAll(async () => {
  // デモの言語分岐（document.documentElement.lang === "en" 判定）を日本語側に固定する
  document.documentElement.lang = "ja";
  server = (await import(
    "react-dom/server.browser"
  )) as unknown as ServerRenderer;
});

/**
 * テンプレ1つぶんの契約テスト（仕様§6）:
 * 1. demoId が registry に存在する
 * 2. entry.load() → renderToStaticMarkup した出力に、各 swap.from が出現する
 * 3. swapHtml 適用後: from が残っていない・to の値が含まれる
 * コンポーネントのロード・レンダ結果はテンプレ内でキャッシュし、テストを高速に保つ。
 */
function describeTemplate(t: IndustryTemplate) {
  describe(`${t.id} テンプレ`, () => {
    const renderCache = new Map<string, string>();

    async function renderSection(demoId: string): Promise<string> {
      const cached = renderCache.get(demoId);
      if (cached !== undefined) return cached;
      const entry = registry.find((e) => e.id === demoId);
      if (!entry) {
        throw new Error(`registry に ${demoId} が見つかりません`);
      }
      const Comp: ComponentType = await entry.load();
      const html = server.renderToStaticMarkup(createElement(Comp));
      renderCache.set(demoId, html);
      return html;
    }

    it.each(t.sections.map((s) => [s.demoId, s] as const))(
      "%s: registry に存在し、レンダ結果に全 from が出現する",
      async (demoId, section) => {
        const entry = registry.find((e) => e.id === demoId);
        expect(entry, `${demoId} が registry に無い`).toBeDefined();

        const html = await renderSection(demoId);
        for (const swap of section.swaps) {
          const found =
            html.includes(swap.from) || html.includes(escapeHtml(swap.from));
          expect(
            found,
            `"${swap.from}" が ${demoId} のレンダ結果に見つからない`
          ).toBe(true);
        }
      }
    );

    it.each(t.sections.map((s) => [s.demoId, s] as const))(
      "%s: swapHtml 適用後、from が消え to が入る",
      async (demoId, section) => {
        const html = await renderSection(demoId);
        const out = swapHtml(html, section.swaps, t.defaults);

        for (const swap of section.swaps) {
          const expected = swap.to(t.defaults);
          const escapedExpected = escapeHtml(expected);

          if (expected !== "") {
            expect(
              out,
              `"${expected}" が ${demoId} の置換後に含まれない`
            ).toContain(escapedExpected);
          }

          // to の値が from を部分文字列として含むケース（例: 「ご予約」→「ご予約はこちら」）を
          // 誤検知しないよう、置換後の値を取り除いた残りに from が無いことを確認する
          const remainder = escapedExpected
            ? out.split(escapedExpected).join("")
            : out;
          expect(
            remainder,
            `"${swap.from}" が ${demoId} の置換後にも残っている`
          ).not.toContain(swap.from);
        }
      }
    );
  });
}

describeTemplate(ryokanTemplate);
describeTemplate(salonTemplate);
describeTemplate(clinicTemplate);

/**
 * CSSドリフト契約テスト（仕様E1）:
 * 各テンプレの全セクションをレンダしたHTMLから class 属性のトークンを抽出し、
 * lp.css（npm run lp:css の生成物。src/lp/export.ts が書き出しHTMLへ埋め込む）に
 * 対応するCSSが実在するかを検査する。テンプレへ新しいセクション/デモを追加した際、
 * scripts/build-lp-css.mjs の CONTENT リスト更新と npm run lp:css の再生成を
 * 忘れると、ここで検知できる（ドリフト検知の安全網）。
 */
describe("CSSドリフト契約: lp.css に各テンプレの利用クラスが含まれる", () => {
  // Tailwind はコンパイル時、セレクタ中の特殊文字をバックスラッシュでエスケープする
  // （例: .bg-\[\#b7410e\]）。除去したうえで素朴な文字列一致で判定する。
  const cssNoBackslash = lpCss.replace(/\\/g, "");

  /**
   * lp.css に対応ルールが無いことが正当なトークン（CSSドリフトではない）。
   * - "bg-[#5e6b4f]/12": Tailwind のデフォルト opacity スケール（5,10,20,...）に
   *   含まれない任意の値のため、Tailwind がそもそもルールを生成しない
   *  （BotanicalFeature.tsx 既存の記述。Tailwind CDN 時代から無効だった箇所で、
   *   本パケットのスコープ外のため直さない）。
   * - shadow-[...] / text-[clamp(...)] の任意値はカンマを含み、Tailwind の出力では
   *   カンマが `\2c ` のようなCSS16進エスケープに変換される。ルール自体は実在するが、
   *   単純な「バックスラッシュ除去」だけでは文字列として一致しない。
   */
  const SKIP = new Set([
    "group",
    "peer",
    "bg-[#5e6b4f]/12",
    "shadow-[0_8px_30px_rgba(183,65,14,0.12)]",
    "shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]",
    "shadow-[0_20px_50px_-20px_rgba(63,74,53,0.7)]",
    "text-[clamp(2.75rem,8vw,7rem)]",
  ]);

  /** lucide-react のアイコンに自動付与される "lucide"/"lucide-<name>" はライブラリ側の
   *  マーカークラスで Tailwind ユーティリティではないため、CSSが存在しなくて正当。 */
  const isIgnorable = (tok: string) =>
    tok === "lucide" || tok.startsWith("lucide-") || SKIP.has(tok);

  async function collectClassTokens(t: IndustryTemplate): Promise<Set<string>> {
    const tokens = new Set<string>();
    for (const section of t.sections) {
      const entry = registry.find((e) => e.id === section.demoId);
      if (!entry) continue;
      const Comp: ComponentType = await entry.load();
      const html = server.renderToStaticMarkup(createElement(Comp));
      const classRe = /class="([^"]*)"/g;
      let m: RegExpExecArray | null;
      while ((m = classRe.exec(html))) {
        // renderToStaticMarkup は class 属性値中の "&" を "&amp;" にエスケープするため戻す
        for (const tok of m[1].replace(/&amp;/g, "&").split(/\s+/).filter(Boolean)) {
          tokens.add(tok);
        }
      }
    }
    return tokens;
  }

  it.each([
    ["ryokan", ryokanTemplate],
    ["salon", salonTemplate],
    ["clinic", clinicTemplate],
  ] as const)(
    "%s: 使用クラスがすべて lp.css に含まれる",
    async (_name, t) => {
      const tokens = await collectClassTokens(t);
      const missing = [...tokens].filter(
        (tok) => !isIgnorable(tok) && !cssNoBackslash.includes(tok)
      );
      expect(
        missing,
        `lp.css に見つからないクラスがあります: ${missing.join(
          ", "
        )}。npm run lp:css を実行して再生成せよ`
      ).toEqual([]);
    }
  );
});
