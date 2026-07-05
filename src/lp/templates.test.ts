import { createElement, type ComponentType } from "react";
import { beforeAll, describe, expect, it } from "vitest";
import { registry } from "@/registry";
import { escapeHtml, swapHtml } from "./swap";
import { clinicTemplate, ryokanTemplate, salonTemplate } from "./templates";
import type { IndustryTemplate } from "./types";

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
