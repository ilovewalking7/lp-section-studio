/**
 * public/html/<id>.html と index.json を、ブラウザ無しで書き出す。
 *
 * 本家の生成は scripts/build-static-html.mjs（Playwright で実際に描画する）。
 * ただしそれは Cloudflare Pages のビルド環境では動かない（ブラウザが要る）。
 * 一方 mcp/data/components.json には、その生成結果の HTML が 880 件すべて
 * 入っていて、これは git 管理下にある。
 *
 * そこでビルド時は「作り直す」のではなく「既にあるものを配置する」。
 * ブラウザは要らず、1秒で終わり、本家生成と中身は完全に同じものになる。
 *
 * 更新手順:
 *   npm run html        … Playwright で再生成（ローカルのみ）
 *   npm run mcp:bundle  … components.json に取り込む（ここが git に入る）
 *   → 以降のデプロイは、このスクリプトが components.json から配置する
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = process.cwd();
const SRC = resolve(ROOT, "mcp/data/components.json");
const OUT = resolve(ROOT, "public/html");

if (!existsSync(SRC)) {
  console.error(
    `✗ ${SRC} がありません。先に \`npm run html && npm run mcp:bundle\` を実行してください。`
  );
  process.exit(1);
}

const data = JSON.parse(readFileSync(SRC, "utf-8"));
mkdirSync(OUT, { recursive: true });

const index = [];
let written = 0;
let skipped = 0;

for (const item of data.items) {
  if (!item.html) {
    skipped++;
    continue;
  }
  writeFileSync(join(OUT, `${item.id}.html`), item.html);
  index.push({
    id: item.id,
    name: item.name,
    category: item.category,
    standalone: Boolean(item.standalone),
    bytes: Buffer.byteLength(item.html, "utf-8"),
  });
  written++;
}

index.sort((a, b) => a.id.localeCompare(b.id));

writeFileSync(
  join(OUT, "index.json"),
  JSON.stringify(
    {
      total: index.length,
      standalone: index.filter((i) => i.standalone).length,
      items: index,
    },
    null,
    2
  )
);

console.log(
  `✓ 静的HTMLを配置しました: ${written} 件（React不要 ${index.filter((i) => i.standalone).length} 件）` +
    (skipped ? ` / html 未収録 ${skipped} 件はスキップ` : "")
);
