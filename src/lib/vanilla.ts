import { createElement, type ComponentType } from "react";
import utilsRaw from "./utils.ts?raw";
import { HEAD_TOKEN_INJECTION } from "./vanillaHead.generated";

/** UI プリミティブの生ソース（name → source）。dynamic 版で同梱する。 */
const uiRaw = import.meta.glob("../components/ui/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function uiSource(name: string): string | undefined {
  const hit = Object.entries(uiRaw).find(([p]) => p.endsWith(`/${name}.tsx`));
  return hit?.[1];
}

/** renderToStaticMarkup の最小型（react-dom/server.browser を遅延ロード） */
type ServerRenderer = { renderToStaticMarkup: (el: unknown) => string };

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** 1行で出力される静的マークアップを、読みやすくインデント整形する */
export function formatHtml(html: string): string {
  const tokens = html
    .replace(/>\s+</g, "><")
    .split(/(<[^>]+>)/g)
    .filter((t) => t.length > 0);
  const out: string[] = [];
  let depth = 0;
  const pad = () => "  ".repeat(Math.max(0, depth));
  for (const t of tokens) {
    if (t.startsWith("</")) {
      depth--;
      out.push(pad() + t);
    } else if (t.startsWith("<") && !t.startsWith("<!")) {
      const tag = /^<\s*([a-zA-Z0-9-]+)/.exec(t)?.[1]?.toLowerCase();
      out.push(pad() + t);
      const selfClose = t.endsWith("/>") || (tag !== undefined && VOID_ELEMENTS.has(tag));
      if (!selfClose) depth++;
    } else {
      const text = t.trim();
      if (text) out.push(pad() + text);
    }
  }
  return out.join("\n");
}

/**
 * 書き出す HTML の先頭に入れる出所表示。HTML コメント1行なので、不要なら消してよい
 *（MIT なので表示は義務ではない）。貼られた先で「これは何で、どこの物か」を
 * 辿れるようにするためだけに入れている。
 */
const CREDIT =
  "<!-- LP Section Studio · MIT · https://github.com/ilovewalking7/lp-section-studio -->";

/**
 * そのまま保存して開ける完結HTML（Tailwind CDN + デザイントークン付き）に包む。
 *
 * bg-card / text-muted-foreground などは**このプロジェクト固有のトークン**で、
 * 素の Tailwind には存在しない。CDN を1行読むだけでは一切当たらず、
 * bg-card は transparent、text-muted-foreground は真っ黒になる。
 * そこで書き出しの源流で HEAD_TOKEN_INJECTION を必ず差し込む。
 * 位置は Tailwind CDN の <script> より**後ろ**（`tailwind.config` は
 * CDN が定義するグローバルへの代入なので、先に置くと ReferenceError になる）。
 */
function wrapDocument(inner: string): string {
  const indented = inner
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
  return `<!doctype html>
${CREDIT}
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- これ1行で Tailwind のクラスがそのまま効く（ビルド不要） -->
    <script src="https://cdn.tailwindcss.com"></script>
${HEAD_TOKEN_INJECTION}  </head>
  <body>
${indented}
  </body>
</html>`;
}

/**
 * React コンポーネントを「素のHTML」に変換する。
 * - Tailwind クラスは保持（CDN でそのまま動く）
 * - lucide アイコンはインライン SVG に展開される
 * - 初期レンダリングの**静的スナップショット**（useState/useEffect の動きは含まない）
 */
export async function generateVanillaHtml(Comp: ComponentType): Promise<string> {
  const server = (await import(
    "react-dom/server.browser"
  )) as unknown as ServerRenderer;
  const markup = server.renderToStaticMarkup(createElement(Comp));
  return wrapDocument(formatHtml(markup));
}

// ──────────────────────────────────────────────────────────────────────────
// dynamic 版: 実際に動く React をそのまま1枚のHTMLに（CDN + import map + Babel）
// ──────────────────────────────────────────────────────────────────────────

interface Collected {
  react: Set<string>; // react の named import（フック等）
  lucide: Set<string>; // lucide-react の named import
  cva: boolean;
  clsx: boolean;
  twMerge: boolean;
}

const RE_IMPORT = /^\s*import\s+[^;]*?from\s*["'][^"']+["'];?\s*$/gm;
const RE_BARE_IMPORT = /^\s*import\s+["'][^"']+["'];?\s*$/gm;

/** import 行を取り除き、外部依存（react/lucide/cva/clsx/twMerge）を集約する */
function stripImports(src: string, c: Collected): string {
  const handle = (stmt: string) => {
    const from = /from\s*["']([^"']+)["']/.exec(stmt)?.[1] ?? "";
    const named = /\{([^}]*)\}/.exec(stmt)?.[1];
    const names = named
      ? named
          .split(",")
          .map((n) => n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim())
          .filter(Boolean)
      : [];
    if (from === "react") names.forEach((n) => c.react.add(n));
    else if (from === "lucide-react") names.forEach((n) => c.lucide.add(n));
    else if (from === "class-variance-authority") c.cva = true;
    else if (from === "clsx") c.clsx = true;
    else if (from === "tailwind-merge") c.twMerge = true;
    // @/lib/utils, @/components/ui/*, @/registry などは同梱するので破棄
    return "";
  };
  return src.replace(RE_IMPORT, handle).replace(RE_BARE_IMPORT, "");
}

