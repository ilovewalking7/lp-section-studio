# app-035

Claude Code on the web（リモート開発）用にセットアップされたリポジトリです。
`Remote-kaihatsu` と同様に、ブラウザ／モバイルからのリモートセッションで開発できます。

---

## 🧩 Component Studio（自分専用の無料コンポーネント置き場）

21st.dev（Magic MCP）のサブスクの代わりに、**自分のコンポーネントを貯めて・プレビューして・コードをコピーできる**スタジオを同梱しています。月20ドルではなく **¥0** で運用でき、**260**のプレミアム品質コンポーネントを最初から収録（うち多数は心理学・マーケ最適化の**上級**、さらに **13スタイルテーマ**＝和風・洋風ほかで展開）。コンポーネントは**遅延ロード**で初期表示は軽量（初期JS gzip ≈ 100KB）。

```bash
npm install     # 初回のみ
npm run dev     # http://localhost:5173 で起動
npm run build   # 本番ビルド（Vercel / GitHub Pages などへ無料デプロイ可）
npm run registry # 他リポジトリ配布用の registry JSON を public/r/ に生成
```

### できること（21st.dev を上回るポイント）

- コンポーネントを一覧から選んで **ライブプレビュー**
- **「なぜ効く？」設計意図カード** … 上級コンポーネントに心理学・マーケ・デザインの根拠を明記
- **レスポンシブ・プレビュー**（モバイル / タブレット / デスクトップ幅を切り替え）
- **お気に入り**（localStorage 保存）・**タグ検索**・カテゴリアイコン
- **ワンクリックでソースをコピー**（表示中の実体と常に一致 — `?raw` インポート）
- ダーク / ライト テーマ切り替え
- **shadcn 互換レジストリ配信** → 他のどのリポジトリからでも 1 コマンドで取り込み可

### 収録カテゴリ（100+ コンポーネント）

| カテゴリ | 例 |
|---|---|
| ヒーロー・LP | グラデーションメッシュ / ベント / 分割モックアップ / ウェイトリスト / マーキー |
| マーケティング | 機能セクション / 比較 / 統計カウンター / 証言カルーセル / リード獲得 / FAQ |
| **コンバージョン**（上級） | ソーシャルプルーフ通知 / 希少性在庫 / カウントダウン / 信頼バッジ / Before/After |
| **価格・オファー**（上級） | アンカリング料金 / 比較表 / デコイ価格 / 価値の積み上げ / 返金保証 |
| **オンボーディング**（上級） | 進捗チェックリスト / コーチマーク / ストリーク / 実績解除 / 紹介 |
| ダッシュボード | KPI / 棒・面・ドーナツ・ファネル / ヒートマップ / リーダーボード / 通知センター |
| AI / チャット | チャット / プロンプト入力 / モデル選択 / ストリーミング / ⌘Kパレット |
| アプリUI | ダイアログ / トースト / メニュー / タブ / ツールチップ / アバター / D&D |
| ナビゲーション | メガメニュー / サイドバー / パンくず / ページネーション / リッチフッター |
| インタラクション | アニメカウンター / スポットライト / 3Dチルト / 星評価 / スケルトン |
| コマース・フォーム | 商品カード / カート / 決済 / マルチステップ / 設定パネル |

### 🎨 スタイルテーマ（各12種・計156）

ページの世界観に合わせて選べる13のスタイル。各テーマは独自の配色・書体で**自己完結**（スタジオのダーク/ライトに非依存）。

| テーマ | 雰囲気 |
|---|---|
| 🎌 **和風** | 和紙・墨・朱・藍、明朝体、縦書き、青海波/麻の葉/印鑑。旅館・料亭・工芸 |
| 🏛 **洋風** | アイボリー×ゴールド、Playfair セリフ、エディトリアル。ブティック・高級店 |
| ⬜ **ミニマル** | スイス/モノクロ、強いグリッド、余白の規律 |
| 🟥 **ブルータリスト** | 極太黒枠・ハードシャドウ・原色ブロック |
| 🫧 **グラスモーフィズム** | 鮮やかな背景＋フロステッドガラス |
| 🕹 **レトロ・Y2K** | シンセウェイブ/ネオン/CRT/ピクセル |
| 💎 **ラグジュアリー** | 漆黒×金、細い罫線、余白で高級感 |
| 🎈 **プレイフル** | キャンディ配色・丸み・弾むモーション |
| 🌫 **ニューモーフィズム** | やわらかな凹凸シャドウのソフトUI |
| 🔺 **メンフィス** | 80sポストモダン、幾何学・原色・遊び |
| 🖥 **ダークテック** | 開発者向けダーク、ターミナル・等幅・グリッド |
| 🌿 **北欧** | ヒュッゲ、くすみナチュラル、余白と温かみ |
| 🍃 **ボタニカル** | アースカラー、葉・枝のSVG、ウェルネス |

