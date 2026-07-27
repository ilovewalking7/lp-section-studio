import { createElement, type ComponentType } from "react";
import { beforeAll, describe, expect, it } from "vitest";
import { registry } from "@/registry";
import { escapeHtml, swapHtml } from "./swap";
import { applyRawSwaps, buildLpDocument } from "./export";
import {
  clinicTemplate,
  restaurantTemplate,
  ryokanTemplate,
  salonTemplate,
} from "./templates";
import type { IndustryTemplate, LpAnswers, Testimonial } from "./types";
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

    // rawSwaps を持つセクションのみが対象。rawSwaps が無いテンプレは it.each の配列が
    // 空になり、単にテストケースが0件になる。
    // 照合対象は「swapHtml 適用後のHTML」であることに注意（書き出し（export.ts）でも
    // swapHtml → applyRawSwaps の順で適用されるため、fromHtml はスワップ後の姿と
    // 一致していなければならない）。
    it.each(
      t.sections
        .filter((s) => (s.rawSwaps?.length ?? 0) > 0)
        .map((s) => [s.demoId, s] as const)
    )(
      "%s: rawSwaps の fromHtml がスワップ後のHTMLに出現し、適用後は toHtml に置き換わる",
      async (demoId, section) => {
        const html = swapHtml(
          await renderSection(demoId),
          section.swaps,
          t.defaults
        );
        for (const raw of section.rawSwaps ?? []) {
          expect(
            html.includes(raw.fromHtml),
            `rawSwap の fromHtml が ${demoId} のスワップ後のHTMLに見つからない`
          ).toBe(true);

          const applied = applyRawSwaps(html, section.rawSwaps, t.defaults);
          expect(applied).toContain(raw.toHtml(t.defaults));
          expect(applied).not.toContain(raw.fromHtml);
        }
      }
    );

    // ── 構造（セクションID・写真セクション・お客様の声の件数）の契約 ──────────
    it("section の id がテンプレ内で一意（写真セクションのidとも衝突しない）", () => {
      const ids = [...t.sections.map((s) => s.id), t.photoSection.id];
      expect(new Set(ids).size, `id が重複している: ${ids.join(", ")}`).toBe(
        ids.length
      );
      for (const id of ids) {
        expect(id, "id が空文字").not.toBe("");
      }
    });

    it("photoSection.afterSectionId が実在する section id を指す", () => {
      const ids = t.sections.map((s) => s.id);
      expect(
        ids,
        `afterSectionId "${t.photoSection.afterSectionId}" に一致する section が無い`
      ).toContain(t.photoSection.afterSectionId);
    });

    it("testimonialSlots が1以上、defaults.testimonials の件数以内", () => {
      expect(t.testimonialSlots).toBeGreaterThanOrEqual(1);
      expect(t.testimonialSlots).toBeLessThanOrEqual(
        t.defaults.testimonials.length
      );
      // 入力欄として出す件数ぶんは、プリフィルが埋まっていること
      for (let i = 0; i < t.testimonialSlots; i++) {
        const v = t.defaults.testimonials[i];
        expect(v.body, `testimonials[${i}].body が空`).not.toBe("");
        expect(v.name, `testimonials[${i}].name が空`).not.toBe("");
      }
    });

    /**
     * testimonialSlots が「デモが実際に表示する件数」と一致していることの検査。
     * testimonials の各フィールドを識別用の印に差し替えてスワップを適用し、
     * slots 未満の印だけが出力に現れる（＝余った枠がフォームに出ない）ことを見る。
     */
    it("testimonialSlots の件数ぶんだけ testimonials を消費する", async () => {
      const marked: LpAnswers = {
        ...t.defaults,
        testimonials: [0, 1, 2].map((i) => ({
          headline: `HEADLINEMARK${i}`,
          body: `BODYMARK${i}`,
          name: `NAMEMARK${i}`,
          meta: `METAMARK${i}`,
        })) as [Testimonial, Testimonial, Testimonial],
      };

      let out = "";
      for (const section of t.sections) {
        out += swapHtml(await renderSection(section.demoId), section.swaps, marked);
      }

      for (let i = 0; i < 3; i++) {
        const used = out.includes(`MARK${i}`);
        if (i < t.testimonialSlots) {
          expect(used, `testimonials[${i}] がどのセクションでも使われていない`).toBe(
            true
          );
        } else {
          expect(
            used,
            `testimonialSlots=${t.testimonialSlots} なのに testimonials[${i}] が使われている`
          ).toBe(false);
        }
      }
    });
  });
}

describeTemplate(ryokanTemplate);
describeTemplate(salonTemplate);
describeTemplate(clinicTemplate);
describeTemplate(restaurantTemplate);

