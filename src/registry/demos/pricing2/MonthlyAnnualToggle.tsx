import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "月額・年額トグル",
  category: "価格・オファー",
  description: "なめらかに切り替わる月額／年額の料金トグル。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const plans = [
  {
    id: "lite",
    name: { ja: "ライト", en: "Lite" },
    m: 1200,
    feats: [
      { ja: "10プロジェクト", en: "10 projects" },
      { ja: "基本分析", en: "Basic analytics" },
      { ja: "メール", en: "Email" },
    ],
  },
  {
    id: "standard",
    name: { ja: "スタンダード", en: "Standard" },
    m: 2800,
    feats: [
      { ja: "50プロジェクト", en: "50 projects" },
      { ja: "高度分析", en: "Advanced analytics" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "API", en: "API" },
    ],
    best: true,
  },
  {
    id: "premium",
    name: { ja: "プレミアム", en: "Premium" },
    m: 5800,
    feats: [
      { ja: "無制限", en: "Unlimited" },
      { ja: "専任サポート", en: "Dedicated support" },
      { ja: "SSO", en: "SSO" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
  },
];

export default function MonthlyAnnualToggle() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [annual, setAnnual] = useState(false);
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Pricing plans" : "料金プラン"}
        </h2>
        <div className="mt-7 inline-flex items-center rounded-full border border-border bg-muted/40 p-1">
          {([
            { key: "monthly", ja: "月額", en: "Monthly" },
            { key: "annual", ja: "年額", en: "Annual" },
          ] as const).map((label, i) => {
            const isAnnual = i === 1;
            return (
              <button
                key={label.key}
                type="button"
                onClick={() => setAnnual(isAnnual)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  annual === isAnnual ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {annual === isAnnual && (
                  <span className="absolute inset-0 -z-0 rounded-full bg-primary transition-all" />
                )}
                <span className="relative z-10">{en ? label.en : label.ja}</span>
                {isAnnual && (
                  <span className="relative z-10 ml-1 text-xs opacity-80">-20%</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = annual ? Math.round(p.m * 0.8) : p.m;
          return (
            <div
              key={p.id}
              className={cn(
                "relative rounded-2xl border bg-card p-7 transition-transform duration-300 hover:-translate-y-1",
                p.best ? "border-primary shadow-lg" : "border-border"
              )}
            >
              {p.best && (
                <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {en ? "Popular" : "おすすめ"}
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">
                {en ? p.name.en : p.name.ja}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground tabular-nums">
                  ¥{price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
              </div>
              <p className="mt-1 h-4 text-xs text-primary">
                {annual ? (en ? `¥${(price * 12).toLocaleString()} billed yearly` : `年額 ¥${(price * 12).toLocaleString()} 一括`) : " "}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.feats.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                    <Check className="size-4 text-primary" />
                    {en ? f.en : f.ja}
                  </li>
                ))}
              </ul>
              <Button className="mt-7 w-full" variant={p.best ? "default" : "outline"}>
                {en ? "Select" : "選択する"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
