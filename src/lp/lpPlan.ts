/**
 * ミセテLP の料金プラン・クォータ・Stripeリンク・サイトURLの単一の真実。
 * ビルダーUI（LpBuilder）のゲーティングと表示はすべてここを参照する。
 * 既存プラン（src/lib/plan.ts）とは別サービスのため独立した定義を持つ。
 */

export interface LpPlanTier {
  id: "free" | "pro" | "studio";
  name: string;
  priceLabel: string;
  features: string[];
}

export const LP_PLANS: readonly LpPlanTier[] = [
  {
    id: "free",
    name: "Free",
    priceLabel: "¥0",
    features: [
      "書き出し：月3回まで",
      "共有URL：無料・無制限",
      "複数プロジェクト保存",
      "フッターに「Made with ミセテLP」バッジ表示",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "¥1,480/月",
    features: [
      "Free のすべて",
      "書き出し：無制限",
      "バッジなし + OGP設定",
      "商用利用ライセンス（1名）",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    priceLabel: "¥4,980/月",
    features: [
      "Pro のすべて",
      "複数ブランド・案件を管理（制作会社向け）",
      "優先サポート",
      "商用利用ライセンス（チーム）",
    ],
  },
] as const;

/** Free プランの書き出し上限（月あたり） */
export const FREE_MONTHLY_EXPORT_LIMIT = 3;

const monthKey = () => `lp:exports:${new Date().toISOString().slice(0, 7)}`;

/** 今月の書き出し回数（localStorage 不在・壊れた値は 0 扱い） */
export function getMonthExports(): number {
  try {
    return Number(localStorage.getItem(monthKey()) ?? "0") || 0;
  } catch {
    return 0;
  }
}

/** 今月の書き出し回数を1増やす */
export function incMonthExports(): void {
  try {
    localStorage.setItem(monthKey(), String(getMonthExports() + 1));
  } catch {
    /* noop */
  }
}

/** import.meta.env の値を、空文字を除いた string | undefined に正規化する */
function envString(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/** Stripe の決済リンク。未設定なら null（= デモモード）。 */
export function getStripeLink(plan: "pro" | "studio"): string | null {
  const raw =
    plan === "pro"
      ? import.meta.env.VITE_STRIPE_LINK_LP_PRO
      : import.meta.env.VITE_STRIPE_LINK_LP_STUDIO;
  return envString(raw) ?? null;
}

/** 公開サイトのベースURL（共有URL・OGP生成に使用） */
export const SITE_URL = envString(import.meta.env.VITE_SITE_URL) ?? "https://misete-lp.pages.dev";
