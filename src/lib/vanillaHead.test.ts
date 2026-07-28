import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { buildHeadInjection } from "../../scripts/build-vanilla-head.mjs";
import { HEAD_TOKEN_INJECTION } from "./vanillaHead.generated";
import { generateVanillaHtml, generateDynamicVanillaHtml } from "./vanilla";

/**
 * 書き出しHTMLのデザイントークン注入を固定する検査。
 *
 * bg-card / text-muted-foreground などはこのプロジェクト固有のトークンで、
 * 素の Tailwind には無い。CDN を1行読むだけの HTML では bg-card が transparent、
 * text-muted-foreground が真っ黒になるため、書き出しの源流で必ず注入する。
 * ここが崩れると「コピペしてそのまま使える」が成立しない。
 *
 * `vanillaHead.generated.ts` は tailwind.config.js / src/index.css からの派生物なので、
 * freeIds.ts と同様に元データから組み直して突き合わせ、黙って腐らないようにする。
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

describe("バニラHTML書き出しにトークン定義が入る", () => {
  it("generateVanillaHtml の出力に tailwind.config と :root の CSS 変数が含まれる", async () => {
    const html = await generateVanillaHtml(TokenCard);
    expect(html).toContain("https://cdn.tailwindcss.com");
    expect(html).toContain("tailwind.config = {");
    expect(html).toContain(":root {");
    expect(html).toContain("--card:");
    expect(html).toContain("--muted-foreground:");
    expect(html).toContain(".dark {");
  });

  it("固有トークンを使う部品を書き出しても、そのトークンが定義済みになっている", async () => {
    const html = await generateVanillaHtml(TokenCard);
    const body = html.slice(html.indexOf("<body"));
    // 部品側は固有トークンのクラスを使っている
    expect(body).toContain("bg-card");
    expect(body).toContain("text-muted-foreground");
    // その定義が <head> 側に揃っている
    const head = html.slice(0, html.indexOf("</head>"));
    expect(head).toContain('"card"');
    expect(head).toContain('"muted"');
    expect(head).toContain("--card-foreground:");
  });

  it("tailwind.config への代入は CDN の <script> より後ろにある", async () => {
    const html = await generateVanillaHtml(TokenCard);
    expect(html.indexOf("cdn.tailwindcss.com")).toBeLessThan(
      html.indexOf("tailwind.config =")
    );
  });

  it("dynamic 版（動くHTML）にも同じ注入が入る", () => {
    const html = generateDynamicVanillaHtml(
      `export default function D() { return <div className="bg-card" />; }`
    );
    expect(html).toContain("tailwind.config = {");
    expect(html).toContain("--muted-foreground:");
    expect(html.indexOf("cdn.tailwindcss.com")).toBeLessThan(
      html.indexOf("tailwind.config =")
    );
  });

  it("注入は1回だけ（二重注入していない）", async () => {
    const html = await generateVanillaHtml(TokenCard);
    expect(html.split("tailwind.config =").length - 1).toBe(1);
    expect(html.split(":root {").length - 1).toBe(1);
  });

  it("素のマークアップ自体は注入で変わらない", async () => {
    const html = await generateVanillaHtml(TokenCard);
    const body = html.slice(html.indexOf("<body"), html.indexOf("</body>"));
    expect(body).not.toContain("tailwind.config");
    expect(renderToStaticMarkup(createElement(TokenCard))).toContain("bg-card");
  });
});

/**
 * 生成物のドリフト検査。
 * 静的HTML（public/html）と MCP バンドルは `npm run html` / `npm run mcp:bundle`
 * で作り直す派生物なので、トークンを直したのに作り直し忘れると、配る側だけ
 * 古い（＝色が出ない）状態で出荷されうる。ここで作り直し漏れを止める。
 */
describe("生成物にトークン定義が行き渡っている", () => {
  const bundle = JSON.parse(
    readFileSync(resolve(ROOT, "mcp/data/components.json"), "utf-8")
  ) as { included: number; items: { id: string; html: string | null }[] };
  const withHtml = bundle.items.filter((i) => i.html !== null);
  const REBUILD = "npm run html && npm run mcp:bundle で作り直してください";

  it("mcp/data/components.json の全アイテムの HTML が注入済み", () => {
    expect(withHtml.length).toBeGreaterThan(0);
    const notInjected = withHtml.filter((i) => !i.html?.includes("tailwind.config"));
    expect(notInjected.map((i) => i.id), `未注入 ${notInjected.length} 件。${REBUILD}`).toEqual(
      []
    );
  });

  it("その注入が現在の HEAD_TOKEN_INJECTION と同一（トークン変更の取り込み漏れが無い）", () => {
    const stale = withHtml.filter((i) => !i.html?.includes(HEAD_TOKEN_INJECTION));
    expect(
      stale.map((i) => i.id).slice(0, 5),
      `${stale.length} 件が古いトークン定義のままです。${REBUILD}`
    ).toEqual([]);
  });

  it("public/html を生成済みなら、そちらも全件注入済み", () => {
    // public/html は .gitignore 対象（npm run html の生成物）なので、
    // 未生成の環境ではこの検査を飛ばす。
    const dir = resolve(ROOT, "public/html");
    if (!existsSync(dir)) return;
    const files = readdirSync(dir).filter((f) => f.endsWith(".html"));
    expect(files.length).toBeGreaterThan(0);
    const notInjected = files.filter(
      (f) => !readFileSync(resolve(dir, f), "utf-8").includes(HEAD_TOKEN_INJECTION)
    );
    expect(
      notInjected.slice(0, 5),
      `${notInjected.length} / ${files.length} 件が未注入または古い。${REBUILD}`
    ).toEqual([]);
  });
});
