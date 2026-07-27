/**
 * 業種テンプレ定義（旅館・サロン・クリニック・飲食店の4種）。
 *
 * 各テンプレは既存デモ6点（ナビ→ヒーロー→特徴/メニュー→料金→お客様の声→フッター）を
 * SectionSlot として並べ、各セクションのレンダ結果に適用する Swap 群を持つ。
 *
 * from は対象デモの実際の日本語文言（document.documentElement.lang = "ja" で
 * レンダされる枝）をそのまま書き写したもの。swapHtml は文字列の完全一致置換
 * （split/join）で動くため、from は「そのセクションのレンダ結果内で一意」な
 * 文言だけを選んでいる。
 *
 * 注意点（一意性）:
 * - 同一ブランド語が複数箇所に現れるケース（屋号が見出しとコピーライト行の両方に
 *   出る等）はどちらも同じ値に揃えたいので、意図的にそのまま複数置換させている。
 * - 一方「松・竹・梅」のように単一文字が個別プラン名とまとめ見出しの両方に現れ、
 *   意味が競合するケース（置換すると見出しが壊れる）はスワップ対象から外し、
 *   価格・説明文のみを置き換える。ボタニカル料金の「シード/ブルーム」も同様に
 *   他プランの特典説明文（「シードの全特典」等）と衝突するため名称は対象外にした。
 *
 * 全フィールドを無理に全セクションへ写像はしない。デモに存在しない情報
 * （例: サロン/クリニックのナビ・フッターに連絡先が無い、証言デモに見出し行が
 * 無いため Testimonial.headline を使わない等）は素直にスキップしている。
 *
 * お客様の声（testimonials）は、デモが実際に画面へ表示する件数だけを写像する
 * （IndustryTemplate.testimonialSlots＝入力欄の数）。4テンプレとも証言デモは
 * 引用1件構成のため testimonialSlots は 1。
 */
import { escapeHtml } from "./swap";
import type { IndustryTemplate, LpAnswers } from "./types";

/**
 * 鉤括弧で囲んだ引用文にする。ボタニカル／ミニマルの証言デモは本文が
 * 「…」ごと1つのテキストノードなので、括弧まで含めて差し替える必要がある。
 * 利用者が自分で鉤括弧を付けていた場合は二重にしない。
 */
function quoted(body: string): string {
  return body.startsWith("「") && body.endsWith("」") ? body : `「${body}」`;
}

