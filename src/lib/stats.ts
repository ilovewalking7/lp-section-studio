import { STATS } from "@/registry/stats.generated";

/**
 * サイト統計（LP のスタットバンド等で使用）。
 *
 * 数値 3 つだけを軽量な自動生成 `stats.generated.ts` から読む。
 * こうすることで、880 件の完全な `manifest`（名前・説明・タグ入り）や
 * `import.meta.glob` のローダ群を LP（ホーム）の初期チャンクに載せずに済み、
 * SSR プリレンダ時にも 880 個のデモを巻き込まない。
 */

// スタイルテーマ系カテゴリ（13種）。スタジオ側のスタイル数集計に使う。
export const THEME_CATEGORIES = new Set([
  "和風",
  "洋風",
  "ミニマル",
  "ブルータリスト",
  "グラスモーフィズム",
  "レトロ・Y2K",
  "ラグジュアリー",
  "プレイフル",
  "ニューモーフィズム",
  "メンフィス",
  "ダークテック",
  "北欧",
  "ボタニカル",
]);

export interface SiteStats {
  components: number;
  styles: number;
  categories: number;
}

export function getStats(): SiteStats {
  return { ...STATS };
}
