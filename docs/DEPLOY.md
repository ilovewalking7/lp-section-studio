# デプロイ手順 — Cloudflare Pages（全公開・無料）

このスタジオを **Cloudflare Pages の無料枠** で全公開する手順です。
独自ドメインは不要で、`https://<project>.pages.dev` が自動で発行されます。

```
https://lp-section-studio.pages.dev
├─ /              LP（プリレンダー済み静的HTML）
├─ /studio        スタジオUI（880個の一覧・プレビュー・コピー）
└─ /r/*.json      shadcn 互換レジストリ（npx shadcn add で取り込める）
```

---

## 1. Cloudflare Pages に接続する

**CLI も wrangler の認証も要りません。** ダッシュボードから GitHub を繋ぐだけです。

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. リポジトリ `ilovewalking7/lp-section-studio` を選択（ブランチ `main`）
3. ビルド設定:

   | 項目 | 値 |
   |---|---|
   | Framework preset | `None`（`wrangler.toml` が出力先を指定するため） |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | 環境変数 | `NODE_VERSION` = `20` |

4. **Save and Deploy**

以降 `main` に push するたびに自動で再デプロイされます。

### Playwright は要りません

`npm run html`（静的HTML書き出し）は Playwright を使いますが、
**`npm run build` には含まれていません。** CI 側でブラウザを落とす必要はなく、
ビルドは 15 秒ほどで完了します。

`public/html/` は `.gitignore` 済みで、公開サイトからも参照されません。
静的HTMLが必要なときはローカルで `npx playwright install chromium && npm run html` を実行します。

---

## 2. 無料枠に収まることの実測値

2026-08-16 時点でビルドして実測した値です（推定ではありません）。

| 項目 | 実測 | Cloudflare Free の上限 | 使用率 |
|---|---|---|---|
| ファイル数 | **3,648** | 20,000 | **18.2%** |
| 最大ファイルサイズ | **0.7 MB**（`Studio-*.js`） | 25 MiB | 2.8% |
| 総容量 | 27 MB | — | — |
| ビルド回数 | push のたび1回 | 500 回/月 | — |

内訳: JS 1,874 / レジストリ JSON 885 / その他 889。

帯域とリクエストは静的アセットについて無制限（Free プラン）。

---

## 3. デプロイ後にやること

### ① URL の差し替え（実施済み）

`docs/USE-IN-OTHER-REPOS.md` の URL は `lp-section-studio.pages.dev` に置換済みです。
canonical / og:url / sitemap.xml / robots.txt も同じ URL を指すよう修正済み。

> **注意**: `scripts/prerender.mjs` の `ORIGIN` が canonical と og:url を決めます。
> ドメインを変える場合はここか環境変数 `VITE_SITE_URL` を必ず更新してください。
> 古いままだと **canonical が別サイトを指し、検索評価がそちらに流れます**。

```
npx shadcn@latest add https://lp-section-studio.pages.dev/r/wafu-ryokan-hero.json
```

**この差し替えをしないと、3つの取り込み経路のうち「shadcn レジストリ」が使えません。**

### ② レジストリが実際に配信されているか確認する

```bash
curl https://lp-section-studio.pages.dev/r/index.json | head
```

885 件のアイテムが返れば成功です。

### ③ プリレンダーが効いているか確認する

```bash
curl -s https://lp-section-studio.pages.dev/ | grep -c "<h1"
```

JavaScript を実行せずに `<h1>` が取れれば、クローラにも届いています。
**「React 不要で SEO が効く」という主張の実証にもなります。**

---

## 4. 独自ドメインを足す場合（任意）

`*.pages.dev` のままで SSL もインデックスも問題なく機能します。
あとから **Custom domains** タブでいつでも追加できるので、最初は不要です。

---

## 5. 分析（任意）

`.env.example` の `VITE_CLARITY_ID` を Cloudflare Pages の
**Settings → Environment variables** に設定すると、Microsoft Clarity
（Cookie レスのヒートマップ）が本番ビルドでのみ有効になります。
未設定なら分析コードは一切読み込まれません。詳細は `docs/ANALYTICS.md`。
