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

**880 個すべて**が入っています。版の区別はありません
（以前あった無料版／買い切り版の区分は廃止しました）。

| 項目 | 数 |
| --- | --- |
| コンポーネント総数 | **880 個**（39 カテゴリ） |
| React 不要（静的 HTML で書き出せる） | **397 個** |
| 自動テスト | 2,661 件。変更のたびに全件実行 |
| axe-core 検査 | 881 件 / 違反 0 |

## 依存

コンポーネントの依存は `react` / `lucide-react` / `clsx` + `tailwind-merge` /
`class-variance-authority` と、同梱の UI プリミティブのみです。外部画像も
使っていないので、ファイルを 1 つ置けば動きます。

静的 HTML 版は Tailwind だけで動きますが、`bg-card` `text-muted-foreground`
`bg-primary` などは**このコンポーネント集のデザイントークン**で、素の Tailwind
には存在しません。`get_component_html` が返す HTML はこの定義を `<head>` に
埋め込んだ状態で返るので、そのまま貼れば表示されます。自分のプロジェクトに
トークンを組み込む場合は、リポジトリの `src/components/theme/` にある
`tailwind.config.js` と `tokens.css` を使ってください。

## ライセンス

**MIT** です。880 個すべてが商用利用・改変・再配布可で、条件はライセンス文を
残すことだけです。詳細はリポジトリの [LICENSE](../LICENSE) を参照してください。

**名前について。** MIT が対象にしているのはコードであって、名前ではありません。
「LP Section Studio」の名称は、このプロジェクトと作者を指すものとして使っています。
フォークは自由ですが、フォークは別の名前で公開してください。

## 作った人

**Yoggy** — 個人開発者。AI で作って、実際に動かして確かめたことだけ書いています。

- X: [@yoggydev](https://x.com/yoggydev)
- note: [note.com/yoggydev](https://note.com/yoggydev)
- デモ: [lp-section-studio.pages.dev](https://lp-section-studio.pages.dev)
- リポジトリ: [github.com/ilovewalking7/lp-section-studio](https://github.com/ilovewalking7/lp-section-studio)
