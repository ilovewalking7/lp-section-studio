/**
 * BOOTH 配布用の ZIP を作る。
 *
 * docs/booth-listing.md の「配布物の構成」をそのまま形にしたもの。
 *
 *   release/lp-section-studio-v1.0.0.zip
 *   ├─ README.md              使い方・導入手順（docs/dist-README.md から）
 *   ├─ LICENSE                ライセンス条文（リポジトリ root の LICENSE）
 *   ├─ components/            React/TypeScript ソース 880件 + 依存プリミティブ
 *   ├─ html/                  静的HTML 880件 + index.json
 *   ├─ registry/              shadcn 互換 JSON 885件
 *   ├─ mcp/                   MCPサーバ（全部入り版・880件）
 *   └─ studio/                ビルド済みスタジオ
 *
 * 事前に必要なもの（無ければ何を実行すべきか出して止まる）:
 *
 *   npm run html       → public/html/（静的HTML 880件）
 *   npm run registry   → public/r/（shadcn 配信JSON）
 *   npm run build      → dist/（スタジオ）
 *
 * 使い方:
 *
 *   node scripts/build-release.mjs
 *   node scripts/build-release.mjs --version 1.1.0
 *   node scripts/build-release.mjs --keep-staging   ZIP 後も展開ディレクトリを残す
 *
 * 検証は scripts/verify-release.mjs が担当する（中身の件数・禁止物・実描画）。
 */
import {
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  statSync,
} from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
};
const VERSION = arg("version", "1.0.0");
const KEEP_STAGING = process.argv.includes("--keep-staging");
const NAME = `lp-section-studio-v${VERSION}`;
const OUT_DIR = resolve(ROOT, "release");
const STAGE = join(OUT_DIR, NAME);

// ──────────────────────────────────────────────────────────────────────────
// 前提チェック
// ──────────────────────────────────────────────────────────────────────────

const need = [
  ["public/html/index.json", "npm run html"],
  ["public/r", "npm run registry"],
  ["dist/index.html", "npm run build"],
  ["LICENSE", "（リポジトリ root の LICENSE が必要）"],
  ["docs/dist-README.md", "（配布物に同梱する README が必要）"],
];
const missing = need.filter(([p]) => !existsSync(resolve(ROOT, p)));
if (missing.length > 0) {
  console.error("配布物の材料が足りません:\n");
  for (const [p, how] of missing) console.error(`  ${p}  ← ${how}`);
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────
// デザイントークンが HTML に入っているかの確認
//
// bg-card / text-muted-foreground のような**このプロジェクト固有のトークン**は
// 素の Tailwind には存在しない（880 件中 430 件が使っている）。そのため
// cdn.tailwindcss.com を1行読むだけの HTML では色が一切当たらない。
//
// この注入は書き出しの**源流**（src/lib/vanilla.ts の wrapDocument。設定は
// scripts/build-vanilla-head.mjs が生成する src/lib/vanillaHead.generated.ts）で
// 行うので、ここで配布時に足すことはしない。同じ内容を2箇所に持つと、
// 片方だけ直したときに配布物とスタジオの書き出しが食い違うため。
//
// 代わりに「入っているか」だけを検める。入っていなければ材料が古い。
// ──────────────────────────────────────────────────────────────────────────

/** トークン設定が入っていない HTML を洗い出し、あれば止める */
function assertTokensInjected(label, htmls, how) {
  const broken = htmls.filter(([, html]) => html && !html.includes("tailwind.config"));
  if (broken.length > 0) {
    console.error(
      `${label}: デザイントークンの設定が入っていない HTML が ${broken.length} 件あります。\n` +
        `  例: ${broken.slice(0, 3).map(([name]) => name).join(", ")}\n` +
        `  bg-card / text-muted-foreground などの色が出ない状態です。${how} を実行して作り直してください。`
    );
    process.exit(1);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// コピーのヘルパー
// ──────────────────────────────────────────────────────────────────────────

/** 顧客に渡してはいけないもの。ここに一致する名前は絶対にコピーしない。 */
const NEVER_COPY = new Set([
  "node_modules",
  ".git",
  ".env",
  ".env.local",
  ".DS_Store",
  ".claude",
  "package-lock.json",
]);

let copied = 0;

function copyTree(from, to, { filter } = {}) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    if (NEVER_COPY.has(name) || name.endsWith(".tsbuildinfo") || name.endsWith(".log")) {
      continue;
    }
    const src = join(from, name);
    const dst = join(to, name);
    if (statSync(src).isDirectory()) {
      if (filter && !filter(src, true)) continue;
      copyTree(src, dst, { filter });
    } else {
      if (filter && !filter(src, false)) continue;
      mkdirSync(dirname(dst), { recursive: true });
      copyFileSync(src, dst);
      copied++;
    }
  }
}

function copyOne(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(resolve(ROOT, from), to);
  copied++;
}

const count = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).length : 0;

// ──────────────────────────────────────────────────────────────────────────
// 組み立て
// ──────────────────────────────────────────────────────────────────────────

console.log(`${NAME} を組み立てます…\n`);
rmSync(STAGE, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });

// --- README / LICENSE ---
copyOne("docs/dist-README.md", join(STAGE, "README.md"));
copyOne("LICENSE", join(STAGE, "LICENSE"));

