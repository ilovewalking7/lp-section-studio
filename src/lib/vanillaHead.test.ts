import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { buildHeadInjection } from "../../scripts/build-vanilla-head.mjs";
import { HEAD_TOKEN_INJECTION } from "./vanillaHead.generated";
import { CSS_SLOT, generateVanillaHtml, generateDynamicVanillaHtml } from "./vanilla";

/**
 * 書き出しHTMLが「1枚で完結している」ことを固定する検査。
 *
 * 静的版は CSS をその HTML 1枚ぶんだけコンパイルして埋め込む方式にした
 * （scripts/build-static-html.mjs）。cdn.tailwindcss.com を読む作りだと、
 * オフライン・社内網・CDN障害で色が消えるうえ、Tailwind 自身が Play CDN を
 * 本番非推奨としているため。ここが崩れると「保存して開けばそのまま使える」が
 * 成立しない。
 *
 * 動的版（esm.sh + Babel で実際に動く React を埋める別機能）は CDN 依存が
 * 本質的なので、そちらだけは従来どおり `tailwind.config` を注入する。
 * `vanillaHead.generated.ts` は tailwind.config.js / src/index.css からの派生物
 * なので、freeIds.ts と同様に元データから組み直して突き合わせ、黙って腐らないようにする。
 */

const ROOT = resolve(process.cwd());

describe("vanillaHead.generated.ts が元データとずれていない", () => {
  it("tailwind.config.js と src/index.css から組み直した内容と一致する", async () => {
    expect(HEAD_TOKEN_INJECTION).toBe(await buildHeadInjection(ROOT));
  });

  it("src/index.css の CSS 変数を全て持っている", () => {
    const css = readFileSync(resolve(ROOT, "src/index.css"), "utf-8");
    const vars = [...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]);
    expect(vars.length).toBeGreaterThan(15);
    for (const v of new Set(vars)) {
      expect(HEAD_TOKEN_INJECTION, `${v} が注入に含まれていない`).toContain(`${v}:`);
    }
  });

  it("素の Tailwind に無い色トークンを tailwind.config で定義している", () => {
    for (const token of ["card", "muted-foreground", "background", "foreground", "border"]) {
      expect(HEAD_TOKEN_INJECTION).toContain(token);
    }
    expect(HEAD_TOKEN_INJECTION).toContain("tailwind.config = {");
    expect(HEAD_TOKEN_INJECTION).toContain('"darkMode": "class"');
  });
});

/** 固有トークンだけで組んだ、書き出し対象のダミー部品 */
function TokenCard() {
  return createElement(
    "div",
    { className: "bg-card text-card-foreground border-border rounded-lg border p-6" },
    createElement("p", { className: "text-muted-foreground" }, "説明文")
  );
}

describe("静的版のバニラHTMLは外部を読まない", () => {
  it("CDN の script も tailwind.config も入らない", async () => {
    const html = await generateVanillaHtml(TokenCard);
    expect(html).not.toContain("cdn.tailwindcss.com");
    expect(html).not.toContain("tailwind.config");
    expect(html).not.toContain("<script");
  });

  it("実CSSを差し込むための目印が <head> にちょうど1つある", async () => {
    const html = await generateVanillaHtml(TokenCard);
    expect(html.split(CSS_SLOT).length - 1).toBe(1);
    expect(html.indexOf(CSS_SLOT)).toBeLessThan(html.indexOf("</head>"));
  });

  it("目印は build-static-html.mjs から実物として受け取れる（文字列を二重に持たない）", () => {
    // ハーネスが window.__cssSlot として渡し、書き出し側はそれを使う。
    const entry = readFileSync(resolve(ROOT, "src/overflow-entry.tsx"), "utf-8");
    expect(entry).toContain("window.__cssSlot = CSS_SLOT;");
    const script = readFileSync(resolve(ROOT, "scripts/build-static-html.mjs"), "utf-8");
    expect(script).toContain("window.__cssSlot");
    // 目印そのものを書き写していないこと（写すとドリフトの元になる）
    expect(script).not.toContain(CSS_SLOT);
  });

  it("素のマークアップ自体は包んでも変わらない", async () => {
    const html = await generateVanillaHtml(TokenCard);
    const body = html.slice(html.indexOf("<body"), html.indexOf("</body>"));
    expect(body).toContain("bg-card");
    expect(body).toContain("text-muted-foreground");
    expect(renderToStaticMarkup(createElement(TokenCard))).toContain("bg-card");
  });
});

