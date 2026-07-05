# Claude in Chrome 用 指示書 — Cloudflare へデプロイ＆Private URL発行

> これは **Claude in Chrome（ブラウザ操作エージェント）** にそのまま渡せる runbook です。
> 目的: GitHub リポジトリ `ilovewalking7/app-035`（Vite製 Component Studio）を
> **Cloudflare Pages** にデプロイし、**Cloudflare Access** で「自分のメールだけ」に制限する。
> 所要 約10〜15分・無料枠内。

---

## あなた（Claude in Chrome）への進め方ルール

1. **順番に1ステップずつ**実行し、各フェーズの最後の「✅確認」を満たしてから次へ進む。
2. **人間に渡す（手を止めて依頼する）場面**:
   - アカウントの**ログイン/サインアップ**（メール・パスワード入力）
   - **GitHub認可（OAuth）ポップアップ**での承認
   - **メールに届くワンタイムPIN**の取得・入力
   - 「**Production branch**」「**プロジェクト名**」など本人の意思決定が要る箇所
   これらは自分で勝手に入力せず、画面を示して「ここを操作してください」と依頼する。
3. **秘密情報（パスワード/トークン/PIN）は自分で生成・推測しない**。常に人間に入力してもらう。
4. **UIラベルが下記と違う**場合（Cloudflareは画面更新が多い）、**同等の意味のボタン/リンク**を探して進める（例: 「Connect to Git」→「Import an existing Git repository」等）。判断に迷えば人間に確認。
5. 各フェーズ後、**実際に表示されている内容（URLやステータス）を報告**する。

---

## 前提（人間に先にやってもらう）

- ブラウザで **Cloudflare にログイン済み**（無料アカウント）にしておく。
- **GitHub にログイン済み**で、`ilovewalking7/app-035` にアクセスできる状態。
- デプロイ対象ブランチを決める：**おすすめ `main`**（PR #1 をマージ済みの場合）。未マージなら `claude/custom-component-tool-aploq1`。

---

## フェーズ1：Cloudflare Pages にデプロイ

1. `https://dash.cloudflare.com/` を開く。ログインしていなければ**人間に依頼**。
2. 左メニュー **Workers & Pages** を開く。
3. **Create** → **Pages** タブ → **Connect to Git**（または「Import an existing Git repository」）をクリック。
4. **GitHub を接続/認可**：認可ポップアップが出たら **人間に承認を依頼**。承認後、リポジトリ一覧から
   **`ilovewalking7/app-035`** を選び **Begin setup**。
5. セットアップ画面で以下を入力：
   | 項目 | 入力値 |
   |---|---|
   | Project name | （人間に確認。例 `app-035-studio`。これが URL になる） |
   | Production branch | **`main`**（未マージなら `claude/custom-component-tool-aploq1`）— **人間に確認** |
   | Framework preset | **Vite** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
6. **Environment variables (Build)** を開き、1件追加：
   - Variable name: `NODE_VERSION` / Value: `20`
7. **Save and Deploy** をクリック。ビルドログが流れる（2〜3分）。
8. **✅確認**: 「Success」表示と **`https://<project>.pages.dev`** のリンクが出たら、その URL を開いて
   スタジオ（左にカテゴリ、コンポーネント一覧）が表示されることを確認し、**URL を人間に報告**。
   - 失敗時: ビルドログ末尾のエラーを読み、`NODE_VERSION=20`・Build command・Output dir が上記の通りか確認。直して **Retry deployment**。

> この時点では「URLを知れば誰でも閲覧可」。次でPrivate化する。

---

## フェーズ2：Cloudflare Access で「自分だけ」に制限（無料）

1. Cloudflare ダッシュボード左メニューの **Zero Trust** を開く。
   - 初回は**チーム名（サブドメイン）の設定**と**プラン選択**を求められる → **Free プラン**を選び、チーム名入力は **人間に依頼**。
2. **Access** → **Applications** → **Add an application** → **Self-hosted** を選択。
3. アプリ設定：
   - **Application name**: `component-studio`
   - **Session Duration**: 既定でよい（例 24h）
   - **Application domain**: サブドメインに `<project>`（フェーズ1のプロジェクト名）、ドメインは `pages.dev` を選択。
     **Path は空欄**（= サイト全体を保護）。
   - **Next** で進む。
4. **Policy** を1つ作成：
   - Policy name: `me-only`
   - Action: **Allow**
   - Configure rules → **Include** → Selector **Emails** → Value に **あなたのメールアドレス**（**人間に入力を依頼**）。
   - **Next** → **Add application** で保存。
5. **✅確認**: シークレット/別タブ（未ログイン状態）で `https://<project>.pages.dev` を開き、
   **Cloudflare Access のログイン画面（メール入力→PIN）**が出ることを確認。
   - PIN は**人間がメールで受け取り入力**する。ログイン後にスタジオが表示されれば成功。

---

## フェーズ2.5：レジストリ `/r/*` だけを公開する（他リポジトリ取り込み用）

別リポジトリから `npx shadcn add https://<project>.pages.dev/r/<id>.json` で取り込めるようにするには、
**`/r/*` だけ認証なし**にする。`npx`/CLI はログインできないため、ここを Bypass にする。
（配信されるのはコンポーネントのソースのみ＝秘密情報なし。スタジオ本体は引き続き Private のまま。）

1. **Access** → **Applications** → **Add an application** → **Self-hosted**（2つ目のアプリを作る）。
2. アプリ設定：
   - **Application name**: `studio-registry`
   - **Application domain**: サブドメイン `<project>`、ドメイン `pages.dev`、**Path に `r`** を入力（`/r` と `/r/*` が対象）。
   - **Next**。
3. **Policy** を1つ作成：
   - Policy name: `public-registry`
   - Action: **Bypass**
   - Configure rules → **Include** → Selector **Everyone**。
   - **Next** → **Add application** で保存。
4. **✅確認**: 別タブ（未ログイン）で `https://<project>.pages.dev/r/index.json` を開き、
   **ログイン画面に飛ばず JSON がそのまま表示される**ことを確認（= `/r` は公開）。
   併せて `https://<project>.pages.dev/`（ルート）は**まだログインが要求される**ことも確認（= 本体は Private のまま）。
   - Cloudflare Access は**より具体的なパス（`/r`）を優先**するため、この2アプリ構成で「本体Private・`/r`公開」が両立する。

> 不要なら飛ばしてよい（他リポジトリ取り込みを使わない場合）。後からいつでも追加できる。

---

## フェーズ3：完了報告

人間に次を報告して終了：
- 発行された **本番URL**: `https://<project>.pages.dev`
- Private 化の状態（Access ログインが要求されることを確認できたか）
- 以後は **GitHub にpushするだけで自動再デプロイ**される旨

---

## 補足
- **料金**: Pages（月500ビルド・帯域無制限）と Access（〜50ユーザー）の無料枠内 → ¥0。
- **独自ドメイン（任意）**: Pages プロジェクト → **Custom domains** から追加（要ドメイン所有）。
- 失敗・画面差異で詰まったら、**スクリーンショットと現在のURL**を添えて人間に状況を伝える。
