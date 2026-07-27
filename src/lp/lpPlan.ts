/**
 * ミセテLP の料金プラン・クォータ・Stripeリンク・サイトURLの単一の真実。
 * ビルダーUI（LpBuilder）のゲーティングと表示はすべてここを参照する。
 * 既存プラン（src/lib/plan.ts）とは別サービスのため独立した定義を持つ。
 */
import { useEffect, useState } from "react";
import type { PlanId } from "@/lib/plan";

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

/**
 * localStorage への書き込みが失敗する環境（プライベートブラウジング・容量超過等）向けの
 * フォールバックカウンタ。モジュールレベルのメモリ内カウンタのため、そのセッション
 * （ページを開いている間）だけ上限判定が効く。ページを開き直すとリセットされるため
 * 恒久的なクォータではないが、「フェイルオープンで無制限に書き出せてしまう」よりは安全側。
 */
let memoryExportsFallback = 0;

/** 今月の書き出し回数（localStorage 不在・壊れた値・負値は 0 扱いにクランプする） */
export function getMonthExports(): number {
  let stored = 0;
  try {
    stored = Math.max(0, Number(localStorage.getItem(monthKey()) ?? "0") || 0);
  } catch {
    stored = 0;
  }
  return Math.max(stored, memoryExportsFallback);
}

/** 今月の書き出し回数を1増やす。localStorage に書き込めない場合はメモリカウンタへ退避する。 */
export function incMonthExports(): void {
  try {
    localStorage.setItem(monthKey(), String(getMonthExports() + 1));
  } catch {
    memoryExportsFallback += 1;
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

const LP_PLAN_KEY = "lp:plan";

/**
 * ミセテLP 専用のプラン状態（localStorage キー: "lp:plan"）。
 * 既存 Studio の usePlan()（src/lib/plan.ts, キー "cs:plan"）と同じ実装パターン
 * （初期値をlocalStorageから読み出し・変更のたびに保存）を踏襲するが、キーを分離した
 * 別サービスの状態として独立に持つ（Studio 側の "cs:plan" には一切触れない）。
 */
export function useLpPlan(): {
  plan: PlanId;
  setPlan: (p: PlanId) => void;
} {
  const [plan, setPlanState] = useState<PlanId>(() => {
    // Cookie／サイトデータを拒否した環境では localStorage は「未定義」ではなく
    // getter 自体が例外（SecurityError）を投げる。typeof ガードでは防げず、ここは
    // LpBuilder の最初のフックのためページ全体が白画面になる。本ファイルの他の
    // アクセス（getMonthExports / incMonthExports）と同じく握りつぶして既定値に倒す。
    try {
      const v = localStorage.getItem(LP_PLAN_KEY) as PlanId | null;
      return v === "pro" || v === "studio" || v === "free" ? v : "free";
    } catch {
      return "free";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(LP_PLAN_KEY, plan);
    } catch {
      /* noop */
    }
  }, [plan]);
  return { plan, setPlan: setPlanState };
}