/** `export const meta = {...};`（と DemoMeta 型 import）を取り除く */
function stripMeta(src: string): string {
  const i = src.indexOf("export const meta");
  if (i === -1) return src;
  let j = src.indexOf("{", i);
  let depth = 0;
  let inStr: string | null = null;
  let esc = false;
  let end = -1;
  for (; j < src.length; j++) {
    const ch = src[j];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") inStr = ch;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  if (end === -1) return src;
  let k = end + 1;
  if (src[k] === ";") k++;
  return src.slice(0, i) + src.slice(k);
}

/** デモの default export を名前付き関数化し、レンダー対象名を返す */
function liftDefault(src: string): { code: string; name: string } {
  let m = /export\s+default\s+function\s+([A-Za-z0-9_]+)/.exec(src);
  if (m) {
    return {
      code: src.replace(/export\s+default\s+function/, "function"),
      name: m[1],
    };
  }
  m = /export\s+default\s+([A-Za-z0-9_]+)\s*;?/.exec(src);
  if (m) {
    return { code: src.replace(/export\s+default\s+[A-Za-z0-9_]+\s*;?/, ""), name: m[1] };
  }
  return {
    code: src.replace(/export\s+default/, "const __DemoMain ="),
    name: "__DemoMain",
  };
}

/** 同梱ソースから `export ` キーワードを外す（モジュール内ローカル定義にする） */
function deExport(src: string): string {
  return src.replace(/^\s*export\s+(?=(const|function|class|let|var)\b)/gm, "");
}

const PIN = {
  react: "18.3.1",
  reactDom: "18.3.1",
  lucide: "0.460.0",
  cva: "0.7.1",
  clsx: "2.1.1",
  twMerge: "2.5.5",
} as const;

/**
 * React コンポーネントを「動く素のHTML」に変換する（dynamic vanilla）。
 * - import map + esm.sh で react / lucide / cva 等を解決
 * - Babel standalone で TSX をブラウザ内変換 → 実際に動く（state・アニメも保持）
 * - 依存UIプリミティブと cn を同梱（demo は自己完結のまま）
 * 注意: 開いた時にCDN（esm.sh / Tailwind / Babel）へ通信できる必要がある。
 */
export function generateDynamicVanillaHtml(demoSource: string): string {
  const c: Collected = {
    react: new Set(),
    lucide: new Set(),
    cva: false,
    clsx: false,
    twMerge: false,
  };

  const neededUi = new Set<string>();
  for (const m of demoSource.matchAll(/@\/components\/ui\/([\w-]+)/g)) {
    neededUi.add(m[1]);
  }

  const parts: string[] = [];
  const usesUtils =
    /@\/lib\/utils/.test(demoSource) ||
    [...neededUi].some((n) => /@\/lib\/utils/.test(uiSource(n) ?? ""));
  if (usesUtils) parts.push(deExport(stripImports(utilsRaw, c)));
  for (const name of neededUi) {
    const src = uiSource(name);
    if (src) parts.push(deExport(stripImports(src, c)));
  }

  const demo = liftDefault(stripMeta(demoSource));
  parts.push(stripImports(demo.code, c));

  const imports: string[] = [
    `import * as React from "react";`,
    `import { createRoot } from "react-dom/client";`,
  ];
  if (c.react.size)
    imports.push(`import { ${[...c.react].sort().join(", ")} } from "react";`);
  if (c.lucide.size)
    imports.push(
      `import { ${[...c.lucide].sort().join(", ")} } from "lucide-react";`
    );
  if (c.cva) imports.push(`import { cva } from "class-variance-authority";`);
  if (c.clsx) imports.push(`import { clsx } from "clsx";`);
  if (c.twMerge) imports.push(`import { twMerge } from "tailwind-merge";`);

  const script = [
    ...imports,
    "",
    ...parts,
    "",
    `const __root = document.getElementById("root");`,
    `if (__root) createRoot(__root).render(React.createElement(${demo.name}));`,
  ].join("\n");

  const importMap = JSON.stringify(
    {
      imports: {
        react: `https://esm.sh/react@${PIN.react}`,
        "react/jsx-runtime": `https://esm.sh/react@${PIN.react}/jsx-runtime`,
        "react-dom": `https://esm.sh/react-dom@${PIN.reactDom}`,
        "react-dom/client": `https://esm.sh/react-dom@${PIN.reactDom}/client?deps=react@${PIN.react}`,
        "lucide-react": `https://esm.sh/lucide-react@${PIN.lucide}?deps=react@${PIN.react}&external=react`,
        "class-variance-authority": `https://esm.sh/class-variance-authority@${PIN.cva}`,
        clsx: `https://esm.sh/clsx@${PIN.clsx}`,
        "tailwind-merge": `https://esm.sh/tailwind-merge@${PIN.twMerge}`,
      },
    },
    null,
    2
  );

  return `<!doctype html>
${CREDIT}
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Tailwind（ビルド不要） -->
    <script src="https://cdn.tailwindcss.com"></script>
${HEAD_TOKEN_INJECTION}    <!-- TSX をブラウザ内で変換 -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
${importMap}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <!-- 実際に動く React（state・アニメも保持） -->
    <script type="text/babel" data-type="module" data-presets="typescript,react">
${script}
    </script>
  </body>
</html>`;
}
