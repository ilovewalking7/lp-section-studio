import { describe, expect, it } from "vitest";
import {
  applyRawSwaps,
  buildLpDocument,
  buildRenderPlan,
  centerWrapClass,
  linkifyCta,
} from "./export";
import { LP_TEMPLATES, ryokanTemplate, salonTemplate } from "./templates";
import type { IndustryTemplate, LpAnswers, LpPhoto } from "./types";

/**
 * ミセテLP 書き出しの拡張分（写真セクション・セクション非表示・構造化データ・
 * favicon / theme-color）のテスト。
 * 既存の統合テスト（lp.test.tsx）は触らず、この機能群だけをここで検証する。
 */

/** テスト用のダミー写真（実データは不要。data URI の体裁だけ持たせる） */
function photo(alt: string, filler = "AAAA"): LpPhoto {
  return { dataUrl: `data:image/jpeg;base64,${filler}`, alt };
}

/** ryokanTemplate の既定回答に上書きを重ねた回答を作る */
function answersWith(patch: Partial<LpAnswers>): LpAnswers {
  return { ...ryokanTemplate.defaults, ...patch };
}

/** html の中に needle が現れる回数 */
function countOf(html: string, needle: string): number {
  return html.split(needle).length - 1;
}

/** 書き出しHTMLから JSON-LD のスクリプト中身を取り出す */
function extractJsonLd(html: string): string {
  const m = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/.exec(
    html
  );
  expect(m, "JSON-LD の <script> が見つからない").not.toBeNull();
  return m![1];
}

describe("buildRenderPlan", () => {
  it("写真があるとき afterSectionId のセクションの直後に写真セクションが入る", () => {
    const plan = buildRenderPlan(
      ryokanTemplate,
      answersWith({ photos: [photo("露天風呂")] })
    );
    const photosIdx = plan.findIndex((item) => item.kind === "photos");
    const anchorIdx = plan.findIndex(
      (item) =>
        item.kind === "demo" &&
        item.slot.id === ryokanTemplate.photoSection.afterSectionId
    );
    expect(anchorIdx).toBeGreaterThan(-1);
    expect(photosIdx).toBe(anchorIdx + 1);
  });

  it("afterSectionId のセクションが非表示なら写真セクションは末尾に入る", () => {
    const plan = buildRenderPlan(
      ryokanTemplate,
      answersWith({
        photos: [photo("露天風呂")],
        hiddenSections: [ryokanTemplate.photoSection.afterSectionId],
      })
    );
    expect(plan[plan.length - 1].kind).toBe("photos");
    expect(
      plan.some(
        (item) =>
          item.kind === "demo" &&
          item.slot.id === ryokanTemplate.photoSection.afterSectionId
      )
    ).toBe(false);
  });

  it("写真0枚のときは写真セクションが入らない", () => {
    const plan = buildRenderPlan(ryokanTemplate, answersWith({ photos: [] }));
    expect(plan.some((item) => item.kind === "photos")).toBe(false);
    expect(plan).toHaveLength(ryokanTemplate.sections.length);
  });

  it("写真セクション自体を非表示にすると、写真があっても入らない", () => {
    const plan = buildRenderPlan(
      ryokanTemplate,
      answersWith({
        photos: [photo("露天風呂")],
        hiddenSections: [ryokanTemplate.photoSection.id],
      })
    );
    expect(plan.some((item) => item.kind === "photos")).toBe(false);
  });

  it("hiddenSections のセクションは並びから除かれる", () => {
    const plan = buildRenderPlan(
      ryokanTemplate,
      answersWith({ hiddenSections: ["voice", "pricing"] })
    );
    const ids = plan.flatMap((item) => (item.kind === "demo" ? [item.slot.id] : []));
    expect(ids).not.toContain("voice");
    expect(ids).not.toContain("pricing");
    expect(ids).toContain("hero");
  });
});

