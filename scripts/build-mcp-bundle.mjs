/**
 * MCP サーバに同梱するデータを作る。
 *
 * 無料版は 100 個。全 880 個は買い切り版に入る。無料版を配る狙いは
 * 「見つけてもらう」ことなので、選び方には意図がある:
 *
 *   1. React 無しで動くもの（standalone）を優先する。
 *      それがこの部品集の他と違うところなので、最初に触るものが
 *      それでないと差が伝わらない。
 *   2. カテゴリを散らす。1カテゴリ最大 4 個までにして、
 *      「どんな種類があるか」が無料枠だけで分かるようにする。
 *   3. 各カテゴリ内では名前順。実行のたびに中身が変わらないようにする。
 *
 *   node scripts/build-mcp-bundle.mjs            無料版（100個）
 *   node scripts/build-mcp-bundle.mjs --all      全部（買い切り版の同梱用）
 *
 * 出力: mcp/data/components.json
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";

const ROOT = process.cwd();
const ALL = process.argv.includes("--all");
const FREE_LIMIT = 100;
const PER_CATEGORY = 4;
const HTML_DIR = resolve(ROOT, "public/html");
const OUT = resolve(ROOT, "mcp/data/components.json");

if (!existsSync(join(HTML_DIR, "index.json"))) {
  console.error(
    "public/html/index.json がありません。先に `npm run html` を実行してください。"
  );
  process.exit(1);
}

const manifestSrc = readFileSync(resolve(ROOT, "src/registry/manifest.ts"), "utf-8");
const manifest = JSON.parse(
  manifestSrc.slice(manifestSrc.indexOf("= [") + 2, manifestSrc.lastIndexOf("]") + 1)
);
const htmlIndex = JSON.parse(readFileSync(join(HTML_DIR, "index.json"), "utf-8"));
const standalone = new Map(htmlIndex.items.map((e) => [e.id, e.standalone]));

/** 無料枠に入れる 100 個を選ぶ */
function pickFree(entries) {
  const sorted = [...entries].sort((a, b) => {
    const sa = standalone.get(a.id) ? 0 : 1;
    const sb = standalone.get(b.id) ? 0 : 1;
    if (sa !== sb) return sa - sb; // React 不要のものを先に
    return a.id.localeCompare(b.id);
  });
  const perCat = new Map();
  const picked = [];
  for (const e of sorted) {
    if (picked.length >= FREE_LIMIT) break;
    const n = perCat.get(e.category) ?? 0;
    if (n >= PER_CATEGORY) continue;
    perCat.set(e.category, n + 1);
    picked.push(e);
  }
  // カテゴリ上限で 100 に届かなければ、残りを順に足す
  if (picked.length < FREE_LIMIT) {
    const have = new Set(picked.map((e) => e.id));
    for (const e of sorted) {
      if (picked.length >= FREE_LIMIT) break;
      if (!have.has(e.id)) picked.push(e);
    }
  }
  return picked;
}

const selected = ALL ? manifest : pickFree(manifest);

const items = selected.map((e) => {
  const source = readFileSync(
    resolve(ROOT, "src/registry", e.path.replace("./", "")),
    "utf-8"
  );
  const htmlPath = join(HTML_DIR, `${e.id}.html`);
  return {
    id: e.id,
    name: e.name,
    category: e.category,
    description: e.description,
    tags: e.tags ?? [],
    // React が要らないもの＝静的 HTML を貼るだけで完成する
    standalone: standalone.get(e.id) === true,
    source,
    html: existsSync(htmlPath) ? readFileSync(htmlPath, "utf-8") : null,
  };
});

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify(
    {
      edition: ALL ? "full" : "free",
      total: manifest.length,
      included: items.length,
      standaloneIncluded: items.filter((i) => i.standalone).length,
      items,
    },
    null,
    ALL ? 0 : 2
  ) + "\n"
);

const bytes = readFileSync(OUT).length;
console.log(
  `mcp/data/components.json を作りました（${ALL ? "全部" : "無料版"}）\n` +
    `  収録: ${items.length} / ${manifest.length} 件\n` +
    `  うち React 不要: ${items.filter((i) => i.standalone).length} 件\n` +
    `  カテゴリ: ${new Set(items.map((i) => i.category)).size} 種\n` +
    `  サイズ: ${(bytes / 1024 / 1024).toFixed(2)} MB`
);