// ── 旅館（和風キット）────────────────────────────────────────────────
// swap.test.ts の baseAnswers と同じ値を採用し、テスト間の期待値を揃える。
const ryokanDefaults: LpAnswers = {
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
  // 実在しない人物を装わないよう、お名前はイニシャル表記のサンプルにしてある。
  // 公開前に実際にいただいたお客様の声へ差し替えて使う（docs/LP-BUILDER.md参照）。
  testimonials: [
    {
      headline: "また季節を変えて。",
      body: "貸切の露天風呂を何度も利用しました。夕食の会席は品数も味も申し分なく、静かな環境でゆっくり休めました。",
      name: "T・K 様",
      meta: "東京都 ・ ご夫婦で1泊",
    },
    {
      headline: "静かな時間に癒されました。",
      body: "部屋数が少ないぶん、行き届いたおもてなしでした。朝食の焼き魚と味噌汁が特においしかったです。",
      name: "M・S 様",
      meta: "神奈川県 ・ ご家族でご利用",
    },
    {
      headline: "記念日に選んでよかった。",
      body: "結婚記念日で伺いました。離れの客室と個室の食事処で、周りを気にせず過ごせたのが何よりでした。",
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

export const ryokanTemplate: IndustryTemplate = {
  id: "ryokan",
  name: "旅館・民宿",
  description: "和風の意匠で、格式と静けさを伝える宿泊予約LP。",
  schemaType: "Hotel",
  // 朱の落款・見出し罫に使われる和風キットのアクセント（FudeTestimonial 等）
  accentHex: "#b7410e",
  // FudeTestimonial は引用1件構成
  testimonialSlots: 1,
  photoSection: {
    id: "photos",
    label: "写真ギャラリー",
    afterSectionId: "menu",
    eyebrow: "館内のご案内",
    heading: "写真で見る",
    theme: {
      bg: "bg-[#f5f1e8]",
      text: "text-stone-900",
      muted: "text-stone-600",
      accent: "text-[#b7410e]",
      border: "border-stone-300",
      font: "font-mincho",
    },
  },
  defaults: ryokanDefaults,
  sections: [
    {
      id: "nav",
      label: "ナビゲーション",
      // 暖簾ナビ: 屋号は暖簾の一字ずつ("奥"/"山"/"亭")に分割された独立div構造のため
      // テキストノード単位の swap では安全に置換できない。書き出し（export.ts）専用の
      // rawSwaps でHTML断片ごと店名の文字数ぶんのdivへ差し替える。
      // 既知の制約: rawSwaps はプレビュー（SwapBoundary はテキストノード単位でしか
      // 置換しない）には反映されない。プレビューの縦書き屋号はデモの文言（奥/山/亭）の
      // ままになる（docs/LP-BUILDER.md に明記）。
      demoId: "wafu-noren-nav",
      swaps: [
        { from: "ご予約", to: (a) => a.ctaLabel },
        // 屋号ローマ字表記はテキストノードのため通常swapで置換できる（プレビューにも反映）
        { from: "OKUYAMA TEI", to: (a) => a.shopName },
      ],
      rawSwaps: [
        {
          fromHtml:
            '<div class="relative bg-[#1f3a5f] px-3 pb-4 pt-3 shadow-sm"><span class="font-mincho text-xl tracking-widest text-[#f5f1e8]">奥</span><span class="absolute inset-x-1 bottom-0 h-2 bg-[#162a45]"></span></div><div class="relative bg-[#1f3a5f] px-3 pb-4 pt-3 shadow-sm"><span class="font-mincho text-xl tracking-widest text-[#f5f1e8]">山</span><span class="absolute inset-x-1 bottom-0 h-2 bg-[#162a45]"></span></div><div class="relative bg-[#1f3a5f] px-3 pb-4 pt-3 shadow-sm"><span class="font-mincho text-xl tracking-widest text-[#f5f1e8]">亭</span><span class="absolute inset-x-1 bottom-0 h-2 bg-[#162a45]"></span></div>',
          toHtml: (a) =>
            [...a.shopName.replace(/\s+/g, "")]
              .map(
                (ch) =>
                  `<div class="relative bg-[#1f3a5f] px-3 pb-4 pt-3 shadow-sm"><span class="font-mincho text-xl tracking-widest text-[#f5f1e8]">${escapeHtml(ch)}</span><span class="absolute inset-x-1 bottom-0 h-2 bg-[#162a45]"></span></div>`
              )
              .join(""),
        },
      ],
    },
    {
      id: "hero",
      label: "ヒーロー",
      demoId: "wafu-ryokan-hero",
      swaps: [
        { from: "月白の宿", to: (a) => a.shopName },
        { from: "　奥山温泉", to: (a) => `　${a.area}` },
        { from: "山あいに佇む、十二室だけの静かな宿。", to: (a) => a.tagline },
        // <br/> で分割された2行目は空文字にして単行のキャッチコピーへ畳む
        { from: "源泉かけ流しの湯と、旬を映す会席を。", to: () => "" },
        {
          from:
            "季節のうつろいとともに、ひとときの静寂をお過ごしください。客室はすべて庭に面し、夜は星のまたたきと川のせせらぎだけが時を刻みます。",
          to: (a) => a.intro,
        },
        { from: "信州・奥山郷", to: (a) => a.area },
        { from: "ご予約を承る", to: (a) => a.ctaLabel },
      ],
    },
    {
      // 会席品書き: 全七品のうち三品を features[0..2] に割り当てる
      id: "menu",
      label: "お品書き",
      optional: true,
      demoId: "wafu-kaiseki-menu",
      swaps: [
        { from: "本日の鮮魚 三種盛り", to: (a) => a.features[0].title },
        { from: "近海の旬を吟味して", to: (a) => a.features[0].desc },
        { from: "信州牛の陶板焼き", to: (a) => a.features[1].title },
        { from: "山葵醤油でさっぱりと", to: (a) => a.features[1].desc },
        { from: "土鍋炊き 新米ごはん", to: (a) => a.features[2].title },
        { from: "香の物・赤出汁とともに", to: (a) => a.features[2].desc },
      ],
    },
    {
      // 松竹梅プラン: 「梅」「竹」「松」の一字は各カードのランク表示だけでなく
      // まとめ見出し「松・竹・梅」にも現れ、置換すると見出しが壊れるため
      // プラン名はスワップ対象から外し、価格・説明のみ置き換える。
      id: "pricing",
      label: "料金プラン",
      optional: true,
      demoId: "wafu-matsu-take-ume-pricing",
      swaps: [
        { from: "気軽に湯と食を愉しむ", to: (a) => a.plans[0].desc },
        { from: "￥18,000", to: (a) => a.plans[0].price },
        { from: "もっとも選ばれる定番", to: (a) => a.plans[1].desc },
        { from: "￥26,000", to: (a) => a.plans[1].price },
        { from: "離れで過ごす特別な一夜", to: (a) => a.plans[2].desc },
        { from: "￥42,000", to: (a) => a.plans[2].price },
      ],
    },
    {
      // 筆文字お客様の声: 引用1件構成なので testimonials[0] を丸ごと写像する
      // （見出し・本文・お名前・補足の4フィールドすべてがデモ上に対応箇所を持つ）。
      // 落款の「客評」は装飾のため対象外。
      id: "voice",
      label: "お客様の声",
      optional: true,
      demoId: "wafu-fude-testimonial",
      swaps: [
        { from: "忘れられぬ、", to: (a) => a.testimonials[0].headline },
        // <br/> で分割された2行目は空文字にして単行の見出しへ畳む
        { from: "静けさでした。", to: () => "" },
        {
          from:
            "障子越しの朝の光、庭を渡る風の音。何もしない贅沢を、はじめて知りました。料理の一品ごとに季節が宿り、また訪れたいと心から思える宿です。",
          to: (a) => a.testimonials[0].body,
        },
        { from: "高瀬 美和 様", to: (a) => a.testimonials[0].name },
        { from: "東京都 ・ 連泊にてご利用", to: (a) => a.testimonials[0].meta },
      ],
    },
    {
      id: "footer",
      label: "フッター",
      demoId: "wafu-washi-footer",
      swaps: [
        { from: "奥山亭", to: (a) => a.shopName },
        { from: "山あいに佇む、十二室の宿。", to: (a) => a.tagline },
        { from: "長野県奥山郡奥山町温泉 1-2-3", to: (a) => a.address },
        { from: "TEL 0265-XX-XXXX", to: (a) => `TEL ${a.phone}` },
      ],
    },
  ],
};

// ── サロン（ボタニカル）──────────────────────────────────────────────
const salonDefaults: LpAnswers = {
  shopName: "そよぎボタニカル",
  area: "代官山",
  tagline: "植物の力で、肌と心をゆるめる時間",
  intro:
    "厳選したオーガニック成分と熟練セラピストの手技で、日常に静けさを取り戻すボディ&フェイシャルケアをご提供します。",
  features: [
    { title: "オーガニック認証成分", desc: "肌にやさしい100%植物由来のプロダクトを使用" },
    { title: "熟練セラピスト", desc: "国家資格保有スタッフによる丁寧な施術" },
    { title: "完全個室サロン", desc: "プライバシーに配慮した落ち着いた空間" },
  ],
  plans: [
    { name: "ライトケア", price: "¥6,800", desc: "フェイシャル60分" },
    { name: "リラックスケア", price: "¥12,000", desc: "全身90分+フェイシャル" },
    { name: "プレミアムケア", price: "¥18,500", desc: "全身120分+ヘッドスパ" },
  ],
  // 実在しない人物を装わないよう、お名前はイニシャル表記のサンプルにしてある。
  testimonials: [
    {
      headline: "肌の調子が変わりました。",
      body: "施術のあと、肌がやわらかくなったのが自分でも分かりました。カウンセリングも丁寧で、無理なおすすめが一切ないので安心して通えます。",
      name: "A・H 様",
      meta: "30代 ・ 月1回ご来店",
    },
    {
      headline: "香りに癒やされる時間。",
      body: "完全個室なので人の目が気になりません。植物の香りに包まれて、施術中はいつのまにか眠ってしまいます。",
      name: "R・M 様",
      meta: "40代 ・ フェイシャル60分",
    },
    {
      headline: "肩こりが軽くなりました。",
      body: "デスクワークの肩こり相談から始めました。その日の状態に合わせて力加減を変えてくださるのがありがたいです。",
      name: "S・I 様",
      meta: "30代 ・ 全身90分",
    },
  ],
  photos: [],
  hiddenSections: [],
  phone: "03-0000-0000",
  address: "東京都渋谷区代官山町1-2-3",
  hours: "10:00〜20:00（最終受付19:00）",
  ctaLabel: "ご予約はこちら",
  ctaHref: "tel:03-0000-0000",
};

export const salonTemplate: IndustryTemplate = {
  id: "salon",
  name: "サロン",
  description: "ボタニカルな意匠で、癒やしと信頼感を伝える予約LP。",
  schemaType: "BeautySalon",
  // ボタニカルキットの基調となる深緑（BotanicalTestimonial の署名・枠線ほか）
  accentHex: "#5e6b4f",
  // BotanicalTestimonial は引用1件構成
  testimonialSlots: 1,
  photoSection: {
    id: "photos",
    label: "写真ギャラリー",
    afterSectionId: "features",
    eyebrow: "サロンの風景",
    heading: "写真で見る",
    theme: {
      bg: "bg-[#f3f1e7]",
      text: "text-[#3f4a35]",
      muted: "text-[#5e6b4f]",
      accent: "text-[#5e6b4f]",
      border: "border-[#5e6b4f]/30",
      font: "",
    },
  },
  defaults: salonDefaults,
  sections: [
    {
      id: "nav",
      label: "ナビゲーション",
      demoId: "botanical-botanical-nav",
      swaps: [
        { from: "Verdé", to: (a) => a.shopName },
        // デスクトップ・モバイル双方に同一文言で現れるボタン（ログイン）を
        // 予約導線のCTAとして扱う
        { from: "ログイン", to: (a) => a.ctaLabel },
      ],
    },
    {
      id: "hero",
      label: "ヒーロー",
      demoId: "botanical-botanical-hero",
      swaps: [
        { from: "肌と心に、", to: (a) => a.tagline },
        // <br/> で分割された2行目は空文字にして単行のキャッチコピーへ畳む
        { from: "植物のやさしさを。", to: () => "" },
        {
          from:
            "畑から生まれた100%自然由来の処方。穏やかな香りと植物の力で、毎日のスキンケアを静かなウェルネスの時間へ。",
          to: (a) => a.intro,
        },
        { from: "コレクションを見る", to: (a) => a.ctaLabel },
      ],
    },
    {
      // 4特徴のうち3つを features[0..2] に割り当てる
      id: "features",
      label: "サロンの特徴",
      optional: true,
      demoId: "botanical-botanical-feature",
      swaps: [
        { from: "畑から処方へ", to: (a) => a.features[0].title },
        {
          from: "契約農家で育てた植物を、収穫から72時間以内に抽出。鮮度の高い有効成分を届けます。",
          to: (a) => a.features[0].desc,
        },
        { from: "やさしい保湿", to: (a) => a.features[1].title },
        {
          from: "肌のうるおいバリアを守る植物オイルブレンド。敏感肌の方にも穏やかに寄り添います。",
          to: (a) => a.features[1].desc,
        },
        { from: "確かな安全性", to: (a) => a.features[2].title },
        {
          from: "全成分を開示し、第三者機関でパッチテスト済み。安心して毎日使える処方です。",
          to: (a) => a.features[2].desc,
        },
      ],
    },
    {
      // シード/ブルームは他プランの特典説明（「シードの全特典」「ブルームの全特典」）
      // にも同じ語が現れ意味が競合するため名称はスワップ対象から外す。
      // フォレストは重複がないため名称も置き換える。
      id: "pricing",
      label: "料金プラン",
      optional: true,
      demoId: "botanical-botanical-pricing",
      swaps: [
        { from: "はじめての方に。基本のケアを無料で。", to: (a) => a.plans[0].desc },
        { from: "¥0", to: (a) => a.plans[0].price },
        { from: "毎日のウェルネスを習慣に。", to: (a) => a.plans[1].desc },
        { from: "¥1,980", to: (a) => a.plans[1].price },
        { from: "フォレスト", to: (a) => a.plans[2].name },
        { from: "本格的なセルフケアを求める方へ。", to: (a) => a.plans[2].desc },
        { from: "¥4,800", to: (a) => a.plans[2].price },
      ],
    },
    {
      // ボタニカルお客様の声: 引用1件構成。本文・お名前・補足を testimonials[0] へ写像する
      // （見出し行を持たないデモなので headline は使わない）。
      // アバターの頭文字（1文字の「M」）はクラス名等と衝突しうるためスワップ対象外。
      id: "voice",
      label: "お客様の声",
      optional: true,
      demoId: "botanical-botanical-testimonial",
      swaps: [
        {
          from:
            "「敏感肌で何を使っても荒れていたのに、これだけは穏やか。香りも自然で、夜のスキンケアが癒やしの時間になりました。」",
          to: (a) => quoted(a.testimonials[0].body),
        },
        { from: "三浦 美咲", to: (a) => a.testimonials[0].name },
        { from: "ブルーム会員 · 6ヶ月利用", to: (a) => a.testimonials[0].meta },
      ],
    },
    {
      id: "footer",
      label: "フッター",
      demoId: "botanical-botanical-footer",
      swaps: [
        { from: "Verdé", to: (a) => a.shopName },
        {
          from: "植物の力で、肌と心を整える。自然と共にあるウェルネスを、あなたの毎日へ。",
          to: (a) => a.intro,
        },
      ],
    },
  ],
};

// ── クリニック（ミニマル）────────────────────────────────────────────
const clinicDefaults: LpAnswers = {
  shopName: "はる内科クリニック",
  area: "四谷",
  tagline: "からだの不調に、専門的な安心を",
  intro:
    "地域のかかりつけ医として内科・循環器内科を中心に丁寧な診察を行います。初診の方もお気軽にご相談ください。",
  features: [
    { title: "経験豊富な専門医", desc: "循環器内科専門医による的確な診断" },
    { title: "オンライン予約対応", desc: "待ち時間を減らす事前予約システム" },
    { title: "土曜診療あり", desc: "平日お忙しい方にも通いやすい診療体制" },
  ],
  plans: [
    { name: "スタンダード健診", price: "¥8,000", desc: "基本項目一式" },
    { name: "プレミアム健診", price: "¥18,000", desc: "腫瘍マーカー追加" },
    { name: "プラチナ健診", price: "¥35,000", desc: "画像検査フルセット" },
  ],
  // 実在しない人物を装わないよう、お名前はイニシャル表記のサンプルにしてある。
  testimonials: [
    {
      headline: "説明が丁寧で安心できました。",
      body: "検査の結果を図で示しながら説明していただき、納得したうえで治療を始められました。質問にも嫌な顔ひとつせず答えてくださいます。",
      name: "K・T 様",
      meta: "40代 ・ 定期通院",
    },
    {
      headline: "待ち時間が短くて助かります。",
      body: "予約してから伺うので、ほとんど待たずに診察していただけます。仕事の昼休みでも間に合うのがありがたいです。",
      name: "N・Y 様",
      meta: "30代 ・ WEB予約を利用",
    },
    {
      headline: "土曜に診てもらえるのが心強い。",
      body: "平日は通えないため土曜診療は本当に助かります。健康診断の結果についても、そのまま相談に乗っていただけました。",
      name: "H・O 様",
      meta: "50代 ・ 健康診断で受診",
    },
  ],
  photos: [],
  hiddenSections: [],
  phone: "03-1234-5678",
  address: "東京都新宿区四谷1-2-3",
  hours: "9:00〜18:00（土曜は13:00まで）",
  ctaLabel: "WEBで予約する",
  ctaHref: "tel:03-1234-5678",
};

export const clinicTemplate: IndustryTemplate = {
  id: "clinic",
  name: "クリニック",
  description: "ミニマルな意匠で、信頼感と清潔感を伝える予約LP。",
  schemaType: "MedicalClinic",
  // ミニマルキットの唯一の差し色（MinimalTestimonial の罫、SwissHero のアクセント）
  accentHex: "#e5341a",
  // MinimalTestimonial は引用1件構成
  testimonialSlots: 1,
  photoSection: {
    id: "photos",
    label: "写真ギャラリー",
    afterSectionId: "features",
    eyebrow: "院内のご案内",
    heading: "写真で見る",
    theme: {
      bg: "bg-neutral-50",
      text: "text-neutral-900",
      muted: "text-neutral-500",
      accent: "text-[#e5341a]",
      border: "border-neutral-200",
      font: "",
    },
  },
  defaults: clinicDefaults,
  sections: [
    {
      id: "nav",
      label: "ナビゲーション",
      demoId: "minimal-minimal-nav",
      swaps: [
        { from: "Atelier", to: (a) => a.shopName },
        { from: "はじめる", to: (a) => a.ctaLabel },
      ],
    },
    {
      id: "hero",
      label: "ヒーロー",
      demoId: "minimal-swiss-hero",
      swaps: [
        { from: "余白こそ", to: (a) => a.tagline },
        // <br/> で分割された2行目は空文字にして単行のキャッチコピーへ畳む
        { from: "最上の装飾。", to: () => "" },
        {
          from: "規律あるグリッドと精密なタイポグラフィのための、最小限の構成要素。",
          to: (a) => a.intro,
        },
        { from: "はじめる", to: (a) => a.ctaLabel },
      ],
    },
    {
      // 6原則のうち3つを features[0..2] に割り当てる
      id: "features",
      label: "診療の特徴",
      optional: true,
      demoId: "minimal-feature-grid-swiss",
      swaps: [
        { from: "グリッド設計", to: (a) => a.features[0].title },
        {
          from: "8pt基準のモジュラーグリッドで、すべての要素を整然と配置する。",
          to: (a) => a.features[0].desc,
        },
        { from: "タイプスケール", to: (a) => a.features[1].title },
        {
          from: "比率に基づく明快な見出し階層が、読みやすさを担保する。",
          to: (a) => a.features[1].desc,
        },
        { from: "ヘアライン", to: (a) => a.features[2].title },
        {
          from: "1pxの罫線のみで領域を区切り、影や塗りに頼らない。",
          to: (a) => a.features[2].desc,
        },
      ],
    },
    {
      id: "pricing",
      label: "健診プラン",
      optional: true,
      demoId: "minimal-mono-pricing",
      swaps: [
        { from: "Solo", to: (a) => a.plans[0].name },
        { from: "個人の習作向け", to: (a) => a.plans[0].desc },
        // Solo の価格「0」は単独の数字で他のクラス名等の数字と衝突しうるため対象外
        { from: "Studio", to: (a) => a.plans[1].name },
        { from: "プロのチーム向け", to: (a) => a.plans[1].desc },
        { from: "1,800", to: (a) => a.plans[1].price },
        { from: "Atelier", to: (a) => a.plans[2].name },
        { from: "組織・代理店向け", to: (a) => a.plans[2].desc },
        { from: "4,800", to: (a) => a.plans[2].price },
      ],
    },
    {
      // ミニマルお客様の声: 引用1件構成。本文・お名前・肩書行を testimonials[0] へ写像する
      // （見出し行を持たないデモなので headline は使わない）。
      // 通し番号「№ 03」は装飾のためスワップ対象外。
      id: "voice",
      label: "お客様の声",
      optional: true,
      demoId: "minimal-minimal-testimonial",
      swaps: [
        {
          from:
            "「削るべきものが何も残らなくなったとき、設計は完成する。余白は、私たちが最も信頼する道具だ。」",
          to: (a) => quoted(a.testimonials[0].body),
        },
        { from: "三宅 玲奈", to: (a) => a.testimonials[0].name },
        {
          from: "Design Director — Atelier",
          to: (a) => a.testimonials[0].meta,
        },
      ],
    },
    {
      id: "footer",
      label: "フッター",
      demoId: "minimal-minimal-footer",
      swaps: [
        { from: "Atelier", to: (a) => a.shopName },
        {
          from: "規律あるグリッドと精密なタイポグラフィのためのコンポーネントスタジオ。",
          to: (a) => a.intro,
        },
      ],
    },
  ],
};

// ── 飲食店（洋風キット）──────────────────────────────────────────────
const restaurantDefaults: LpAnswers = {
  shopName: "ビストロ ソレイユ",
  area: "神楽坂",
  tagline: "旬の恵みを、一皿の物語に",
  intro:
    "契約農家から届く朝採れ野菜と、その日仕入れた魚介を薪火で仕上げます。カウンター8席とテーブル4卓の小さな店で、ゆっくりとお過ごしください。",
  // 特徴は「お品書き」セクション（FineDiningMenu）の料理名・説明へ写像されるため、
  // 料理として読める文言をプリフィルにしてある。
  features: [
    { title: "季節野菜のバーニャカウダ", desc: "朝採れ野菜を自家製アンチョビソースで" },
    { title: "国産牛ほほ肉の赤ワイン煮込み", desc: "三日かけて煮込んだ看板料理" },
    { title: "自家製ガトーショコラ", desc: "自家焙煎のコーヒーとともに" },
  ],
  plans: [
    { name: "ランチコース", price: "¥2,800", desc: "前菜・主菜・デザート" },
    { name: "ディナーコース", price: "¥5,800", desc: "全6品のおまかせ" },
    { name: "シェフのおまかせ", price: "¥8,800", desc: "全8品＋ワインペアリング" },
  ],
  // 実在しない人物を装わないよう、お名前はイニシャル表記のサンプルにしてある。
  testimonials: [
    {
      headline: "記念日にまた伺います。",
      body: "ほほ肉の煮込みが忘れられず、記念日に再訪しました。料理に合わせてワインを選んでくださるので、飲みものに詳しくなくても安心です。",
      name: "K・M 様",
      meta: "30代 ・ ディナーでご利用",
    },
    {
      headline: "ひとりランチにも。",
      body: "カウンター席があるので一人でも入りやすい雰囲気でした。前菜の盛り合わせが特においしく、パンのおかわりまでいただきました。",
      name: "S・A 様",
      meta: "40代 ・ ランチでご利用",
    },
    {
      headline: "家族の集まりに。",
      body: "奥のテーブル席で両親の誕生日を祝いました。取り分けにも快く対応いただき、落ち着いて食事ができました。",
      name: "Y・T 様",
      meta: "50代 ・ ご家族でご利用",
    },
  ],
  photos: [],
  hiddenSections: [],
  phone: "03-1234-0000",
  address: "東京都新宿区神楽坂1-2-3",
  hours: "11:30〜14:30 / 17:30〜22:00（月曜定休）",
  ctaLabel: "ご予約はこちら",
  ctaHref: "tel:03-1234-0000",
};

export const restaurantTemplate: IndustryTemplate = {
  id: "restaurant",
  name: "レストラン・カフェ",
  description: "洋風の意匠で、料理の格と居心地を伝える来店予約LP。",
  schemaType: "Restaurant",
  // 洋風キットで唯一、複数デモに明示hexで現れるアクセント（EditorialHero のイタリック差し色、
  // FineDiningMenu のコース見出し、SerifTestimonial の署名に共通のボルドー）。
  // 濃紺 #1c2b46 はヘッダー/フッターの地色、amber-600/700 は罫と小見出しの補助色のため採らない。
  accentHex: "#7b2d3a",
  // SerifTestimonial は引用1件構成
  testimonialSlots: 1,
  photoSection: {
    id: "photos",
    label: "写真ギャラリー",
    afterSectionId: "menu",
    eyebrow: "店内のご案内",
    heading: "写真で見る",
    theme: {
      // 洋風キットの地色（#f8f5ef）と枠線（stone-300）、見出しのセリフ体に合わせる
      bg: "bg-[#f8f5ef]",
      text: "text-stone-900",
      muted: "text-stone-600",
      accent: "text-[#7b2d3a]",
      border: "border-stone-300",
      font: "font-display",
    },
  },
  defaults: restaurantDefaults,
  sections: [
    {
      id: "nav",
      label: "ナビゲーション",
      // ロイヤルヘッダー: CTAボタンを持たないデモなので、最上部の告知バーを
      // 電話・営業時間の常時表示枠として使う（CTAはヒーローのボタンが担う）。
      // 中央の紋章下は屋号（Beauregard）と所在地（Paris）の2行構成。
      demoId: "yofu-royal-header",
      swaps: [
        {
          from: "Livraison offerte · Fournisseur depuis 1894",
          to: (a) => `TEL ${a.phone} ・ ${a.hours}`,
        },
        // swapHtml は配列順の逐次置換なので、短い from（"Paris"）を先に処理してから
        // 利用者の文言（屋号）を差し込む。逆順だと「Café de Paris」のような屋号を
        // 入れた場合に、後続の "Paris" の置換が差し込んだ屋号を壊す。
        { from: "Paris", to: (a) => a.area },
        { from: "Beauregard", to: (a) => a.shopName },
      ],
    },
    {
      id: "hero",
      label: "ヒーロー",
      demoId: "yofu-editorial-hero",
      swaps: [
        { from: "La Maison", to: (a) => a.shopName },
        { from: "The Spring Editorial", to: (a) => a.area },
        // 見出しは「The Art of」+ イタリックの「Quiet」+ <br/> +「Luxury & Form」の
        // 3テキストノード構成。1つ目にキャッチコピーを入れ、残り2つは空文字にして
        // 単行へ畳む（"The Art of" の後続の半角スペースは別ノードなので from に含めない。
        // 含めるとプレビュー（テキストノード単位の置換）が一致しなくなる）。
        // 空文字化する短い from（"Quiet"）を先に処理してからキャッチコピーを差し込む。
        // 逆順だと「Quiet Luxury」のようなキャッチコピーの一部が消える。
        { from: "Quiet", to: () => "" },
        { from: "Luxury & Form", to: () => "" },
        { from: "The Art of", to: (a) => a.tagline },
        {
          from:
            "時を超えて愛される素材と仕立て。職人の手仕事が宿る、静謐で官能的なコレクションを紐解く一冊。",
          to: (a) => a.intro,
        },
        { from: "Read the Story", to: (a) => a.ctaLabel },
        // CTAボタン脇の都市名の列を住所の表示枠として使う（先頭のダッシュは意匠として残す）
        { from: "— Paris · Milano · Kyoto", to: (a) => `— ${a.address}` },
      ],
    },
    {
      // ファインダイニングメニュー: 全五品のうち、前菜・主菜・甘味から1品ずつを
      // features[0..2] に割り当てる。各品の価格（¥2,800 等）は回答スキーマに対応する
      // 項目が無いためスワップ対象外（旅館テンプレの「会席一名様 ￥12,800」と同じ扱い）。
      id: "menu",
      label: "お品書き",
      optional: true,
      demoId: "yofu-fine-dining-menu",
      swaps: [
        { from: "オマール海老のビスク", to: (a) => a.features[0].title },
        { from: "コニャックの香り、生クリームと共に", to: (a) => a.features[0].desc },
        { from: "鴨胸肉のロースト", to: (a) => a.features[1].title },
        { from: "オレンジソース、季節の根菜", to: (a) => a.features[1].desc },
        { from: "スフレ・オ・ショコラ", to: (a) => a.features[2].title },
        { from: "バニラのアングレーズ", to: (a) => a.features[2].desc },
      ],
    },
    {
      // クラシック料金プラン: 3プランの名称・説明・価格をそのまま plans[0..2] へ写像する。
      // 価格脇の「 / 月」は月額会員向けの表記でコース料金には合わないため空文字で畳む。
      // 各プランの特典リスト（「月3点までのケア」等）は回答スキーマに対応する項目が
      // 無いためスワップ対象外。
      id: "pricing",
      label: "コース・料金",
      optional: true,
      demoId: "yofu-classic-pricing",
      swaps: [
        // 「 / 月」の除去は価格の差し込みより先に行う。逆順だと利用者が
        // 「¥3,000 / 月」のような価格を入れた場合に、その一部まで消えてしまう。
        { from: " / 月", to: () => "" },
        { from: "Essentiel", to: (a) => a.plans[0].name },
        { from: "はじめての方へ", to: (a) => a.plans[0].desc },
        { from: "¥3,800", to: (a) => a.plans[0].price },
        { from: "Signature", to: (a) => a.plans[1].name },
        { from: "もっとも選ばれる", to: (a) => a.plans[1].desc },
        { from: "¥9,800", to: (a) => a.plans[1].price },
        { from: "Couture", to: (a) => a.plans[2].name },
        { from: "至高の体験", to: (a) => a.plans[2].desc },
        { from: "¥24,000", to: (a) => a.plans[2].price },
        // 3プラン共通のボタン文言。3枚とも同じCTAに揃えたいので意図的に全置換させる
        { from: "プランを選ぶ", to: (a) => a.ctaLabel },
      ],
    },
    {
      // セリフの推薦文: 引用1件構成。本文・お名前・肩書行を testimonials[0] へ写像する
      // （見出し行を持たないデモなので headline は使わない）。本文は鉤括弧を持たず
      // 左右の大きな引用符が別要素の装飾（1文字）なので quoted() は通さず、引用符も対象外。
      id: "voice",
      label: "お客様の声",
      optional: true,
      demoId: "yofu-serif-testimonial",
      swaps: [
        {
          from:
            "仕立ての一針ひと針に、確かな美意識が宿っている。これほど静かに心を満たしてくれる一着に、私はまだ出会ったことがない。",
          to: (a) => a.testimonials[0].body,
        },
        { from: "Camille Laurent", to: (a) => a.testimonials[0].name },
        {
          from: "Rédactrice en Chef · Vogue Paris",
          to: (a) => a.testimonials[0].meta,
        },
      ],
    },
    {
      // エレガントフッター: 屋号は中央の大見出しとコピーライト行の2箇所に現れるため、
      // どちらも同じ値に揃えたく意図的に全置換させる。
      // - コピーライト行の年号は new Date().getFullYear() で毎年変わるため from に含めない
      //   （屋号だけを置換し、年号はデモのまま動的に出させる）
      // - 同行の接頭辞「Maison」は1列目の列見出しと同じ語で、置換すると見出しが壊れるため対象外
      // - 連絡先・紹介文の枠を持たないデモなので、それらはヘッダー/ヒーロー側で写像している
      // 既知の制約: コピーライト行の屋号は「 Maison Beauregard」という1テキストノードの
      // 一部のため、テキストノード単位で置換するプレビューには反映されない（書き出しHTMLでは置換される）。
      id: "footer",
      label: "フッター",
      demoId: "yofu-elegance-footer",
      swaps: [{ from: "Beauregard", to: (a) => a.shopName }],
    },
  ],
};

/** ウィザードで選択可能な業種テンプレ一覧 */
export const LP_TEMPLATES: IndustryTemplate[] = [
  ryokanTemplate,
  salonTemplate,
  clinicTemplate,
  restaurantTemplate,
];