明朝＝Shippori Mincho / 洋＝Playfair Display / 丸ゴシック＝M PLUS Rounded を `index.html` で読み込み、`font-mincho` / `font-display` / `font-rounded` で利用できます。

すべて **デザイン taste skill**（`Leonxlnx/taste-skill`）と **心理学 × マーケティング × Webデザイン**の観点で構築（強いタイポグラフィ・余白・モーション、AIっぽい量産感の回避）。外部画像なし・ダークモード対応。

> 💡 **上級コンポーネント**には `principle`（なぜ効くか）を記載。例: アンカリング効果 / 希少性 / 損失回避 / ツァイガルニク効果 / 社会的証明 など、根拠ある設計をそのままコピーして使えます。

### 構成

- **Vite + React + TypeScript + Tailwind CSS**（すべて無料・MITライセンス）
- `src/components/ui/` … 再利用するUIプリミティブ（shadcn/ui 規約）
- `src/registry/demos/<カテゴリ>/` … 1ファイル＝1コンポーネント
- `src/registry/index.ts` … `import.meta.glob` で demos を**自動探索**（手動登録は不要）

### 新しいコンポーネントを追加する

`src/registry/demos/<カテゴリ>/` に `.tsx` を1つ置くだけ。自動で一覧に並びます。

```tsx
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マイカード",
  category: "マーケティング",
  description: "説明文。",
  align: "center", // "full" | "center" | "start"
};

export default function MyCard() {
  return <div>…</div>;
}
```

> Claude に「○○なカードを作って」と頼めば、この追加までまとめてやってくれます。

### 🔁 他のリポジトリでこのコンポーネントを使う（260個すべて配信）

このスタジオは **自分専用の shadcn レジストリ**としても機能します。**6個のUIプリミティブだけでなく、260個のコンポーネントすべて**を、別リポジトリからコマンド一発で取り込めます。

各 JSON は**自己完結**（必要なUIプリミティブと `cn` を同梱）なので、ベースURL設定や名前解決なしでどのホストからでも動きます。

```bash
npm run registry   # public/r/*.json（266アイテム + index.json）を生成
                   # ※ public/r/ は .gitignore 済み。npm run build / デプロイ時に自動生成される
```

別リポジトリ側（**shadcn 初期化済み**プロジェクト = `components.json` / Tailwind / `@/lib/utils` がある）で:

```bash
# 配信中アイテムの一覧（id を確認）
curl https://<あなたのデプロイ先>/r/index.json

# 例: 和風ヒーローを取り込む（依存の Button/Badge/cn も同梱で入る）
npx shadcn@latest add https://<あなたのデプロイ先>/r/wafu-ryokan-hero.json

# 既存の components/ui/* や lib/utils.ts を上書きしてよければ --overwrite
npx shadcn@latest add --overwrite https://<あなたのデプロイ先>/r/marketing-cta-banner.json
```

- 取り込んだコンポーネントは `components/studio/<id>.tsx` に、依存プリミティブは `components/ui/*` に配置されます。
- まだ shadcn 構成でないリポジトリは、先に `npx shadcn@latest init`（Tailwind のセマンティックトークンが入ります）。
- コンポーネントを増やすたびに push すれば、デプロイ時に配信内容も自動更新されます。

> 📋 **他リポジトリでの使い方（コピペ用テンプレ）**: [docs/USE-IN-OTHER-REPOS.md](docs/USE-IN-OTHER-REPOS.md)
> — curl での一覧確認・`npx shadcn add`・バニラ移植・別repoのClaudeに貼る定型プロンプトまでまとめてあります。

### 🔒 Private にホスティングする

