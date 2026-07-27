import { describe, expect, it } from "vitest";
import { buildLpDocument, buildRenderPlan } from "./export";
import { ryokanTemplate } from "./templates";
import type { LpAnswers, LpPhoto } from "./types";

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
