#!/usr/bin/env node
/**
 * research-crawler — 設定駆動の Crawlee クローラ
 *
 * ジョブ設定(JSON)を渡して実行する:
 *   node src/crawl.mjs jobs/pypi-demo.json
 *
 * 方針(polite crawling):
 *   - robots.txt を尊重（`respectRobotsTxt: true` の間は Crawlee が Disallow を自動スキップ）
 *   - レート制限（maxRequestsPerMinute / maxConcurrency）と総数上限（maxRequestsPerCrawl）で
 *     「小さく試走 → 上限を上げてスケール」を安全に回す
 *   - 取得対象はジョブごとに設定。エンジンは cheerio(高速・非ブラウザ) か playwright(JS描画) を選ぶ
 *
 * 出力: 抽出行を単一 JSON にまとめて `output/<name>.json` へ書き出す（集計・分析は利用者側で）。
 */
import {
  readFileSync,
  mkdirSync,
  writeFileSync,
  readdirSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { CheerioCrawler, PlaywrightCrawler, Dataset, log } from "crawlee";

const cfgPath = process.argv[2];
if (!cfgPath) {
  console.error("usage: node src/crawl.mjs <job-config.json>");
  process.exit(1);
}
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));

// --- polite なデフォルト値（ジョブ設定で上書き可） ---
const {
  name = "crawl",
  engine = "cheerio", // "cheerio" | "playwright"
  startUrls = [],
  maxRequestsPerMinute = 30,
  maxConcurrency = 2,
  maxRequestsPerCrawl = 20,
  respectRobotsTxt = true,
  userAgent = "app-035-research-crawler/0.1 (+https://github.com/ilovewalking7/app-035)",
  extract = {}, // { フィールド名: "CSSセレクタ" }
  follow = null, // { linkSelector?: "a.xxx", urlPattern: "https://.../**" }
  output = `output/${name}.json`,
} = cfg;

if (!Array.isArray(startUrls) || startUrls.length === 0) {
  console.error(`[${name}] startUrls が空です。ジョブ設定を確認してください。`);
  process.exit(1);
}

// 事前インストール済み Chromium を解決（playwright エンジン用）
function resolveChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    for (const d of readdirSync(base)) {
      if (d.startsWith("chromium-")) {
        const p = join(base, d, "chrome-linux", "chrome");
        if (existsSync(p)) return p;
      }
    }
  } catch {
    /* noop */
  }
  return undefined; // 見つからなければ playwright の既定解決に委ねる
}

// Cheerio の $ から抽出ルールを適用
function extractWithCheerio($, url) {
  const row = { url };
  for (const [field, sel] of Object.entries(extract)) {
    row[field] = $(sel).first().text().trim() || null;
  }
  return row;
}

const common = {
  maxRequestsPerMinute,
  maxConcurrency,
  maxRequestsPerCrawl,
  // Crawlee 3.13+ の robots.txt 自動尊重。Disallow の URL はキューされない。
  respectRobotsTxtFile: respectRobotsTxt,
};

let crawler;
if (engine === "playwright") {
  const executablePath = resolveChromium();
  crawler = new PlaywrightCrawler({
    ...common,
    launchContext: {
      userAgent,
      launchOptions: { executablePath, headless: true },
    },
    async requestHandler({ request, page, enqueueLinks }) {
      const row = { url: request.url };
      for (const [field, sel] of Object.entries(extract)) {
        const t = await page
          .locator(sel)
          .first()
          .textContent()
          .catch(() => null);
        row[field] = t ? t.trim() : null;
      }
      await Dataset.pushData(row);
      if (follow?.urlPattern) {
        await enqueueLinks({
          selector: follow.linkSelector || "a",
          globs: [follow.urlPattern],
        });
      }
    },
    failedRequestHandler({ request }) {
      log.warning(`[${name}] failed: ${request.url}`);
    },
  });
} else {
  crawler = new CheerioCrawler({
    ...common,
    preNavigationHooks: [
      (_ctx, reqOpts) => {
        reqOpts.headers = { ...reqOpts.headers, "User-Agent": userAgent };
      },
    ],
    async requestHandler({ request, $, enqueueLinks }) {
      await Dataset.pushData(extractWithCheerio($, request.url));
      if (follow?.urlPattern) {
        await enqueueLinks({
          selector: follow.linkSelector || "a",
          globs: [follow.urlPattern],
        });
      }
    },
    failedRequestHandler({ request }) {
      log.warning(`[${name}] failed: ${request.url}`);
    },
  });
}

log.info(
  `[${name}] engine=${engine} start=${startUrls.length} rpm=${maxRequestsPerMinute} conc=${maxConcurrency} cap=${maxRequestsPerCrawl} robots=${respectRobotsTxt}`,
);
await crawler.run(startUrls);

// Dataset を単一 JSON にエクスポート
const items = (await Dataset.getData()).items;
const outPath = resolve(process.cwd(), output);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(items, null, 2));
log.info(`[${name}] wrote ${items.length} rows → ${output}`);
