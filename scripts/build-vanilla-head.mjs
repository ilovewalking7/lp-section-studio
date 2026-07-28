/**
 * build-vanilla-head.mjs
 *
 * バニラHTML書き出し（src/lib/vanilla.ts）が <head> に差し込む
 * **デザイントークン定義**を `src/lib/vanillaHead.generated.ts` に生成する。
 *
 * なぜ生成物にするのか:
 *   bg-card / text-muted-foreground / bg-background などはこのプロジェクト固有の
 *   トークンで、素の Tailwind には存在しない（tailwind.config.js の theme.extend と
 *   src/index.css の :root / .dark が定義の出所）。書き出したHTMLが
 *   cdn.tailwindcss.com を1行読むだけだと、これらのクラスは一切当たらず
 *   bg-card → transparent、text-muted-foreground → 真っ黒になる（880件中430件が該当）。
 *   Play CDN 公式の方法どおり `tailwind.config = {...}` と CSS 変数を <head> に
 *   埋めれば直るが、`wrapDocument` はスタジオの書き出し機能としてブラウザ上でも
 *   走るため、実行時にファイルを読むことができない。よってビルド前に定数化する。
 *
 *   （src/index.css を `?raw` で直接 import する手もあるが、vitest は既定で
 *    CSS の import を空文字に差し替えるためテスト環境で成立しない。
 *    manifest.ts / stats.generated.ts / freeIds.ts と同じ生成物方式に揃える。）
 *
 * 使い方: node scripts/build-vanilla-head.mjs
 * 元データ: tailwind.config.js（darkMode / theme.extend）, src/index.css（:root / .dark）
 * ドリフト検査: src/lib/vanillaHead.test.ts が元データから組み直して突き合わせる。
 *
 * 注: 他の scripts と違い shebang を付けていない。この検査から import するが、
 *     Vite の SSR 変換は `#!` を解析できず "Expected ident" で落ちるため。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** CSS から `selector { ... }` の中身を、括弧の対応を数えて取り出す */
function extractCssBlock(css, selector) {
  const at = css.indexOf(selector);
  if (at === -1) return null;
  const open = css.indexOf("{", at);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  return null;
}

/** CSS コメントを落として1行1宣言に整える */
function tidyDeclarations(body, indent) {
  return body
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `${indent}${s};`)
    .join("\n");
}

/**
 * <head> に差し込む文字列を組み立てる。
 * scripts と src/lib/vanillaHead.test.ts の両方から使えるよう export している。
 */
export async function buildHeadInjection(rootDir = root) {
  const cfg = (await import(pathToFileURL(join(rootDir, "tailwind.config.js")).href))
    .default;
  const css = readFileSync(join(rootDir, "src", "index.css"), "utf-8");
  const cssRoot = extractCssBlock(css, ":root");
  const dark = extractCssBlock(css, ".dark");
  if (!cssRoot || !dark) {
    throw new Error("src/index.css から :root / .dark を取り出せませんでした");
  }
  const config = JSON.stringify(
    { darkMode: cfg.darkMode, theme: { extend: cfg.theme.extend } },
    null,
    2
  )
    .split("\n")
    .map((l, i) => (i === 0 ? l : `      ${l}`))
    .join("\n");

  return `    <!-- このコンポーネント集のデザイントークン。
         bg-card / text-muted-foreground などは素の Tailwind には無いので、
         CDN に設定を渡して定義する（Play CDN 公式の方法）。 -->
    <script>
      tailwind.config = ${config};
    </script>
    <style>
      :root {
${tidyDeclarations(cssRoot, "        ")}
      }
      .dark {
${tidyDeclarations(dark, "        ")}
      }
      * { border-color: hsl(var(--border)); }
      body { background-color: hsl(var(--background)); color: hsl(var(--foreground)); }
    </style>
`;
}

/** テンプレートリテラルに埋め込める形へ逃がす */
function escapeTemplate(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

// このモジュールを直接実行したときだけ生成する（test からは import して使う）
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const injection = await buildHeadInjection();
  const out = join(root, "src", "lib", "vanillaHead.generated.ts");
  writeFileSync(
    out,
    `// このファイルは scripts/build-vanilla-head.mjs により自動生成されます。直接編集しないでください。
// 元データ: tailwind.config.js（darkMode / theme.extend）と src/index.css（:root / .dark）

/**
 * バニラHTML書き出しの <head> に差し込むデザイントークン定義。
 * 素の Tailwind に無い bg-card / text-muted-foreground などを CDN 版でも
 * 解決させるための設定（Play CDN 公式の方法）。
 * Tailwind CDN の <script> より**後ろ**に置くこと。
 */
export const HEAD_TOKEN_INJECTION = \`${escapeTemplate(injection)}\`;
`
  );
  console.log(
    `✓ バニラHTML用のトークン定義を生成しました: ${(injection.length / 1024).toFixed(1)} KB → src/lib/vanillaHead.generated.ts`
  );
}
