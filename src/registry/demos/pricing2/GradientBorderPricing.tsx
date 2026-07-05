import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデ枠の料金表",
  category: "価格・オファー",
  description: "回転するグラデーションボーダーが映える料金カード。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "basic",
    name: { ja: "ベーシック", en: "Basic" },
    price: "¥980",
    feats: [
      { ja: "5GB ストレージ", en: "5GB storage" },
      { ja: "1ユーザー", en: "1 user" },
      { ja: "メールサポート", en: "Email support" },
    ],
  },
  {
    id: "premium",
    name: { ja: "プレミアム", en: "Premium" },
    price: "¥2,480",
    feats: [
      { ja: "100GB ストレージ", en: "100GB storage" },
      { ja: "5ユーザー", en: "5 users" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "高度な分析", en: "Advanced analytics" },
    ],
    featured: true,
  },
  {
    id: "ultimate",
    name: { ja: "アルティメット", en: "Ultimate" },
    price: "¥4,980",
    feats: [
      { ja: "無制限ストレージ", en: "Unlimited storage" },
      { ja: "無制限ユーザー", en: "Unlimited users" },
      { ja: "24/7 電話", en: "24/7 phone" },
      { ja: "API アクセス", en: "API access" },
    ],
  },
];

export default function GradientBorderPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes gbp-spin { to { transform: rotate(1turn); } }
        .gbp-ring::before{
          content:""; position:absolute; inset:-150%; z-index:0;
          background:conic-gradient(from 0deg,#6366f1,#ec4899,#f59e0b,#6366f1);
          animation:gbp-spin 5s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .gbp-ring::before{ animation:none; } }
      `}</style>
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Find the plan that fits" : "あなたに合うプランを"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {en
            ? "Upgrade or downgrade anytime."
            : "いつでもアップグレード・ダウングレード可能。"}
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "relative overflow-hidden rounded-2xl p-[2px]",
              p.featured ? "gbp-ring" : "bg-border"
            )}
          >
            <div className="relative z-10 h-full rounded-[14px] bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">
                {en ? p.name.en : p.name.ja}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{p.price}</span>
                <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.feats.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                    <Check className="size-4 shrink-0 text-primary" />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-7 w-full"
                variant={p.featured ? "default" : "outline"}
              >
                {en ? "Get started" : "始める"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
