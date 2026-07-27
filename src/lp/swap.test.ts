import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { escapeHtml, swapHtml, SwapBoundary } from "./swap";
import { encodeShare, decodeShare, type ShareState } from "./share";
import { FREE_MONTHLY_EXPORT_LIMIT, getMonthExports, incMonthExports } from "./lpPlan";
import type { LpAnswers, Swap } from "./types";

/** encodeShare を経由せず、任意の（型を満たさない）値をそのまま #c= 用に符号化する。 */
function encodeRaw(obj: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const baseAnswers: LpAnswers = {
  shopName: "月見亭",
  area: "箱根・強羅",
  tagline: "温泉と静けさに包まれる、大人の隠れ宿",
  intro: "四季の移ろいを感じる庭園と、地の食材を活かした会席料理でお迎えします。",
  features: [
    { title: "貸切露天風呂", desc: "24時間いつでも予約なしで利用可能" },
    { title: "会席料理", desc: "地元食材を使った季節の会席" },
    { title: "静かな離れ", desc: "全室離れの完全プライベート空間" },
  ],
  plans: [
    { name: "スタンダード", price: "¥18,000〜", desc: "1泊2食付き" },
    { name: "デラックス", price: "¥28,000〜", desc: "貸切露天風呂付き" },
    { name: "スイート", price: "¥45,000〜", desc: "離れ+個室食事処" },
  ],
  testimonials: [
    {
      headline: "また季節を変えて。",
      body: "貸切の露天風呂を何度も利用しました。静かな環境でゆっくり休めました。",
      name: "T・K 様",
      meta: "東京都 ・ ご夫婦で1泊",
    },
    {
      headline: "静かな時間に癒されました。",
      body: "部屋数が少ないぶん、行き届いたおもてなしでした。",
      name: "M・S 様",
      meta: "神奈川県 ・ ご家族でご利用",
    },
    {
      headline: "記念日に選んでよかった。",
      body: "離れの客室と個室の食事処で、周りを気にせず過ごせました。",
      name: "Y・N 様",
      meta: "千葉県 ・ 記念日のご滞在",
    },
  ],
  photos: [],
  hiddenSections: [],
  phone: "0460-00-0000",
  address: "神奈川県箱根町強羅1-2-3",
  hours: "15:00〜19:00（チェックイン）",
  ctaLabel: "ご予約はこちら",
  ctaHref: "tel:0460-00-0000",
};

describe("escapeHtml", () => {
  it("& < > \" ' の5種をすべてエスケープする", () => {
    expect(escapeHtml(`<b>a & 'b' "c"</b>`)).toBe(
      "&lt;b&gt;a &amp; &#39;b&#39; &quot;c&quot;&lt;/b&gt;"
    );
  });

  it("日本語や記号を含まない文字列はそのまま", () => {
    expect(escapeHtml("月白の宿")).toBe("月白の宿");
  });
});

describe("swapHtml", () => {
  it("生の from をそのまま置換する（エスケープしても変化しない日本語文言）", () => {
    const swaps: Swap[] = [{ from: "月白の宿", to: (a) => a.shopName }];
    const html = "<h1>月白の宿</h1><p>月白の宿へようこそ</p>";
    const out = swapHtml(html, swaps, baseAnswers);
    expect(out).toBe("<h1>月見亭</h1><p>月見亭へようこそ</p>");
  });

  it("HTMLエスケープされた形の from も置換する（& を含む文言）", () => {
    const swaps: Swap[] = [{ from: "宿 & 温泉", to: (a) => a.shopName }];
    // renderToStaticMarkup 相当の出力は & がエスケープされている
    const html = "<h1>宿 &amp; 温泉</h1>";
    const out = swapHtml(html, swaps, baseAnswers);
    expect(out).toBe("<h1>月見亭</h1>");
  });

  it("to 側の値は挿入前に必ずエスケープする（XSS防止）", () => {
    const malicious: LpAnswers = {
      ...baseAnswers,
      shopName: `<script>alert(1)</script>`,
    };
    const swaps: Swap[] = [{ from: "月白の宿", to: (a) => a.shopName }];
    const out = swapHtml("<h1>月白の宿</h1>", swaps, malicious);
    expect(out).toBe("<h1>&lt;script&gt;alert(1)&lt;/script&gt;</h1>");
    expect(out).not.toContain("<script>");
  });

  it("同一 from が複数回出現しても全て置換する（replaceAll）", () => {
    const swaps: Swap[] = [{ from: "月白の宿", to: (a) => a.shopName }];
    const html = "<h1>月白の宿</h1><footer>月白の宿 - 月白の宿</footer>";
    const out = swapHtml(html, swaps, baseAnswers);
    expect(out).toBe("<h1>月見亭</h1><footer>月見亭 - 月見亭</footer>");
    expect(out).not.toContain("月白の宿");
  });

  it("複数のswapを順に適用する", () => {
    const swaps: Swap[] = [
      { from: "月白の宿", to: (a) => a.shopName },
      { from: "箱根湯本", to: (a) => a.area },
    ];
    const html = "<h1>月白の宿</h1><p>箱根湯本にある宿</p>";
    const out = swapHtml(html, swaps, baseAnswers);
    expect(out).toBe("<h1>月見亭</h1><p>箱根・強羅にある宿</p>");
  });
});

/**
 * 二重置換（差し込んだ利用者入力が後続 swap の from に一致して再び置換される）の回帰テスト。
 * 逐次 split/join 実装では実テンプレで価格やメニュー名が別項目の値へ化けていた。
 */
describe("swapHtml: 二重置換をしない（1パス同時置換）", () => {
  it("先の swap が差し込んだ値は後続 swap の from に一致しても再置換されない", () => {
    const swaps: Swap[] = [
      { from: "A", to: () => "B" },
      { from: "B", to: () => "C" },
    ];
    const out = swapHtml("A", swaps, baseAnswers);
    expect(out).toBe("B");
    expect(out).not.toBe("C");
  });

  it("元のHTMLにある後続 from は置換される（全出現の置換は維持）", () => {
    const swaps: Swap[] = [
      { from: "A", to: () => "B" },
      { from: "B", to: () => "C" },
    ];
    expect(swapHtml("<p>A</p><p>B</p><p>A</p>", swaps, baseAnswers)).toBe(
      "<p>B</p><p>C</p><p>B</p>"
    );
  });

  it("サロン: プラン1の価格に「¥1,980」（プラン2の from と同一）を入れても化けない", () => {
    // botanical-botanical-pricing の実スワップ構成（¥0 / ¥1,980 / ¥4,800）の最小再現
    const answers: LpAnswers = {
      ...baseAnswers,
      plans: [
        { name: "シード", price: "¥1,980", desc: "お試し" },
        { name: "ブルーム", price: "¥5,800", desc: "定番" },
        { name: "フォレスト", price: "¥12,000", desc: "本格" },
      ],
    };
    const swaps: Swap[] = [
      { from: "¥0", to: (a) => a.plans[0].price },
      { from: "¥1,980", to: (a) => a.plans[1].price },
      { from: "¥4,800", to: (a) => a.plans[2].price },
    ];
    const html = "<li>¥0</li><li>¥1,980</li><li>¥4,800</li>";
    const out = swapHtml(html, swaps, answers);
    expect(out).toBe("<li>¥1,980</li><li>¥5,800</li><li>¥12,000</li>");
    // プラン1の入力が消えたり、プラン2の値が2回出たりしない
    expect(out.split("¥1,980").length - 1).toBe(1);
    expect(out.split("¥5,800").length - 1).toBe(1);
  });

  it("クリニック: 通貨記号が別要素のプランで表示が崩れない", () => {
    // minimal-minimal-pricing の実スワップ構成（"1,800" / "4,800" と ¥ が別ノード）の最小再現
    const answers: LpAnswers = {
      ...baseAnswers,
      plans: [
        { name: "A健診", price: "¥0", desc: "基本" },
        { name: "B健診", price: "¥4,800", desc: "追加" },
        { name: "C健診", price: "¥12,000", desc: "全部" },
      ],
    };
    const swaps: Swap[] = [
      { from: "1,800", to: (a) => a.plans[1].price },
      { from: "4,800", to: (a) => a.plans[2].price },
    ];
    const html = "<span>¥</span><span>1,800</span><span>¥</span><span>4,800</span>";
    const out = swapHtml(html, swaps, answers);
    expect(out).toBe(
      "<span>¥</span><span>¥4,800</span><span>¥</span><span>¥12,000</span>"
    );
    expect(out).not.toContain("¥¥");
  });

  it("飲食店: 特徴1に別スワップと同じ文言を入れても特徴2に化けない", () => {
    const answers: LpAnswers = {
      ...baseAnswers,
      features: [
        { title: "鴨胸肉のロースト", desc: "自家製のソースで" },
        { title: "本日の魚料理", desc: "季節の一皿" },
        { title: "季節のデセール", desc: "食後に" },
      ],
    };
    const swaps: Swap[] = [
      { from: "オマール海老のビスク", to: (a) => a.features[0].title },
      { from: "鴨胸肉のロースト", to: (a) => a.features[1].title },
      { from: "スフレ・オ・ショコラ", to: (a) => a.features[2].title },
    ];
    const html =
      "<li>オマール海老のビスク</li><li>鴨胸肉のロースト</li><li>スフレ・オ・ショコラ</li>";
    const out = swapHtml(html, swaps, answers);
    expect(out).toBe(
      "<li>鴨胸肉のロースト</li><li>本日の魚料理</li><li>季節のデセール</li>"
    );
  });

  it("同じ位置で競合したら長い from を優先する", () => {
    const swaps: Swap[] = [
      // 短い方を先に並べても、長い方（より具体的な文言）が勝つ
      { from: "松", to: () => "SHORT" },
      { from: "松コース", to: () => "LONG" },
    ];
    const out = swapHtml("<p>松コース</p><p>松</p>", swaps, baseAnswers);
    expect(out).toBe("<p>LONG</p><p>SHORT</p>");
  });

  it("from が空文字のスワップは無視する（無限ループしない）", () => {
    const swaps: Swap[] = [
      { from: "", to: () => "X" },
      { from: "月白の宿", to: (a) => a.shopName },
    ];
    const out = swapHtml("<h1>月白の宿</h1>", swaps, baseAnswers);
    expect(out).toBe("<h1>月見亭</h1>");
    expect(out).not.toContain("X");
  });

  it("from が空文字のスワップだけでも入力をそのまま返す", () => {
    expect(swapHtml("<p>そのまま</p>", [{ from: "", to: () => "X" }], baseAnswers)).toBe(
      "<p>そのまま</p>"
    );
  });
});

describe("SwapBoundary（プレビュー）", () => {
  afterEach(() => {
    cleanup();
  });

  /** MutationObserver のコールバック（マイクロタスク）が走り切るまで待つ */
  async function flushObservers(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  it("テキストノードを from → to に置換する", async () => {
    const swaps: Swap[] = [{ from: "月白の宿", to: (a) => a.shopName }];
    render(
      createElement(
        SwapBoundary,
        { swaps, answers: baseAnswers },
        createElement("h1", { "data-testid": "name" }, "月白の宿")
      )
    );
    await flushObservers();
    expect(screen.getByTestId("name").textContent).toBe("月見亭");
  });

  it("置換後のテキストが後続スワップの from に一致しても再置換されない", async () => {
    const answers: LpAnswers = {
      ...baseAnswers,
      plans: [
        { name: "シード", price: "¥1,980", desc: "お試し" },
        { name: "ブルーム", price: "¥5,800", desc: "定番" },
        { name: "フォレスト", price: "¥12,000", desc: "本格" },
      ],
    };
    const swaps: Swap[] = [
      { from: "¥0", to: (a) => a.plans[0].price },
      { from: "¥1,980", to: (a) => a.plans[1].price },
      { from: "¥4,800", to: (a) => a.plans[2].price },
    ];
    render(
      createElement(
        SwapBoundary,
        { swaps, answers },
        createElement("p", { "data-testid": "p1" }, "¥0"),
        createElement("p", { "data-testid": "p2" }, "¥1,980"),
        createElement("p", { "data-testid": "p3" }, "¥4,800")
      )
    );
    await flushObservers();
    expect(screen.getByTestId("p1").textContent).toBe("¥1,980");
    expect(screen.getByTestId("p2").textContent).toBe("¥5,800");
    expect(screen.getByTestId("p3").textContent).toBe("¥12,000");
  });

  it("後からDOMに追加されたノードも置換する（遅延マウント対応は維持）", async () => {
    const swaps: Swap[] = [{ from: "月白の宿", to: (a) => a.shopName }];
    const { container } = render(
      createElement(
        SwapBoundary,
        { swaps, answers: baseAnswers },
        createElement("div", { "data-testid": "host" })
      )
    );
    await flushObservers();

    const host = container.querySelector('[data-testid="host"]');
    expect(host).not.toBeNull();
    const added = document.createElement("span");
    added.textContent = "月白の宿";
    host!.appendChild(added);
    await flushObservers();

    expect(added.textContent).toBe("月見亭");
  });
});

describe("encodeShare / decodeShare", () => {
  it("長文日本語+絵文字を含む状態をラウンドトリップできる", () => {
    const state: ShareState = {
      t: "ryokan",
      a: {
        ...baseAnswers,
        intro:
          "四季折々の美しい庭園を眺めながら、心ゆくまでお寛ぎいただける空間をご用意しております🌸✨。地元の旬の食材にこだわった会席料理と、貸切露天風呂で日頃の疲れを癒してください♨️😌。",
        tagline: "こころ、ととのう宿🍵",
      },
    };
    const encoded = encodeShare(state);
    expect(typeof encoded).toBe("string");
    // base64url なので + / = を含まない
    expect(encoded).not.toMatch(/[+/=]/);

    const decoded = decodeShare(encoded);
    expect(decoded).toEqual(state);
  });

  it("壊れた文字列は例外を投げず null を返す", () => {
    expect(decodeShare("not-a-valid-base64url-json!!")).toBeNull();
    expect(decodeShare("")).toBeNull();
  });

  it("JSONとして正しくても形が不正なら null を返す", () => {
    const bytes = new TextEncoder().encode(JSON.stringify({ foo: "bar" }));
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    const bogus = btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    expect(decodeShare(bogus)).toBeNull();
  });

  it("features が欠落していると null を返す（深い形状検証）", () => {
    const a: Record<string, unknown> = { ...baseAnswers };
    delete a.features;
    const bogus = encodeRaw({ t: "ryokan", a });
    expect(decodeShare(bogus)).toBeNull();
  });

  it("plans の長さが2（3ではない）だと null を返す（深い形状検証）", () => {
    const a = { ...baseAnswers, plans: baseAnswers.plans.slice(0, 2) };
    const bogus = encodeRaw({ t: "ryokan", a });
    expect(decodeShare(bogus)).toBeNull();
  });

  it("フィールドの型が違う（shopNameが数値）と null を返す（深い形状検証）", () => {
    const a = { ...baseAnswers, shopName: 123 };
    const bogus = encodeRaw({ t: "ryokan", a });
    expect(decodeShare(bogus)).toBeNull();
  });

  it("存在しないテンプレIDだと null を返す（深い形状検証）", () => {
    const bogus = encodeRaw({ t: "no-such-template", a: baseAnswers });
    expect(decodeShare(bogus)).toBeNull();
  });
});

describe("月次クォータ（lpPlan）", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("月次キーで保存され、初期値は0", () => {
    expect(getMonthExports()).toBe(0);
    const monthKey = `lp:exports:${new Date().toISOString().slice(0, 7)}`;
    expect(localStorage.getItem(monthKey)).toBeNull();
  });

  it("incMonthExports のたびに1ずつ増える", () => {
    incMonthExports();
    expect(getMonthExports()).toBe(1);
    incMonthExports();
    incMonthExports();
    expect(getMonthExports()).toBe(3);
  });

  it("FREE_MONTHLY_EXPORT_LIMIT 回で上限に達する", () => {
    for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT; i++) incMonthExports();
    expect(getMonthExports()).toBe(FREE_MONTHLY_EXPORT_LIMIT);
    expect(getMonthExports() >= FREE_MONTHLY_EXPORT_LIMIT).toBe(true);
  });

  it("localStorage の値が負でも0にクランプされる（フェイルオープン対策）", () => {
    const monthKey = `lp:exports:${new Date().toISOString().slice(0, 7)}`;
    localStorage.setItem(monthKey, "-5");
    expect(getMonthExports()).toBe(0);
  });

  it("setItem が失敗する環境でもメモリカウンタへフォールバックし、セッション内は上限が効く", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError（模擬）");
      });
    try {
      for (let i = 0; i < FREE_MONTHLY_EXPORT_LIMIT; i++) incMonthExports();
      expect(getMonthExports() >= FREE_MONTHLY_EXPORT_LIMIT).toBe(true);
    } finally {
      spy.mockRestore();
    }
  });
});
