import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・ホバー料金表",
  category: "マーケティング",
  description: "ホバーしたカードが浮き上がり発光。月額/年額トグル付きの料金表。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

type Plan = {
  name: string;
  monthly: number;
  features: { ja: string; en: string }[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthly: 0,
    features: [
      { ja: "3 プロジェクト", en: "3 projects" },
      { ja: "コミュニティ支援", en: "Community support" },
      { ja: "1GB ストレージ", en: "1GB storage" },
    ],
  },
  {
    name: "Pro",
    monthly: 24,
    features: [
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "100GB ストレージ", en: "100GB storage" },
      { ja: "高度な解析", en: "Advanced analytics" },
    ],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 79,
    features: [
      { ja: "Pro の全機能", en: "Everything in Pro" },
      { ja: "SSO / SAML", en: "SSO / SAML" },
      { ja: "専任担当", en: "Dedicated manager" },
      { ja: "SLA 99.99%", en: "99.99% SLA" },
    ],
  },
];

export default function HoverPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [annual, setAnnual] = useState(false);

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Simple pricing" : "シンプルな料金"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en ? "Upgrade or downgrade anytime." : "いつでもアップ・ダウングレード可能。"}
          </p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                !annual ? "bg-white text-neutral-900" : "text-white/60",
              )}
            >
              {en ? "Monthly" : "月額"}
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                annual ? "bg-white text-neutral-900" : "text-white/60",
              )}
            >
              {en ? "Annual" : "年額"} <span className="text-emerald-400">−20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLANS.map((p) => {
            const price = annual ? Math.round(p.monthly * 12 * 0.8) : p.monthly;
            const unit = annual ? (en ? "/yr" : "/年") : en ? "/mo" : "/月";
            return (
              <div
                key={p.name}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2",
                  p.featured
                    ? "border-indigo-400/40 bg-white/[0.04]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20",
                )}
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(220px_circle_at_50%_0%,rgba(99,102,241,0.35),transparent_70%)]" />
                <div className="relative z-10">
                  {p.featured && (
                    <span className="mb-3 inline-block rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                      {en ? "Popular" : "人気"}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tabular-nums">${price}</span>
                    <span className="text-sm text-white/50">{unit}</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f.ja} className="flex items-center gap-2 text-white/75">
                        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                        {en ? f.en : f.ja}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={cn(
                      "mt-7 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                      p.featured
                        ? "bg-indigo-500 hover:bg-indigo-400"
                        : "border border-white/15 hover:bg-white/10",
                    )}
                  >
                    {en ? "Get started" : "始める"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
