import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { routeFromPath } from "@/App";
import LpBuilder from "./LpBuilder";
import { buildLpDocument } from "./export";
import { encodeShare, decodeShare, type ShareState } from "./share";
import { FREE_MONTHLY_EXPORT_LIMIT, incMonthExports } from "./lpPlan";
import { ryokanTemplate, salonTemplate } from "./templates";
import type { LpAnswers } from "./types";

/**
 * ミセテLP の統合テスト（仕様§13）。
 * ウィザードUIの実レンダリング・書き出しHTMLの中身・共有URL往復・
 * ルーティング・クォータ枯渇時のUI挙動を確認する。
 */

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "";
});
afterEach(() => cleanup());

/** console.error/warn を捕捉する（pages.smoke.test.tsx と同じ方式）。 */
function withCapture(fn: () => void): string[] {
  const origErr = console.error;
  const origWarn = console.warn;
  const issues: string[] = [];
  const capture = (...args: unknown[]) =>
    issues.push(args.map((a) => (typeof a === "string" ? a : String(a))).join(" "));
  console.error = capture;
  console.warn = capture;
  try {
    fn();
  } finally {
    console.error = origErr;
    console.warn = origWarn;
  }
  return issues;
}

describe("LpBuilder が例外・警告なくレンダリングできる", () => {
  it("業種選択 → 旅館カードclick → フォーム画面へ遷移", () => {
    const issues = withCapture(() => {
      const { getByRole, getByText, unmount } = render(
        <LpBuilder plan="free" onHome={() => {}} onPricing={() => {}} />
      );

      // ① 業種選択画面
      getByText("業種を選んでください");

      // 旅館カードをクリック（Card は role="button" で描画される）
      const ryokanCard = getByRole("button", { name: /旅館・民宿/ });
      fireEvent.click(ryokanCard);

      // ② 質問フォーム画面へ遷移していること
      getByText("LPの内容を入力してください");

      unmount();
    });
    expect(issues, issues.join("\n---\n")).toEqual([]);
  });
});

describe("buildLpDocument", () => {
  const customAnswers: LpAnswers = {
    ...ryokanTemplate.defaults,
    shopName: "潮騒の宿かもめ",
    tagline: "波音を聞きながら過ごす、静かな休日",
  };

  it("free: ユーザー店名を含み・デモの初期文言は残らず・バッジあり・OGPなし", async () => {
    const html = await buildLpDocument(ryokanTemplate, customAnswers, {
      pro: false,
    });
    expect(html).toContain("潮騒の宿かもめ");
    expect(html).not.toContain("月白の宿");
    expect(html).toContain("Made with ミセテLP");
    expect(html).not.toContain("og:title");
    expect(html).toContain("cdn.tailwindcss.com");
  });

  it("pro: バッジなし・OGPあり", async () => {
    const html = await buildLpDocument(ryokanTemplate, customAnswers, {
      pro: true,
    });
    expect(html).toContain("潮騒の宿かもめ");
    expect(html).not.toContain("月白の宿");
    expect(html).not.toContain("Made with ミセテLP");
    expect(html).toContain("og:title");
    expect(html).toContain("cdn.tailwindcss.com");
  });
});

describe("routeFromPath", () => {
  it('("/lp") === "lp"', () => {
    expect(routeFromPath("/lp")).toBe("lp");
  });
});

describe("共有: encodeShare/decodeShare 往復（ShareState経由・テンプレid込み）", () => {
  it("salonテンプレのShareState（テンプレid + LpAnswers全フィールド）を往復できる", () => {
    const state: ShareState = { t: salonTemplate.id, a: salonTemplate.defaults };
    const decoded = decodeShare(encodeShare(state));

    expect(decoded).not.toBeNull();
    expect(decoded?.t).toBe(salonTemplate.id);

    const a = decoded!.a;
    const expected = salonTemplate.defaults;
    expect(a.shopName).toBe(expected.shopName);
    expect(a.area).toBe(expected.area);
    expect(a.tagline).toBe(expected.tagline);
    expect(a.intro).toBe(expected.intro);
    expect(a.features).toEqual(expected.features);
    expect(a.plans).toEqual(expected.plans);
    expect(a.phone).toBe(expected.phone);
    expect(a.address).toBe(expected.address);
    expect(a.hours).toBe(expected.hours);
    expect(a.ctaLabel).toBe(expected.ctaLabel);
    expect(a.ctaHref).toBe(expected.ctaHref);
  });
});

describe("クォータ枯渇時のUI挙動", () => {
  it("月次上限に達した状態で共有URL復元 → 書き出しステップで上限表示が出る", () => {
    // Free プランの上限まで書き出し済みにしておく
    for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT; i++) incMonthExports();

    // 共有URL経由でプレビュー画面（ステップ3）から起動させる
    const encoded = encodeShare({ t: ryokanTemplate.id, a: ryokanTemplate.defaults });
    window.location.hash = `#c=${encoded}`;

    const { getByRole, getByText } = render(
      <LpBuilder plan="free" onHome={() => {}} onPricing={() => {}} />
    );

    // ③ プレビュー画面から④ 書き出し・共有画面へ
    // （このボタンは Suspense 配下ではなく常時レンダリングされているため、
    //   プレビューの遅延ロード完了を待たずに押せる）
    fireEvent.click(getByRole("button", { name: /書き出し・共有へ/ }));

    getByText(`今月の書き出し上限（${FREE_MONTHLY_EXPORT_LIMIT}回）に達しました。`);
  });
});