describe("動的版は CDN を使うのでトークン注入を続ける", () => {
  it("tailwind.config への代入が CDN の <script> より後ろに入る", () => {
    const html = generateDynamicVanillaHtml(
      `export default function D() { return <div className="bg-card" />; }`
    );
    expect(html).toContain("tailwind.config = {");
    expect(html).toContain("--muted-foreground:");
    expect(html.indexOf("cdn.tailwindcss.com")).toBeLessThan(
      html.indexOf("tailwind.config =")
    );
  });

  it("注入は1回だけ（二重注入していない）", () => {
    const html = generateDynamicVanillaHtml(
      `export default function D() { return <div className="bg-card" />; }`
    );
    expect(html.split("tailwind.config =").length - 1).toBe(1);
    expect(html.split(":root {").length - 1).toBe(1);
  });
});

/**
 * 生成物のドリフト検査。
 * 静的HTML（public/html）と MCP バンドルは `npm run html` / `npm run mcp:bundle`
 * で作り直す派生物なので、方式を変えたのに作り直し忘れると、配る側だけ
 * 古い（＝CDN 頼みの）状態で出荷されうる。ここで作り直し漏れを止める。
 */
describe("生成物が自己完結している", () => {
  const REBUILD = "npm run html && npm run mcp:bundle で作り直してください";
  /** 外部からリソースを読む記述。<a href> や SVG の名前空間 URL は当たらない。 */
  const EXTERNAL_RESOURCE =
    /<script[^>]+\bsrc\s*=\s*["']\s*(?:https?:)?\/\/|<link[^>]+\bhref\s*=\s*["']\s*(?:https?:)?\/\/|<(?:img|iframe|video|audio|source|embed)[^>]+\bsrc\s*=\s*["']\s*(?:https?:)?\/\/|@import[^;]*(?:https?:)?\/\/|url\(\s*["']?(?:https?:)?\/\//i;

  /**
   * コンパイル済みの実CSSが埋まっているか。
   * `--tw-border-spacing-x` は Tailwind の preflight が必ず出す変数で、
   * これがあれば「素の <style> ではなく Tailwind の出力」だと言える。
   * `--card:` はこのプロジェクト固有トークンの定義が届いていることの印。
   * ユーティリティ名（.bg- など）では判定できない。bg-* を1つも使わない
   * 部品が実際にあり、その場合そのクラスは正しく出力されないため。
   */
  const hasCompiledCss = (html: string) =>
    html.includes("<style>") &&
    html.includes("--tw-border-spacing-x") &&
    html.includes("--card:");

  const bundle = JSON.parse(
    readFileSync(resolve(ROOT, "mcp/data/components.json"), "utf-8")
  ) as { included: number; items: { id: string; html: string | null }[] };
  const withHtml = bundle.items.filter((i) => i.html !== null);

  it("mcp/data/components.json の全アイテムに実CSSが埋まっている", () => {
    expect(withHtml.length).toBeGreaterThan(0);
    const broken = withHtml.filter((i) => !hasCompiledCss(i.html ?? ""));
    expect(broken.map((i) => i.id).slice(0, 5), `${broken.length} 件が未埋め込み。${REBUILD}`).toEqual(
      []
    );
  });

  it("mcp/data/components.json のどれも外部を読まない", () => {
    const external = withHtml.filter((i) => EXTERNAL_RESOURCE.test(i.html ?? ""));
    expect(
      external.map((i) => i.id).slice(0, 5),
      `${external.length} 件に外部参照が残っています。${REBUILD}`
    ).toEqual([]);
  });

  it("public/html を生成済みなら、そちらも全件が自己完結している", () => {
    // public/html は .gitignore 対象（npm run html の生成物）なので、
    // 未生成の環境ではこの検査を飛ばす。
    const dir = resolve(ROOT, "public/html");
    if (!existsSync(dir)) return;
    const files = readdirSync(dir).filter((f) => f.endsWith(".html"));
    expect(files.length).toBeGreaterThan(0);
    const broken = files.filter((f) => {
      const html = readFileSync(resolve(dir, f), "utf-8");
      return !hasCompiledCss(html) || EXTERNAL_RESOURCE.test(html);
    });
    expect(
      broken.slice(0, 5),
      `${broken.length} / ${files.length} 件が未埋め込みまたは外部参照あり。${REBUILD}`
    ).toEqual([]);
  });
});
