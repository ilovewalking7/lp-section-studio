# research-crawler

設定駆動の [Crawlee](https://crawlee.dev/) クローラ。**robots.txt 尊重 + レート制限**を既定にして、
調査用のデータ収集を**ジョブ設定(JSON)を渡すだけ**で実行する。取得対象はその都度ジョブで決める。

- エンジン: `cheerio`（高速・非ブラウザ / 既定）と `playwright`（JS描画が要るサイト）
- 出力: 抽出行を単一 JSON にまとめて `output/<name>.json` へ（集計・分析は利用者側で）
- app-032 の `crawlee-impersonate` と違い、**curl-impersonate バイナリも有料プロキシも不要**な純 npm 構成

---

## 前提：ネットワーク許可（egress）

クローラは**このサンドボックスから**対象サイトへ取りに行くので、**対象ドメインが実行環境の
ネットワーク許可リストに入っていること**が必須。入っていないと `HTTP 000`（到達不能）になる。

- この Claude Code 環境の既定は「パッケージマネージャー + GitHub」程度に絞られている
  （例: `pypi.org` `registry.npmjs.org` は到達可 / 一般サイトは遮断）。
- 実在ターゲット（楽天など）を巡回するには、その環境の許可リストにドメインを追加する
  （例: `*.rakuten.co.jp` `*.r10s.jp`）。設定反映には新しいセッション/環境が要る場合がある。
- 許可リストは**取りたいドメインだけ**に絞るのが安全（クロール先は信頼できない外部コンテンツで、
  全開だと万一の混入時に外部送信の余地が生まれる。=「パッケージマネージャーのみ + 対象ドメイン」推奨）。

---

## 使い方

```bash
cd crawler
npm install                          # 初回のみ（crawlee + playwright。ブラウザは環境の既存Chromiumを使用）
npm run demo                         # 付属デモ（PyPI 5ページ）を実行
node src/crawl.mjs jobs/<your>.json  # 任意ジョブ
```

出力は `output/<name>.json`（`.gitignore` 済み）。

### ジョブ設定（JSON）

```jsonc
{
  "name": "pypi-demo",              // 出力ファイル名などに使う
  "engine": "cheerio",             // "cheerio"(既定) | "playwright"(JS描画)
  "startUrls": ["https://pypi.org/project/requests/"],
  "maxRequestsPerMinute": 20,       // レート制限（polite。小さく始める）
  "maxConcurrency": 2,              // 同時実行数
  "maxRequestsPerCrawl": 10,        // 総数上限（試走の安全弁。スケール時に上げる）
  "respectRobotsTxt": true,         // robots.txt の Disallow を自動スキップ
  "userAgent": "app-035-research-crawler/0.1 (+連絡先URL)",
  "extract": {                      // CSSセレクタ → フィールド（.first().text() を取得）
    "name_version": "h1.package-header__name",
    "summary": ".package-description__summary"
  },
  "follow": {                       // 任意：リンクを辿って範囲内だけ列挙
    "linkSelector": "a.item",
    "urlPattern": "https://example.com/items/**"
  },
  "output": "output/pypi-demo.json"
}
```

`follow` を省けば `startUrls` だけを取得する。`follow.urlPattern`（glob）で**クロール範囲を限定**する。

### 小さく試走 → スケール

1. `maxRequestsPerCrawl` を 5〜10、`maxRequestsPerMinute` を 20 程度で**試走**し、出力の抽出が
   意図通りか（セレクタ/フィールド）を確認する。
2. 問題なければ `maxRequestsPerCrawl` を外す/大きくし、`maxRequestsPerMinute` を対象サイトの
   体力と礼儀に合わせて調整してスケールする。robots とレート制限は据え置き。

---

## robots.txt とレート制限（実測）

- **robots**: `respectRobotsTxt: true` の間、Disallow の URL はキューされず
  `Some requests were skipped because they were disallowed based on the robots.txt file` と警告が出る。
  （例: PyPI の `Disallow: /search*` は自動スキップされ、`/project/*` のみ取得される。）
- **レート**: `maxRequestsPerMinute` / `maxConcurrency` で送出を絞る。リトライ・バックオフは Crawlee 既定。

---

## playwright エンジン

JS 描画が要るサイトは `"engine": "playwright"`。環境に事前インストールされた Chromium
（`PLAYWRIGHT_BROWSERS_PATH`）を自動解決して `executablePath` に渡すため、ブラウザの追加DLは不要。

---

## 注意

- 対象サイトの**利用規約・robots・レート**を尊重する（本ツールは robots とレート制限を既定で有効化）。
- 公式 API がある領域（例: Rakuten Webservice API）は**スクレイピングより API を優先**。
- `output/` の取得データはリポジトリに含めない（`.gitignore` 済み）。
