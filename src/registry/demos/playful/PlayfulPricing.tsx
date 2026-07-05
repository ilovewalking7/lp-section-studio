import { Check, Star, Heart, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ料金カード",
  category: "プレイフル",
  description: "キャンディカラーの丸い料金カード3種。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "pricing"],
};

type Plan = {
  name: string;
  nameEn: string;
  price: string;
  blurb: string;
  blurbEn: string;
  color: string;
  shadow: string;
  icon: typeof Star;
  features: string[];
  featuresEn: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "おためし",
    nameEn: "Starter",
    price: "¥0",
    blurb: "まずは気軽に",
    blurbEn: "Try it out for free",
    color: "#4cc9f0",
    shadow: "#37a8cc",
    icon: Heart,
    features: ["3プロジェクト", "基本パーツ", "コミュニティ"],
    featuresEn: ["3 projects", "Basic blocks", "Community"],
  },
  {
    name: "わいわい",
    nameEn: "Team",
    price: "¥980",
    blurb: "チームでたのしく",
    blurbEn: "Fun with your team",
    color: "#ff8fba",
    shadow: "#e26d97",
    icon: Star,
    popular: true,
    features: ["無制限プロジェクト", "全パーツ解放", "リアルタイム共同編集", "優先サポート"],
    featuresEn: ["Unlimited projects", "All blocks unlocked", "Real-time collaboration", "Priority support"],
  },
  {
    name: "もりもり",
    nameEn: "Pro",
    price: "¥2,980",
    blurb: "本格チーム向け",
    blurbEn: "For serious teams",
    color: "#b388ff",
    shadow: "#9166da",
    icon: Rocket,
    features: ["わいわいの全機能", "権限管理", "監査ログ", "専任担当"],
    featuresEn: ["Everything in Team", "Role management", "Audit logs", "Dedicated manager"],
  },
];

export default function PlayfulPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="font-rounded w-full rounded-3xl bg-[#fffdf7] px-5 py-14 sm:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
          {en ? "Pick the plan that fits" : "ぴったりプランを選ぼう"}
        </h2>
        <p className="mt-3 text-slate-500">
          {en ? "Change or cancel anytime. Zero hidden fees." : "いつでも変更・解約OK。かくれた料金はゼロ。"}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.nameEn}
              className={cn(
                "relative flex flex-col rounded-3xl border-2 bg-white p-7 transition-transform duration-200 hover:-translate-y-1.5",
                p.popular ? "border-transparent" : "border-slate-100"
              )}
              style={{
                boxShadow: p.popular
                  ? `0 14px 0 ${p.shadow}`
                  : "0 10px 0 #eef1f4",
              }}
            >
              {p.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-extrabold text-white shadow-md"
                  style={{ backgroundColor: p.color }}
                >
                  {en ? "Most popular" : "いちばん人気"}
                </span>
              )}
              <div
                className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: p.color }}
              >
                <Icon className="size-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">{en ? p.nameEn : p.name}</h3>
              <p className="text-sm text-slate-400">{en ? p.blurbEn : p.blurb}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-800">{p.price}</span>
                <span className="text-sm font-semibold text-slate-400">{en ? "/ mo" : "/ 月"}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {(en ? p.featuresEn : p.features).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-600">
                    <span
                      className="inline-flex size-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="mt-7 rounded-full py-3 text-sm font-extrabold text-white transition-all duration-150 hover:brightness-105 active:translate-y-0.5"
                style={{ backgroundColor: p.color, boxShadow: `0 6px 0 ${p.shadow}` }}
              >
                {en ? "Choose this" : "これにする"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
