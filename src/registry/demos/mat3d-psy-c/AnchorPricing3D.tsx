import { Check, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アンカー価格3D",
  category: "3Dアニメ",
  description:
    "3つの料金カードを3Dの列に並べ、おすすめプランだけがZ軸で手前に浮き上がり、こちらへ傾いて他を圧倒する。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "両脇の価格をアンカーに置き、推しプランを物理的に大きく手前へ突き出す目立ち効果（Von Restorff）で、視線と選択を一点に集中させる。",
};

type Plan = {
  id: string;
  nameJa: string;
  nameEn: string;
  price: string;
  featured: boolean;
  z: number;
  tilt: number;
  scale: number;
  perksJa: string[];
  perksEn: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    nameJa: "スターター",
    nameEn: "Starter",
    price: "¥0",
    featured: false,
    z: -80,
    tilt: 14,
    scale: 0.9,
    perksJa: ["3プロジェクト", "コミュニティ支援"],
    perksEn: ["3 projects", "Community support"],
  },
  {
    id: "pro",
    nameJa: "プロ",
    nameEn: "Pro",
    price: "¥2,400",
    featured: true,
    z: 90,
    tilt: -8,
    scale: 1.08,
    perksJa: ["無制限プロジェクト", "高度な解析", "優先サポート", "チーム共有"],
    perksEn: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Team sharing",
    ],
  },
  {
    id: "scale",
    nameJa: "スケール",
    nameEn: "Scale",
    price: "¥7,800",
    featured: false,
    z: -80,
    tilt: -14,
    scale: 0.9,
    perksJa: ["Pro の全機能", "専任担当", "SLA保証"],
    perksEn: ["Everything in Pro", "Dedicated manager", "SLA guarantee"],
  },
];

export default function AnchorPricing3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="w-full overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#0c1226_0%,#05070f_70%)] px-4 py-16">
      <style>{`
        @keyframes ap-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (prefers-reduced-motion: reduce) { .ap-feat { animation: none !important; } }
      `}</style>

      <div className="mx-auto mb-12 max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
          {en ? "Pricing" : "料金プラン"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          {en ? "One plan stands out" : "選ぶべきは、ひとつ"}
        </h2>
      </div>

      <div
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6"
        style={{ perspective: "1400px" }}
      >
        {PLANS.map((plan) => {
          const perks = en ? plan.perksEn : plan.perksJa;
          return (
            <div
              key={plan.id}
              className="relative w-[260px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={plan.featured ? "ap-feat" : undefined}
                style={
                  plan.featured
                    ? {
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${plan.z}px) rotateY(${plan.tilt}deg) scale(${plan.scale})`,
                        animation: "ap-float 5s ease-in-out infinite",
                      }
                    : {
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${plan.z}px) rotateY(${plan.tilt}deg) scale(${plan.scale})`,
                      }
                }
              >
                <div
                  className="relative rounded-[24px] p-7"
                  style={{
                    background: plan.featured
                      ? "linear-gradient(165deg, #312e81 0%, #1e1b4b 100%)"
                      : "linear-gradient(165deg, #1a2138 0%, #11162a 100%)",
                    boxShadow: plan.featured
                      ? "0 50px 70px -28px rgba(99,102,241,0.6), 0 0 0 1px rgba(165,180,252,0.4)"
                      : "0 24px 40px -28px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
                    filter: plan.featured ? "none" : "saturate(0.85)",
                  }}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-amber-950 shadow-lg">
                      <Zap className="h-3.5 w-3.5" />
                      {en ? "Recommended" : "おすすめ"}
                    </span>
                  )}

                  <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70">
                    {en ? plan.nameEn : plan.nameJa}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/55">
                      {en ? "/mo" : "/月"}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2.5 text-sm text-white/80"
                      >
                        <Check
                          className={
                            plan.featured
                              ? "h-4 w-4 shrink-0 text-amber-300"
                              : "h-4 w-4 shrink-0 text-indigo-300"
                          }
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={
                      plan.featured
                        ? "mt-7 w-full rounded-full bg-amber-300 py-2.5 text-sm font-bold text-amber-950 transition-transform hover:scale-[1.03]"
                        : "mt-7 w-full rounded-full bg-white/10 py-2.5 text-sm font-semibold text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/15"
                    }
                  >
                    {plan.featured
                      ? en
                        ? "Get Pro"
                        : "Proを選ぶ"
                      : en
                        ? "Choose"
                        : "選択"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
