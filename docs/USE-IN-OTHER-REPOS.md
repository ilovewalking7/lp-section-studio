# 他リポジトリから Component Studio を使う（取り込みテンプレ）

このスタジオは **shadcn 互換レジストリ**として配信されています。
別リポジトリから **コマンド一発**でコンポーネントを取り込めます（830個超＋プリミティブ）。

- **レジストリURL（ベース）**: `https://app-035-studio.pages.dev/r/`
- **一覧（全 id/type/category）**: `https://app-035-studio.pages.dev/r/index.json`
- 各JSONは**自己完結**（依存UIプリミティブと `cn` を同梱）→ ベースURL設定・名前解決なしで動く

---

## 0. 一度だけの準備（サンドボックスから取りに行く場合のみ）

**ブラウザで見る／自分のPCの端末で `curl` する分には、準備は不要**（`/r` は公開済み）。

「**そのリポジトリの Claude Code セッション（サンドボックス）から fetch したい**」場合のみ、
そのリポジトリの **環境(Environment)のネットワーク egress 許可ホスト**に次を追加する（**repoごとに1回**）:

```
app-035-studio.pages.dev
```

> egress は各リポジトリの環境ごとの設定（Claude Code on the web の仕様）。
> 追加していないと「Host not in allowlist」で 403 になる。
> 参考: https://code.claude.com/docs/en/claude-code-on-the-web

---

## 1. カタログを見る（id を探す）

```bash
# 全件
curl -s https://app-035-studio.pages.dev/r/index.json | jq '.items[] | {name, type, category}'

# カテゴリで絞る（例: ダークテック）
curl -s https://app-035-studio.pages.dev/r/index.json \
  | jq -r '.items[] | select(.category=="ダークテック") | .name'

# キーワードで絞る（例: hero）
curl -s https://app-035-studio.pages.dev/r/index.json \
  | jq -r '.items[].name' | grep hero
```

カテゴリ例: `基本 / ヒーロー・LP / マーケティング / コンバージョン / 価格・オファー / オンボーディング /
ダッシュボード / AI / チャット / アプリUI / ナビゲーション / インタラクション / フォーム / コマース / 設定 /
和風 / 洋風 / ミニマル / ブルータリスト / グラスモーフィズム / レトロ・Y2K / ラグジュアリー / プレイフル /
ニューモーフィズム / メンフィス / ダークテック / 北欧 / ボタニカル`

---

## 2A. React + Tailwind + shadcn のリポジトリ → そのまま取り込み

```bash
# まだ shadcn 未導入なら一度だけ初期化（components.json と Tailwindトークンが入る）
npx shadcn@latest init

# 取り込み（依存の Button/Badge/cn なども一緒に入る）
npx shadcn@latest add https://app-035-studio.pages.dev/r/<id>.json

# 既存の components/ui/* や lib/utils.ts を上書きしてよければ
npx shadcn@latest add --overwrite https://app-035-studio.pages.dev/r/<id>.json
```

- 配置先: コンポーネント本体 → `components/studio/<id>.tsx`、依存プリミティブ → `components/ui/*`
- 使う: `import Demo from "@/components/studio/<id>";` → `<Demo />`

---

## 2B. 素のHTML/CSS/バニラJS のリポジトリ → curl で取得して移植

shadcn は使えない（React前提）ので、ソースを取得してバニラに翻訳する。

```bash
# コンポーネントのReactソースを取り出す（meta は除去済み）
curl -s https://app-035-studio.pages.dev/r/<id>.json | jq -r '.files[0].content'
```

→ 出てきた JSX を **HTML に翻訳**（`className`→`class`、`{式}`→静的値、`useState`等→少量のバニラJS）。
Tailwind を使うなら `<script src="https://cdn.tailwindcss.com"></script>` を1行入れればクラスはそのまま効く。

> このリポジトリの Claude セッションにやらせる場合は、下の「定型プロンプト」を貼ればOK。

---

## 3. 定型プロンプト（別リポジトリの Claude にそのまま貼る）

### React/Tailwind リポジトリ用
```
このリポジトリ（React + Tailwind）に、私の公開レジストリからコンポーネントを取り込みたい。
1) components.json が無ければ `npx shadcn@latest init`（デフォルトでOK）
2) 候補を見る: curl -s https://app-035-studio.pages.dev/r/index.json | jq -r '.items[].name'
3) `npx shadcn@latest add https://app-035-studio.pages.dev/r/<id>.json` で取り込む
4) 適当なページで import して表示し、ビルドが通るか確認して
※ サンドボックスから curl が 403（Host not in allowlist）なら、この環境の egress 許可に
  app-035-studio.pages.dev を追加してから再実行。
```

### 素のHTML/CSS/JS リポジトリ用
```
私の公開レジストリのコンポーネントを、このバニラ(HTML/CSS/JS)サイトに移植したい。
1) 一覧: curl -s https://app-035-studio.pages.dev/r/index.json | jq -r '.items[] | "\(.name)\t\(.category)"'
2) ソース取得: curl -s https://app-035-studio.pages.dev/r/<id>.json | jq -r '.files[0].content'
3) このサイトのトーンに合わせて、上記Reactソースを素のHTML+CSS（必要なら少量のバニラJS）に翻訳して。
   Tailwindを使う場合は <script src="https://cdn.tailwindcss.com"></script> を入れてクラスはそのまま流用。
※ サンドボックスから curl が 403（Host not in allowlist）なら、この環境の egress 許可に
  app-035-studio.pages.dev を追加してから再実行。
```

---

## メモ（うまくいくコツ）

- **依存ゼロで一番ラクなのは多数**（`cn` のみ・UIプリミティブ非依存）。テーマ系（和風/洋風/ダークテック/グラス…）はだいたいこれで、自己完結の明示色なので shadcn トークン無しでも綺麗に出る。
- **`bg-background` 等のセマンティックトークンを使う機能系**（marketing 等）は、取り込み先で `shadcn init` 済みだと正しい色になる。未initだと色が薄く見えることがある。
- **デザインの一貫性**: 取り込み先サイトのトーン（暗い/明るい・モダン/ブルータル）に合うカテゴリを選ぶ。混ぜすぎは禁物。
- **増えたら自動配信**: app-035 の `src/registry/demos/` にコンポーネントを足して push すれば、デプロイ時に `/r/*` も自動更新される。
