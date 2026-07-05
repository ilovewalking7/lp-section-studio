import type { ComponentType } from "react";

/**
 * コンポーネントのメタ情報。各デモファイルが `export const meta` で宣言する。
 */
export type DemoMeta = {
  /** 表示名 */
  name: string;
  /** カテゴリ（サイドバーのグルーピング） */
  category: string;
  /** 短い説明 */
  description: string;
  /** プレビュー領域でのレイアウト */
  align?: "start" | "center" | "full";
  /** 検索・絞り込み用タグ */
  tags?: string[];
  /** 「なぜ効くのか」— 心理学/マーケ/Webデザイン観点の設計意図 */
  principle?: string;
  /** "上級" バッジ */
  level?: "advanced";
  /** NEW バッジ */
  isNew?: boolean;
};

/**
 * ビルド時に生成される軽量マニフェストの1エントリ。
 * コンポーネント本体のコードは含まず、文字列メタのみ（= 初期ロードが軽い）。
 */
export type ManifestEntry = DemoMeta & {
  /** ファイルパス由来の一意なID */
  id: string;
  /** glob キーと一致するモジュールパス（例: "./demos/wafu/RyokanHero.tsx"） */
  path: string;
};

/**
 * 実行時のレジストリ・エントリ。コンポーネントとソースは**遅延ロード**する。
 */
export type RegistryEntry = ManifestEntry & {
  /** コンポーネント本体を遅延ロード */
  load: () => Promise<ComponentType>;
  /** ソースコード（コピー用）を遅延ロード */
  loadSource: () => Promise<string>;
};
