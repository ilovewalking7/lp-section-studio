#!/usr/bin/env node
/**
 * build-registry.mjs
 *
 * shadcn CLI 互換の「registry item」JSON を `public/r/` に書き出す。
 * 別リポジトリから次の1コマンドで取り込める（= 自分専用の 21st.dev 配信基盤）:
 *
 *   npx shadcn@latest add https://<デプロイ先>/r/<id>.json
 *
 * 各 JSON は **自己完結**（必要な UI プリミティブと cn ユーティリティを同梱）なので、
 * registryDependencies の名前解決やベースURL設定なしに、どのホストからでも動く。
 *
 * 出力:
 *   - utils.json                … cn ヘルパー（registry:lib）
 *   - <primitive>.json (×5)     … Button/Card/Badge/Input/Switch（registry:ui、utils同梱）
 *   - <demo-id>.json (×260)     … 各デモ（registry:block、依存プリミティブ+utils同梱、meta除去）
 *   - index.json                … 配信中アイテムの一覧（id/type/category）
 *
 * 使い方: node scripts/build-registry.mjs
 */
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
} from "node:fs";
import { dirname, join, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = join(root, "src", "components", "ui");
const demosDir = join(root, "src", "registry", "demos");
const outDir = join(root, "public", "r");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

// --- 同梱対象の UI プリミティブ / utils を読み込む ---
const utilsSource = readFileSync(join(root, "src", "lib", "utils.ts"), "utf8");
const uiFiles = {}; // name -> source
for (const f of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
  uiFiles[basename(f, ".tsx")] = readFileSync(join(uiDir, f), "utf8");
}

/** import 文から npm 依存を推定 */
function npmDeps(sources) {
  const all = sources.join("\n");
  const s = new Set();
  if (/from ["']class-variance-authority["']/.test(all))
    s.add("class-variance-authority");
  if (/from ["']lucide-react["']/.test(all)) s.add("lucide-react");
  if (/from ["']clsx["']/.test(all)) s.add("clsx");
  if (/from ["']tailwind-merge["']/.test(all)) s.add("tailwind-merge");
  return [...s];
}

/** ソースが参照する @/components/ui/* の名前 */
function neededUi(source) {
  const names = new Set();
  const re = /from ["']@\/components\/ui\/([\w-]+)["']/g;
  let m;
  while ((m = re.exec(source))) if (uiFiles[m[1]]) names.add(m[1]);
  return [...names];
}
const needsUtils = (s) => /from ["']@\/lib\/utils["']/.test(s);

/** あるソースに必要な同梱ファイル群（UIプリミティブ + utils）を集める */
function bundle(source) {
  const files = [];
  const sources = [source];
  let utils = needsUtils(source);
  for (const n of neededUi(source)) {
    const us = uiFiles[n];
    sources.push(us);
    files.push({
      path: `components/ui/${n}.tsx`,
      content: us,
      type: "registry:ui",
      target: `components/ui/${n}.tsx`,
    });
    if (needsUtils(us)) utils = true;
  }
  if (utils) {
    sources.push(utilsSource);
    files.push({
      path: "lib/utils.ts",
      content: utilsSource,
      type: "registry:lib",
      target: "lib/utils.ts",
    });
  }
  return { files, sources };
}

/** CamelCase/パス → kebab-case（manifest と同一規約） */
function idFromPath(globPath) {
  return globPath
    .replace(/^\.\/demos\//, "")
    .replace(/\.tsx$/, "")
    .replace(/[/_]/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/** デモから `import type { DemoMeta }` 行と `export const meta = {...};` を除去（消費側には不要） */
function stripMeta(src) {
  src = src.replace(
    /^\s*import type \{ DemoMeta \} from ["']@\/registry["'];\s*\n/m,
    ""
  );
  const i = src.indexOf("export const meta");
  if (i !== -1) {
    let j = src.indexOf("{", i);
    let depth = 0;
    let inStr = null;
    let esc = false;
    let end = -1;
    for (; j < src.length; j++) {
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
        if (depth === 0) {
          end = j;
          break;
        }
      }
    }
    if (end !== -1) {
      let k = end + 1;
      if (src[k] === ";") k++;
      while (k < src.length && src[k] !== "\n") k++;
      if (src[k] === "\n") k++;
      src = src.slice(0, i) + src.slice(k);
    }
  }
  return src.replace(/^\n+/, "");
}

/** 元ソースから category を拾う（index 用） */
function readCategory(src) {
  const m = src.match(/category:\s*["']([^"']+)["']/);
  return m ? m[1] : "";
}

const index = [];

// --- cn ヘルパー ---
writeFileSync(
  join(outDir, "utils.json"),
  JSON.stringify(
    {
      $schema: SCHEMA,
      name: "utils",
      type: "registry:lib",
      dependencies: ["clsx", "tailwind-merge"],
      files: [
        {
          path: "lib/utils.ts",
          content: utilsSource,
          type: "registry:lib",
          target: "lib/utils.ts",
        },
      ],
    },
    null,
    2
  )
);
index.push({ name: "utils", type: "registry:lib" });

// --- UI プリミティブ（utils 同梱） ---
for (const [name, source] of Object.entries(uiFiles)) {
  const { files, sources } = bundle(source);
  const item = {
    $schema: SCHEMA,
    name,
    type: "registry:ui",
    dependencies: npmDeps(sources),
    registryDependencies: [],
    files: [
      {
        path: `components/ui/${name}.tsx`,
        content: source,
        type: "registry:ui",
        target: `components/ui/${name}.tsx`,
      },
      ...files,
    ],
  };
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(item, null, 2));
  index.push({ name, type: "registry:ui" });
}

// --- デモ 260個（依存プリミティブ + utils 同梱、meta 除去） ---
function walk(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (n.endsWith(".tsx")) out.push(p);
  }
  return out;
}

let demoCount = 0;
for (const file of walk(demosDir).sort()) {
  const raw = readFileSync(file, "utf8");
  // import.meta.glob を使う集約デモ（例: ボタン総覧）は自己完結せず、
  // 単体配信できないため registry からは除外する。
  if (/import\.meta\.glob/.test(raw)) continue;
  const globPath =
    "./" + relative(join(root, "src", "registry"), file).split("\\").join("/");
  const id = idFromPath(globPath);
  const category = readCategory(raw);
  const code = stripMeta(raw);
  const { files, sources } = bundle(code);
  const item = {
    $schema: SCHEMA,
    name: id,
    type: "registry:block",
    dependencies: npmDeps(sources),
    registryDependencies: [],
    files: [
      {
        path: `components/studio/${id}.tsx`,
        content: code,
        type: "registry:component",
        target: `components/studio/${id}.tsx`,
      },
      ...files,
    ],
  };
  writeFileSync(join(outDir, `${id}.json`), JSON.stringify(item, null, 2));
  index.push({ name: id, type: "registry:block", category });
  demoCount++;
}

// --- インデックス ---
writeFileSync(
  join(outDir, "index.json"),
  JSON.stringify(
    { name: "component-studio", count: index.length, items: index },
    null,
    2
  )
);

console.log(
  `✓ registry を書き出しました: ${index.length} 件（utils 1 + primitives ${
    Object.keys(uiFiles).length
  } + demos ${demoCount}）→ public/r/`
);
