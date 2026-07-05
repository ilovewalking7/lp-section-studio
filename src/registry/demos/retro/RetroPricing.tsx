import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオン・プライシング",
  category: "レトロ・Y2K",
  description: "ネオンの縁取りとグローを纏った、レトロフューチャーな価格カード3種。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "neon", "pricing"],
};

type Plan = {
  name: string;
  price: string;
  accent: string;
  glow: string;
  features: string[];
  featuresEn: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "PLAYER 1",
    price: "¥0",
    accent: "#05d9e8",
    glow: "rgba(5,217,232,0.6)",
    features: ["基本コンポーネント", "1プロジェクト", "コミュニティ支援"],
    featuresEn: ["Core components", "1 project", "Community support"],
  },
  {
    name: "ARCADE",
    price: "¥1,980",
    accent: "#ff2e97",
    glow: "rgba(255,46,151,0.7)",
    features: ["全コンポーネント", "無制限プロジェクト", "優先サポート", "ネオンテーマ"],
    featuresEn: [
      "All components",
      "Unlimited projects",
      "Priority support",
      "Neon themes",
    ],
    featured: true,
  },
  {
    name: "FINAL BOSS",
    price: "¥4,980",
    accent: "#bef264",
    glow: "rgba(190,242,100,0.6)",
    features: ["チーム機能", "SSO/監査ログ", "専属サポート", "早期アクセス"],
    featuresEn: [
      "Team workspaces",
      "SSO / audit logs",
      "Dedicated support",
      "Early access",
    ],
  },
];

export default function RetroPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#1a0b2e] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#05d9e8]">
            // select your plan
          </p>
          <h2
            className="mt-3 text-4xl font-black uppercase italic text-white sm:text-5xl"
            style={{ textShadow: "0 0 20px rgba(255,46,151,0.6)" }}
          >
            {en ? "Pricing plans" : "料金プラン"}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl border-2 bg-[#0d0221]/80 p-7 backdrop-blur transition-transform hover:-translate-y-1",
                plan.featured && "md:-translate-y-3"
              )}
              style={{
                borderColor: plan.accent,
                boxShadow: `0 0 24px ${plan.glow}, inset 0 0 24px ${plan.glow.replace(/0\.\d+/, "0.12")}`,
              }}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0d0221]"
                  style={{ background: plan.accent }}
                >
                  ★ Popular
                </span>
              )}
              <h3
                className="font-mono text-lg font-bold uppercase tracking-wider"
                style={{ color: plan.accent, textShadow: `0 0 12px ${plan.glow}` }}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1 text-white">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-sm text-[#d8b4fe]">{en ? "/mo" : "/月"}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {(en ? plan.featuresEn : plan.features).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#e9d5ff]">
                    <Check className="size-4 shrink-0" style={{ color: plan.accent }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-md py-2.5 font-mono text-sm font-bold uppercase tracking-wider transition-all"
                style={{
                  background: plan.featured ? plan.accent : "transparent",
                  color: plan.featured ? "#0d0221" : plan.accent,
                  border: `1px solid ${plan.accent}`,
                  boxShadow: `0 0 18px ${plan.glow}`,
                }}
              >
                <Zap className="size-4" />
                {en ? "Select" : "選択する"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