/**
 * デモ由来の固有情報が書き出しHTMLに残らないことの契約テスト（欠陥修正パケットF2）。
 *
 * ミセテLP の約束は「そのまま公開できるLP」なので、店主が一度も入力していない
 * 固有情報（創業年・架空の料理と価格・他業種の特典・実在しないページへのリンク等）が
 * 書き出しHTMLに残ってはいけない。旅館が出していない料理や料金の掲載は景表法上の
 * 懸念にもなるため、ここは緩めない。
 *
 * 各テンプレの「デモにしか存在しない文言」を列挙し、
 * 1. その文言がデモのレンダ結果には実在すること（＝リストが空振りしていないこと）
 * 2. 既定値のまま buildLpDocument した出力には1つも含まれないこと
 * の両方を検査する。1 があるので、綴り間違いでリストが無効化されることはない。
 */
const DEMO_LEFTOVERS: Record<string, string[]> = {
  ryokan: [
    // ナビ（暖簾ナビ）
    "OKUYAMA TEI",
    "お料理",
    "客室",
    "交通",
    // ※「温泉」「館内」は既定回答（キャッチコピー・写真セクション見出し）にも
    //   現れる一般語のため、禁止語には入れない（死にリンクの検査で担保する）
    // ヒーロー（旅館ヒーロー）
    "月白の宿",
    "奥山温泉",
    "山あいに佇む、十二室だけの静かな宿。",
    "源泉かけ流しの湯と、旬を映す会席を。",
    "季節のうつろいとともに、ひとときの静寂をお過ごしください。",
    "信州・奥山郷",
    "ご予約を承る",
    "創業 明治四十二年",
    "全室 露天風呂付",
    "空室を電話で確認",
    // お品書き（会席メニュー）
    "水無月の献立 ・ 全七品",
    "胡麻豆腐 山葵添え",
    "なめらかな口当たりを冷やして",
    "蛤と若布の清汁仕立て",
    "出汁の香りを一椀に",
    "本日の鮮魚 三種盛り",
    "近海の旬を吟味して",
    "鰆の西京焼き",
    "ほのかな甘みと焦がしの香",
    "信州牛の陶板焼き",
    "山葵醤油でさっぱりと",
    "土鍋炊き 新米ごはん",
    "香の物・赤出汁とともに",
    "季節の果実と抹茶アイス",
    "甘味でしめくくりを",
    "会席一名様",
    "￥12,800",
    // 料金プラン（松竹梅）
    "松 ・ 竹 ・ 梅",
    "うめ",
    "たけ",
    "まつ",
    "気軽に湯と食を愉しむ",
    "もっとも選ばれる定番",
    "離れで過ごす特別な一夜",
    "￥18,000",
    "￥26,000",
    "￥42,000",
    "／名・税込",
    "このプランで予約",
    "和室 一泊二食",
    "大浴場 利用",
    "夕食 季節の小会席",
    "広縁付 和室",
    "貸切露天 30分",
    "夕食 旬彩会席",
    "利き酒 三種",
    "露天風呂付 離れ",
    "貸切露天 終日",
    "夕食 特撰会席",
    "個室にて お食事",
    // お客様の声（筆文字）
    "忘れられぬ、",
    "静けさでした。",
    "障子越しの朝の光、庭を渡る風の音。",
    "高瀬 美和",
    "東京都 ・ 連泊にてご利用",
    // フッター（和紙フッター）
    "奥山亭",
    "山あいに佇む、十二室の宿。",
    "〒399-XXXX",
    "長野県奥山郡奥山町温泉 1-2-3",
    "TEL 0265-XX-XXXX",
    "― 水無月の候、青葉の風にのせて ―",
    "館内のご案内",
    "空室カレンダー",
    "プラン一覧",
    "よくある質問",
    "交通のご案内",
    "送迎について",
    "周辺の見どころ",
  ],
  salon: [
    // ナビ
    "Verdé",
    "コレクション",
    "私たちの物語",
    "ジャーナル",
    "ログイン",
    // ※「成分」は既定回答の特徴（オーガニック認証成分）にも含まれる一般語のため入れない
    // ヒーロー
    "NATURE-DERIVED CARE",
    "肌と心に、",
    "植物のやさしさを。",
    "畑から生まれた100%自然由来の処方。",
    "コレクションを見る",
    "ヴィーガン認証",
    "動物実験フリー",
    "リサイクル容器",
    "私たちの哲学",
    // 特徴
    "植物の知恵を、毎日のケアに",
    "自然と科学の調和から生まれる、わたしたちのこだわり。",
    "畑から処方へ",
    "契約農家で育てた植物を、収穫から72時間以内に抽出。",
    "やさしい保湿",
    "肌のうるおいバリアを守る植物オイルブレンド。",
    "確かな安全性",
    "全成分を開示し、第三者機関でパッチテスト済み。",
    "地球への配慮",
    "容器は100%リサイクル素材。",
    // 料金プラン
    "MEMBERSHIP",
    "あなたのペースで育つプラン",
    "いつでも変更・解約可能。",
    "シード",
    "ブルーム",
    "フォレスト",
    "/ 月",
    "はじめての方に。基本のケアを無料で。",
    "毎日のウェルネスを習慣に。",
    "本格的なセルフケアを求める方へ。",
    "¥1,980",
    "月1回のお手入れガイド",
    "コミュニティ参加",
    "季節のレシピ配信",
    "月替わりボタニカルボックス",
    "オンライン瞑想クラス",
    "会員限定15%オフ",
    "個別カウンセリング",
    "スパ施術 月1回無料",
    "新商品の先行アクセス",
    "プランを選ぶ",
    // お客様の声
    "敏感肌で何を使っても荒れていたのに、これだけは穏やか。",
    "三浦 美咲",
    "ブルーム会員 · 6ヶ月利用",
    // フッター
    " Botanicals.",
    "自然と共にあるウェルネスを、あなたの毎日へ。",
    "スキンケア",
    "ヘアケア",
    "アロマ",
    "ギフト",
    "成分へのこだわり",
    "サステナビリティ",
    "配送と返品",
    "よくある質問",
    "ジャーナルを購読する",
  ],
  clinic: [
    // ナビ
    "Atelier",
    "Work",
    "Studio",
    "Journal",
    "Contact",
    "はじめる",
    // ヒーロー
    "Studio / 2026",
    "01 — 12",
    "Index",
    "Color",
    "モノクロームを基調に、ただ一点のみアクセントを許す。",
    "International Typographic Style",
    "余白こそ",
    "最上の装飾。",
    "規律あるグリッドと精密なタイポグラフィのための、最小限の構成要素。",
    // 特徴
    "設計の原理",
    "Six principles",
    "グリッド設計",
    "8pt基準のモジュラーグリッド",
    "タイプスケール",
    "比率に基づく明快な見出し階層",
    "ヘアライン",
    "1pxの罫線のみで領域を区切り",
    "余白の設計",
    "意図的な空白がリズムを生み",
    "モノクローム",
    "反転テーマ",
    "明暗を入れ替えても破綻しない",
    // 料金プラン
    "Monthly / JPY",
    "Solo",
    "個人の習作向け",
    "プロのチーム向け",
    "組織・代理店向け",
    "1,800",
    "4,800",
    "12 コンポーネント",
    "ライブプレビュー",
    "コードコピー",
    "無制限の構成要素",
    "ダーク反転対応",
    "優先サポート",
    "Figma 連携",
    "SSO / 監査ログ",
    "専用ワークスペース",
    "SLA 99.9%",
    "選択する",
    // お客様の声
    "削るべきものが何も残らなくなったとき、設計は完成する。",
    "三宅 玲奈",
    "Design Director",
    // フッター
    "規律あるグリッドと精密なタイポグラフィのためのコンポーネントスタジオ。",
    "Resources",
    "Docs",
    "Components",
    "Changelog",
    "Status",
    "Legal",
    "Privacy",
    "Terms",
    "License",
  ],
  restaurant: [
    // ナビ（ロイヤルヘッダー）
    "Livraison offerte",
    "Fournisseur depuis 1894",
    "Paris",
    "Beauregard",
    "Collection",
    "Atelier",
    "Histoire",
    "Journal",
    "Boutiques",
    "Contact",
    // ヒーロー
    "La Maison",
    "The Spring Editorial",
    "The Art of",
    "Luxury & Form",
    "時を超えて愛される素材と仕立て。",
    "Read the Story",
    "Milano",
    "Kyoto",
    "Vol. XII",
    "Élégance",
    "intemporelle",
    "Photograph No. 04",
    // お品書き
    "Bisque de Homard",
    "Terrine de Foie Gras",
    "Magret de Canard",
    "Sole Meunière",
    "Soufflé au Chocolat",
    "オマール海老のビスク",
    "コニャックの香り、生クリームと共に",
    "鴨胸肉のロースト",
    "オレンジソース、季節の根菜",
    "スフレ・オ・ショコラ",
    "バニラのアングレーズ",
    "フォアグラのテリーヌ",
    "無花果のコンフィチュール添え",
    "舌平目のムニエル",
    "ブールノワゼット、ケッパー",
    "¥3,400",
    "¥4,600",
    "¥5,200",
    "¥1,800",
    "Service compris",
    // 料金プラン
    "Adhésion",
    "会員プラン",
    "Recommandé",
    " / 月",
    "Essentiel",
    "はじめての方へ",
    "Signature",
    "もっとも選ばれる",
    "Couture",
    "至高の体験",
    "¥3,800",
    "¥9,800",
    "¥24,000",
    "月3点までのケア",
    "標準クリーニング",
    "店頭受け取り",
    "月10点までのケア",
    "手仕上げプレス",
    "集荷・配送無料",
    "シーズン保管",
    "点数無制限",
    "専属アトリエ担当",
    "24時間優先対応",
    "革・特殊素材対応",
    // お客様の声
    "仕立ての一針ひと針に、確かな美意識が宿っている。",
    "Camille Laurent",
    "Rédactrice en Chef",
    // フッター
    "Maison",
    "Boutique",
    "Savoir-faire",
    "Presse",
    "Nouveautés",
    "Sur-mesure",
    "Cadeaux",
    "Retours",
    "FAQ",
    "Confidentialité",
    "Conditions",
  ],
};