// --- components/ : 880件 + それが import する依存一式 ---
// demos は「@/components/ui/*」「@/lib/utils」「@/registry」を参照するので、
// それらを同じ木に入れておかないと買った側でコンパイルが通らない。
copyTree(resolve(ROOT, "src/registry/demos"), join(STAGE, "components/demos"), {
  filter: (p, isDir) => isDir || p.endsWith(".tsx"),
});
copyTree(resolve(ROOT, "src/components/ui"), join(STAGE, "components/ui"));
copyOne("src/lib/utils.ts", join(STAGE, "components/lib/utils.ts"));
copyOne("src/lib/i18n.ts", join(STAGE, "components/lib/i18n.ts"));
copyOne("src/registry/types.ts", join(STAGE, "components/registry/types.ts"));
copyOne("src/registry/i18n.ts", join(STAGE, "components/registry/i18n.ts"));
copyTree(
  resolve(ROOT, "src/registry/i18n.parts"),
  join(STAGE, "components/registry/i18n.parts")
);
// demos は `import type { DemoMeta } from "@/registry"` と書く。スタジオ本体の
// index.ts は import.meta.glob（Vite 専用）を使うので、型だけを再輸出する。
writeFileSync(
  join(STAGE, "components/registry/index.ts"),
  `// demos が参照するのは型だけなので、型だけを再輸出する。\n` +
    `export type { DemoMeta, RegistryEntry, ManifestEntry } from "./types";\n`
);
copied++;
// bg-card / text-muted-foreground などは Tailwind の標準クラスではない。
// 買った側のプロジェクトでも同じ色を出せるよう、トークンの定義そのものを渡す。
copyOne("tailwind.config.js", join(STAGE, "components/theme/tailwind.config.js"));
copyOne("src/index.css", join(STAGE, "components/theme/tokens.css"));

const demoCount = readdirSync(join(STAGE, "components/demos"), { recursive: true })
  .filter((f) => String(f).endsWith(".tsx"))
  .length;

// --- html/ : 880件 + index.json ---
const htmlSrc = resolve(ROOT, "public/html");
const htmlDst = join(STAGE, "html");
mkdirSync(htmlDst, { recursive: true });
const htmlFiles = readdirSync(htmlSrc).filter((f) => f.endsWith(".html"));
assertTokensInjected(
  "html/",
  htmlFiles.map((f) => [f, readFileSync(join(htmlSrc, f), "utf-8")]),
  "npm run html"
);
for (const f of readdirSync(htmlSrc)) {
  if (f.endsWith(".html") || f === "index.json") {
    copyFileSync(join(htmlSrc, f), join(htmlDst, f));
  }
}
const htmlCount = htmlFiles.length;
copied += htmlCount + 1;

// --- registry/ : shadcn 互換 JSON ---
copyTree(resolve(ROOT, "public/r"), join(STAGE, "registry"));

// --- mcp/ : 全部入り版 ---
// build-mcp-bundle.mjs の出力先は mcp/data/components.json 固定なので、
// リポジトリの無料版データを退避 → --all で作る → 取り出す → 元に戻す。
const freeData = resolve(ROOT, "mcp/data/components.json");
const backup = existsSync(freeData) ? readFileSync(freeData) : null;
let fullBundle;
try {
  execFileSync("node", ["scripts/build-mcp-bundle.mjs", "--all"], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "inherit"],
  });
  fullBundle = JSON.parse(readFileSync(freeData, "utf-8"));
} finally {
  if (backup) writeFileSync(freeData, backup);
}
if (fullBundle.edition !== "full") {
  throw new Error(`MCP バンドルが full になっていません: ${fullBundle.edition}`);
}
// MCP が返す HTML も public/html/ から来るので、同じ検査を通す
assertTokensInjected(
  "mcp/data/components.json",
  fullBundle.items.map((i) => [i.id, i.html]),
  "npm run html"
);
copyTree(resolve(ROOT, "mcp/src"), join(STAGE, "mcp/src"));
copyOne("mcp/package.json", join(STAGE, "mcp/package.json"));
copyOne("mcp/README.md", join(STAGE, "mcp/README.md"));
copyOne("LICENSE", join(STAGE, "mcp/LICENSE"));
mkdirSync(join(STAGE, "mcp/data"), { recursive: true });
writeFileSync(
  join(STAGE, "mcp/data/components.json"),
  JSON.stringify(fullBundle, null, 0) + "\n"
);
copied++;

// --- studio/ : ビルド済み ---
// Vite は public/ をそのまま dist/ にコピーするので、dist/r と dist/html は
// registry/ と html/ の丸ごと重複になる（合わせて 12MB）。
// スタジオ本体はどちらも実行時に参照していないので外す。
const DIST = resolve(ROOT, "dist");
const DIST_DUPES = new Set(["r", "html"]);
copyTree(DIST, join(STAGE, "studio"), {
  filter: (p) => !DIST_DUPES.has(relative(DIST, p)),
});

// ──────────────────────────────────────────────────────────────────────────
// ZIP 化
// ──────────────────────────────────────────────────────────────────────────

const zipPath = join(OUT_DIR, `${NAME}.zip`);
rmSync(zipPath, { force: true });
execFileSync("zip", ["-r", "-q", "-X", `${NAME}.zip`, NAME], { cwd: OUT_DIR });
if (!KEEP_STAGING) rmSync(STAGE, { recursive: true, force: true });

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(
  `\n${relative(ROOT, zipPath)} を作りました（${mb(statSync(zipPath).size)}）\n` +
    `  components/  ${demoCount} 件（.tsx）\n` +
    `  html/        ${htmlCount} 件 + index.json\n` +
    `  registry/    ${count(resolve(ROOT, "public/r"), ".json")} 件（.json）\n` +
    `  mcp/         ${fullBundle.included} 件収録（edition: ${fullBundle.edition}）\n` +
    `  合計 ${copied} ファイル\n\n` +
    `検証: node scripts/verify-release.mjs`
);
