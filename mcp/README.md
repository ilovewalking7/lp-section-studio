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

```bash
npx lp-section-studio-mcp
```

Claude Code の場合:

```bash
claude mcp add lp-section-studio -- npx -y lp-section-studio-mcp
```

`.mcp.json` に直接書く場合:

```json
{
  "mcpServers": {
    "lp-section-studio": {
      "command": "npx",
      "args": ["-y", "lp-section-studio-mcp"]
    }
  }
}
```

## ツール

| ツール | 用途 |
| --- | --- |
| `search_components` | 名前・説明・タグで検索。`standalone_only` で React 不要のものだけに絞れる |
| `get_component` | React / TypeScript のソースを返す |
| `get_component_html` | React 抜きの静的 HTML を返す |
| `list_categories` | カテゴリと件数の一覧 |

### 使い方の例

```
価格表のセクションを探して、React を使わない形で入れて
```

`search_components({ query: "価格", standalone_only: true })` →
`get_component_html({ id: "offers-comparison-matrix" })` の順に呼ばれ、
そのまま貼れる HTML が返ります。

## 収録内容

この無料版には **100 個**が入っています。すべて React 不要で動くものを、
28 カテゴリに散らして選んでいます（1 カテゴリ最大 4 個）。

全 **880 個**（うち React 不要が 397 個）は買い切り版に収録しています。

## 依存

コンポーネントの依存は `react` / `lucide-react` / `clsx` + `tailwind-merge` と、
同梱の UI プリミティブのみです。外部画像も使っていないので、ファイルを 1 つ
置けば動きます。静的 HTML 版は Tailwind だけで動きます。

## ライセンス

同梱の `LICENSE` を参照してください。
