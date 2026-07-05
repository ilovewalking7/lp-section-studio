import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・価格",
  category: "ブルータリスト",
  description: "極太ボーダーと飽和色ブロックで構成した価格プラン。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "pricing"],
};

type Plan = {
  name: string;
  price: string;
  bg: string;
  features: { ja: string; en: string }[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "FREE",
    price: "¥0",
    bg: "bg-cyan-300",
    features: [
      { ja: "3 プロジェクト", en: "3 projects" },
      { ja: "コミュニティ支援", en: "Community support" },
      { ja: "基本テンプレ", en: "Basic templates" },
    ],
  },
  {
    name: "PRO",
    price: "¥1,980",
    bg: "bg-lime-300",
    features: [
      { ja: "無制限プロジェクト", en: "Unlimited projects" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "全テンプレ", en: "All templates" },
      { ja: "解析ダッシュ", en: "Analytics dashboard" },
    ],
    featured: true,
  },
  {
    name: "TEAM",
    price: "¥4,980",
    bg: "bg-fuchsia-400",
    features: [
      { ja: "Proの全機能", en: "Everything in Pro" },
      { ja: "10席まで", en: "Up to 10 seats" },
      { ja: "SSO / 監査ログ", en: "SSO / audit logs" },
      { ja: "専任担当", en: "Dedicated manager" },
    ],
  },
];

export default function BrutalPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-orange-400 px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {en ? "Pricing, plain." : "値段は明快。"}
        </h2>
        <p className="mb-10 font-mono text-sm font-bold">
          {en ? "No hidden costs." : "隠れコストは、ない。"}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "flex flex-col border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000]",
                p.bg,
                p.featured && "md:-translate-y-2"
              )}
            >
              {p.featured && (
                <span className="mb-3 inline-block w-fit border-2 border-black bg-black px-2 py-0.5 font-mono text-xs font-bold uppercase text-yellow-300">
                  {en ? "Most popular" : "人気No.1"}
                </span>
              )}
              <div className="font-mono text-sm font-black uppercase">
                {p.name}
              </div>
              <div className="mt-2 text-4xl font-black">
                {p.price}
                <span className="text-base font-bold">{en ? "/mo" : "/月"}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f.en} className="flex items-start gap-2 font-bold">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black bg-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>

              <button className="mt-6 border-4 border-black bg-black px-4 py-3 font-black uppercase text-white shadow-[4px_4px_0_0_#fff] ring-2 ring-black transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#fff]">
                {en ? "Choose" : "選ぶ"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
