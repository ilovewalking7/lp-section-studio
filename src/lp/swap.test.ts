import { describe, it, expect, beforeEach, vi } from "vitest";
import { escapeHtml, swapHtml } from "./swap";
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
