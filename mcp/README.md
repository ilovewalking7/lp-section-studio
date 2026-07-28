# LP Section Studio MCP

検証済みの UI コンポーネントを、Claude Code や Cursor から**生成せずに**取り出す MCP サーバです。

## 他の部品系 MCP と違うところ

**毎回作らない。** 既にある物を返すだけなので、同じ id を指定すれば常に同じ物が返ります。生成に伴うトークン消費も、当たり外れもありません。

**全部が機械検査を通っている。** 収録している部品はすべて、以下を CI で毎回通しています。

| 検査 | 内容 |
| --- | --- |
| axe-core | 構造アクセシビリティ。違反 0 件 |
| コントラスト | トークン定義を WCAG の相対輝度で計算。全組み合わせが AA |
| キーボード操作 | 対話部品がキーボードで到達できるか |
| 横スクロール | 実ブラウザ・幅375px でページが横に破れないか |

**React が要らない現場でも使える。** `get_component_html` は React も Babel も含まない静的 HTML を返します。Tailwind を読み込むだけで表示されるので、PHP・Rails・Hugo・WordPress にもそのまま貼れます。

## 導入

> **npm には未公開です。** `npx lp-section-studio-mcp` は現時点では動きません
> （レジストリに存在しないため 404 になります）。下の手順で入れてください。

### 1. 依存を入れる

`node_modules` は同梱していないので、一度だけ入れます。

```bash
cd mcp
npm install
```

必要なのは `@modelcontextprotocol/sdk` と `zod` の2つだけです。

### 2. クライアントに登録する

Claude Code:

```bash
claude mcp add lp-section-studio -- node /絶対パス/mcp/src/index.js
```

設定ファイルに直接書く場合（Claude Desktop は `claude_desktop_config.json`、
Cursor は `.cursor/mcp.json`、Claude Code はプロジェクト直下の `.mcp.json`）:

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

パスは**絶対パス**にしてください。MCP クライアントは任意の作業ディレクトリから
サーバを起動するため、相対パスでは見つかりません。

<details>
<summary>npm に公開したあとの入れ方（公開するまで動きません）</summary>

```bash
npx lp-section-studio-mcp
claude mcp add lp-section-studio -- npx -y lp-section-studio-mcp
```

</details>

## ツール

| ツール | 引数 | 返り値 |
| --- | --- | --- |
| `search_components` | `query` / `category` / `standalone_only` / `limit`（既定20・最大50）すべて任意 | 一致した件数と、`id`・名前・カテゴリ・説明の一覧（テキスト） |
| `get_component` | `id`（必須） | React / TypeScript のソースを ```` ```tsx ```` で囲んだテキスト |
| `get_component_html` | `id`（必須） | React 抜きの静的 HTML を ```` ```html ```` で囲んだテキスト |
| `list_categories` | なし | カテゴリごとの件数（うち React 不要が何件か付き） |

`query` は `id`・名前・説明・タグへの部分一致で、日本語でも英語でも引けます。
`standalone_only: true` を付けると、React 不要（静的 HTML を貼るだけで完成する）
ものだけに絞れます。存在しない `id` を渡した場合は、エラーとして
「見つかりません」というテキストが返ります。

### 使い方の例

```
価格表のセクションを探して、React を使わない形で入れて
```

`search_components({ query: "価格", standalone_only: true })` で
`offers-value-stack-offer` などが返り、続けて
`get_component_html({ id: "offers-value-stack-offer" })` を呼ぶと、
そのまま貼れる HTML が返ります。

## 収録内容

版によって収録数が違います。手元のものがどちらかは、
`data/components.json` の `edition` で分かります。

| 版 | `edition` | 収録数 |
| --- | --- | --- |
| 無料版（MCP のみ） | `free` | **100 個**。すべて React 不要。28 カテゴリに散らして選択（1カテゴリ最大4個） |
| 買い切り版 | `full` | **880 個**（うち React 不要が 397 個）。39 カテゴリ |

## 依存

コンポーネントの依存は `react` / `lucide-react` / `clsx` + `tailwind-merge` /
`class-variance-authority` と、同梱の UI プリミティブのみです。外部画像も
使っていないので、ファイルを 1 つ置けば動きます。

静的 HTML 版は Tailwind だけで動きますが、`bg-card` `text-muted-foreground`
`bg-primary` などは**このコンポーネント集のデザイントークン**で、素の Tailwind
には存在しません。買い切り版の HTML はこの定義を `<head>` に埋め込んだ状態で
配布しているのでそのまま表示されます。自分でトークンを組み込む場合は、
買い切り版の `components/theme/` にある `tailwind.config.js` と `tokens.css`
を使ってください。

## ライセンス

同梱の `LICENSE` を参照してください。無料版（`edition: free` の 100 個）は
個人利用・非商用の範囲、買い切り版（`edition: full` の 880 個）は商用利用可
です。いずれもコンポーネント自体の再配布・再販はできません。
