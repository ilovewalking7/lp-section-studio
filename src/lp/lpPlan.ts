/**
 * ミセテLP の料金プラン・Stripeリンク・サイトURLの単一の真実。
 * ビルダーUI（LpBuilder）のゲーティングと表示はすべてここを参照する。
 * 既存プラン（src/lib/plan.ts）とは別サービスのため独立した定義を持つ。
 *
 * ── なぜ月額をやめて買い切りにしたのか ──
 * 作るのは「1枚のHTMLファイル」で、持ち帰った時点で利用者の手元に残る。
 * 毎月こちらが何かを提供し続ける種類の商品ではないのに月額を取ると、
 * 解約が止まらないうえ、こちらにも継続的な更新・サポートの義務が生まれる。
 * 姉妹のコンポーネント集（src/lib/plan.ts）と同じく、買い切りの2段に揃える。
 *
 * ── なぜ「無料は書き出し月3回まで」の上限を捨てたのか ──
 * 1. LPは一度で決まらない。書き出して実機で確認し、直してまた書き出す。
 *    月3回の上限は、利用者がまだ価値を感じていない最初の作業のさなかで手を止める。
 *    止められた人は買うのではなく、そのまま帰ってしまう。
 * 2. プラン状態も回数もブラウザの localStorage にあり、編集すれば外せる。
 *    守れない壁は、規約どおりに使う正直な利用者だけを止める。
 * 3. 実際に効く壁は、書き出したHTMLに焼き込まれるフッターのバッジのほう。
 *    無料で公開されたLPがそのまま宣伝になる（Carrd・Tally と同じ形）。
 */
import { useEffect, useState } from "react";

/**
 * ミセテLP のプラン識別子。コンポーネント集（src/lib/plan.ts）と同じ
 * 「無料 / 買い切り」の2段だが、別サービスとして独立に持つ
 * （片方の値を変えるともう片方が壊れる事故を避けるため）。
 */
export type LpPlanId = "free" | "full";

export interface LpPlanTier {
  id: LpPlanId;
  name: string;
  /** 円。買い切りなので月額ではない。0 は無料。 */
  price: number;
  /** 価格の表示文字列（例 "¥9,800"） */
  priceLabel: string;
  /** 価格に添える補助表記（例 "買い切り・税込"）。無料版は持たない。 */
  priceNote?: string;
  highlight?: boolean;
  features: string[];
}

/** ミセテLP の買い切り版を持っているか（バッジ非表示・OGP出力の解放判定） */
export function isLpPaid(plan: LpPlanId): boolean {
  return plan === "full";
}

export const LP_PLANS: readonly LpPlanTier[] = [
  {
    id: "free",
    name: "無料",
    price: 0,
    priceLabel: "¥0",
    features: [
      "4業種のテンプレート・写真・お客様の声まで全機能",
      "書き出し：無制限",
      "共有URL：無制限",
      "複数プロジェクト保存",
      "フッターに「Made with ミセテLP」バッジが入る",
    ],
  },
  {
    id: "full",
    name: "フル",
    price: 9800,
    priceLabel: "¥9,800",
    priceNote: "買い切り・税込",
    highlight: true,
    features: [
      "無料版のすべて",
      "フッターのバッジなし",
      "OGP（SNSでの見え方）の設定",
      "商用利用OK（自分のお店でもクライアント納品でも）",
      "買い切り。これ以降の費用はかからない",
    ],
  },
] as const;

/** import.meta.env の値を、空文字を除いた string | undefined に正規化する */
function envString(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/** Stripe の決済リンク（買い切り1本）。未設定なら null（= デモモード）。 */
export function getStripeLink(): string | null {
  return envString(import.meta.env.VITE_STRIPE_LINK_LP) ?? null;
}

/** 公開サイトのベースURL（共有URL・OGP生成に使用） */
export const SITE_URL = envString(import.meta.env.VITE_SITE_URL) ?? "https://misete-lp.pages.dev";

const LP_PLAN_KEY = "lp:plan";

/**
 * ミセテLP 専用のプラン状態（localStorage キー: "lp:plan"）。
 * 既存 Studio の usePlan()（src/lib/plan.ts, キー "cs:plan"）と同じ実装パターン
 * （初期値をlocalStorageから読み出し・変更のたびに保存）を踏襲するが、キーを分離した
 * 別サービスの状態として独立に持つ（Studio 側の "cs:plan" には一切触れない）。
 * 月額時代の値（"pro" / "studio"）が残っていても、既知でない値として "free" に倒れる。
 */
export function useLpPlan(): {
  plan: LpPlanId;
  setPlan: (p: LpPlanId) => void;
} {
  const [plan, setPlanState] = useState<LpPlanId>(() => {
    // Cookie／サイトデータを拒否した環境では localStorage は「未定義」ではなく
    // getter 自体が例外（SecurityError）を投げる。typeof ガードでは防げず、ここは
    // LpBuilder の最初のフックのためページ全体が白画面になる。保存側（useEffect）と
    // 同じく握りつぶして既定値に倒す。
    try {
      const v = localStorage.getItem(LP_PLAN_KEY) as LpPlanId | null;
      return v === "full" || v === "free" ? v : "free";
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
