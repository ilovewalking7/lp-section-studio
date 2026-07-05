import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオン料金表",
  category: "価格・オファー",
  description: "暗闇に発光するネオン枠のサイバーな料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    name: "INDIE",
    price: "¥1,500",
    c: "#22d3ee",
    feats: [
      { ja: "3プロジェクト", en: "3 projects" },
      { ja: "コミュニティ", en: "Community" },
      { ja: "基本分析", en: "Basic analytics" },
    ],
  },
  {
    name: "PRO",
    price: "¥4,200",
    c: "#e879f9",
    feats: [
      { ja: "無制限", en: "Unlimited" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度分析", en: "Advanced analytics" },
      { ja: "API", en: "API" },
    ],
    best: true,
  },
  {
    name: "STUDIO",
    price: "¥9,900",
    c: "#f59e0b",
    feats: [
      { ja: "全機能", en: "All features" },
      { ja: "専任サポート", en: "Dedicated support" },
      { ja: "SSO", en: "SSO" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
  },
];

export default function NeonPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-[#0a0a12] px-4 py-16">
      <style>{`
        @keyframes np-flicker { 0%,100%{ opacity:1; } 92%{ opacity:1; } 94%{ opacity:.6; } 96%{ opacity:1; } }
        @media (prefers-reduced-motion: reduce){ .np-flicker{ animation:none !important; } }
      `}</style>
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="np-flicker text-3xl font-bold tracking-tight text-white sm:text-4xl [animation:np-flicker_4s_linear_infinite]">
          LEVEL UP YOUR PLAN
        </h2>
        <p className="mt-3 text-white/50">
          {en ? "Bold pricing that shines after dark." : "夜に映える、攻めの料金プラン。"}
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "group relative rounded-2xl border bg-black/40 p-7 transition-all duration-300 hover:-translate-y-1.5"
            )}
            style={{
              borderColor: `${p.c}66`,
              boxShadow: p.best ? `0 0 28px -6px ${p.c}` : "none",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: `0 0 36px -8px ${p.c}, inset 0 0 24px -16px ${p.c}` }}
            />
            <div className="relative">
              <h3
                className="text-lg font-bold tracking-widest"
                style={{ color: p.c, textShadow: `0 0 12px ${p.c}aa` }}
              >
                {p.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{p.price}</span>
                <span className="text-sm text-white/40">{en ? "/mo" : "/ 月"}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.feats.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-white/80">
                    <Check className="size-4" style={{ color: p.c }} />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-7 w-full rounded-lg py-2.5 text-sm font-bold tracking-wide text-black transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: p.c, boxShadow: `0 0 18px -4px ${p.c}` }}
              >
                START
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