describe("書き出したLPにデモ由来の固有情報が残らない", () => {
  const TEMPLATES = [
    ["ryokan", ryokanTemplate],
    ["salon", salonTemplate],
    ["clinic", clinicTemplate],
    ["restaurant", restaurantTemplate],
  ] as const;

  /**
   * 埋め込みCSS（npm run lp:css の生成物）は Tailwind が吐いたユーティリティ定義で
   * LPの文面ではないため、文言検査の対象から外す。
   */
  function copyOf(html: string): string {
    return html.replace(/<style>[\s\S]*?<\/style>/g, "");
  }

  /** テンプレの全セクションを素のままレンダして連結する（禁止語がデモに実在するかの照合用） */
  async function renderAllSections(t: IndustryTemplate): Promise<string> {
    let out = "";
    for (const section of t.sections) {
      const entry = registry.find((e) => e.id === section.demoId);
      if (!entry) continue;
      const Comp: ComponentType = await entry.load();
      out += server.renderToStaticMarkup(createElement(Comp));
    }
    return out;
  }

  it.each(TEMPLATES)(
    "%s: 禁止語リストがデモのレンダ結果に実在する（リストの空振り防止）",
    async (id, t) => {
      const raw = await renderAllSections(t);
      const absent = DEMO_LEFTOVERS[id].filter(
        (word) => !raw.includes(word) && !raw.includes(escapeHtml(word))
      );
      expect(
        absent,
        `デモに存在しない文言が禁止語リストに入っています（綴り違い？）: ${absent.join(
          " / "
        )}`
      ).toEqual([]);
    }
  );

  it.each(TEMPLATES)(
    "%s: 既定値のまま書き出しても、デモ由来の固有情報が残らない",
    async (id, t) => {
      const html = copyOf(await buildLpDocument(t, t.defaults, { pro: false }));
      const leftovers = DEMO_LEFTOVERS[id].filter(
        (word) => html.includes(word) || html.includes(escapeHtml(word))
      );
      expect(
        leftovers,
        `店主が入力していないデモ由来の文言が書き出しHTMLに残っています: ${leftovers.join(
          " / "
        )}`
      ).toEqual([]);
    }
  );

  it.each(TEMPLATES)(
    "%s: 価格が二重通貨記号・未置換のまま出力されない",
    async (_id, t) => {
      const html = copyOf(await buildLpDocument(t, t.defaults, { pro: false }));
      // デモ側の通貨記号と利用者入力の通貨記号が並ぶ「¥ ¥18,000」「￥￥…」を禁じる
      expect(html, "通貨記号が二重に表示されています").not.toMatch(
        /[¥￥]\s*[¥￥]/
      );
      // 未置換のプレースホルダ価格（¥0 / ￥0）が残っていないこと
      expect(html, "未置換の価格（¥0）が残っています").not.toMatch(
        /[¥￥]\s*0(?![0-9,])/
      );
      // 回答の価格がそのまま（記号の重複なく）出ていること
      for (const plan of t.defaults.plans) {
        expect(html, `プラン価格「${plan.price}」が出力に見当たりません`).toContain(
          escapeHtml(plan.price.replace(/^[¥￥]\s*/, ""))
        );
      }
    }
  );

  it.each(TEMPLATES)(
    "%s: 押しても何も起きない死にリンク（href=\"#\"）が残らない",
    async (_id, t) => {
      const html = await buildLpDocument(t, t.defaults, { pro: false });
      expect(html, '死にリンク href="#" が残っています').not.toContain(
        'href="#"'
      );
    }
  );
});

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
    "md:shadow-[0_20px_50px_-20px_rgba(120,45,58,0.35)]",
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
    // 写真セクション（PhotoShowcase）の配色クラスはテンプレ定義側に literal で持つ。
    // デモのレンダ結果には現れないため、ここで明示的に足して同じ検査に載せる。
    for (const tok of Object.values(t.photoSection.theme)) {
      if (tok) tokens.add(tok);
    }
    return tokens;
  }

  it.each([
    ["ryokan", ryokanTemplate],
    ["salon", salonTemplate],
    ["clinic", clinicTemplate],
    ["restaurant", restaurantTemplate],
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
