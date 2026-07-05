import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プラン機能マトリクス",
  category: "マーケティング",
  description:
    "プランごとの対応機能を一覧化したマトリクス。列ホバーでハイライトされ、チェックが弾む。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const PLANS = [
  { ja: "フリー", en: "Free" },
  { ja: "プロ", en: "Pro" },
  { ja: "ビジネス", en: "Business" },
];
const ROWS: { label: string; labelEn: string; cells: boolean[] }[] = [
  { label: "プロジェクト数 無制限", labelEn: "Unlimited projects", cells: [false, true, true] },
  { label: "高度な分析", labelEn: "Advanced analytics", cells: [false, true, true] },
  { label: "チームコラボ", labelEn: "Team collaboration", cells: [true, true, true] },
  { label: "API アクセス", labelEn: "API access", cells: [false, true, true] },
  { label: "監査ログ", labelEn: "Audit logs", cells: [false, false, true] },
  { label: "専任サポート", labelEn: "Dedicated support", cells: [false, false, true] },
  { label: "SSO / SAML", labelEn: "SSO / SAML", cells: [false, false, true] },
];

export default function CapabilityMatrix() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hover, setHover] = useState<number | null>(1);

  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes cm-pop { 0% { transform: scale(.4); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
      `}</style>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "What each plan can do." : "プランごとの、できること。"}
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b bg-muted/40">
            <div className="px-5 py-4 text-sm font-medium text-muted-foreground">
              {en ? "Feature" : "機能"}
            </div>
            {PLANS.map((p, i) => (
              <button
                key={p.en}
                onMouseEnter={() => setHover(i)}
                className={cn(
                  "px-3 py-4 text-center text-sm font-semibold transition-colors",
                  hover === i ? "text-primary" : "text-foreground"
                )}
              >
                {en ? p.en : p.ja}
              </button>
            ))}
          </div>

          {ROWS.map((r, ri) => (
            <div
              key={r.labelEn}
              className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b last:border-0"
            >
              <div className="px-5 py-3.5 text-sm font-medium">{en ? r.labelEn : r.label}</div>
              {r.cells.map((on, ci) => (
                <div
                  key={ci}
                  onMouseEnter={() => setHover(ci)}
                  className={cn(
                    "flex items-center justify-center py-3.5 transition-colors",
                    hover === ci && "bg-primary/5"
                  )}
                >
                  {on ? (
                    <span
                      className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      style={
                        hover === ci
                          ? { animation: `cm-pop .4s both`, animationDelay: `${ri * 40}ms` }
                          : undefined
                      }
                    >
                      <Check className="size-4" />
                    </span>
                  ) : (
                    <Minus className="size-4 text-muted-foreground/50" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