describe("linkifyCta", () => {
  /** ナビの内部リンクとCTAボタンが同居する、レンダ結果に近い断片 */
  const html =
    '<nav><a href="#" class="nav">ホーム</a><a href="#" class="nav">アクセス</a></nav>' +
    '<button type="button" class="cta">ご予約はこちら</button>' +
    '<button type="button" class="ghost">閉じる</button>';
  const href = "tel:03-0000-0000";

  it("ctaLabel を含む <button> を <a href> に変換する（type/disabled は除去）", () => {
    const out = linkifyCta(
      '<button type="button" disabled class="cta">ご予約はこちら</button>',
      "ご予約はこちら",
      href
    );
    expect(out).toBe('<a class="cta" href="tel:03-0000-0000">ご予約はこちら</a>');
  });

  it('ctaLabel を含む <a href="#"> の href だけを書き換える', () => {
    const out = linkifyCta(html, "ご予約はこちら", href);
    // CTAボタンはリンク化される
    expect(out).toContain('<a class="cta" href="tel:03-0000-0000">ご予約はこちら</a>');
    // CTA文言を含まないナビ・その他ボタンは素のまま
    expect(out).toContain('<a href="#" class="nav">ホーム</a>');
    expect(out).toContain('<button type="button" class="ghost">閉じる</button>');
  });

  it("ctaHref が許可スキーム外なら何も変換しない", () => {
    expect(linkifyCta(html, "ご予約はこちら", "javascript:alert(1)")).toBe(html);
  });

  /**
   * 回帰（欠陥2）: escapeHtml("") === "" のため inner.includes("") が常に true になり、
   * CTA文言が空だとページ内の全 <button> と全 <a href="#"> が電話リンクに化けていた。
   * FormStep はCTA文言の未入力を許すため、実際に到達する。
   */
  it("ctaLabel が空文字なら1つも変換しない", () => {
    expect(linkifyCta(html, "", href)).toBe(html);
  });

  // 空白のみの文言は escapeHtml しても空白のまま残るため、要素の中身に空白を含む
  // ボタン・リンク（アイコンとラベルを並べた実デモの形）が同じように巻き込まれる。
  const spacedHtml =
    '<nav><a href="#" class="nav">ホーム   へ</a></nav>' +
    '<button type="button" class="ghost"><span>閉じる</span>   <svg></svg></button>';

  it.each([" ", "   "])(
    "ctaLabel が空白のみ（%o）でも1つも変換しない",
    (label) => {
      const out = linkifyCta(spacedHtml, label, href);
      expect(out).toBe(spacedHtml);
      expect(out).not.toContain(href);
      expect(countOf(out, "<button")).toBe(1);
      expect(countOf(out, 'href="#"')).toBe(1);
    }
  );
});

describe("applyRawSwaps", () => {
  const answers = answersWith({});

  it("fromHtml の全出現を toHtml に置換する", () => {
    const out = applyRawSwaps(
      "<div>X</div><div>X</div>",
      [{ fromHtml: "<div>X</div>", toHtml: (a) => `<div>${a.shopName}</div>` }],
      answers
    );
    expect(out).toBe(`<div>${answers.shopName}</div><div>${answers.shopName}</div>`);
  });

  it("差し込んだHTMLが後続 rawSwap の fromHtml に一致しても再置換されない", () => {
    const out = applyRawSwaps(
      "<i>A</i>",
      [
        { fromHtml: "<i>A</i>", toHtml: () => "<i>B</i>" },
        { fromHtml: "<i>B</i>", toHtml: () => "<i>C</i>" },
      ],
      answers
    );
    expect(out).toBe("<i>B</i>");
  });
});

describe("書き出しHTML: 二重置換の回帰（実テンプレ）", () => {
  /**
   * 回帰（欠陥1）: サロンの料金スワップは ¥0 / ¥1,980 / ¥4,800 を順に置換する。
   * 逐次置換だと「プラン1の価格に ¥1,980（＝プラン2のスワップ元と同じ文字列）」を
   * 入力した瞬間、差し込んだ値が次のスワップに食われてプラン2の価格へ化けていた。
   */
  it("プラン1の価格に他プランのスワップ元と同じ文字列を入れても入力どおり出る", async () => {
    const answers: LpAnswers = {
      ...salonTemplate.defaults,
      photos: [],
      plans: [
        { ...salonTemplate.defaults.plans[0], price: "¥1,980" },
        { ...salonTemplate.defaults.plans[1], price: "¥5,800" },
        { ...salonTemplate.defaults.plans[2], price: "¥18,500" },
      ],
    };
    const html = await buildLpDocument(salonTemplate, answers, { pro: false });

    expect(countOf(html, "¥1,980")).toBe(1);
    expect(countOf(html, "¥5,800")).toBe(1);
    expect(countOf(html, "¥18,500")).toBe(1);
    // スワップ元の素の価格は残らない
    expect(html).not.toContain("¥4,800");
  });

  it("プラン2の価格に他プランのスワップ元と同じ文字列を入れても表示が崩れない", async () => {
    const answers: LpAnswers = {
      ...salonTemplate.defaults,
      photos: [],
      plans: [
        { ...salonTemplate.defaults.plans[0], price: "¥3,000" },
        { ...salonTemplate.defaults.plans[1], price: "¥4,800" },
        { ...salonTemplate.defaults.plans[2], price: "¥12,000" },
      ],
    };
    const html = await buildLpDocument(salonTemplate, answers, { pro: false });

    expect(countOf(html, "¥3,000")).toBe(1);
    expect(countOf(html, "¥4,800")).toBe(1);
    expect(countOf(html, "¥12,000")).toBe(1);
    expect(html).not.toContain("¥¥");
  });
});

