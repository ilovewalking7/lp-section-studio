import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "返金保証シール",
  category: "コンバージョン",
  description:
    "購入リスクを取り除く、力強い全額返金保証のシール/カード。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["guarantee", "risk-reversal", "trust"],
  principle:
    "「効果がなければ全額返金」と売り手がリスクを肩代わりするリスク・リバーサルが、買い手の損する不安を消し、最後の購入障壁を取り除く。",
};

const POINTS = [
  { ja: "理由を問わず全額返金", en: "Full refund, no questions asked" },
  { ja: "解約はワンクリック", en: "Cancel in one click" },
  { ja: "手数料・違約金なし", en: "No fees, no penalties" },
];

export default function GuaranteeBadge() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-6 text-center shadow-sm">
      {/* Seal */}
      <div className="relative mx-auto grid size-28 place-items-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full animate-[spin_22s_linear_infinite] text-emerald-500/30"
          aria-hidden
        >
          <path
            id="seal-ring"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            fill="none"
          />
          <text className="fill-current text-[8.5px] font-semibold uppercase tracking-[0.32em]">
            <textPath href="#seal-ring" startOffset="0">
              money back · 30 days · money back · 30 days ·
            </textPath>
          </text>
        </svg>
        <div className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
          <ShieldCheck className="size-9" strokeWidth={2.2} />
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald-500">
        {en ? "100% satisfaction guarantee" : "100% 満足保証"}
      </p>
      <h3 className="mt-1 text-xl font-semibold tracking-tight">
        {en ? "30-day money-back guarantee" : "30日間 全額返金保証"}
      </h3>
      <p className="mx-auto mt-2 max-w-[18rem] text-sm text-muted-foreground">
        {en
          ? "Try it risk-free. If you're not satisfied, we'll refund you in full within 30 days."
          : "まずはノーリスクでお試しください。ご満足いただけなければ、30日以内に全額お返しします。"}
      </p>

      <ul className="mx-auto mt-5 flex max-w-[16rem] flex-col gap-2 text-left">
        {POINTS.map((p) => (
          <li key={p.ja} className="flex items-center gap-2 text-sm">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {en ? p.en : p.ja}
          </li>
        ))}
      </ul>

      <Button className="mt-6 w-full">
        {en ? "Start risk-free" : "ノーリスクで始める"}
      </Button>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {en ? "No credit card required." : "クレジットカードは不要です。"}
      </p>
    </div>
  );
}
