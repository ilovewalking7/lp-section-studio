#!/usr/bin/env node
/**
 * build-manifest.mjs
 *
 * `src/registry/demos/**' /*.tsx` の各ファイルから `meta` だけを抽出し、
 * 軽量な `src/registry/manifest.ts` を生成する。
 *
 * これにより、スタジオの初期ロードでは**文字列メタのみ**を読み込み、
 * コンポーネント本体は選択時に遅延ロードされる（初期表示が高速）。
 *
 * 使い方: node scripts/build-manifest.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const demosDir = join(root, "src", "registry", "demos");

/** demos 配下の .tsx を再帰列挙 */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** `export const meta: DemoMeta = { ... }` のオブジェクトリテラル文字列を抽出（文字列リテラル対応のブレース数え） */
function extractMetaLiteral(src) {
  const marker = "export const meta: DemoMeta = {";
  const i = src.indexOf(marker);
  if (i === -1) return null;
  const start = i + marker.length - 1; // '{' の位置
  let depth = 0;
  let inStr = null;
  let esc = false;
  for (let j = start; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return src.slice(start, j + 1);
    }
  }
  return null;
}

/** 既存の id 規約に合わせる（CamelCase/パス → kebab-case） */
function idFromPath(globPath) {
  return globPath
    .replace(/^\.\/demos\//, "")
    .replace(/\.tsx$/, "")
    .replace(/[/_]/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

const files = walk(demosDir).sort();
const entries = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const literal = extractMetaLiteral(src);
  if (!literal) {
    console.warn(`⚠ meta が見つかりません: ${relative(root, file)}`);
    continue;
  }
  let meta;
  try {
    // meta はプリミティブ/配列/文字列のみのリテラル。ローカルの信頼できるファイルを評価。
    meta = (0, eval)("(" + literal + ")");
  } catch (e) {
    console.warn(`⚠ meta の解析に失敗: ${relative(root, file)} — ${e.message}`);
    continue;
  }
  // glob キー（"./demos/..."）に正規化
  const globPath =
    "./" + relative(join(root, "src", "registry"), file).split("\\").join("/");
  entries.push({ id: idFromPath(globPath), path: globPath, ...meta });
}

const header = `// このファイルは scripts/build-manifest.mjs により自動生成されます。直接編集しないでください。
import type { ManifestEntry } from "./types";

export const manifest: ManifestEntry[] = `;

writeFileSync(
  join(root, "src", "registry", "manifest.ts"),
  header + JSON.stringify(entries, null, 2) + ";\n"
);

console.log(`✓ manifest を生成しました: ${entries.length} 件 → src/registry/manifest.ts`);

/*
 * 軽量な統計ファイルも併せて生成する。
 * LP（ホーム）はこの数字 3 つしか使わないため、880 件の完全な manifest を
 * 初期チャンクに載せずに済む（Core Web Vitals 対策）。
 */
const THEME_CATEGORIES = new Set([
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
const allCategories = new Set(entries.map((e) => e.category));
const stats = {
  components: entries.length,
  styles: [...allCategories].filter((c) => THEME_CATEGORIES.has(c)).length,
  categories: allCategories.size,
};

writeFileSync(
  join(root, "src", "registry", "stats.generated.ts"),
  `// このファイルは scripts/build-manifest.mjs により自動生成されます。直接編集しないでください。
export const STATS = ${JSON.stringify(stats)} as const;
`
);

console.log(
  `✓ stats を生成しました: ${stats.components} 件 / ${stats.styles} スタイル / ${stats.categories} カテゴリ`
);
