import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routeFromPath } from "@/App";
import LpBuilder, { PreviewErrorBoundary } from "./LpBuilder";
import { buildLpDocument } from "./export";
import { encodeShare, decodeShare, type ShareState } from "./share";
import { FREE_MONTHLY_EXPORT_LIMIT, incMonthExports } from "./lpPlan";
import { clinicTemplate, ryokanTemplate, salonTemplate } from "./templates";
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
        <LpBuilder onHome={() => {}} onPricing={() => {}} />
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
    expect(html).not.toContain("cdn.tailwindcss.com");
  });

  it("pro: バッジなし・OGPあり", async () => {
    const html = await buildLpDocument(ryokanTemplate, customAnswers, {
      pro: true,
    });
    expect(html).toContain("潮騒の宿かもめ");
    expect(html).not.toContain("月白の宿");
    expect(html).not.toContain("Made with ミセテLP");
    expect(html).toContain("og:title");
    expect(html).not.toContain("cdn.tailwindcss.com");
  });

  it("Tailwind CDN非依存: コンパイル済みCSSがインライン埋め込み・Google Fontsのlinkあり", async () => {
    const html = await buildLpDocument(ryokanTemplate, customAnswers, {
      pro: false,
    });
    expect(html).not.toContain("cdn.tailwindcss.com");
    expect(html).toContain("fonts.googleapis.com");
    // CSSはセレクタのエスケープ（例: .gap-1\.5）でバックスラッシュを含むため、
    // 除去してから存在確認する（font-mincho 自体には特殊文字が無く影響は受けない）。
    expect(html.replace(/\\/g, "")).toContain("font-mincho");
  });

  it("バッジはフッター要素の内側（</footer>の直前）に挿入される", async () => {
    const html = await buildLpDocument(ryokanTemplate, customAnswers, {
      pro: false,
    });
    const madeWithIdx = html.indexOf("Made with");
    const lastFooterOpenIdx = html.lastIndexOf("<footer");
    const lastFooterCloseIdx = html.lastIndexOf("</footer>");
    expect(madeWithIdx).toBeGreaterThan(-1);
    expect(lastFooterOpenIdx).toBeGreaterThan(-1);
    expect(madeWithIdx).toBeGreaterThan(lastFooterOpenIdx);
    expect(madeWithIdx).toBeLessThan(lastFooterCloseIdx);
  });

  it("CTAリンク化: ctaHref が tel: のとき <a href=\"tel:...\"> に変換され、ボタンは残らない", async () => {
    const answers: LpAnswers = { ...customAnswers, ctaHref: "tel:0460-00-0000" };
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: false });
    expect(html).toContain("<a");
    expect(html).toContain('href="tel:0460-00-0000"');
    // ctaLabel を内包する <button>...</button> が1件も残っていないこと（ボタン単位で判定。
    // 単純な非貪欲マッチを文書全体に掛けると別々のボタンをまたいで誤マッチしうるため）
    const buttonInners = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map(
      (m) => m[1]
    );
    expect(buttonInners.some((inner) => inner.includes("ご予約はこちら"))).toBe(
      false
    );
  });

  it("CTAリンク化: ctaHref が不許可スキーム(javascript:)のときは変換しない", async () => {
    const answers: LpAnswers = {
      ...customAnswers,
      ctaHref: "javascript:alert(1)",
    };
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: false });
    expect(html).not.toContain("javascript:");
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

describe("PreviewErrorBoundary", () => {
  /** LpPreview に見立てた、必ず例外を投げるダミーコンポーネント。 */
  function Boom() {
    throw new Error("プレビュー描画の模擬エラー");
  }

  it("子要素が例外を投げるとフォールバックUIを表示し、ボタンでonResetを呼ぶ", () => {
    const onReset = vi.fn();
    // React はエラーバウンダリで捕捉した例外も開発モードでconsole.errorへ出力するため、
    // このテストの意図（フォールバック表示の確認）に無関係なノイズとして抑制する。
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const { getByText, getByRole } = render(
        <PreviewErrorBoundary onReset={onReset}>
          <Boom />
        </PreviewErrorBoundary>
      );

      getByText(
        "プレビューの表示に失敗しました。入力に戻ってやり直してください。"
      );
      fireEvent.click(getByRole("button", { name: "入力に戻る" }));
      expect(onReset).toHaveBeenCalledTimes(1);
    } finally {
      errorSpy.mockRestore();
    }
  });
});

describe("書き出しHTML: 暖簾ナビの屋号は書き出し専用のrawSwapsで店名に置き換わる", () => {
  it("「奥山亭」「OKUYAMA TEI」が残らず、店名の文字数ぶんの屋号divが入る", async () => {
    const answers: LpAnswers = {
      ...ryokanTemplate.defaults,
      shopName: "潮騒の宿かもめ",
    };
    const html = await buildLpDocument(ryokanTemplate, answers, {
      pro: false,
    });

    expect(html).not.toContain("奥山亭");
    expect(html).not.toContain("OKUYAMA TEI");

    for (const ch of [...answers.shopName.replace(/\s+/g, "")]) {
      const re = new RegExp(
        `<span class="font-mincho text-xl tracking-widest text-\\[#f5f1e8\\]">\\s*${ch}\\s*</span>`
      );
      expect(html, `"${ch}" の屋号divが見つからない`).toMatch(re);
    }
  });
});

describe("書き出しHTML: テストモニアルの架空人名は含まれない", () => {
  it("旅館/サロン/クリニックいずれのテンプレの書き出しにもデモの架空人名が残らない", async () => {
    const ryokanHtml = await buildLpDocument(
      ryokanTemplate,
      ryokanTemplate.defaults,
      { pro: false }
    );
    expect(ryokanHtml).not.toContain("高瀬 美和 様");

    const salonHtml = await buildLpDocument(
      salonTemplate,
      salonTemplate.defaults,
      { pro: false }
    );
    expect(salonHtml).not.toContain("三浦 美咲");

    const clinicHtml = await buildLpDocument(
      clinicTemplate,
      clinicTemplate.defaults,
      { pro: false }
    );
    expect(clinicHtml).not.toContain("三宅 玲奈");
  });
});

describe("書き出しHTML: クリニックテンプレのCTA（<a href=\"#\">）もリンク化される", () => {
  it("ctaHref が <a> の href に反映され、href=\"#\" のダミーリンクが残らない", async () => {
    const answers: LpAnswers = {
      ...clinicTemplate.defaults,
      ctaHref: "tel:03-1234-5678",
    };
    const html = await buildLpDocument(clinicTemplate, answers, {
      pro: false,
    });

    expect(html).toContain('href="tel:03-1234-5678"');

    const anchorMatches = [...html.matchAll(/<a([^>]*)>([\s\S]*?)<\/a>/g)];
    const deadCtaRemains = anchorMatches.some(
      ([, attrs, inner]) =>
        attrs.includes('href="#"') && inner.includes(answers.ctaLabel)
    );
    expect(deadCtaRemains).toBe(false);
  });
});