describe("書き出しHTML: 写真セクション", () => {
  it("写真があるとき data URI の <img> と alt が書き出される", async () => {
    const answers = answersWith({
      photos: [photo("庭園の露天風呂"), photo("離れの客室", "BBBB")],
    });
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: false });

    expect(html).toContain("<img src=\"data:image/");
    expect(html).toContain('alt="庭園の露天風呂"');
    expect(html).toContain('alt="離れの客室"');
    // 見出し（写真セクション固有の文言）も出ていること
    expect(html).toContain(ryokanTemplate.photoSection.heading);
  });

  it("写真0枚のときは写真セクションが出ない", async () => {
    const html = await buildLpDocument(
      ryokanTemplate,
      answersWith({ photos: [] }),
      { pro: false }
    );
    expect(html).not.toContain("<img src=\"data:image/jpeg");
    expect(html).not.toContain(ryokanTemplate.photoSection.heading);
  });
});

describe("書き出しHTML: セクション非表示", () => {
  it("hiddenSections に入れたセクション固有の文言が消える", async () => {
    const answers = answersWith({ photos: [] });
    const marker = answers.testimonials[0].body;

    const full = await buildLpDocument(ryokanTemplate, answers, { pro: false });
    expect(full).toContain(marker);

    const hidden = await buildLpDocument(
      ryokanTemplate,
      { ...answers, hiddenSections: ["voice"] },
      { pro: false }
    );
    expect(hidden).not.toContain(marker);
    expect(hidden.length).toBeLessThan(full.length);
    // 非表示にしていないセクションは残る
    expect(hidden).toContain(answers.plans[0].price);
  });
});

describe("書き出しHTML: JSON-LD 構造化データ", () => {
  it("application/ld+json として入り、@type がテンプレの schemaType と一致する", async () => {
    const answers = answersWith({ photos: [photo("庭園の露天風呂")] });
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: false });

    expect(html).toContain('type="application/ld+json"');
    const ld = JSON.parse(extractJsonLd(html)) as Record<string, unknown>;
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe(ryokanTemplate.schemaType);
    expect(ld.name).toBe(answers.shopName);
    expect(ld.description).toBe(answers.intro);
    expect(ld.telephone).toBe(answers.phone);
    expect(ld.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: answers.address,
    });
    expect(ld.openingHours).toBe(answers.hours);
    expect(ld.areaServed).toBe(answers.area);
    // image は載せない（data URI はクローラが解決できず、容量を二重に食うだけのため）
    expect(ld.image).toBeUndefined();
  });

  it("店名に </script> を入れても閉じタグ注入が起きない", async () => {
    const evil = "</script><script>alert(1)</script>";
    const html = await buildLpDocument(
      ryokanTemplate,
      answersWith({ shopName: evil, photos: [] }),
      { pro: false }
    );

    const raw = extractJsonLd(html);
    expect(raw).not.toContain("</script>");
    expect(raw).not.toContain("<");
    // エスケープしてもJSONとしては等価で、値は元のまま読み出せる
    const ld = JSON.parse(raw) as Record<string, unknown>;
    expect(ld.name).toBe(evil);
    // 実行可能な <script> はドキュメント全体で JSON-LD の1つだけ
    expect(html.match(/<script/g)).toHaveLength(1);
    expect(html).not.toContain("<script>alert(1)");
  });
});

describe("書き出しHTML: favicon / theme-color", () => {
  it("店名の先頭1文字を描いた SVG favicon と theme-color が入る", async () => {
    const answers = answersWith({ shopName: "潮騒の宿かもめ", photos: [] });
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: false });

    expect(html).toContain(
      `<meta name="theme-color" content="${ryokanTemplate.accentHex}" />`
    );

    const m = /<link rel="icon" type="image\/svg\+xml" href="data:image\/svg\+xml,([^"]*)"/.exec(
      html
    );
    expect(m, "favicon の <link> が見つからない").not.toBeNull();
    const svg = decodeURIComponent(m![1]);
    expect(svg).toContain("<svg");
    expect(svg).toContain(`fill="${ryokanTemplate.accentHex}"`);
    expect(svg).toContain(">潮</text>");
  });

  it("店名の先頭が < でも favicon のSVGはXMLエスケープされる", async () => {
    const html = await buildLpDocument(
      ryokanTemplate,
      answersWith({ shopName: "<script>", photos: [] }),
      { pro: false }
    );
    const m = /href="data:image\/svg\+xml,([^"]*)"/.exec(html);
    const svg = decodeURIComponent(m![1]);
    expect(svg).toContain(">&lt;</text>");
  });
});

