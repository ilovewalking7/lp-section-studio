/**
 * 業種テンプレ定義（旅館・サロン・クリニックの3種）。
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
 * （例: サロン/クリニックのナビ・フッターに連絡先が無い、証言セクションに
 * 対応するフィールドが LpAnswers に無い等）は素直にスキップしている。
 */
import type { IndustryTemplate, LpAnswers } from "./types";

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
  defaults: ryokanDefaults,
  sections: [
    {
      // 暖簾ナビ: 屋号は暖簾の一字ずつ("奥"/"山"/"亭")に分割されており
      // 安全に置換できないため、CTAボタンのみをスワップする。
      demoId: "wafu-noren-nav",
      swaps: [{ from: "ご予約", to: (a) => a.ctaLabel }],
    },
    {
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
      // 筆文字お客様の声: LpAnswers にレビュー用フィールドが無く、安全に写像できる
      // 文言も無い（人名・所感はいずれも店舗情報と結び付かない）ためスワップなし。
      demoId: "wafu-fude-testimonial",
      swaps: [],
    },
    {
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
  defaults: salonDefaults,
  sections: [
    {
      demoId: "botanical-botanical-nav",
      swaps: [
        { from: "Verdé", to: (a) => a.shopName },
        // デスクトップ・モバイル双方に同一文言で現れるボタン（ログイン）を
        // 予約導線のCTAとして扱う
        { from: "ログイン", to: (a) => a.ctaLabel },
      ],
    },
    {
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
      // 会員バッジの「ブルーム」部分だけを中位プラン名に差し替える
      demoId: "botanical-botanical-testimonial",
      swaps: [
        {
          from: "ブルーム会員 · 6ヶ月利用",
          to: (a) => `${a.plans[1].name}会員 · 6ヶ月利用`,
        },
      ],
    },
    {
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
  defaults: clinicDefaults,
  sections: [
    {
      demoId: "minimal-minimal-nav",
      swaps: [
        { from: "Atelier", to: (a) => a.shopName },
        { from: "はじめる", to: (a) => a.ctaLabel },
      ],
    },
    {
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
      demoId: "minimal-minimal-testimonial",
      swaps: [
        {
          from: "Design Director — Atelier",
          to: (a) => `Design Director — ${a.shopName}`,
        },
      ],
    },
    {
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

/** ウィザードで選択可能な業種テンプレ一覧 */
export const LP_TEMPLATES: IndustryTemplate[] = [
  ryokanTemplate,
  salonTemplate,
  clinicTemplate,
];
