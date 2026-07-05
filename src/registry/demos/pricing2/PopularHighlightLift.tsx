import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "人気プラン強調リフト",
  category: "価格・オファー",
  description: "中央の人気プランが浮き上がり輝く料金レイアウト。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "hobby",
    name: { ja: "ホビー", en: "Hobby" },
    price: 0,
    feats: [
      { ja: "1サイト", en: "1 site" },
      { ja: "コミュニティ", en: "Community" },
      { ja: "1GB帯域", en: "1GB bandwidth" },
    ],
  },
  {
    id: "pro",
    name: { ja: "プロ", en: "Pro" },
    price: 2200,
    feats: [
      { ja: "10サイト", en: "10 sites" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "100GB帯域", en: "100GB bandwidth" },
      { ja: "カスタムドメイン", en: "Custom domain" },
      { ja: "分析", en: "Analytics" },
    ],
    popular: true,
  },
  {
    id: "team",
    name: { ja: "チーム", en: "Team" },
    price: 5500,
    feats: [
      { ja: "無制限サイト", en: "Unlimited sites" },
      { ja: "専任CSM", en: "Dedicated CSM" },
      { ja: "無制限帯域", en: "Unlimited bandwidth" },
      { ja: "SSO", en: "SSO" },
    ],
  },
];

export default function PopularHighlightLift() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes phl-pulse { 0%,100%{ box-shadow:0 0 0 0 rgba(99,102,241,.35);} 50%{ box-shadow:0 0 0 14px rgba(99,102,241,0);} }
        @media (prefers-reduced-motion: reduce){ .phl-pulse{ animation:none !important; } }
      `}</style>
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Pick a plan that grows with you" : "成長に合わせて選べる"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {en ? "Our most popular plan is in the center." : "最も人気のプランは中央です。"}
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "relative rounded-2xl border bg-card p-7 transition-all duration-300",
              p.popular
                ? "z-10 border-primary shadow-2xl md:-my-4 md:scale-105"
                : "border-border hover:-translate-y-1 hover:shadow-lg"
            )}
          >
            {p.popular && (
              <span className="phl-pulse absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Star className="mr-1 inline size-3 fill-current" />
                {en ? "Most popular" : "一番人気"}
              </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">
              {en ? p.name.en : p.name.ja}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                ¥{p.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.feats.map((f) => (
                <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                  <Check className="size-4 text-primary" />
                  {en ? f.en : f.ja}
                </li>
              ))}
            </ul>
            <Button className="mt-7 w-full" variant={p.popular ? "default" : "outline"}>
              {p.popular
                ? en
                  ? "Start now"
                  : "今すぐ始める"
                : en
                  ? "Select"
                  : "選択する"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