**Cloudflare Pages + Access**（無料）で、スタジオ本体は自分だけアクセス可・`/r/*` だけ公開、という形にできます。手順は **[docs/DEPLOY.md](docs/DEPLOY.md)** を参照。
（`npm run build` がデプロイ時に `npm run registry` も実行するので、配信レジストリは常に最新になります。）

---

## リモート開発のセットアップ内容

- **`.claude/settings.json`**
  - 公式マーケットプレイス `anthropics/claude-plugins-official` を登録
  - 公式プラグイン **`claude-code-setup`** を有効化
    （コードベースを解析し、hooks・skills・MCP サーバー・subagents などの自動化を提案するプラグイン）
  - プラグインマーケットプレイス `nextlevelbuilder/ui-ux-pro-max-skill` を登録
  - スキルプラグイン **`ui-ux-pro-max`** を有効化
    （プロUI/UX設計のためのデザインインテリジェンス・スキル。50+スタイル/97パレット/57フォント/99 UXルール等）
  - プラグインマーケットプレイス `Leonxlnx/taste-skill` を登録
  - スキルプラグイン **`taste-skill`** を有効化
    （AIっぽい量産UIを避け、レイアウト・タイポグラフィ・モーション・余白を底上げするデザイン taste スキル群。brutalist / minimalist / soft / redesign / image-to-code 等を収録）
  - セッション開始フック（`SessionStart`）を登録
- **`.mcp.json`**
  - 外部 MCP サーバーは登録していません（`mcpServers` は空）。
  - UI コンポーネントは**同梱の Component Studio**（`src/registry/` の880個）から流用するため、
    21st.dev Magic MCP（月20ドル・`TWENTY_FIRST_API_KEY` 必須）は**不要**です。
    （元の app-028 由来のセットアップからこの MCP を外し、ローカル Studio に一本化しています）
- **`.claude/hooks/session-start.sh`**
  - リモートセッション開始時に依存関係を自動インストール
  - `package.json` / `requirements.txt` / `pyproject.toml` を検出して対応
  - 冪等（何度実行しても安全）。現状コードが無いため、現時点では何もインストールしません。

## 環境変数

外部 API キーは不要です（21st.dev Magic MCP を外したため `TWENTY_FIRST_API_KEY` は使いません）。
任意の分析用に `.env.example` の `VITE_CLARITY_ID`（Cookieレスのヒートマップ、本番ビルド時のみ）だけを
設定できます。詳細は `docs/ANALYTICS.md` を参照。

## 使い方

1. このブランチを既定ブランチにマージすると、以降のリモートセッションすべてにこの設定が適用されます。
2. プロジェクトのコードを追加すると、`session-start.sh` が依存関係を自動で用意します。
3. リモートセッション内で `claude-code-setup` プラグインを使うと、このリポジトリに合わせた自動化（hooks / skills / subagents など）の提案を受けられます。
4. `ui-ux-pro-max` スキルは UI/UX 設計タスクで自動的に活用されます。フロントエンドのコンポーネントは**同梱の Component Studio**（`src/registry/` の880個）から流用します（API キー不要）。

## このリポジトリをテンプレートとして再利用する

このリポジトリは、新規リポジトリで同じリモート開発セットアップを再利用するための雛形（テンプレート）として使えます。

**① GitHub のテンプレート機能を有効化（任意・推奨）**

- GitHub で **Settings → General → 「Template repository」にチェック**を入れると、
  以降は **「Use this template」** から同じ構成のリポジトリをワンクリックで作成できます。

**② まとめて作成（CLI）**

- `scripts/bootstrap-repos.sh` は、このリポジトリの設定一式を引き継いだ
  **Private リポジトリを連番で一括作成**します（既定で `app-005`〜`app-014` の10個）。
- 実行には `gh`（`gh auth login` 済み）、`git`、`rsync`、`perl` が必要です。

```bash
./scripts/bootstrap-repos.sh                 # app-005 .. app-014（Private）
START=5 END=14 ./scripts/bootstrap-repos.sh  # 範囲を指定する場合
```

> ℹ️ Component Studio は同梱のためコンポーネント流用に外部 egress や API キーは不要です。
> 他リポジトリへ**配信レジストリ（`/r/*.json`）として**取り込む場合のみ、その環境の egress 許可に
> このスタジオのデプロイ先ホスト（例 `app-035-studio.pages.dev`）を追加してください（`docs/USE-IN-OTHER-REPOS.md`）。
