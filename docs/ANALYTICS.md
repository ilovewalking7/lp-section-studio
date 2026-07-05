# アナリティクス設定（同意バナー不要・軽量・地域ゲート）

このプロジェクトは **Cloudflare Web Analytics ＋ Microsoft Clarity** の構成。
どちらも **Cookie を使わない**。表示速度（Core Web Vitals）への影響も最小限になるよう
**async・本番のみ** で読み込む。

| ツール | 範囲 | 同意バナー | 実装 |
| --- | --- | --- | --- |
| Cloudflare Web Analytics | **全地域** | 不要（Cookieレス・PVのみ） | ダッシュボードで自動注入（コード不要） |
| Microsoft Clarity（録画/ヒートマップ） | **地域ゲート**：EEA/UK/スイス以外 | 不要（厳格地域では起動しない） | `VITE_CLARITY_ID` を入れるだけ |

### 地域ゲートの考え方
Clarity はセッション録画を伴うため、事前同意（オプトイン）が必要な地域
**EEA（EU27＋IS/LI/NO）＋ 英国 ＋ スイス** では**起動しない**。それ以外（日本・米国など）
でのみ読み込むので、**同意バナー無し**で主要市場のデータが取れる。
- 地域判定：Cloudflare 純正 `/cdn-cgi/trace` の `loc=XX`（依存ゼロ）。
- **判定不能時は読み込まない（fail-closed）**＝厳格地域の取りこぼしより安全を優先。
- 対象地域を変えたいときは `src/lib/analytics.ts` の `CONSENT_REQUIRED` を編集。
  （例：日本のみ許可にしたいなら「許可リスト方式」に変更。）

> ⚠️ サイトが Cloudflare Access の裏（非公開）の間は、記録されるのは自分のアクセスだけ。
> 意味のあるデータは **公開後** に集まる。公開後、各ツール側で「自分のアクセスを除外」する設定を入れると良い。

---

## 1. Cloudflare Web Analytics（コード不要）

トラフィック概要（PV / 流入元 / 国 / Core Web Vitals）。Cookieレス。

1. Cloudflare ダッシュボード → 対象の **Pages プロジェクト（component-studio）**。
2. **Web Analytics を有効化**（Pages のメトリクス/アナリティクス、または Web Analytics で
   自動セットアップ）。Cloudflare がレスポンスに beacon を自動注入する＝**コード変更なし**。
3. 数日後、ダッシュボードでPV・流入・CWVを確認。

> 手動で beacon を入れたい場合のみ `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"..."}'>` を使うが、Pages の自動注入を使うなら不要（二重計測を避けるため**片方だけ**にする）。

---

## 2. Microsoft Clarity（コードは配線済み・IDを入れるだけ）

ヒートマップ＋セッション再生。無料・録画数無制限。

1. <https://clarity.microsoft.com/> でサインイン → **New project** を作成。
   - 名前: 任意（例: `LP Section Studio`）。サイトURLは後で公開ドメインに更新可。
2. プロジェクトの **Settings → Setup** から **Project ID**（短い英数字）を控える。
3. **Cloudflare Pages → Settings → Environment variables** に追加:
   - `VITE_CLARITY_ID = <Project ID>`
   - Production（必要なら Preview も）に設定。
4. 再デプロイ（または次回ビルド）で有効化。`src/lib/analytics.ts` が
   **本番ビルド時・ID あり・許可地域**のときだけ Clarity を async 読み込みする。
   - ID 未設定／開発時は **完全に no-op**（Vite が丸ごと除去）。

### 仕組み（実装メモ）
- 配線: `src/lib/analytics.ts` の `initAnalytics()` を `src/main.tsx` で呼ぶ。
- 条件: `import.meta.env.PROD` && `VITE_CLARITY_ID` あり && 訪問国が `CONSENT_REQUIRED` 以外。
- 地域判定: `/cdn-cgi/trace` の `loc=XX`。判定不能なら読み込まない（fail-closed）。
- 読み込み: `https://www.clarity.ms/tag/<id>` を `async` で `<head>` に追加（描画ブロックなし）。

---

## プライバシー
- 両ツールとも Cookie 不使用のため、原則として同意バナーは不要。
- ただし Clarity は**セッションを記録**するため、プライバシーポリシーに
  「アクセス解析・操作記録（Clarity / Cloudflare）を利用」する旨を明記しておくと安全。
