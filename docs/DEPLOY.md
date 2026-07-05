# デプロイ手順 — Cloudflare Pages（Private）＋ 公開レジストリ

このスタジオを **無料で・Private（自分だけアクセス可）** にホスティングし、
コンポーネント配信用の `/r/*.json` だけを**公開**して他リポジトリから取り込めるようにする手順です。

```
┌─────────────────────────────────────────────┐
│  https://<project>.pages.dev                 │
│  ├─ /          スタジオUI   → 🔒 Access(自分だけ) │
│  └─ /r/*.json  レジストリ    → 🌐 公開(Bypass)   │
└─────────────────────────────────────────────┘
```

---

## 1. Cloudflare Pages にデプロイ

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. リポジトリ `ilovewalking7/app-035` を選択（マージ後は `main` ブランチ）
3. ビルド設定:
   | 項目 | 値 |
   |---|---|
   | Framework preset | `Vite`（または None） |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | 環境変数 | `NODE_VERSION` = `20` |
4. **Save and Deploy** → `https://<project>.pages.dev` が発行されます

> `npm run build` は内部で `npm run registry` も実行するので、
> デプロイのたびに `/r/*.json` が最新のコンポーネントで再生成されます。

---

## 2. スタジオを Private にする（Cloudflare Access / Zero Trust）

Access は無料（最大50ユーザー）。ログインは **メールのワンタイムPIN** が既定で使えます。

### アプリ①：サイト全体を保護
1. **Zero Trust** ダッシュボード → **Access** → **Applications** → **Add an application** → **Self-hosted**
2. 設定:
   - **Application domain**: `<project>.pages.dev`（**Path は空欄** → `/*` 全体）
   - **Policy**: `Allow` / Include → **Emails** → 自分のメールアドレス
3. 保存

これで `https://<project>.pages.dev/` はあなたのログインが必要になります。

### アプリ②：レジストリ `/r/*` だけ公開
`npx shadcn add <url>` は CLI がログインできないため、`/r/*` は認証なしにします。

1. もう一度 **Add an application** → **Self-hosted**
2. 設定:
   - **Application domain**: `<project>.pages.dev`、**Path**: `r`（`/r` と `/r/*` を対象）
   - **Policy**: `Bypass` / Include → **Everyone**
3. 保存

> Cloudflare Access は**より具体的なパス（`/r`）を優先**するため、
> サイトは Private のまま `/r/*.json` だけが公開されます。
> 配信されるのはコンポーネントのソースコードのみ（秘密情報なし）。

---

## 3. 他のリポジトリから取り込む

shadcn 初期化済みのプロジェクトで:

```bash
# 例: ボタン（cn ユーティリティも自動解決）
npx shadcn@latest add https://<project>.pages.dev/r/button.json

# 配信中アイテムの一覧
curl https://<project>.pages.dev/r/index.json
```

UIプリミティブを増やしたら `npm run registry`（or `npm run build`）→ push で配信が更新されます。

---

## 代替案

- **完全ローカル運用**: デプロイせず `npm run dev` だけ。ネットに一切出さず100% Private。
- **Vercel (Hobby)**: 無料・非商用。`Settings → Deployment Protection → Vercel Authentication` で自分のログインに制限可。
- **GitHub Pages は非推奨**: 無料プランでは公開サイトを Private にできません（Private Pages は Enterprise Cloud のみ）。
