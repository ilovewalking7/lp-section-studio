import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クラシック料金プラン",
  category: "洋風",
  description: "クラシックな3プラン料金。中央を推奨し、ゴールドの装飾で格を添える。",
  align: "full",
  isNew: true,
  tags: ["洋風", "pricing", "classic", "luxury"],
  principle: "中央プランをゴールドで持ち上げる三幅対称で、自然に上位プランへ誘導する。",
};

type Plan = {
  name: string;
  subtitle: string;
  subtitleEn: string;
  price: string;
  features: string[];
  featuresEn: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Essentiel",
    subtitle: "はじめての方へ",
    subtitleEn: "For first-timers",
    price: "¥3,800",
    features: ["月3点までのケア", "標準クリーニング", "店頭受け取り"],
    featuresEn: [
      "Care for up to 3 items / month",
      "Standard cleaning",
      "In-store pickup",
    ],
  },
  {
    name: "Signature",
    subtitle: "もっとも選ばれる",
    subtitleEn: "Most chosen",
    price: "¥9,800",
    features: ["月10点までのケア", "手仕上げプレス", "集荷・配送無料", "シーズン保管"],
    featuresEn: [
      "Care for up to 10 items / month",
      "Hand-finished pressing",
      "Free pickup & delivery",
      "Seasonal storage",
    ],
    featured: true,
  },
  {
    name: "Couture",
    subtitle: "至高の体験",
    subtitleEn: "The finest experience",
    price: "¥24,000",
    features: ["点数無制限", "専属アトリエ担当", "24時間優先対応", "革・特殊素材対応"],
    featuresEn: [
      "Unlimited items",
      "Dedicated atelier specialist",
      "24-hour priority service",
      "Leather & specialty fabrics",
    ],
  },
];

export default function ClassicPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f8f5ef] px-6 py-16 text-stone-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-700">
            Adhésion
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-stone-900 sm:text-5xl">
            {en ? "Membership Plans" : "会員プラン"}
          </h2>
          <Divider className="mx-auto mt-6 h-5 text-amber-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col border bg-[#f3ede1] p-8",
                plan.featured
                  ? "border-amber-600 md:-my-3 md:shadow-[0_20px_50px_-20px_rgba(120,45,58,0.35)]"
                  : "border-stone-300"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-600 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-[#f8f5ef]">
                  Recommandé
                </span>
              )}
              <div className="text-center">
                <h3 className="font-display text-2xl text-stone-900">{plan.name}</h3>
                <p className="mt-1 text-xs italic text-stone-500">
                  {en ? plan.subtitleEn : plan.subtitle}
                </p>
              </div>

              <div className="my-6 text-center">
                <span className="font-display text-4xl text-stone-900">{plan.price}</span>
                <span className="text-xs text-stone-400">
                  {en ? " / month" : " / 月"}
                </span>
              </div>

              <span className="mx-auto mb-6 h-px w-12 bg-stone-300" />

              <ul className="flex-1 space-y-3 text-sm text-stone-600">
                {(en ? plan.featuresEn : plan.features).map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check
                      className={cn(
                        "size-4 shrink-0",
                        plan.featured ? "text-amber-700" : "text-stone-400"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-8 h-11 rounded-none text-[11px] uppercase tracking-[0.25em]",
                  plan.featured
                    ? "bg-amber-600 text-[#f8f5ef] hover:bg-amber-700"
                    : "border border-stone-800 bg-transparent text-stone-900 hover:bg-stone-900 hover:text-[#f8f5ef]"
                )}
              >
                {en ? "Choose this plan" : "プランを選ぶ"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 20" fill="none" className={className} aria-hidden>
      <path d="M8 10h54M152 10H98" stroke="currentColor" strokeWidth="1" />
      <path
        d="M80 3l4 7-4 7-4-7 4-7z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
      />
    </svg>
  );
}
