import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routeFromPath } from "@/App";
import LpBuilder, { PreviewErrorBoundary } from "./LpBuilder";
import { buildLpDocument } from "./export";
import { fileToCompressedDataUrl } from "./photo";
import { encodeShare, decodeShare, loadDraft, type ShareState } from "./share";
import { FREE_MONTHLY_EXPORT_LIMIT, incMonthExports } from "./lpPlan";
import {
  LP_TEMPLATES,
  clinicTemplate,
  ryokanTemplate,
  salonTemplate,
} from "./templates";
import type { LpAnswers } from "./types";

/**
 * ミセテLP の統合テスト（仕様§13）。
 * ウィザードUIの実レンダリング・書き出しHTMLの中身・共有URL往復・
 * ルーティング・クォータ枯渇時のUI挙動を確認する。
 */

// 写真の圧縮は canvas を使うため jsdom では動かない。取り込み後のUI（サムネイル・
// 説明入力）を確認したいので、圧縮処理だけをスタブする（他のエクスポートは実物のまま）。
vi.mock("./photo", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./photo")>();
  return {
    ...actual,
    fileToCompressedDataUrl: vi.fn(
      async () => "data:image/jpeg;base64,/9j/4AAQSkZJRg=="
    ),
  };
});

/** 自動保存のデバウンス（LpBuilder の DRAFT_DEBOUNCE_MS）より確実に長い待ち時間 */
const DRAFT_WAIT_MS = 2000;

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

      // 旅館カードをクリック（業種カードは実 <button>）
      const ryokanCard = getByRole("button", { name: /旅館・民宿/ });
      fireEvent.click(ryokanCard);

      // ② 質問フォーム画面へ遷移していること
      getByText("LPの内容を入力してください");

      unmount();
    });
    expect(issues, issues.join("\n---\n")).toEqual([]);
  });
});

