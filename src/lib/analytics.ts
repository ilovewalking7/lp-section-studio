/**
 * 軽量・地域ゲート付きのアナリティクス配線。
 *
 * - Cloudflare Web Analytics … Pages のダッシュボードで自動注入（コード不要・全地域・
 *   Cookieレス）。ここでは扱わない。
 * - Microsoft Clarity（ヒートマップ＋セッション再生）… **同意必須地域（EEA＋UK＋スイス）
 *   以外**でのみ読み込む“地域ゲート”。これにより同意バナー無しでも主要市場（日本・米国 等）の
 *   データが取れる。Cookieレスだが録画を伴うため、規制の厳しい地域では起動しない。
 *
 * 起動条件: 本番ビルド && `VITE_CLARITY_ID` 設定済み && 訪問国が許可地域。
 * 地域判定は Cloudflare 純正の `/cdn-cgi/trace`（`loc=XX`／依存ゼロ）。
 * **判定不能時は安全側に倒して読み込まない（fail-closed）**。
 * ID 未設定／開発時は完全に no-op（Vite が丸ごと除去）。
 */

// 事前同意（オプトイン）が必要な地域。ここでは Clarity を起動しない。
// EEA（EU27 + アイスランド/リヒテンシュタイン/ノルウェー）+ 英国(GB) + スイス(CH)。
const CONSENT_REQUIRED = new Set<string>([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
]);

function loadClarity(projectId: string): void {
  if (document.getElementById("ms-clarity")) return; // 二重読み込み防止
  const s = document.createElement("script");
  s.id = "ms-clarity";
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(s);
}

/** Cloudflare エッジから訪問国コード（例 "JP"）を取得。失敗時は null。 */
async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch("/cdn-cgi/trace", { cache: "no-store" });
    if (!res.ok) return null;
    const m = (await res.text()).match(/^loc=([A-Z]{2})$/m);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/** 本番のみ・ID あり・許可地域のときだけアナリティクスを初期化する。 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (!import.meta.env.PROD) return;

  const clarityId = import.meta.env.VITE_CLARITY_ID;
  if (!clarityId) return;

  // 地域ゲート: 同意必須地域・判定不能では起動しない。
  void detectCountry().then((country) => {
    if (country && !CONSENT_REQUIRED.has(country)) loadClarity(clarityId);
  });
}
