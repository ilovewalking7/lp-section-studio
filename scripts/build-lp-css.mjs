#!/usr/bin/env node
/**
 * build-lp-css.mjs
 *
 * ミセテLP（src/lp/）の書き出しHTMLに埋め込む、ビルド時コンパイル済みCSSを生成する。
 * 書き出しHTMLは Tailwind CDN（cdn.tailwindcss.com）に依存せず、この1ファイルの
 * 内容をそのまま <style> にインライン埋め込みして自己完結させる（src/lp/export.ts 参照）。
 *
 * 実体は tailwindcss CLI（devDependencies の tailwindcss ^3.4 に同梱、新規npm依存なし）を
 * child_process 経由で1回呼ぶだけ。--content には、テンプレ（templates.ts）が実際に使う
 * 全デモ + 依存する UI プリミティブ/utils のソースを列挙し、それらが使う Tailwind クラスだけを
 * 抽出・コンパイルする。
 *
 * ★★★ テンプレに新しいセクション（デモ）を追加したら、このリスト（CONTENT）に
 * ★★★ そのファイルを追記し、必ず `npm run lp:css` を実行して src/lp/lp.css を再生成すること。
 * ★★★ さもないと、追加したセクションの見た目が書き出しHTMLで崩れる（CSSドリフト）。
 *
 * 使い方: node scripts/build-lp-css.mjs（= npm run lp:css）
 */
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// テンプレ（templates.ts）が使う全セクションのソース + それらが依存する UI プリミティブ/utils。
const CONTENT = [
  // 旅館（和風キット）
  "src/registry/demos/wafu/NorenNav.tsx",
  "src/registry/demos/wafu/RyokanHero.tsx",
  "src/registry/demos/wafu/KaisekiMenu.tsx",
  "src/registry/demos/wafu/MatsuTakeUmePricing.tsx",
  "src/registry/demos/wafu/FudeTestimonial.tsx",
  "src/registry/demos/wafu/WashiFooter.tsx",
  // サロン（ボタニカル）
  "src/registry/demos/botanical/BotanicalNav.tsx",
  "src/registry/demos/botanical/BotanicalHero.tsx",
  "src/registry/demos/botanical/BotanicalFeature.tsx",
  "src/registry/demos/botanical/BotanicalPricing.tsx",
  "src/registry/demos/botanical/BotanicalTestimonial.tsx",
  "src/registry/demos/botanical/BotanicalFooter.tsx",
  // クリニック（ミニマル）
  "src/registry/demos/minimal/MinimalNav.tsx",
  "src/registry/demos/minimal/SwissHero.tsx",
  "src/registry/demos/minimal/FeatureGridSwiss.tsx",
  "src/registry/demos/minimal/MonoPricing.tsx",
  "src/registry/demos/minimal/MinimalTestimonial.tsx",
  "src/registry/demos/minimal/MinimalFooter.tsx",
  // 依存UIプリミティブ + utils
  "src/components/ui/*.tsx",
  "src/lib/utils.ts",
].join(",");

const args = [
  "tailwindcss",
  "-c",
  "tailwind.config.js",
  "-i",
  "src/index.css",
  "-o",
  "src/lp/lp.css",
  "--content",
  CONTENT,
  "--minify",
];

execFileSync("npx", args, { cwd: root, stdio: "inherit" });

console.log("✓ src/lp/lp.css を生成しました（ミセテLP 書き出しHTML埋め込み用）");