describe("ステップ1（業種選択）", () => {
  it("価値訴求の見出しと、テンプレートの数だけ業種ボタンが出る", () => {
    const { getByRole, getAllByRole } = render(
      <LpBuilder onHome={() => {}} onPricing={() => {}} />
    );

    // 見出しは日本語の折り返し制御のため文節ごとに span で分けてある。
    // 分割位置の変更でテストが壊れないよう、空白を無視して一致を見る。
    getByRole("heading", {
      name: /質問に答えるだけで、\s*プロ品質のLPが完成。/,
    });
    // 「① 業種を選ぶ → ② 質問に答える → ③ HTMLを書き出す」の説明も出ている
    getByRole("heading", {
      name: "① 業種を選ぶ → ② 質問に答える → ③ HTMLを書き出す",
    });

    const cards = getAllByRole("button", { name: /このテンプレートで作る/ });
    expect(cards).toHaveLength(LP_TEMPLATES.length);
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("業種ボタンは実 <button> で、フォーカスして選択できる（キーボード操作可）", () => {
    const { getByRole, getByText } = render(
      <LpBuilder onHome={() => {}} onPricing={() => {}} />
    );

    const ryokan = getByRole("button", { name: /旅館・民宿/ });
    // div+role="button" ではなくネイティブの button（= Enter/Space で発火する）
    expect(ryokan.tagName).toBe("BUTTON");
    expect(ryokan.getAttribute("role")).toBeNull();

    // タブ移動でたどり着ける（tabindex 付きの div ではない）
    (ryokan as HTMLButtonElement).focus();
    expect(document.activeElement).toBe(ryokan);

    // フォーカスしたまま押せば次のステップへ進む
    fireEvent.click(document.activeElement as HTMLElement);
    getByText("LPの内容を入力してください");
  });
});

/** ①業種選択でテンプレを選び、②入力フォームまで進める */
function renderFormStep() {
  const view = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);
  fireEvent.click(view.getByRole("button", { name: /旅館・民宿/ }));
  view.getByText("LPの内容を入力してください");
  return view;
}

describe("ステップ2（内容入力）", () => {
  it("お客様の声の入力欄が testimonialSlots の件数だけ出る", () => {
    const { getAllByLabelText } = renderFormStep();

    // 旅館テンプレの証言デモは1件構成（templates.ts の testimonialSlots）
    expect(getAllByLabelText("見出し")).toHaveLength(
      ryokanTemplate.testimonialSlots
    );
    expect(getAllByLabelText("本文")).toHaveLength(
      ryokanTemplate.testimonialSlots
    );
    expect(getAllByLabelText("お名前")).toHaveLength(
      ryokanTemplate.testimonialSlots
    );
    expect(
      getAllByLabelText("補足（地域・利用シーンなど）")
    ).toHaveLength(ryokanTemplate.testimonialSlots);
  });

  it("セクションのON/OFFで hiddenSections が更新される", () => {
    vi.useFakeTimers();
    try {
      const { getByRole } = renderFormStep();

      // 任意セクション（optional: true）だけがトグルできる
      const optional = ryokanTemplate.sections.filter((s) => s.optional);
      expect(optional.length).toBeGreaterThan(0);
      const target = optional[0];

      const toggle = getByRole("switch", { name: target.label });
      expect(toggle.getAttribute("aria-checked")).toBe("true");

      fireEvent.click(toggle);
      expect(toggle.getAttribute("aria-checked")).toBe("false");

      // 自動保存されたドラフト経由で、実際に hiddenSections が更新されたことを確認する
      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });
      expect(loadDraft()?.a.hiddenSections).toContain(target.id);

      // 戻すと hiddenSections から消える
      fireEvent.click(toggle);
      expect(toggle.getAttribute("aria-checked")).toBe("true");
      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });
      expect(loadDraft()?.a.hiddenSections).not.toContain(target.id);
    } finally {
      vi.useRealTimers();
    }
  });

  it("写真が0枚のときは写真セクションのトグルが無効", () => {
    const { getByRole, getByText } = renderFormStep();
    const photos = getByRole("switch", {
      name: ryokanTemplate.photoSection.label,
    });
    expect((photos as HTMLButtonElement).disabled).toBe(true);
    getByText("写真を追加すると表示できます");
  });

  it("写真を選ぶとサムネイルと説明（alt）入力が出る", async () => {
    const { getByLabelText, findAllByLabelText, getByAltText } =
      renderFormStep();

    const input = getByLabelText("写真を選ぶ") as HTMLInputElement;
    const file = new File(["dummy"], "onsen.jpg", { type: "image/jpeg" });
    // jsdom では input.files に直接代入できないため、プロパティを差し替えて change を起こす
    Object.defineProperty(input, "files", {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    const altInputs = await findAllByLabelText(/写真の説明/);
    expect(altInputs).toHaveLength(1);

    // 説明が空のうちは装飾画像扱いにせず、入力を促す代替テキストを出す
    getByAltText("説明が未入力の写真");

    fireEvent.change(altInputs[0], { target: { value: "露天風呂" } });
    getByAltText("露天風呂");
  });
});