describe("書き出しHTML: OGP（Proのみ）", () => {
  it("pro なら og:site_name / og:locale が入る", async () => {
    const answers = answersWith({ photos: [photo("庭園の露天風呂")] });
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: true });

    expect(html).toContain('property="og:site_name"');
    expect(html).toContain('content="ja_JP"');
  });

  it("free では OGP を出さない", async () => {
    const html = await buildLpDocument(
      ryokanTemplate,
      answersWith({ photos: [photo("庭園の露天風呂")] }),
      { pro: false }
    );
    expect(html).not.toContain("og:site_name");
  });

  /**
   * 写真の data URI は本文の <img> にだけ載せる。
   * og:image / JSON-LD の image に同じものを入れても、SNS・検索エンジンのクローラは
   * data URI を画像として解決できず、数百KBがHTMLに二重・三重に載って書き出しサイズが
   * 倍増するだけになるため、意図的に出力しない（ホスト型公開＝M2で実URLを指す）。
   */
  it("写真があっても og:image / JSON-LDのimage には data URI を重複させない", async () => {
    const big = `data:image/jpeg;base64,${"A".repeat(20000)}`;
    const answers = answersWith({ photos: [{ dataUrl: big, alt: "露天風呂" }] });
    const html = await buildLpDocument(ryokanTemplate, answers, { pro: true });

    expect(html).not.toContain("og:image");
    const jsonLd = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(
      html
    );
    expect(jsonLd).not.toBeNull();
    expect(jsonLd![1]).not.toContain("data:image");
    // 本文の <img> にだけ1回だけ載っていること
    expect(html.split(big).length - 1).toBe(1);
  });
});

describe("書き出しHTML: 全幅でないセクションの中央寄せ", () => {
  /**
   * formatHtml は1タグ1行・ネストぶんインデントして整形する。開始タグと同じ深さで
   * 閉じる </div> までが、そのラッパーの内側。
   */
  function innerOf(html: string, openTagMarker: string): string {
    const lines = html.split("\n");
    const open = lines.findIndex((l) => l.includes(openTagMarker));
    expect(open, `ラッパー（${openTagMarker}）が見つからない`).toBeGreaterThan(-1);
    const indent = /^ */.exec(lines[open])![0].length;
    let close = open + 1;
    while (
      close < lines.length &&
      !(
        lines[close].trim() === "</div>" &&
        /^ */.exec(lines[close])![0].length === indent
      )
    ) {
      close++;
    }
    expect(close, "ラッパーの閉じタグが見つからない").toBeLessThan(lines.length);
    return lines.slice(open + 1, close).join("\n");
  }

  /** 証言だけを見分けるための、他に出てこない目印を入れた回答 */
  function answersWithMarkedTestimonial(t: IndustryTemplate): LpAnswers {
    const marker = "中央寄せ確認マーカー本文";
    return {
      ...t.defaults,
      photos: [],
      testimonials: [
        { ...t.defaults.testimonials[0], body: marker },
        t.defaults.testimonials[1],
        t.defaults.testimonials[2],
      ],
    };
  }

  it("align が \"full\" のセクションは包まない（既存の全幅レイアウトを変えない）", () => {
    // 旅館テンプレのヒーロー・フッターはいずれも全幅デモ
    expect(centerWrapClass(ryokanTemplate, "wafu-ryokan-hero")).toBeNull();
    expect(centerWrapClass(ryokanTemplate, "wafu-washi-footer")).toBeNull();
  });

  it("align: \"center\" の証言セクションが中央寄せラッパーに包まれる（全4テンプレ）", async () => {
    expect(LP_TEMPLATES.length).toBeGreaterThanOrEqual(4);

    for (const t of LP_TEMPLATES) {
      const centered = t.sections.filter(
        (s) => centerWrapClass(t, s.demoId) !== null
      );
      // 包む対象は各テンプレの証言セクション1つだけ
      expect(centered, `${t.id}: 中央寄せ対象`).toHaveLength(1);

      const wrap = centerWrapClass(t, centered[0].demoId)!;
      // 中央寄せ・テンプレの地色・上下の余白を持つ（左右に地色でない帯が残らない）
      expect(wrap).toContain("justify-center");
      expect(wrap).toContain(t.photoSection.theme.bg);

      const answers = answersWithMarkedTestimonial(t);
      const html = await buildLpDocument(t, answers, { pro: false });

      const openTag = `<div class="${wrap}">`;
      expect(countOf(html, openTag), `${t.id}: ラッパーの数`).toBe(1);
      // 証言の本文がラッパーの内側にある
      expect(innerOf(html, openTag)).toContain(answers.testimonials[0].body);
    }
  });
});
