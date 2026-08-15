# LP Section Studio

**880 production-ready UI components. React or plain HTML. MIT licensed, free.**

Every component ships as a React component **and** as standalone HTML — 397 of them
need no React, no Babel, no build step. Paste them into PHP, Rails, Hugo, WordPress,
or a plain `.html` file and they work.

An MCP server is included, so AI coding agents can search and pull components directly.

[日本語の説明は下にあります](#日本語)

---

## What makes it different

| | |
|---|---|
| **880 components** | 13 style themes × 39 categories |
| **397 work without React** | Static HTML output. No framework, no build step, no hydration |
| **MCP server included** | Your AI agent searches and pulls components on its own |
| **Every component is tested** | 2,661 automated tests run on every change |
| **84 KB initial JS (gzipped)** | Components load lazily — 1,871 separate chunks |
| **MIT** | Commercial use, modification, redistribution. No attribution beyond the license |

### Automated checks — all 880 components, every build

| Check | Count | Result |
|---|---|---|
| Accessibility (axe-core) | 881 | 0 violations |
| Keyboard operability | 880 | all pass |
| Renders without exceptions or warnings | 880 | all pass |
| Color contrast | all | enforced in CI |
| Horizontal overflow | all | enforced in CI |

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173 — browse, preview, copy
npm run build    # production build
npm test         # 2,661 tests
```

## Three ways to use a component

1. **Copy-paste** — open the studio, pick a component, copy the source
2. **shadcn registry** — `npx shadcn add <url>` pulls it into another project
3. **Static HTML** — export plain HTML with no React (397 components support this)

## MCP server

```bash
cd mcp && npm install
```

Point your MCP client at `mcp/src/index.js`. All 880 components are available —
search by category, tag, or name, and get the source back directly.

## Stack

Vite + React 18 + TypeScript (strict) + Tailwind CSS v3.
Runtime dependencies: `react`, `react-dom`, `lucide-react`, `clsx`,
`tailwind-merge`, `class-variance-authority`. No external images, no CDN calls.

## License

MIT. See [LICENSE](LICENSE).

---

<a name="日本語"></a>

# 日本語

**880個の本番品質UIコンポーネント。React でも素の HTML でも使えます。MIT・無料。**

すべてのコンポーネントが React コンポーネントとしても、**単体で動く HTML** としても
書き出せます。そのうち **397個は React も Babel もビルドも不要**なので、
PHP・Rails・Hugo・WordPress・素の `.html` にそのまま貼って動きます。

MCP サーバーを同梱しているので、AIコーディングエージェントが自分で検索して取り込めます。

## 他と何が違うか

- **880個** — 13スタイルテーマ × 39カテゴリ
- **397個は React 不要** — 静的HTMLで完結。フレームワークもビルドも要りません
- **MCPサーバー同梱** — AIが自分で探して持ってきます
- **全件が自動検査を通過** — アクセシビリティ881件・キーボード操作880件・レンダリング880件、
  合計 **2,661テスト**が変更のたびに走ります
- **初期JS 84KB（gzip）** — 1,871チャンクに分割され、選んだ時だけ読み込まれます
- **MIT** — 商用利用・改変・再配布すべて自由。ライセンス文の同梱以外に条件はありません

## 使い方

```bash
npm install
npm run dev      # http://localhost:5173 で一覧・ライブプレビュー・コピー
npm run build    # 本番ビルド
npm test         # 2,661テスト
```

## 3つの取り込み経路

1. **コピペ** — スタジオで選んでソースをコピー
2. **shadcn レジストリ** — `npx shadcn add <url>` で別プロジェクトに直接取り込み
3. **静的HTML** — React 抜きの HTML を書き出す（397個が対応）

## なぜ「React 不要」が効くのか

Reactコンポーネント集は、SEO重視の静的サイトや、既存のPHP/Railsサイトの一部を
差し替えたい場面では使えません。ここは静的HTMLとして書き出せるので、
**フレームワークを持ち込まずにセクション単位で貼れます。**

## ライセンス

MIT。[LICENSE](LICENSE) を参照してください。
