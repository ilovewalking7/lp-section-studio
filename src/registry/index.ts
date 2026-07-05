import type { ComponentType } from "react";
import type { RegistryEntry } from "./types";
import { manifest } from "./manifest";

export type { DemoMeta, RegistryEntry, ManifestEntry } from "./types";

/**
 * レジストリ構築:
 *   - 一覧（メタ）は `manifest.ts`（軽量・自動生成）から取得
 *   - コンポーネント本体とソースは `import.meta.glob`（**非 eager**）で**遅延ロード**
 *
 * これにより初期バンドルにコンポーネント本体が含まれず、初期表示が高速になる。
 * 新しいコンポーネントは demos/ に1ファイル追加し `npm run manifest` で反映される
 * （`npm run dev` / `npm run build` は前段で自動実行）。
 */

const componentLoaders = import.meta.glob("./demos/**/*.tsx", {
  import: "default",
}) as Record<string, () => Promise<ComponentType>>;

const sourceLoaders = import.meta.glob("./demos/**/*.tsx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export const CATEGORY_ORDER = [
  "基本",
  "ヒーロー・LP",
  "マーケティング",
  "コンバージョン",
  "価格・オファー",
  "オンボーディング",
  "ダッシュボード",
  "AI / チャット",
  "アプリUI",
  "ナビゲーション",
  "インタラクション",
  "ボタン",
  "背景アニメ",
  "テキストアニメ",
  "カード演出",
  "ボタン演出",
  "スクロール演出",
  "マーキー",
  "ローダー・マイクロ",
  "Awwwards",
  "3Dカルーセル",
  "3Dアニメ",
  "ドラッグ操作",
  "フォーム",
  "コマース",
  "設定",
  // ── スタイルテーマ別 ──
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
];

function categoryRank(cat: string): number {
  const i = CATEGORY_ORDER.indexOf(cat);
  return i === -1 ? 99 : i;
}

const missing: string[] = [];

export const registry: RegistryEntry[] = manifest
  .map((m): RegistryEntry | null => {
    const load = componentLoaders[m.path];
    const loadSource = sourceLoaders[m.path];
    if (!load || !loadSource) {
      missing.push(m.path);
      return null;
    }
    return { align: "center", ...m, load, loadSource };
  })
  .filter((e): e is RegistryEntry => e !== null)
  .sort((a, b) => {
    const ca = categoryRank(a.category);
    const cb = categoryRank(b.category);
    if (ca !== cb) return ca - cb;
    return a.name.localeCompare(b.name, "ja");
  });

if (missing.length > 0 && import.meta.env?.DEV) {
  console.warn(
    `[registry] manifest にあるがファイルが見つからない (要 npm run manifest):`,
    missing
  );
}

export const categories: string[] = Array.from(
  new Set(registry.map((e) => e.category))
).sort((a, b) => categoryRank(a) - categoryRank(b));
