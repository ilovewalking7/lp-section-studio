/** ウィザードの回答。全テンプレ共通のスキーマ。 */
export interface LpAnswers {
  shopName: string; // 店名・屋号
  area: string; // 地域（例: 箱根・強羅）
  tagline: string; // キャッチコピー
  intro: string; // 紹介文（2〜3文）
  features: [Feature, Feature, Feature];
  plans: [PricePlan, PricePlan, PricePlan];
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
  demoId: string;
  swaps: Swap[];
  /** 書き出し専用の生HTMLスワップ（省略時は無し） */
  rawSwaps?: RawSwap[];
}

export interface IndustryTemplate {
  id: string; // "ryokan" | "salon" | "clinic"
  name: string; // 表示名（例: 旅館・民宿）
  description: string;
  sections: SectionSlot[];
  defaults: LpAnswers; // 業種別プリフィル
}
