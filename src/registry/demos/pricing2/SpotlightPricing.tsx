import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト料金",
  category: "価格・オファー",
  description: "中央のプランにスポットライトが当たり光り続ける料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "starter",
    name: { ja: "スターター", en: "Starter" },
    price: "¥0",
    feats: [
      { ja: "3プロジェクト", en: "3 projects" },
      { ja: "コミュニティ", en: "Community" },
      { ja: "基本分析", en: "Basic analytics" },
    ],
  },
  {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: "¥2,980",
    feats: [
      { ja: "無制限", en: "Unlimited" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度分析", en: "Advanced analytics" },
      { ja: "API", en: "API" },
      { ja: "チーム共有", en: "Team sharing" },
    ],
    spot: true,
  },
  {
    id: "business",
    name: { ja: "ビジネス", en: "Business" },
    price: "¥7,800",
    feats: [
      { ja: "全機能", en: "All features" },
      { ja: "専任CSM", en: "Dedicated CSM" },
      { ja: "SSO", en: "SSO" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
  },
];

export default function SpotlightPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full overflow-hidden bg-zinc-950 px-4 py-16">
      <style>{`
        @keyframes sp-glow { 0%,100%{ opacity:.55; transform:translateX(-50%) scale(1);} 50%{ opacity:.9; transform:translateX(-50%) scale(1.08);} }
        @media (prefers-reduced-motion: reduce){ .sp-glow{ animation:none !important; } }
      `}</style>
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="sp-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-3xl [animation:sp-glow_5s_ease-in-out_infinite]" />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {en ? "The plan in the spotlight" : "スポットライトを浴びるプラン"}
        </h2>
        <p className="relative mt-3 text-zinc-400">
          {en ? "The most chosen one is right in the center." : "最も選ばれているのは、ど真ん中。"}
        </p>
      </div>
      <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "relative rounded-2xl border p-7 transition-transform duration-300",
              p.spot
                ? "z-10 border-violet-400/50 bg-zinc-900 shadow-[0_0_50px_-12px_rgba(139,92,246,.7)] md:-my-3 md:scale-105"
                : "border-zinc-800 bg-zinc-900/50 hover:-translate-y-1"
            )}
          >
            {p.spot && (
              <span className="mb-3 inline-block rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300">
                {en ? "Most popular" : "一番人気"}
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">
              {en ? p.name.en : p.name.ja}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{p.price}</span>
              <span className="text-sm text-zinc-500">{en ? "/mo" : "/ 月"}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.feats.map((f) => (
                <li key={f.en} className="flex items-center gap-2 text-zinc-300">
                  <Check
                    className={cn("size-4", p.spot ? "text-violet-400" : "text-zinc-500")}
                  />
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>
            <Button
              className={cn(
                "mt-7 w-full",
                p.spot
                  ? "bg-violet-500 text-white hover:bg-violet-400"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              )}
            >
              {en ? "Select" : "選択する"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