describe("写真の取り込み（圧縮中の編集が巻き戻らない）", () => {
  const compress = vi.mocked(fileToCompressedDataUrl);

  /** 隠し <input type="file"> にファイルを流し込む（jsdom では files に代入できない） */
  function selectPhoto(input: HTMLInputElement, name: string) {
    Object.defineProperty(input, "files", {
      value: [new File(["dummy"], name, { type: "image/jpeg" })],
      configurable: true,
    });
    fireEvent.change(input);
  }

  it("圧縮中は一覧の編集・削除・並べ替えを止め、完了時に直前の編集を巻き戻さない", async () => {
    const view = renderFormStep();
    const input = view.getByLabelText("写真を選ぶ") as HTMLInputElement;

    // 先に2枚取り込む（並べ替えボタンが「busy 以外の理由」では無効にならない状態を作る）
    selectPhoto(input, "one.jpg");
    await waitFor(() =>
      expect(view.getAllByLabelText(/写真の説明/)).toHaveLength(1)
    );
    selectPhoto(input, "two.jpg");
    await waitFor(() =>
      expect(view.getAllByLabelText(/写真の説明/)).toHaveLength(2)
    );

    const firstAlt = view.getByLabelText(
      "1枚目の写真の説明（例: 露天風呂）"
    ) as HTMLInputElement;
    fireEvent.change(firstAlt, { target: { value: "露天風呂" } });
    view.getByAltText("露天風呂");

    // 3枚目の圧縮を保留させ、「圧縮しています…」の最中を作る
    let release: (dataUrl: string) => void = () => {};
    compress.mockImplementationOnce(
      () =>
        new Promise<string>((resolve) => {
          release = resolve;
        })
    );
    selectPhoto(input, "three.jpg");
    await view.findByText("圧縮しています…");

    // ① UI層: 圧縮中は編集・削除・並べ替えを受け付けない
    expect(firstAlt.disabled).toBe(true);
    expect(
      (view.getByRole("button", { name: "1枚目の写真を削除" }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
    expect(
      (
        view.getByRole("button", {
          name: "1枚目の写真を後ろへ移動",
        }) as HTMLButtonElement
      ).disabled
    ).toBe(true);

    // ② state層: それでも更新は関数更新形（＝開始時点の配列で上書きしない）であること。
    //    実ブラウザでは上の disabled で止まるが、React は disabled な input にも
    //    プログラム的な change を届けるため、ここで巻き戻りの有無を直接検証できる。
    fireEvent.change(firstAlt, { target: { value: "貸切風呂" } });

    act(() => {
      release("data:image/jpeg;base64,/9j/4AAQSkZJRg==");
    });
    await waitFor(() =>
      expect(view.getAllByLabelText(/写真の説明/)).toHaveLength(3)
    );

    // 圧縮中に行った編集が、完了時の追記で巻き戻っていないこと
    expect(
      (
        view.getByLabelText(
          "1枚目の写真の説明（例: 露天風呂）"
        ) as HTMLInputElement
      ).value
    ).toBe("貸切風呂");
    view.getByAltText("貸切風呂");
  });

  it("圧縮が終われば編集・削除の操作が戻る（ロックされたままにならない）", async () => {
    const view = renderFormStep();
    const input = view.getByLabelText("写真を選ぶ") as HTMLInputElement;

    let release: (dataUrl: string) => void = () => {};
    compress.mockImplementationOnce(
      () =>
        new Promise<string>((resolve) => {
          release = resolve;
        })
    );
    selectPhoto(input, "one.jpg");
    await view.findByText("圧縮しています…");

    act(() => {
      release("data:image/jpeg;base64,/9j/4AAQSkZJRg==");
    });
    await waitFor(() =>
      expect(view.getAllByLabelText(/写真の説明/)).toHaveLength(1)
    );

    expect(
      (
        view.getByLabelText(
          "1枚目の写真の説明（例: 露天風呂）"
        ) as HTMLInputElement
      ).disabled
    ).toBe(false);
    const remove = view.getByRole("button", {
      name: "1枚目の写真を削除",
    }) as HTMLButtonElement;
    expect(remove.disabled).toBe(false);
    fireEvent.click(remove);
    expect(view.queryAllByLabelText(/写真の説明/)).toHaveLength(0);
  });
});

describe("自動保存（ドラフト）", () => {
  it("回答を変更すると保存され、開き直すと再開の選択肢が出る", () => {
    vi.useFakeTimers();
    try {
      const first = renderFormStep();
      fireEvent.change(first.getByLabelText("店名・屋号"), {
        target: { value: "潮騒の宿かもめ" },
      });

      // デバウンス前は保存されていない
      expect(loadDraft()?.a.shopName).not.toBe("潮騒の宿かもめ");

      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });
      expect(loadDraft()?.a.shopName).toBe("潮騒の宿かもめ");
      first.getByText("自動保存しました");
      first.unmount();

      // 開き直すと、勝手に復元せず再開するかを尋ねる
      const second = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);
      second.getByText("前回の続きから再開しますか？");

      fireEvent.click(second.getByRole("button", { name: "続きから再開する" }));
      expect(
        (second.getByLabelText("店名・屋号") as HTMLInputElement).value
      ).toBe("潮騒の宿かもめ");
    } finally {
      vi.useRealTimers();
    }
  });

  it("「新規で始める」でドラフトを破棄する", () => {
    vi.useFakeTimers();
    try {
      const first = renderFormStep();
      fireEvent.change(first.getByLabelText("店名・屋号"), {
        target: { value: "捨てる宿" },
      });
      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });
      first.unmount();

      const second = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);
      fireEvent.click(second.getByRole("button", { name: "新規で始める" }));
      expect(loadDraft()).toBeNull();
      expect(second.queryByText("前回の続きから再開しますか？")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
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

/**
 * 共有URL経由でプレビュー（ステップ3）から起動し、④書き出し・共有画面まで進める。
 * （スティッキーなツールバーの「書き出しへ」は Suspense 配下ではなく常時
 *   レンダリングされているため、プレビューの遅延ロード完了を待たずに押せる）
 */
function renderExportStep() {
  const encoded = encodeShare({
    t: ryokanTemplate.id,
    a: ryokanTemplate.defaults,
  });
  window.location.hash = `#c=${encoded}`;
  const view = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);
  fireEvent.click(view.getByRole("button", { name: /書き出しへ/ }));
  return view;
}

describe("クォータ枯渇時のUI挙動", () => {
  /** jsdom に navigator.clipboard は無いため差し替える */
  function stubClipboard() {
    const clipboard = { writeText: vi.fn(async () => {}) };
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: clipboard,
    });
    return clipboard;
  }

  it("月次上限に達した状態で共有URL復元 → 書き出しステップで上限表示が出る", () => {
    // Free プランの上限まで書き出し済みにしておく
    for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT; i++) incMonthExports();

    const { getByText } = renderExportStep();

    getByText(`今月の書き出し上限（${FREE_MONTHLY_EXPORT_LIMIT}回）に達しました。`);
  });

  it("上限に達したら「HTMLをコピー」も実行できない（ダウンロードの上限を迂回できない）", () => {
    const clipboard = stubClipboard();
    for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT; i++) incMonthExports();

    const { getByRole, getByText } = renderExportStep();

    const copy = getByRole("button", {
      name: "HTMLをコピー",
    }) as HTMLButtonElement;
    expect(copy.disabled).toBe(true);
    // 念のため押しても成果物は渡らない（ハンドラ側でも上限を判定している）
    fireEvent.click(copy);
    expect(clipboard.writeText).not.toHaveBeenCalled();
    getByText(/HTMLのコピーもできません/);
  });

  it("「HTMLをコピー」でも書き出し回数を消費する", async () => {
    const clipboard = stubClipboard();
    // 残り1回の状態にする
    for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT - 1; i++) incMonthExports();

    const { getByRole, getByText, findByText } = renderExportStep();
    const copy = getByRole("button", {
      name: "HTMLをコピー",
    }) as HTMLButtonElement;
    expect(copy.disabled).toBe(false);

    fireEvent.click(copy);
    await findByText("HTMLをコピーしました");
    expect(clipboard.writeText).toHaveBeenCalledTimes(1);

    // 1回消費され、上限に達した表示へ変わる／以後はコピーもできない
    getByText(`今月の書き出し上限（${FREE_MONTHLY_EXPORT_LIMIT}回）に達しました。`);
    expect(
      (getByRole("button", { name: "HTMLをコピー" }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });
});

