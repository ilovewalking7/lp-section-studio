import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・価格表",
  category: "グラスモーフィズム",
  description: "オーロラ調の背景に浮かぶ3枚のフロステッドガラス価格カード。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "pricing"],
};

const plans = [
  {
    id: "starter",
    nameJa: "スターター",
    nameEn: "Starter",
    price: "¥0",
    periodJa: "/月",
    periodEn: "/mo",
    features: [
      { ja: "3プロジェクト", en: "3 projects" },
      { ja: "1GBストレージ", en: "1GB storage" },
      { ja: "コミュニティ支援", en: "Community support" },
    ],
    featured: false,
  },
  {
    id: "pro",
    nameJa: "プロ",
    nameEn: "Pro",
    price: "¥1,980",
    periodJa: "/月",
    periodEn: "/mo",
    features: [
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "100GBストレージ", en: "100GB storage" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度な分析", en: "Advanced analytics" },
    ],
    featured: true,
  },
  {
    id: "business",
    nameJa: "ビジネス",
    nameEn: "Business",
    price: "¥4,980",
    periodJa: "/月",
    periodEn: "/mo",
    features: [
      { ja: "チーム機能", en: "Team features" },
      { ja: "1TBストレージ", en: "1TB storage" },
      { ja: "専任マネージャー", en: "Dedicated manager" },
      { ja: "SLA保証", en: "SLA guarantee" },
    ],
    featured: false,
  },
];

export default function GlassPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-900 px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 size-[26rem] rounded-full bg-emerald-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 size-[30rem] rounded-full bg-sky-400/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-fuchsia-500/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {en ? "Simple pricing" : "シンプルな料金プラン"}
          </h2>
          <p className="mt-3 text-white/75">
            {en ? "Built for your team, change anytime." : "あなたのチームに合わせて、いつでも変更可能。"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7 shadow-2xl backdrop-blur-xl transition",
                plan.featured
                  ? "border-white/40 bg-white/20 md:-translate-y-3"
                  : "border-white/20 bg-white/10"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
                  {en ? "Popular" : "人気"}
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{en ? plan.nameEn : plan.nameJa}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/70">{en ? plan.periodEn : plan.periodJa}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="size-4 shrink-0 text-emerald-200" />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "mt-8 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                  plan.featured
                    ? "bg-white text-emerald-700 hover:bg-white/90"
                    : "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                )}
              >
                {en ? "Choose plan" : "選択する"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
