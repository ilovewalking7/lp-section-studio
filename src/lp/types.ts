/** ウィザードの回答。全テンプレ共通のスキーマ。 */
export interface LpAnswers {
  shopName: string; // 店名・屋号
  area: string; // 地域（例: 箱根・強羅）
  tagline: string; // キャッチコピー
  intro: string; // 紹介文（2〜3文）
  features: [Feature, Feature, Feature];
  plans: [PricePlan, PricePlan, PricePlan];
  /** お客様の声（テンプレごとに表示件数が異なる。IndustryTemplate.testimonialSlots 参照） */
  testimonials: [Testimonial, Testimonial, Testimonial];
  /** 掲載写真（0〜MAX_PHOTOS枚）。data URI で保持し、書き出しHTMLにそのまま埋め込む */
  photos: LpPhoto[];
  /** 非表示にするセクションID（SectionSlot.id / PhotoSectionConfig.id） */
  hiddenSections: string[];
  phone: string;
  address: string;
  hours: string; // 営業時間
  ctaLabel: string; // 例: ご予約はこちら
  ctaHref: string; // tel:/mailto:/https:(LINE等)
}
export interface Feature {
  title: string;
  desc: string;
}
export interface PricePlan {
  name: string;
  price: string;
  desc: string;
}
/** お客様の声1件。デモによって使うフィールド数が異なる（headline/meta は使わないテンプレもある） */
export interface Testimonial {
  headline: string; // 短い見出し（例: 忘れられぬ、静けさでした。）
  body: string; // 本文
  name: string; // お名前（例: 高瀬 様）
  meta: string; // 補足（例: 東京都 ・ 連泊にてご利用）
}
/** 掲載写真1枚。dataUrl は圧縮済みの data:image/jpeg;base64,... */
export interface LpPhoto {
  dataUrl: string;
  alt: string; // 写真の説明（altテキスト兼キャプション）
}

/** 掲載できる写真の上限枚数 */
export const MAX_PHOTOS = 3;

/** 1スワップ = レンダ済みテキストの完全一致置換。from はデモの実文言。 */
export interface Swap {
  from: string;
  to: (a: LpAnswers) => string;
}

/**
 * 1生HTMLスワップ = レンダ済みHTML文字列断片ごとの完全一致置換。
 * Swap（テキストノード単位）では表現できない構造（例: 屋号を1文字ずつ独立した
 * div要素に分割している暖簾ナビ）を、書き出し（export.ts）時のみHTML断片ごと
 * 差し替えるための機構。
 * 注意（既知の制約）: プレビュー（SwapBoundary）はテキストノード単位でしか置換しない
 * ため rawSwaps は反映されない。書き出しHTMLにのみ効く（docs/LP-BUILDER.md 参照）。
 */
export interface RawSwap {
  fromHtml: string;
  toHtml: (a: LpAnswers) => string;
}

/** テンプレのセクション = 既存デモID + そのセクション内で適用するスワップ群 */
export interface SectionSlot {
  /** セクションの安定ID（表示ON/OFFの識別子。テンプレ内で一意） */
  id: string;
  /** UI表示名（例: 「お品書き」） */
  label: string;
  /** true のとき利用者が非表示にできる（ナビ・ヒーローなど骨格セクションは false） */
  optional?: boolean;
  demoId: string;
  swaps: Swap[];
  /** 書き出し専用の生HTMLスワップ（省略時は無し） */
  rawSwaps?: RawSwap[];
}

/** 写真セクション（PhotoShowcase）の配色・書体。テンプレのデザインに合わせる */
export interface PhotoTheme {
  /** 背景（例: "bg-[#f5f1e8]"） */
  bg: string;
  /** 見出し色（例: "text-stone-900"） */
  text: string;
  /** 補足文の色（例: "text-stone-600"） */
  muted: string;
  /** アクセント色（例: "text-[#b7410e]"） */
  accent: string;
  /** 枠線色（例: "border-stone-300"） */
  border: string;
  /** 書体クラス（例: "font-mincho"。不要なら空文字） */
  font: string;
}

/**
 * 写真セクションの設定。利用者がアップロードした写真を、テンプレの世界観に合わせて
 * 見せるための独自セクション（既存デモではなく src/lp/sections/PhotoShowcase.tsx が描画）。
 * 写真が0枚のとき、および hiddenSections に id が含まれるときは描画しない。
 */
export interface PhotoSectionConfig {
  /** セクションID（hiddenSections の識別子。例: "photos"） */
  id: string;
  /** UI表示名（例: 「写真ギャラリー」） */
  label: string;
  /** このセクションIDの直後に挿入する（該当が無ければ末尾） */
  afterSectionId: string;
  /** 小見出し（例: 「館内のご案内」） */
  eyebrow: string;
  /** 見出し（例: 「写真で見る」） */
  heading: string;
  theme: PhotoTheme;
}

export interface IndustryTemplate {
  id: string; // "ryokan" | "salon" | "clinic" | "restaurant"
  name: string; // 表示名（例: 旅館・民宿）
  description: string;
  /**
   * schema.org の LocalBusiness サブタイプ（書き出しHTMLのJSON-LD構造化データに使う）。
   * 例: 旅館="Hotel" / サロン="BeautySalon" / クリニック="MedicalClinic" / 飲食="Restaurant"
   */
  schemaType: string;
  /** ブランドカラー（favicon・theme-color に使う #rrggbb） */
  accentHex: string;
  /** このテンプレのデモが実際に表示できる「お客様の声」の件数（1〜3）。フォームの入力欄数になる */
  testimonialSlots: number;
  sections: SectionSlot[];
  /** 写真セクションの設定（全テンプレ必須） */
  photoSection: PhotoSectionConfig;
  defaults: LpAnswers; // 業種別プリフィル
}
