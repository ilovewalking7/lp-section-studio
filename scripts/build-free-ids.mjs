#!/usr/bin/env node
/**
 * build-free-ids.mjs
 *
 * 無料版（MCP に同梱する 100 個）の **ID だけ** を抜き出した軽量な
 * `src/registry/freeIds.ts` と、件数だけの `src/registry/freeCount.ts` を生成する。
 *
 * 元データの `mcp/data/components.json` は HTML 本体を含んで 1.1MB あるため、
 * フロントから直接 import してはいけない（初期バンドルが肥大する）。
 * ここで ID の一覧だけに落としてから、スタジオがそれを参照する。
 *
 * 件数を別ファイルに分けているのは manifest.ts / stats.generated.ts と同じ理由で、
 * 数字しか使わない LP が ID 100 件を初期チャンクに巻き込まないようにするため
 * （両方を import する面があると、共有モジュールごと入口チャンクに載る）。
 *
 * 生成のたびに「無料100個の ID が manifest に実在するか」も照合し、
 * 食い違いがあればエラー終了する（生成物が黙って腐らないように）。
 *
 * 使い方: node scripts/build-free-ids.mjs
 * 前提:   先に scripts/build-manifest.mjs が走っていること（照合に使う）。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** 自動生成された manifest.ts から ID 一覧を読む（JSON リテラル部分を切り出す） */
function readManifestIds() {
  const src = readFileSync(join(root, "src", "registry", "manifest.ts"), "utf-8");
  const entries = JSON.parse(
    src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1)
  );
  return new Set(entries.map((e) => e.id));
}

const bundle = JSON.parse(
  readFileSync(join(root, "mcp", "data", "components.json"), "utf-8")
);
const manifestIds = readManifestIds();

const ids = [...new Set(bundle.items.map((i) => i.id))].sort();

// 照合 1: 重複が無いこと
if (ids.length !== bundle.items.length) {
  console.error(
    `✗ mcp/data/components.json に重複した ID があります（${bundle.items.length} 件中 ${ids.length} 種）`
  );
  process.exit(1);
}

// 照合 2: 件数が included と一致すること
if (bundle.included !== ids.length) {
  console.error(
    `✗ included (${bundle.included}) と items の件数 (${ids.length}) が一致しません`
  );
  process.exit(1);
}

// 照合 3: 全 ID が registry（manifest）に実在すること
const missing = ids.filter((id) => !manifestIds.has(id));
if (missing.length > 0) {
  console.error(
    `✗ registry に存在しない ID が ${missing.length} 件あります:\n  ${missing.join("\n  ")}`
  );
  process.exit(1);
}

const header = `// このファイルは scripts/build-free-ids.mjs により自動生成されます。直接編集しないでください。
// 元データ: mcp/data/components.json（無料版 = MCP に同梱する 100 個）
`;

writeFileSync(
  join(root, "src", "registry", "freeIds.ts"),
  `${header}
/** 無料版に含まれるコンポーネントの ID（manifest の id と同じ体系） */
export const FREE_IDS: readonly string[] = ${JSON.stringify(ids, null, 2)};
`
);

writeFileSync(
  join(root, "src", "registry", "freeCount.ts"),
  `${header}// 件数だけを使う面（LP のスタットバンド等）はこちらを読む。
// ID 一覧を初期チャンクに載せないためにファイルを分けている。

/** 無料版に含まれるコンポーネント数 */
export const FREE_EDITION_COUNT = ${ids.length};
`
);

console.log(
  `✓ 無料版の ID 一覧を生成しました: ${ids.length} 件 → src/registry/freeIds.ts / freeCount.ts`
);
