import { registry, type RegistryEntry } from "@/registry";

/**
 * 同名コンポーネントを見分けるための短い識別子。
 *
 * 880個のうち26種の名前が重複している（例「オーロラ・ヒーロー」×2、
 * 「コマンドパレット」×3）。一覧に同じ名前が並ぶとどちらを選べばよいか
 * 分からないので、**重複しているものだけ** どのコレクション
 * （`demos/` 直下のフォルダ）由来かを名前に添える。
 * 重複が無ければ null＝表示は今までどおり。
 *
 * 判定は日本語名（レジストリの name）で行う。ID と 1:1 に対応する翻訳名でも
 * 同じ組が重複するため、言語ごとに結果が変わらない方が一覧として安定する。
 */
const DUPLICATED_NAMES: ReadonlySet<string> = (() => {
  const seen = new Set<string>();
  const duplicated = new Set<string>();
  for (const entry of registry) {
    if (seen.has(entry.name)) duplicated.add(entry.name);
    else seen.add(entry.name);
  }
  return duplicated;
})();

/** "./demos/hero2/AuroraHero.tsx" → "hero2"（demos 直下は null） */
function collectionOf(path: string): string | null {
  const matched = /^\.\/demos\/(.+)\/[^/]+$/.exec(path);
  return matched ? matched[1] : null;
}

/** 同名が他にある場合だけ、区別用のコレクション名を返す */
export function variantLabel(
  entry: Pick<RegistryEntry, "name" | "path">
): string | null {
  if (!DUPLICATED_NAMES.has(entry.name)) return null;
  return collectionOf(entry.path);
}
