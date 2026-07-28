import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * 料金と、無料版／買い切り版の切り分けの単一の真実。
 * Pricing ページ・LP・スタジオ内の解放判定はすべてここを参照する。
 *
 * ── なぜ月額ではなく買い切りなのか ──
 * コンポーネント集は「一度コピーしたら終わり」の買い物で、継続して価値が
 * 出る種類のものではない。月額にすると解約が止まらないし、こちらにも
 * 継続的な更新・サポートの義務が生まれる。実際 Tailwind UI も Aceternity も
 * 買い切りで、月額なのは毎回生成する型（原価が毎回かかる型）だけ。
 * ここは生成しないので、買い切りが素直に噛み合う。
 *
 * 無料版は「入口」として置く。ドメインも SEO も使わない以上、見つけて
 * もらう経路は MCP しかない。無料で入れてもらえないと存在を知られない。
 */

export type PlanId = "free" | "full";

export interface PlanTier {
  id: PlanId;
  name: string;
  tagline: string;
  /** 円。買い切りなので月額ではない。0 は無料。 */
  price: number;
  /** 参考表示用のドル概算。0 は表示しない。 */
  priceUsd: number;
  cta: string;
  highlight?: boolean;
  features: string[];
}

interface PlanCore {
  id: PlanId;
  price: number;
  priceUsd: number;
  highlight?: boolean;
}

/** 英語表示の参考値に使う換算レート。決済は円建てなので概算で足りる。 */
const USD_RATE = 163;
const usd = (yen: number) => Math.round(yen / USD_RATE);

const PLAN_CORE: PlanCore[] = [
  { id: "free", price: 0, priceUsd: 0 },
  { id: "full", price: 9800, priceUsd: usd(9800), highlight: true },
];

type PlanText = Pick<PlanTier, "name" | "tagline" | "cta" | "features">;

const PLAN_TEXT: Record<PlanId, { ja: PlanText; en: PlanText }> = {
  free: {
    ja: {
      name: "無料",
      tagline: "MCP から 100 個をすぐ使う",
      cta: "MCP を入れる",
      features: [
        "MCP 経由で 100 個（すべて React 不要）",
        "React 抜きの静的 HTML をそのまま取得",
        "880 個すべてをブラウザで閲覧・ライブプレビュー",
        "個人利用・非商用",
      ],
    },
    en: {
      name: "Free",
      tagline: "Start with 100 components via MCP",
      cta: "Install the MCP",
      features: [
        "100 components over MCP (all React-free)",
        "Static HTML you can paste as-is",
        "Browse and live-preview all 880 in the browser",
        "Personal, non-commercial use",
      ],
    },
  },
  full: {
    ja: {
      name: "全部入り",
      tagline: "880 個すべて。一度払えば終わり",
      cta: "買い切りで手に入れる",
      features: [
        "880 個すべて（うち 397 個は React 不要）",
        "4 つの機械検査を通過（a11y・コントラスト・キーボード・横スクロール）",
        "MCP の全部入り版",
        "shadcn レジストリ配信（npx で取り込み）",
        "商用利用 可",
        "追加・更新は無料",
      ],
    },
    en: {
      name: "Full",
      tagline: "All 880. Pay once.",
      cta: "Buy once",
      features: [
        "All 880 components (397 of them React-free)",
        "Passes 4 automated checks (a11y, contrast, keyboard, overflow)",
        "Full edition of the MCP server",
        "shadcn registry delivery (npx)",
        "Commercial use allowed",
        "Future additions and updates included",
      ],
    },
  },
};

export function getPlans(lang: Lang): PlanTier[] {
  return PLAN_CORE.map((c) => ({ ...c, ...PLAN_TEXT[c.id][lang] }));
}

/** 後方互換（日本語のデフォルト） */
export const PLANS: PlanTier[] = getPlans("ja");

/** プランごとの比較表（Pricing ページの比較表に使用） */
export interface CompareRow {
  label: string;
  free: string | boolean;
  full: string | boolean;
}

type Cell = boolean | { ja: string; en: string };
interface CompareRowSrc {
  label: { ja: string; en: string };
  free: Cell;
  full: Cell;
}

const COMPARE_SRC: CompareRowSrc[] = [
  {
    label: { ja: "収録コンポーネント", en: "Components included" },
    free: { ja: "100", en: "100" },
    full: { ja: "880", en: "880" },
  },
  {
    label: {
      ja: "React 不要（静的 HTML で完成）",
      en: "React-free (works as static HTML)",
    },
    free: { ja: "100", en: "100" },
    full: { ja: "397", en: "397" },
  },
  {
    label: {
      ja: "ブラウザで閲覧・ライブプレビュー",
      en: "Browse & live preview",
    },
    free: { ja: "880 すべて", en: "All 880" },
    full: { ja: "880 すべて", en: "All 880" },
  },
  {
    label: { ja: "13 スタイルテーマ", en: "13 style themes" },
    free: true,
    full: true,
  },
  {
    label: {
      ja: "a11y・コントラスト・キーボード・横スクロールの自動検査",
      en: "Automated a11y / contrast / keyboard / overflow checks",
    },
    free: true,
    full: true,
  },
  {
    label: { ja: "MCP サーバ", en: "MCP server" },
    free: { ja: "100 個", en: "100 components" },
    full: { ja: "880 個", en: "880 components" },
  },
  {
    label: { ja: "shadcn レジストリ配信（npx）", en: "shadcn registry (npx)" },
    free: false,
    full: true,
  },
  {
    label: { ja: "商用利用", en: "Commercial use" },
    free: { ja: "不可", en: "No" },
    full: { ja: "可", en: "Yes" },
  },
  {
    label: { ja: "追加・更新", en: "Future additions & updates" },
    free: false,
    full: { ja: "無料", en: "Included" },
  },
  {
    label: { ja: "支払い", en: "Payment" },
    free: { ja: "—", en: "—" },
    full: { ja: "一度だけ", en: "One time" },
  },
];

function cell(c: Cell, lang: Lang): string | boolean {
  return typeof c === "boolean" ? c : c[lang];
}

export function getComparison(lang: Lang): CompareRow[] {
  return COMPARE_SRC.map((r) => ({
    label: r.label[lang],
    free: cell(r.free, lang),
    full: cell(r.full, lang),
  }));
}

/** 後方互換（日本語のデフォルト） */
export const COMPARISON: CompareRow[] = getComparison("ja");

export function planById(id: PlanId, lang: Lang = "ja"): PlanTier {
  return getPlans(lang).find((p) => p.id === id) ?? getPlans(lang)[0];
}

/** 買い切り版を持っているか（バニラ書き出し・レジストリ配信・無制限コピーの解放判定） */
export function hasFullAccess(plan: PlanId): boolean {
  return plan === "full";
}

/** 無料版の1日あたりコピー上限 */
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
 * 現在のプラン（クライアント保持）。決済は BOOTH など外部で行うため、
 * ここでは購入後の切り替えのみを持つ。
 */
export function usePlan(): {
  plan: PlanId;
  setPlan: (p: PlanId) => void;
} {
  const [plan, setPlanState] = useState<PlanId>(() => {
    const v = (typeof localStorage !== "undefined" &&
      localStorage.getItem(PLAN_KEY)) as PlanId | null;
    return v === "full" || v === "free" ? v : "free";
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
