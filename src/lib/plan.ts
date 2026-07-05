import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * 料金プランと Free/Pro の出し分け（サービス切り分け）の単一の真実。
 * Pricing ページ・LP・スタジオ内のゲーティングはすべてここを参照する。
 *
 * 価格は MC21（21st.dev）の Pro = $20/月 に合わせ、上位にチーム向け Studio = $100/月 を用意。
 * 表示文言は日本語/英語の二言語（`getPlans(lang)` / `getComparison(lang)`）。
 */

export type PlanId = "free" | "pro" | "studio";

export interface PlanTier {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number; // USD / 月
  priceAnnual: number; // USD / 年（実質月額の割引込み）
  seats: string;
  cta: string;
  highlight?: boolean;
  features: string[];
}

interface PlanCore {
  id: PlanId;
  priceMonthly: number;
  priceAnnual: number;
  highlight?: boolean;
}

const PLAN_CORE: PlanCore[] = [
  { id: "free", priceMonthly: 0, priceAnnual: 0 },
  { id: "pro", priceMonthly: 20, priceAnnual: 192, highlight: true },
  { id: "studio", priceMonthly: 100, priceAnnual: 960 },
];

type PlanText = Pick<PlanTier, "name" | "tagline" | "seats" | "cta" | "features">;

const PLAN_TEXT: Record<PlanId, { ja: PlanText; en: PlanText }> = {
  free: {
    ja: {
      name: "Free",
      tagline: "まず触って試す",
      seats: "1人",
      cta: "無料ではじめる",
      features: [
        "830+ セクションを無制限に閲覧・ライブプレビュー",
        "13 スタイルテーマすべて",
        "検索・フィルタ・お気に入り",
        "コードのコピー：1日10回まで",
        "個人・非商用ライセンス",
      ],
    },
    en: {
      name: "Free",
      tagline: "Try it first",
      seats: "1 seat",
      cta: "Start free",
      features: [
        "Browse & live-preview all 830+ sections",
        "All 13 style themes",
        "Search, filters & favorites",
        "Copy code: up to 10 / day",
        "Personal, non-commercial license",
      ],
    },
  },
  pro: {
    ja: {
      name: "Pro",
      tagline: "制作を仕事にする人へ",
      seats: "1人",
      cta: "Pro にアップグレード",
      features: [
        "Free のすべて",
        "コードのコピー：無制限",
        "バニラ HTML エクスポート",
        "shadcn レジストリ配信（npx で取り込み）",
        "新着セクションの先行アクセス",
        "商用利用ライセンス（1名）",
      ],
    },
    en: {
      name: "Pro",
      tagline: "For people who ship",
      seats: "1 seat",
      cta: "Upgrade to Pro",
      features: [
        "Everything in Free",
        "Unlimited code copy",
        "Vanilla HTML export",
        "shadcn registry (install via npx)",
        "Early access to new sections",
        "Commercial license (1 user)",
      ],
    },
  },
  studio: {
    ja: {
      name: "Studio",
      tagline: "チーム・制作会社向け",
      seats: "5人",
      cta: "Studio で導入する",
      features: [
        "Pro のすべて（5シート）",
        "チーム共有・社内利用",
        "優先サポート＆セクションのリクエスト",
        "商用利用ライセンス（チーム）",
        "新テーマ・テンプレートの早期提供",
      ],
    },
    en: {
      name: "Studio",
      tagline: "For teams & agencies",
      seats: "5 seats",
      cta: "Get Studio",
      features: [
        "Everything in Pro (5 seats)",
        "Team sharing & internal use",
        "Priority support & section requests",
        "Commercial license (team)",
        "Early new themes & templates",
      ],
    },
  },
};

export function getPlans(lang: Lang): PlanTier[] {
  return PLAN_CORE.map((c) => ({ ...c, ...PLAN_TEXT[c.id][lang] }));
}

/** 後方互換（日本語のデフォルト） */
export const PLANS: PlanTier[] = getPlans("ja");

/** プランごとの機能比較表（Pricing ページの比較表に使用） */
export interface CompareRow {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  studio: string | boolean;
}

type Cell = boolean | { ja: string; en: string };
interface CompareRowSrc {
  label: { ja: string; en: string };
  free: Cell;
  pro: Cell;
  studio: Cell;
}