describe("共有URLから開いたセッションの自動保存", () => {
  it("自分のドラフトを上書きせず、共有用の別キーに保存する", () => {
    vi.useFakeTimers();
    try {
      // 自分の作業を自動保存しておく
      const own = renderFormStep();
      fireEvent.change(own.getByLabelText("店名・屋号"), {
        target: { value: "自分の宿" },
      });
      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });
      expect(loadDraft()?.a.shopName).toBe("自分の宿");
      own.unmount();

      // 他人の共有URLを開く（見に来た内容を優先するので復元バナーは出ない）
      window.location.hash = `#c=${encodeShare({
        t: salonTemplate.id,
        a: salonTemplate.defaults,
      })}`;
      const shared = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);
      expect(shared.queryByText("前回の続きから再開しますか？")).toBeNull();

      // ③プレビューから②へ戻り、1文字だけ編集する
      fireEvent.click(shared.getByRole("button", { name: /編集に戻る/ }));
      fireEvent.change(shared.getByLabelText("店名・屋号"), {
        target: { value: "共有された店を書き換え" },
      });
      act(() => {
        vi.advanceTimersByTime(DRAFT_WAIT_MS);
      });

      // 自分のドラフトは無傷のまま、共有セッションの編集は別キーに残る
      expect(loadDraft()?.a.shopName).toBe("自分の宿");
      expect(loadDraft("shared")?.a.shopName).toBe("共有された店を書き換え");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("業種テンプレの選び直し", () => {
  /** ②内容入力で店名を書き換えてから、①業種選択へ戻る */
  function editThenBackToStep1() {
    const view = renderFormStep();
    fireEvent.change(view.getByLabelText("店名・屋号"), {
      target: { value: "潮騒の宿かもめ" },
    });
    fireEvent.click(view.getByRole("button", { name: /業種選択に戻る/ }));
    view.getByText("業種を選んでください");
    return view;
}

  it("同じ業種カードを選び直しても入力は消えない", () => {
    const view = editThenBackToStep1();

    fireEvent.click(view.getByRole("button", { name: /旅館・民宿/ }));

    view.getByText("LPの内容を入力してください");
    expect(
      (view.getByLabelText("店名・屋号") as HTMLInputElement).value
    ).toBe("潮騒の宿かもめ");
  });

  it("別の業種へ切り替えるときは確認を挟み、「やめる」なら入力が残る", () => {
    const view = editThenBackToStep1();

    fireEvent.click(view.getByRole("button", { name: /サロン/ }));

    // 確認が出るだけで、まだ切り替わっていない
    view.getByText("「サロン」に切り替えますか？");
    expect(view.queryByText("LPの内容を入力してください")).toBeNull();

    fireEvent.click(view.getByRole("button", { name: "やめる" }));
    expect(view.queryByText("「サロン」に切り替えますか？")).toBeNull();

    // 元の業種に戻れば入力はそのまま
    fireEvent.click(view.getByRole("button", { name: /旅館・民宿/ }));
    expect(
      (view.getByLabelText("店名・屋号") as HTMLInputElement).value
    ).toBe("潮騒の宿かもめ");
  });

  it("確認して切り替えると、切り替え先のサンプル文言に入れ替わる", () => {
    const view = editThenBackToStep1();

    fireEvent.click(view.getByRole("button", { name: /サロン/ }));
    fireEvent.click(view.getByRole("button", { name: "切り替える" }));

    view.getByText("LPの内容を入力してください");
    expect(
      (view.getByLabelText("店名・屋号") as HTMLInputElement).value
    ).toBe(salonTemplate.defaults.shopName);
  });

  it("既定値のまま（入力なし）なら確認を挟まずに切り替わる", () => {
    const view = render(<LpBuilder onHome={() => {}} onPricing={() => {}} />);

    fireEvent.click(view.getByRole("button", { name: /サロン/ }));

    view.getByText("LPの内容を入力してください");
    expect(
      (view.getByLabelText("店名・屋号") as HTMLInputElement).value
    ).toBe(salonTemplate.defaults.shopName);
  });
});

describe("localStorage が使えない環境", () => {
  it("getter が例外を投げてもビルダー全体は落ちない（プランは free 扱い）", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        // Cookie／サイトデータを拒否したブラウザの挙動（参照した時点で例外）
        throw new Error("SecurityError: The operation is insecure.");
      },
    });
    try {
      const { getByText } = render(
        <LpBuilder onHome={() => {}} onPricing={() => {}} />
      );
      // ①業種選択が普通に描画される（白画面にならない）
      getByText("業種を選んでください");
    } finally {
      if (original) {
        Object.defineProperty(window, "localStorage", original);
      } else {
        Reflect.deleteProperty(window, "localStorage");
      }
    }
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
