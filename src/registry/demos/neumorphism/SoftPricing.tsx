import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトUI価格表",
  category: "ニューモーフィズム",
  description: "中央のプランをインセットで強調した、3枚の柔らかな価格カード。",
  align: "full",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "pricing"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

const plans = [
  {
    name: "スターター",
    nameEn: "Starter",
    price: "¥0",
    period: "/月",
    periodEn: "/mo",
    desc: "個人で始める方に",
    descEn: "For individuals getting started",
    features: [
      { ja: "3プロジェクト", en: "3 projects" },
      { ja: "1GB ストレージ", en: "1GB storage" },
      { ja: "コミュニティ支援", en: "Community support" },
    ],
    featured: false,
  },
  {
    name: "プロ",
    nameEn: "Pro",
    price: "¥1,800",
    period: "/月",
    periodEn: "/mo",
    desc: "成長するチームに",
    descEn: "For growing teams",
    features: [
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "100GB ストレージ", en: "100GB storage" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度な分析", en: "Advanced analytics" },
    ],
    featured: true,
  },
  {
    name: "エンタープライズ",
    nameEn: "Enterprise",
    price: "¥6,400",
    period: "/月",
    periodEn: "/mo",
    desc: "大規模組織に",
    descEn: "For large organizations",
    features: [
      { ja: "SSO / SAML", en: "SSO / SAML" },
      { ja: "専任担当", en: "Dedicated manager" },
      { ja: "SLA 99.9%", en: "99.9% SLA" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
    featured: false,
  },
];

export default function SoftPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full rounded-3xl bg-[#e0e5ec] p-6 text-slate-600 sm:p-10">
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-700">
          {en ? "Pricing plans" : "料金プラン"}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {en
            ? "Upgrade or downgrade anytime."
            : "いつでもアップグレード・ダウングレード可能。"}
        </p>
      </div>

      <div className="mt-8 grid items-center gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "rounded-3xl bg-[#e0e5ec] p-7 transition",
              p.featured ? cn(INSET, "lg:scale-105") : RAISED,
            )}
          >
            {p.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e0e5ec] px-3 py-1 text-xs font-semibold text-indigo-500 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]">
                <Sparkles className="size-3.5" />
                {en ? "Popular" : "人気"}
              </span>
            )}
            <h4 className="mt-4 text-lg font-semibold text-slate-700">{en ? p.nameEn : p.name}</h4>
            <p className="text-sm text-slate-500">{en ? p.descEn : p.desc}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-bold tracking-tight text-slate-700">{p.price}</span>
              <span className="pb-1 text-sm text-slate-500">{en ? p.periodEn : p.period}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f.en} className="flex items-center gap-3 text-sm text-slate-600">
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full bg-[#e0e5ec] text-indigo-500",
                      "shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff]",
                    )}
                  >
                    <Check className="size-3.5" />
                  </span>
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "mt-7 w-full rounded-2xl bg-[#e0e5ec] py-3 text-sm font-semibold transition active:scale-[0.98]",
                p.featured
                  ? "text-indigo-600 shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]"
                  : cn("text-slate-600", RAISED),
              )}
            >
              {p.featured ? (en ? "Choose Pro" : "プロを選ぶ") : en ? "Select" : "選択する"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
