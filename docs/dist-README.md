# LP Section Studio

検証済み UI コンポーネント **880個**。React / TypeScript / Tailwind CSS。
うち **397個** は React 無しの静的 HTML としてそのまま使えます。

このファイルは購入者向けの導入手順です。ライセンスは同梱の `LICENSE` を参照してください。

---

## 入っているもの

| ディレクトリ | 中身 |
| --- | --- |
| `components/` | React / TypeScript ソース **880件**（`demos/`）＋ 動かすのに要る依存一式 |
| `html/` | 静的 HTML **880件** ＋ `index.json`（どれが React 不要かの判定つき） |
| `registry/` | shadcn 互換の配信 JSON **885件** |
| `mcp/` | MCP サーバ（全部入り版・880件収録） |
| `studio/` | ビルド済みスタジオ（検索・プレビュー・コピー画面） |

---

## 1. まず動かしてみる（1分・何もインストールしない）

`html/` の中の HTML を1つ、ブラウザにドラッグして開いてください。

```
html/offers-value-stack-offer.html
```

React も Node も要りません。**ネット接続も要りません。** その1枚に必要な
CSS だけをコンパイルして `<style>` に埋め込んであるので、外部への通信は
一切ありません（CDN も Web フォントも読みません）。オフラインでも、社内
ネットワークの中でも、同じ見た目になります。

`bg-card` などこのコンポーネント集のデザイントークンも、その CSS の中で
解決済みです。自分のビルドに載せ替えたい場合は
`components/theme/tailwind.config.js` と `components/theme/tokens.css` を
使うと同じ色が出ます。

### どれが React 不要か

`html/index.json` に全件の判定が入っています。

```json
{ "total": 880, "standalone": 397, "items": [ { "id": "...", "standalone": true } ] }
```

- `standalone: true` … **397件**。状態を持たないので、HTML を貼るだけで完成します。
- `standalone: false` … 483件。開閉・入力・アニメーションなど動きを持つため、
  静的版は**見た目だけ**になります（操作は動きません）。React 版を使ってください。

---

## 2. React プロジェクトに入れる

### 必要なパッケージ

```bash
npm install react react-dom lucide-react clsx tailwind-merge class-variance-authority
npm install -D tailwindcss postcss autoprefixer
```

### ファイルの置き方

`components/` の中身をプロジェクトの `src/` に写します。

```
components/demos/**/*.tsx   →  src/registry/demos/**/*.tsx  （好きな場所でよい）
components/ui/*.tsx         →  src/components/ui/*.tsx
components/lib/*.ts         →  src/lib/*.ts
components/registry/*       →  src/registry/*
```

各コンポーネントは `@/components/ui/...` や `@/lib/utils` を参照します。
`@` を `src` に向けてください。

`tsconfig.json`:

```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }
```

Vite を使う場合は `vite.config.ts` にも同じ別名が要ります。

```ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

### Tailwind の設定（重要）

`bg-card` `text-muted-foreground` `bg-primary` などは **Tailwind の標準クラス
ではなく、このコンポーネント集のデザイントークン**です。定義を入れないと
色が当たりません。880件のうち430件がこれらを使っています。

1. `components/theme/tailwind.config.js` の `theme.extend` を自分の
   `tailwind.config.js` にマージする
2. `components/theme/tokens.css` の `:root` と `.dark` のブロックを、
   自分のエントリ CSS に写す

この2つで、ライト／ダーク両対応の色が揃います。数値は WCAG のコントラスト
基準（1.4.3 の 4.5:1、1.4.11 の 3:1）を満たすように調整済みです。勝手に
変えると基準を割ることがあります。

### 1個だけ欲しいとき

各ファイルは自己完結しています。`components/demos/` から `.tsx` を1つ
コピーし、`ui/` と `lib/utils.ts` を用意すれば動きます。外部画像は
使っていません。

---

## 3. スタジオを開く（検索・プレビュー・コピー）

880件を一覧・検索し、その場でプレビューしてソースをコピーできる画面です。

**ローカルの HTTP サーバ越しに開いてください。** `studio/index.html` を
ファイルとして直接開くと、CSS と JS の参照が `/assets/...` という絶対パスの
ため読み込めません（`file:///assets/...` を探しに行って失敗します）。文字は
出ますが、スタイルが当たらず操作もできない状態になります。

```bash
cd studio
python3 -m http.server 8080
#  → http://localhost:8080/ をブラウザで開く
```

Node があるなら:

```bash
npx --yes serve studio -l 8080
```

---

## 4. MCP サーバを繋ぐ（Claude Code / Cursor から直接取り出す）

880件を `search_components` → `get_component` / `get_component_html` の順で
取り出せます。生成ではなく、検査済みの現物がそのまま返ります。

```bash
cd mcp
npm install
```

`npm install` が要るのは `@modelcontextprotocol/sdk` と `zod` のためです
（`node_modules` は同梱していません）。

### Claude Code

```bash
claude mcp add lp-section-studio -- node /絶対パス/mcp/src/index.js
```

### 設定ファイルに直接書く場合

Claude Desktop は `claude_desktop_config.json`、Cursor は `.cursor/mcp.json`、
Claude Code はプロジェクト直下の `.mcp.json` です。

```json
{
  "mcpServers": {
    "lp-section-studio": {
      "command": "node",
      "args": ["/絶対パス/mcp/src/index.js"]
    }
  }
}
```

パスは**絶対パス**にしてください。MCP クライアントは任意の作業ディレクトリ
からサーバを起動するため、相対パスでは見つかりません。

詳しいツールの説明は `mcp/README.md` にあります。

---

## 5. shadcn レジストリとして取り込む

`registry/` は shadcn 互換の JSON です。ローカルに配信すれば
`npx shadcn add` で取り込めます。

```bash
python3 -m http.server 8081 --directory registry
npx shadcn@latest add http://localhost:8081/wafu-ryokan-hero.json
```

依存する `Button` / `Badge` / `cn` も一緒に入ります。

---

## 品質について

880件すべてが、以下の4つの機械検査を通っています。

| 検査 | 内容 |
| --- | --- |
| axe-core | 構造アクセシビリティ。違反 0 件 |
| コントラスト | トークン定義を WCAG の相対輝度で計算。全組み合わせが AA |
| キーボード操作 | 対話部品がキーボードで到達できるか |
| 横スクロール | 実ブラウザ・幅375px でページが横に破れないか |

---

## 依存

`react` / `lucide-react` / `clsx` + `tailwind-merge` / `class-variance-authority`
と、同梱の UI プリミティブのみです。外部画像 URL は使っていません。

---

## ライセンス

同梱の `LICENSE` を参照してください。買い切り版（このパッケージ）は
商用利用できます。コンポーネント自体の再配布・再販はできません。