const unlimited = { ja: "無制限", en: "Unlimited" };

const COMPARE_SRC: CompareRowSrc[] = [
  {
    label: { ja: "セクション閲覧・ライブプレビュー", en: "Browse & live preview" },
    free: unlimited,
    pro: unlimited,
    studio: unlimited,
  },
  {
    label: { ja: "13 スタイルテーマ", en: "13 style themes" },
    free: true,
    pro: true,
    studio: true,
  },
  {
    label: { ja: "検索・フィルタ・お気に入り", en: "Search, filters & favorites" },
    free: true,
    pro: true,
    studio: true,
  },
  {
    label: { ja: "コードのコピー", en: "Code copy" },
    free: { ja: "1日10回", en: "10 / day" },
    pro: unlimited,
    studio: unlimited,
  },
  {
    label: { ja: "バニラ HTML エクスポート", en: "Vanilla HTML export" },
    free: false,
    pro: true,
    studio: true,
  },
  {
    label: { ja: "shadcn レジストリ配信（npx）", en: "shadcn registry (npx)" },
    free: false,
    pro: true,
    studio: true,
  },
  {
    label: { ja: "新着セクションの先行アクセス", en: "Early access to new sections" },
    free: false,
    pro: true,
    studio: true,
  },
  {
    label: { ja: "優先サポート / リクエスト", en: "Priority support / requests" },
    free: false,
    pro: false,
    studio: true,
  },
  {
    label: { ja: "シート数", en: "Seats" },
    free: { ja: "1", en: "1" },
    pro: { ja: "1", en: "1" },
    studio: { ja: "5", en: "5" },
  },
  {
    label: { ja: "商用利用ライセンス", en: "Commercial license" },
    free: { ja: "不可", en: "None" },
    pro: { ja: "1名", en: "1 user" },
    studio: { ja: "チーム", en: "Team" },
  },
];

function cell(c: Cell, lang: Lang): string | boolean {
  return typeof c === "boolean" ? c : c[lang];
}

export function getComparison(lang: Lang): CompareRow[] {
  return COMPARE_SRC.map((r) => ({
    label: r.label[lang],
    free: cell(r.free, lang),
    pro: cell(r.pro, lang),
    studio: cell(r.studio, lang),
  }));
}

/** 後方互換（日本語のデフォルト） */
export const COMPARISON: CompareRow[] = getComparison("ja");

export function planById(id: PlanId, lang: Lang = "ja"): PlanTier {
  return getPlans(lang).find((p) => p.id === id) ?? getPlans(lang)[0];
}

/** Pro 以上か（バニラ書き出し・レジストリ配信・無制限コピーの解放判定） */
export function isPro(plan: PlanId): boolean {
  return plan === "pro" || plan === "studio";
}

/** Free プランの1日あたりコピー上限 */
export const FREE_DAILY_COPY_LIMIT = 10;

const copyKey = () => `cs:copies:${new Date().toISOString().slice(0, 10)}`;

export function getTodayCopies(): number {
  try {
    return Number(localStorage.getItem(copyKey()) ?? "0") || 0;
  } catch {
    return 0;
  }
}

export function incTodayCopies(): void {
  try {
    localStorage.setItem(copyKey(), String(getTodayCopies() + 1));
  } catch {
    /* noop */
  }
}

const PLAN_KEY = "cs:plan";

/**
 * 現在のプラン（クライアント保持）。実決済は未接続のため、所有者が体験確認用に切替できる。
 * 本番では認証＋課金（Stripe）で plan を確定する。
 */
export function usePlan(): {
  plan: PlanId;
  setPlan: (p: PlanId) => void;
} {
  const [plan, setPlanState] = useState<PlanId>(() => {
    const v = (typeof localStorage !== "undefined" &&
      localStorage.getItem(PLAN_KEY)) as PlanId | null;
    return v === "pro" || v === "studio" || v === "free" ? v : "free";
  });
  useEffect(() => {
    try {
      localStorage.setItem(PLAN_KEY, plan);
    } catch {
      /* noop */
    }
  }, [plan]);
  return { plan, setPlan: setPlanState };
}
