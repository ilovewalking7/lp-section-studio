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

/**
 * 料金の先頭にある通貨記号を落とす。デモ側が通貨記号を別要素（例 MonoPricing の
 * `<span>¥</span>`）で持つ料金表に利用者入力の「¥18,000」をそのまま差し込むと
 * 「¥ ¥18,000」と二重表示になるため、そのデモ専用に先頭記号を取り除く。
 */
function withoutCurrencyMark(price: string): string {
  return price.replace(/^[¥￥]\s*/, "");
}

/** 空の項目を除いて区切り文字で連結する（回答が未入力でも区切りだけが残らないように） */
function joinFilled(parts: string[], sep: string): string {
  return parts.filter((v) => v !== "").join(sep);
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
        // href="#" のダミーリンクだけのナビ項目を外す（左）
        {
          fromHtml:
            '<ul class="hidden items-center gap-7 font-mincho text-sm tracking-wider text-stone-700 md:flex"><li><a href="#" class="transition-colors hover:text-[#b7410e]">お料理</a></li><li><a href="#" class="transition-colors hover:text-[#b7410e]">客室</a></li><li><a href="#" class="transition-colors hover:text-[#b7410e]">温泉</a></li></ul>',
          toHtml: () => "",
        },
        // 同上（右）
        {
          fromHtml:
            '<ul class="hidden items-center gap-7 font-mincho text-sm tracking-wider text-stone-700 lg:flex"><li><a href="#" class="transition-colors hover:text-[#b7410e]">館内</a></li><li><a href="#" class="transition-colors hover:text-[#b7410e]">交通</a></li></ul>',
          toHtml: () => "",
        },
        // 開くメニューが無くなるハンバーガーボタンを外す
        {
          fromHtml:
            '<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9 text-stone-700 md:hidden" aria-label="メニュー"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg></button>',
          toHtml: () => "",
        },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // デモの装備表示「全室 露天風呂付」は回答に対応項目が無い施設の断定なので要素ごと外す
        {
          fromHtml:
            '<span class="inline-flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon size-3.5 text-[#6b7a3a]"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>全室 露天風呂付</span>',
          toHtml: () => "",
        },
        // 押しても何も起きない副ボタン（空室を電話で確認）。CTAはもう一方のボタンが担う
        {
          fromHtml:
            '<button class="inline-flex items-center gap-2 font-mincho text-sm text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone size-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>空室を電話で確認</button>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 「創業 明治四十二年」はフォームに創業年の入力欄が無く、デモ由来の架空の
        // 事実表示になるため、実際に入力された営業時間の帯に置き換える。
        { from: "創業 明治四十二年", to: (a) => a.hours },
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
      // 会席品書き: デモは七品だが、回答で埋まるのは features の三品だけなので
      // 先頭三品（先付・椀物・向付）に割り当て、残り四品は rawSwaps で行ごと取り除く。
      // 「水無月の献立 ・ 全七品」は実態と合わない件数・季節表記のため空にする。
      id: "menu",
      label: "特徴・こだわり",
      optional: true,
      demoId: "wafu-kaiseki-menu",
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 回答で埋まらない献立四品（焼物・強肴・食事・水菓子）を行ごと外す
        {
          fromHtml:
            '<div class="flex items-baseline gap-5 py-5 border-t border-dashed border-stone-400/60"><span class="w-12 shrink-0 font-mincho text-base tracking-widest text-[#1f3a5f]">焼物</span><div class="flex-1"><p class="font-mincho text-lg text-stone-900">鰆の西京焼き</p><p class="mt-1 text-xs text-stone-500">ほのかな甘みと焦がしの香</p></div></div><div class="flex items-baseline gap-5 py-5 border-t border-dashed border-stone-400/60"><span class="w-12 shrink-0 font-mincho text-base tracking-widest text-[#1f3a5f]">強肴</span><div class="flex-1"><p class="font-mincho text-lg text-stone-900">信州牛の陶板焼き</p><p class="mt-1 text-xs text-stone-500">山葵醤油でさっぱりと</p></div></div><div class="flex items-baseline gap-5 py-5 border-t border-dashed border-stone-400/60"><span class="w-12 shrink-0 font-mincho text-base tracking-widest text-[#1f3a5f]">食事</span><div class="flex-1"><p class="font-mincho text-lg text-stone-900">土鍋炊き 新米ごはん</p><p class="mt-1 text-xs text-stone-500">香の物・赤出汁とともに</p></div></div><div class="flex items-baseline gap-5 py-5 border-t border-dashed border-stone-400/60"><span class="w-12 shrink-0 font-mincho text-base tracking-widest text-[#1f3a5f]">水菓子</span><div class="flex-1"><p class="font-mincho text-lg text-stone-900">季節の果実と抹茶アイス</p><p class="mt-1 text-xs text-stone-500">甘味でしめくくりを</p></div></div>',
          toHtml: () => "",
        },
        // 入力欄の無いコース価格「会席一名様 ￥12,800（税込）」の帯ごと外す
        {
          fromHtml:
            '<div class="mx-auto mt-10 flex max-w-xl items-center justify-between border-t-2 border-[#1f3a5f]/40 pt-6"><span class="font-mincho text-base tracking-widest text-stone-700">会席一名様</span><span class="font-mincho text-2xl text-stone-900">￥12,800<span class="ml-2 text-xs text-stone-500">（税込）</span></span></div>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 中身は「特徴（3つ）」＝設備やもてなしなので、献立の体裁（見出し・品目ラベル・
        // 献立向けの注記）のままだと「先付: 貸切露天風呂」のような不自然な表示になる。
        // 和の意匠は保ったまま、特徴を並べるセクションとして成立する文言に置き換える。
        { from: "お品書き", to: () => "当館の特徴" },
        { from: "旬彩 会席", to: () => "選ばれる理由" },
        { from: "水無月の献立 ・ 全七品", to: () => "" },
        { from: "仕入れにより献立は一部変更となる場合がございます", to: () => "" },
        { from: "先付", to: () => "一" },
        { from: "椀物", to: () => "二" },
        { from: "向付", to: () => "三" },
        { from: "胡麻豆腐 山葵添え", to: (a) => a.features[0].title },
        { from: "なめらかな口当たりを冷やして", to: (a) => a.features[0].desc },
        { from: "蛤と若布の清汁仕立て", to: (a) => a.features[1].title },
        { from: "出汁の香りを一椀に", to: (a) => a.features[1].desc },
        { from: "本日の鮮魚 三種盛り", to: (a) => a.features[2].title },
        { from: "近海の旬を吟味して", to: (a) => a.features[2].desc },
      ],
    },
    {
      // 松竹梅プラン: 「梅」「竹」「松」の一字は各カードのランク表示だけでなく
      // まとめ見出し「松 ・ 竹 ・ 梅」にも現れ、一字だけを対象にした通常スワップでは
      // 見出しが壊れる（利用者のプラン名に松竹梅が含まれる場合の巻き添えも起きる）。
      // そのため見出しは丸ごと中立な文言に差し替え、カードのランク表示は
      // 読み仮名の span まで含む一意なHTML断片として rawSwaps で置き換える。
      id: "pricing",
      label: "料金プラン",
      optional: true,
      demoId: "wafu-matsu-take-ume-pricing",
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // ランク表示（梅／うめ）を利用者のプラン名に置き換える。読み仮名の span は
        // 対応する入力項目が無いため出力しない
        {
          fromHtml:
            '<span class="font-mincho text-4xl text-stone-900">梅</span><span class="font-mincho text-sm text-stone-400">うめ</span>',
          toHtml: (a) =>
            `<span class="font-mincho text-3xl text-stone-900">${escapeHtml(
              a.plans[0].name
            )}</span>`,
        },
        // ランク表示（竹／たけ）を利用者のプラン名に置き換える。読み仮名の span は
        // 対応する入力項目が無いため出力しない
        {
          fromHtml:
            '<span class="font-mincho text-4xl text-[#b7410e]">竹</span><span class="font-mincho text-sm text-stone-400">たけ</span>',
          toHtml: (a) =>
            `<span class="font-mincho text-3xl text-[#b7410e]">${escapeHtml(
              a.plans[1].name
            )}</span>`,
        },
        // ランク表示（松／まつ）を利用者のプラン名に置き換える。読み仮名の span は
        // 対応する入力項目が無いため出力しない
        {
          fromHtml:
            '<span class="font-mincho text-4xl text-stone-900">松</span><span class="font-mincho text-sm text-stone-400">まつ</span>',
          toHtml: (a) =>
            `<span class="font-mincho text-3xl text-stone-900">${escapeHtml(
              a.plans[2].name
            )}</span>`,
        },
        // プラン特典（和室 一泊二食 等）は回答に対応項目が無い設備・提供内容の断定なので外す
        {
          fromHtml:
            '<ul class="mt-5 flex-1 space-y-3"><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>和室 一泊二食</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>大浴場 利用</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>夕食 季節の小会席</li></ul>',
          toHtml: () => "",
        },
        // 同上（竹プラン）
        {
          fromHtml:
            '<ul class="mt-5 flex-1 space-y-3"><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#b7410e]"><path d="M20 6 9 17l-5-5"></path></svg>広縁付 和室</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#b7410e]"><path d="M20 6 9 17l-5-5"></path></svg>貸切露天 30分</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#b7410e]"><path d="M20 6 9 17l-5-5"></path></svg>夕食 旬彩会席</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#b7410e]"><path d="M20 6 9 17l-5-5"></path></svg>利き酒 三種</li></ul>',
          toHtml: () => "",
        },
        // 同上（松プラン）
        {
          fromHtml:
            '<ul class="mt-5 flex-1 space-y-3"><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>露天風呂付 離れ</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>貸切露天 終日</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>夕食 特撰会席</li><li class="flex items-start gap-2 font-mincho text-sm text-stone-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#6b7a3a]"><path d="M20 6 9 17l-5-5"></path></svg>個室にて お食事</li></ul>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 「／名・税込」は税の扱いを断定してしまう表記（回答に対応項目が無い）ため落とす
        { from: "／名・税込", to: () => "" },
        // プラン名を回答に合わせるため、松竹梅を前提にした見出しを中立な文言にする
        { from: "松 ・ 竹 ・ 梅", to: () => "料金プラン" },
        // 3枚とも同じ予約導線に揃えたいので意図的に全置換させる（linkifyCta がリンク化する）
        { from: "このプランで予約", to: (a) => a.ctaLabel },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 郵便番号を空にしたことで先頭に残る改行を畳む
        {
          fromHtml:
            '<p class="text-xs leading-relaxed text-stone-500"><br/>',
          toHtml: () => '<p class="text-xs leading-relaxed text-stone-500">',
        },
        // href="#" のダミーリンクだけで構成されたサイトマップ列（実在しないページ）を外す
        {
          fromHtml:
            '<div class="grid grid-cols-2 gap-8 sm:grid-cols-3"><div><h3 class="font-mincho text-sm tracking-widest text-stone-900">ご案内</h3><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">お料理</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">客室</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">温泉</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">館内のご案内</a></li></ul></div><div><h3 class="font-mincho text-sm tracking-widest text-stone-900">ご予約</h3><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">空室カレンダー</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">プラン一覧</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">よくある質問</a></li></ul></div><div><h3 class="font-mincho text-sm tracking-widest text-stone-900">アクセス</h3><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">交通のご案内</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">送迎について</a></li><li><a href="#" class="text-xs text-stone-500 transition-colors hover:text-[#b7410e]">周辺の見どころ</a></li></ul></div></div>',
          toHtml: () => "",
        },
        // SNSアカウントの入力欄が無く、href="#" のままになるアイコン列を外す
        {
          fromHtml:
            '<div class="flex items-center gap-4"><a href="#" aria-label="Instagram" class="text-stone-500 transition-colors hover:text-[#b7410e]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram size-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a><a href="#" aria-label="X" class="text-stone-500 transition-colors hover:text-[#b7410e]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter size-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="#" aria-label="YouTube" class="text-stone-500 transition-colors hover:text-[#b7410e]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube size-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg></a></div>',
          toHtml: () => "",
        },
      ],
      swaps: [
        { from: "奥山亭", to: (a) => a.shopName },
        { from: "山あいに佇む、十二室の宿。", to: (a) => a.tagline },
        // 郵便番号の入力欄が無く「〒399-XXXX」がそのまま残るため空にする
        // （残る先頭の <br/> は rawSwaps で畳む）
        { from: "〒399-XXXX", to: () => "" },
        { from: "長野県奥山郡奥山町温泉 1-2-3", to: (a) => a.address },
        { from: "TEL 0265-XX-XXXX", to: (a) => `TEL ${a.phone}` },
        // 六月に固定された時候の挨拶（実態と合わない）を落とす
        { from: "― 水無月の候、青葉の風にのせて ―", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 屋号ロゴの href="#" を外し、リンクではない素の要素にする（開始タグ）
        {
          fromHtml:
            '<a href="#" class="flex items-center gap-2">',
          toHtml: () => '<div class="flex items-center gap-2">',
        },
        // 同上（終了タグ。このセクションで </span></a> はロゴの1箇所のみ）
        {
          fromHtml:
            '</span></a>',
          toHtml: () => "</span></div>",
        },
        // href="#" のダミーリンクだけのナビ項目を外す
        {
          fromHtml:
            '<ul class="hidden items-center gap-8 md:flex"><li><a href="#" class="text-sm tracking-wide text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">コレクション</a></li><li><a href="#" class="text-sm tracking-wide text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">成分</a></li><li><a href="#" class="text-sm tracking-wide text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">私たちの物語</a></li><li><a href="#" class="text-sm tracking-wide text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">ジャーナル</a></li></ul>',
          toHtml: () => "",
        },
        // 押しても何も起きない検索アイコンボタンを外す
        {
          fromHtml:
            '<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 w-9 rounded-full text-[#5e6b4f] hover:bg-[#5e6b4f]/10" aria-label="バッグ"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag size-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg></button>',
          toHtml: () => "",
        },
        // 開くメニューが無くなるハンバーガーボタンを外す
        {
          fromHtml:
            '<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-full text-[#5e6b4f] md:hidden" aria-label="メニュー"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu size-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg></button>',
          toHtml: () => "",
        },
        // 常時 max-h-0 で畳まれたままのモバイルメニュー（ダミーリンクを含む）を外す
        {
          fromHtml:
            '<div class="overflow-hidden border-t border-[#5e6b4f]/10 transition-all md:hidden max-h-0"><ul class="flex flex-col gap-1 px-6 py-3"><li><a href="#" class="block rounded-lg px-2 py-2.5 text-sm text-[#5e6b4f] hover:bg-[#5e6b4f]/10">コレクション</a></li><li><a href="#" class="block rounded-lg px-2 py-2.5 text-sm text-[#5e6b4f] hover:bg-[#5e6b4f]/10">成分</a></li><li><a href="#" class="block rounded-lg px-2 py-2.5 text-sm text-[#5e6b4f] hover:bg-[#5e6b4f]/10">私たちの物語</a></li><li><a href="#" class="block rounded-lg px-2 py-2.5 text-sm text-[#5e6b4f] hover:bg-[#5e6b4f]/10">ジャーナル</a></li><li class="pt-2"><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 px-4 py-2 h-10 w-full rounded-full bg-[#5e6b4f] text-sm text-[#f3f1e7] hover:bg-[#4b563f]">ご予約はこちら</button></li></ul></div>',
          toHtml: () => "",
        },
      ],
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 押しても何も起きない副ボタン（私たちの哲学）を外す
        {
          fromHtml:
            '<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground py-2 h-12 rounded-full px-6 text-sm tracking-wide text-[#5e6b4f] hover:bg-[#5e6b4f]/10"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles size-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>私たちの哲学</button>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // デモ由来の英字バッジ・認証表示（ヴィーガン認証等）は店主が入力していない
        // 主張になるため、回答済みの所在地・営業時間・住所に置き換える。
        { from: "NATURE-DERIVED CARE", to: (a) => a.area },
        {
          from: "ヴィーガン認証 · 動物実験フリー · 100% リサイクル容器",
          to: (a) => joinFilled([a.hours, a.address], " ・ "),
        },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 4つ目の特徴（地球への配慮）は回答に対応項目が無く、容器素材の断定になるので外す
        {
          fromHtml:
            '<div class="flex gap-5"><span class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#5e6b4f]/12 text-[#5e6b4f]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-recycle size-6"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path><path d="m14 16-3 3 3 3"></path><path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path><path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path></svg></span><div><h3 class="font-serif text-xl font-medium">地球への配慮</h3><p class="mt-2 text-sm leading-relaxed text-[#5e6b4f]">容器は100%リサイクル素材。詰め替えプログラムで廃棄物を最小限に抑えます。</p></div></div>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 見出しはスキンケアブランド向けのデモ文言なので、業種として中立な文言にする
        { from: "植物の知恵を、毎日のケアに", to: () => "サロンの特徴" },
        { from: "自然と科学の調和から生まれる、わたしたちのこだわり。", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // プラン特典（月替わりボタニカルボックス等）は提供していない特典の断定なので外す
        {
          fromHtml:
            '<ul class="mt-6 flex-1 space-y-3"><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">月1回のお手入れガイド</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">コミュニティ参加</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">季節のレシピ配信</span></li></ul>',
          toHtml: () => "",
        },
        // 同上（ブルームプラン。会員限定15%オフ等）
        {
          fromHtml:
            '<ul class="mt-6 flex-1 space-y-3"><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#cdd4b6]"><path d="M20 6 9 17l-5-5"></path></svg><span class="text-[#f3f1e7]/90"></span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#cdd4b6]"><path d="M20 6 9 17l-5-5"></path></svg><span class="text-[#f3f1e7]/90">月替わりボタニカルボックス</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#cdd4b6]"><path d="M20 6 9 17l-5-5"></path></svg><span class="text-[#f3f1e7]/90">オンライン瞑想クラス</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#cdd4b6]"><path d="M20 6 9 17l-5-5"></path></svg><span class="text-[#f3f1e7]/90">会員限定15%オフ</span></li></ul>',
          toHtml: () => "",
        },
        // 同上（プレミアムプラン）
        {
          fromHtml:
            '<ul class="mt-6 flex-1 space-y-3"><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class=""></span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">個別カウンセリング</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">スパ施術 月1回無料</span></li><li class="flex items-start gap-2.5 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check mt-0.5 size-4 shrink-0 text-[#86a06d]"><path d="M20 6 9 17l-5-5"></path></svg><span class="">新商品の先行アクセス</span></li></ul>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 月額サブスクのデモなので、施術単価に合わない「/ 月」と解約条件の断定を落とす。
        // 「/ 月」の除去は価格の差し込みより先に行う（利用者が「¥6,800 / 月」と
        // 入力していた場合に、その一部まで消えてしまうのを防ぐ）。
        { from: "/ 月", to: () => "" },
        // 3枚とも同じ予約導線に揃えたいので意図的に全置換させる（linkifyCta がリンク化する）
        { from: "プランを選ぶ", to: (a) => a.ctaLabel },
        { from: "MEMBERSHIP", to: () => "ご料金" },
        { from: "あなたのペースで育つプラン", to: () => "メニュー・料金" },
        { from: "いつでも変更・解約可能。植物のように、無理なく続くウェルネスを。", to: () => "" },
        // 特典リスト（デモ由来の架空の特典）は rawSwaps で行ごと取り除く。
        // 「シード/ブルームの全特典」だけは名称スワップより先に空にしておく
        // （先に空にしないと、後続の名称置換で rawSwaps の fromHtml が
        //   利用者入力に依存してしまい一致しなくなる）。
        { from: "シードの全特典", to: () => "" },
        { from: "ブルームの全特典", to: () => "" },
        { from: "シード", to: (a) => a.plans[0].name },
        { from: "はじめての方に。基本のケアを無料で。", to: (a) => a.plans[0].desc },
        { from: "¥0", to: (a) => a.plans[0].price },
        { from: "ブルーム", to: (a) => a.plans[1].name },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // アバターの頭文字がデモのまま（M）だと投稿者名と食い違うため、お名前の一文字目にする
        {
          fromHtml:
            '<span class="flex size-11 items-center justify-center rounded-full bg-[#5e6b4f]/15 font-serif text-base font-medium text-[#5e6b4f]">M</span>',
          toHtml: (a) => `<span class="flex size-11 items-center justify-center rounded-full bg-[#5e6b4f]/15 font-serif text-base font-medium text-[#5e6b4f]">${escapeHtml([...a.testimonials[0].name.trim()][0] ?? "")}</span>`,
        },
      ],
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // SNSアカウントの入力欄が無く、href="#" のままになるアイコン列を外す
        {
          fromHtml:
            '<div class="mt-5 flex gap-2"><a href="#" class="flex size-9 items-center justify-center rounded-full border border-[#5e6b4f]/25 text-[#5e6b4f] transition-colors hover:bg-[#5e6b4f] hover:text-[#f3f1e7]" aria-label="ソーシャルリンク"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram size-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a><a href="#" class="flex size-9 items-center justify-center rounded-full border border-[#5e6b4f]/25 text-[#5e6b4f] transition-colors hover:bg-[#5e6b4f] hover:text-[#f3f1e7]" aria-label="ソーシャルリンク"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter size-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="#" class="flex size-9 items-center justify-center rounded-full border border-[#5e6b4f]/25 text-[#5e6b4f] transition-colors hover:bg-[#5e6b4f] hover:text-[#f3f1e7]" aria-label="ソーシャルリンク"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube size-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg></a></div>',
          toHtml: () => "",
        },
        // href="#" のダミーリンクだけで構成された取扱商品・サポート列を外す
        {
          fromHtml:
            '<div><h4 class="font-serif text-sm font-medium tracking-wide">ショップ</h4><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">スキンケア</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">ヘアケア</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">アロマ</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">ギフト</a></li></ul></div><div><h4 class="font-serif text-sm font-medium tracking-wide">ブランド</h4><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">私たちの物語</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">成分へのこだわり</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">サステナビリティ</a></li></ul></div><div><h4 class="font-serif text-sm font-medium tracking-wide">サポート</h4><ul class="mt-4 space-y-2.5"><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">お問い合わせ</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">配送と返品</a></li><li><a href="#" class="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]">よくある質問</a></li></ul></div>',
          toHtml: () => "",
        },
        // 配信していないメールマガジンへのダミーリンクを外す
        {
          fromHtml:
            '<a href="#" class="inline-flex items-center gap-1.5 transition-colors hover:text-[#3f4a35]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send size-3.5"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg> ジャーナルを購読する</a>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // コピーライト行の「Verdé Botanicals.」の屋号以外の部分を落とす。
        // 年号は new Date().getFullYear() で毎年変わるため from に含めない。
        // 既知の制約: この行は「© 2026 Verdé Botanicals. All rights reserved.」という
        // 1テキストノードの一部のため、テキストノード単位のプレビューには反映されない。
        { from: " Botanicals.", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 屋号ロゴの href="#" を外し、リンクではない素の要素にする（開始タグ）
        {
          fromHtml:
            '<a href="#" class="text-sm font-medium uppercase tracking-[0.3em]">',
          toHtml: () => '<div class="text-sm font-medium uppercase tracking-[0.3em]">',
        },
        // 同上（終了タグ。このセクションで </span></a> はロゴの1箇所のみ）
        {
          fromHtml:
            '</span></a>',
          toHtml: () => "</span></div>",
        },
        // デザインスタジオ由来のダミーリンク（Work/Studio/Journal/Contact）を外す
        {
          fromHtml:
            '<nav aria-label="メイン" class="hidden items-center gap-10 md:flex"><a href="#" class="text-[13px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">Work</a><a href="#" class="text-[13px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">Studio</a><a href="#" class="text-[13px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">Journal</a><a href="#" class="text-[13px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">Contact</a></nav>',
          toHtml: () => "",
        },
        // 開くメニューが無くなるハンバーガーボタンを外す
        {
          fromHtml:
            '<button type="button" aria-label="メニューを開く" class="md:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu size-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg></button>',
          toHtml: () => "",
        },
        // 常時 max-h-0 で畳まれたままのモバイルメニュー（ダミーリンクを含む）を外す
        {
          fromHtml:
            '<nav aria-label="モバイル" class="overflow-hidden border-neutral-200 md:hidden max-h-0 border-t-0"><div class="mx-auto flex max-w-6xl flex-col px-6"><a href="#" class="border-b border-neutral-100 py-4 text-sm tracking-wide text-neutral-700">Work</a><a href="#" class="border-b border-neutral-100 py-4 text-sm tracking-wide text-neutral-700">Studio</a><a href="#" class="border-b border-neutral-100 py-4 text-sm tracking-wide text-neutral-700">Journal</a><a href="#" class="border-b border-neutral-100 py-4 text-sm tracking-wide text-neutral-700">Contact</a></div></nav>',
          toHtml: () => "",
        },
      ],
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
        // デザインスタジオのデモ由来の識別子（Studio / 2026、01 — 12、Index、Color、
        // タイポグラフィ論の一文）は業種と無関係なので、回答済みの情報に置き換える。
        { from: "Studio / 2026", to: (a) => a.area },
        { from: "01 — 12", to: (a) => a.hours },
        { from: "Index", to: () => "ごあいさつ" },
        { from: "Color", to: () => "アクセス" },
        { from: "モノクロームを基調に、ただ一点のみアクセントを許す。", to: (a) => a.address },
        { from: "International Typographic Style", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 4〜6つ目の原則はタイポグラフィ論のデモ文言で、回答にも対応項目が無いため外す
        {
          fromHtml:
            '<article class="flex min-h-56 flex-col border-b border-r border-neutral-200 p-8 transition-colors hover:bg-neutral-50"><span class="mb-10 text-[11px] tabular-nums tracking-[0.25em] text-neutral-400">04</span><h3 class="mb-3 text-lg font-medium tracking-tight">余白の設計</h3><p class="text-sm leading-relaxed text-neutral-600">意図的な空白がリズムを生み、密度を制御する。</p></article><article class="flex min-h-56 flex-col border-b border-r border-neutral-200 p-8 transition-colors hover:bg-neutral-50"><span class="mb-10 text-[11px] tabular-nums tracking-[0.25em] text-neutral-400">05</span><h3 class="mb-3 text-lg font-medium tracking-tight">モノクローム</h3><p class="text-sm leading-relaxed text-neutral-600">無彩色を基調に、ただ一点のアクセントだけを許容する。</p></article><article class="flex min-h-56 flex-col border-b border-r border-neutral-200 p-8 transition-colors hover:bg-neutral-50"><span class="mb-10 text-[11px] tabular-nums tracking-[0.25em] text-neutral-400">06</span><h3 class="mb-3 text-lg font-medium tracking-tight">反転テーマ</h3><p class="text-sm leading-relaxed text-neutral-600">明暗を入れ替えても破綻しない、対称的な配色設計。</p></article>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 見出しはタイポグラフィ論のデモ文言なので、業種として中立な文言にする
        { from: "設計の原理", to: () => "診療の特徴" },
        { from: "Six principles of the International Typographic Style.", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 1枚目の価格「0」は単独の数字でクラス名の数字とも衝突するため、通し番号「01」から続く一意な断片ごと差し替える
        {
          fromHtml:
            'text-neutral-400">01</span></div><div class="mb-1 flex items-baseline gap-1"><span class="text-sm text-neutral-500">¥</span><span class="text-5xl font-medium tabular-nums tracking-tight">0</span>',
          toHtml: (a) => `text-neutral-400">01</span></div><div class="mb-1 flex items-baseline gap-1"><span class="text-sm text-neutral-500">¥</span><span class="text-5xl font-medium tabular-nums tracking-tight">${escapeHtml(withoutCurrencyMark(a.plans[0].price))}</span>`,
        },
        // 特典リストがSaaSのデモのまま（12 コンポーネント 等）なので外す
        {
          fromHtml:
            '<ul class="mb-10 flex-1 space-y-3 text-sm text-neutral-700"><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>12 コンポーネント</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>ライブプレビュー</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>コードコピー</li></ul>',
          toHtml: () => "",
        },
        // 同上（Figma 連携 等）
        {
          fromHtml:
            '<ul class="mb-10 flex-1 space-y-3 text-sm text-neutral-700"><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-[#e5341a]"></span>無制限の構成要素</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-[#e5341a]"></span>ダーク反転対応</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-[#e5341a]"></span>優先サポート</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-[#e5341a]"></span>Figma 連携</li></ul>',
          toHtml: () => "",
        },
        // 同上。特に「SLA 99.9%」は虚偽になりうる保証表示なので必ず消す
        {
          fromHtml:
            '<ul class="mb-10 flex-1 space-y-3 text-sm text-neutral-700"><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>SSO / 監査ログ</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>専用ワークスペース</li><li class="flex items-center gap-3"><span class="h-px w-3 shrink-0 bg-neutral-900"></span>SLA 99.9%</li></ul>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 月額サブスクのデモなので、健診料金に合わない「Monthly / JPY」を落とす
        { from: "Monthly / JPY", to: () => "" },
        // ダミーリンク（href="#"）のボタンだが、CTA文言にすると linkifyCta が
        // ctaHref へのリンクに書き換えるため、3枚とも予約導線として生かす
        { from: "選択する", to: (a) => a.ctaLabel },
        { from: "Solo", to: (a) => a.plans[0].name },
        { from: "個人の習作向け", to: (a) => a.plans[0].desc },
        // 価格はデモ側が通貨記号を別要素（<span>¥</span>）で持つため、
        // 利用者入力の先頭記号を落として「¥ ¥18,000」の二重表示を防ぐ。
        // Solo の価格「0」は単独の数字でクラス名の数字とも衝突するので rawSwaps で置換する。
        { from: "Studio", to: (a) => a.plans[1].name },
        { from: "プロのチーム向け", to: (a) => a.plans[1].desc },
        { from: "1,800", to: (a) => withoutCurrencyMark(a.plans[1].price) },
        { from: "Atelier", to: (a) => a.plans[2].name },
        { from: "組織・代理店向け", to: (a) => a.plans[2].desc },
        { from: "4,800", to: (a) => withoutCurrencyMark(a.plans[2].price) },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // Docs/Components/Changelog/Status 等、SaaSデモ由来のダミーリンク列を外す
        {
          fromHtml:
            '<nav aria-label="Studio" class="col-span-6 md:col-span-2 lg:col-span-2"><div class="mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">Studio</div><ul class="space-y-2.5"><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Work</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">About</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Journal</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Contact</a></li></ul></nav><nav aria-label="Resources" class="col-span-6 md:col-span-2 lg:col-span-2"><div class="mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">Resources</div><ul class="space-y-2.5"><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Docs</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Components</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Changelog</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Status</a></li></ul></nav><nav aria-label="Legal" class="col-span-6 md:col-span-2 lg:col-span-2"><div class="mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">Legal</div><ul class="space-y-2.5"><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Privacy</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">Terms</a></li><li><a href="#" class="text-sm text-neutral-600 transition-colors hover:text-neutral-900">License</a></li></ul></nav>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // コピーライト行「© 2026 Atelier Studio」の接尾辞と、デモの様式名を落とす。
        // 年号は毎年変わるため from に含めず、接尾辞（前方の半角スペース込み）だけを消す。
        // 屋号の置換より先に処理する（屋号自体が " Studio" を含む場合の巻き添えを防ぐ）。
        // 既知の制約: コピーライト行は1テキストノードの一部のためプレビューには反映されない。
        { from: " Studio", to: () => "" },
        { from: "International Typographic Style", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // href="#" のダミーリンクだけのナビ項目を外す（左）
        {
          fromHtml:
            '<nav aria-label="メイン（左）" class="hidden flex-1 items-center gap-7 text-[11px] uppercase tracking-[0.22em] text-[#f3ede1]/80 lg:flex"><a href="#" class="transition-colors hover:text-amber-300">Collection</a><a href="#" class="transition-colors hover:text-amber-300">Atelier</a><a href="#" class="transition-colors hover:text-amber-300">Histoire</a></nav>',
          toHtml: () => "",
        },
        // 同上（右）
        {
          fromHtml:
            '<nav aria-label="メイン（右）" class="hidden flex-1 items-center justify-end gap-7 text-[11px] uppercase tracking-[0.22em] text-[#f3ede1]/80 lg:flex"><a href="#" class="transition-colors hover:text-amber-300">Journal</a><a href="#" class="transition-colors hover:text-amber-300">Boutiques</a><a href="#" class="transition-colors hover:text-amber-300">Contact</a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search size-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></nav>',
          toHtml: () => "",
        },
      ],
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 誌面デモ由来の目次風ラベル（Collection/Atelier/Journal）を外す
        {
          fromHtml:
            '<div class="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-stone-500 sm:flex"><span>Collection</span><span>Atelier</span><span>Journal</span></div>',
          toHtml: () => "",
        },
      ],
      swaps: [
        { from: "La Maison", to: (a) => a.shopName },
        { from: "The Spring Editorial", to: (a) => a.area },
        // 雑誌デモ由来の号数・写真クレジット・フランス語のコピーは店の実態ではないため、
        // 号数とクレジットは落とし、装飾枠は屋号＋所在地の飾り板として使う。
        { from: "Vol. XII", to: () => "" },
        { from: "Photograph No. 04", to: () => "" },
        { from: "“Élégance", to: (a) => a.shopName },
        { from: "intemporelle”", to: (a) => a.area },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 回答で埋まらない品（フォアグラのテリーヌ）を行ごと外す
        {
          fromHtml:
            '<li><div class="flex items-baseline gap-2"><span class="font-display text-lg text-stone-900">フォアグラのテリーヌ</span><span class="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400"></span><span class="font-display text-lg text-stone-900">¥3,400</span></div><p class="mt-0.5 text-xs italic text-stone-500">無花果のコンフィチュール添え</p></li>',
          toHtml: () => "",
        },
        // 同上（舌平目のムニエル）
        {
          fromHtml:
            '<li><div class="flex items-baseline gap-2"><span class="font-display text-lg text-stone-900">舌平目のムニエル</span><span class="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400"></span><span class="font-display text-lg text-stone-900">¥5,200</span></div><p class="mt-0.5 text-xs italic text-stone-500">ブールノワゼット、ケッパー</p></li>',
          toHtml: () => "",
        },
        // 各品の価格は入力欄が無くデモの値のままになるため、リーダー罫ごと外す（前菜）
        {
          fromHtml:
            '<span class="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400"></span><span class="font-display text-lg text-stone-900">¥2,800</span>',
          toHtml: () => "",
        },
        // 同上（主菜）
        {
          fromHtml:
            '<span class="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400"></span><span class="font-display text-lg text-stone-900">¥4,600</span>',
          toHtml: () => "",
        },
        // 同上（甘味）
        {
          fromHtml:
            '<span class="flex-1 translate-y-[-3px] border-b border-dotted border-stone-400"></span><span class="font-display text-lg text-stone-900">¥1,800</span>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 各品の説明に前置きされるフランス語名（「Bisque de Homard — 」等）は
        // 利用者の料理と無関係になるため、名前と区切りの「 — 」を落とす。
        { from: "Bisque de Homard", to: () => "" },
        { from: "Terrine de Foie Gras", to: () => "" },
        { from: "Magret de Canard", to: () => "" },
        { from: "Sole Meunière", to: () => "" },
        { from: "Soufflé au Chocolat", to: () => "" },
        { from: " — ", to: () => "" },
        // サービス料・税の扱いを断定する脚注（回答に対応項目が無い）を落とす
        { from: "Service compris · 税・サービス料込", to: () => "" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // 特典リストがクリーニング店のデモのまま（月3点までのケア 等）なので外す
        {
          fromHtml:
            '<ul class="flex-1 space-y-3 text-sm text-stone-600"><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>月3点までのケア</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>標準クリーニング</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>店頭受け取り</li></ul>',
          toHtml: () => "",
        },
        // 同上（集荷・配送無料 等）
        {
          fromHtml:
            '<ul class="flex-1 space-y-3 text-sm text-stone-600"><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-amber-700"><path d="M20 6 9 17l-5-5"></path></svg>月10点までのケア</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-amber-700"><path d="M20 6 9 17l-5-5"></path></svg>手仕上げプレス</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-amber-700"><path d="M20 6 9 17l-5-5"></path></svg>集荷・配送無料</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-amber-700"><path d="M20 6 9 17l-5-5"></path></svg>シーズン保管</li></ul>',
          toHtml: () => "",
        },
        // 同上（24時間優先対応 等）
        {
          fromHtml:
            '<ul class="flex-1 space-y-3 text-sm text-stone-600"><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>点数無制限</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>専属アトリエ担当</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>24時間優先対応</li><li class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-4 shrink-0 text-stone-400"><path d="M20 6 9 17l-5-5"></path></svg>革・特殊素材対応</li></ul>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // 「 / 月」の除去は価格の差し込みより先に行う。逆順だと利用者が
        // 「¥3,000 / 月」のような価格を入れた場合に、その一部まで消えてしまう。
        { from: " / 月", to: () => "" },
        // 会員制サブスクのデモ文言をコース料金の見出しに直す
        { from: "Adhésion", to: () => "" },
        { from: "会員プラン", to: () => "コース・料金" },
        { from: "Recommandé", to: () => "おすすめ" },
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
      // 書き出し専用の生HTML置換。既知の制約: プレビュー（SwapBoundary はテキストノード
      // 単位でしか置換しない）には反映されず、プレビューでは元のまま表示される。
      rawSwaps: [
        // Maison/Boutique/Service 等、ブティックデモ由来のダミーリンク列を外す
        {
          fromHtml:
            '<div class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3"><div><h4 class="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">Maison</h4><ul class="mt-4 space-y-2.5 text-sm text-[#f3ede1]/70"><li><a href="#" class="transition-colors hover:text-amber-200">Histoire</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Atelier</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Savoir-faire</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Presse</a></li></ul></div><div><h4 class="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">Boutique</h4><ul class="mt-4 space-y-2.5 text-sm text-[#f3ede1]/70"><li><a href="#" class="transition-colors hover:text-amber-200">Collection</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Nouveautés</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Sur-mesure</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Cadeaux</a></li></ul></div><div><h4 class="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">Service</h4><ul class="mt-4 space-y-2.5 text-sm text-[#f3ede1]/70"><li><a href="#" class="transition-colors hover:text-amber-200">Contact</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Livraison</a></li><li><a href="#" class="transition-colors hover:text-amber-200">Retours</a></li><li><a href="#" class="transition-colors hover:text-amber-200">FAQ</a></li></ul></div></div>',
          toHtml: () => "",
        },
        // 実在しない規約ページへのダミーリンクを外す
        {
          fromHtml:
            '<div class="flex gap-6 uppercase tracking-[0.2em]"><a href="#" class="hover:text-amber-200">Confidentialité</a><a href="#" class="hover:text-amber-200">Conditions</a></div>',
          toHtml: () => "",
        },
      ],
      swaps: [
        // コピーライト行の接頭辞「Maison 」を屋号の置換より先に落とす。
        // 1列目の列見出しは「Maison」（直後が終了タグ）なので半角スペース込みの
        // from とは一致せず、見出しは壊れない。
        { from: "Maison ", to: () => "" },
        { from: "Beauregard", to: (a) => a.shopName },
      ],
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
