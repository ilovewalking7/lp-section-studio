import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "料金切替カード",
  category: "コマース",
  description: "月額/年額スイッチで価格が更新され、年額に割引バッジを表示。",
  align: "full",
};

type Plan = {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  monthly: number;
  annual: number; // 月あたり（年払い）
  features: string[];
  featuresEn: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "スターター",
    nameEn: "Starter",
    description: "個人や小さなプロジェクト向け",
    descriptionEn: "For individuals and small projects",
    monthly: 1200,
    annual: 960,
    features: ["プロジェクト 5件", "1GB ストレージ", "コミュニティサポート"],
    featuresEn: ["5 projects", "1GB storage", "Community support"],
  },
  {
    name: "プロ",
    nameEn: "Pro",
    description: "成長中のチームに最適",
    descriptionEn: "Ideal for growing teams",
    monthly: 3600,
    annual: 2880,
    features: [
      "プロジェクト無制限",
      "100GB ストレージ",
      "優先サポート",
      "高度な分析",
    ],
    featuresEn: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
    ],
    featured: true,
  },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

export default function PricingToggleCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [annual, setAnnual] = useState(true);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-medium",
            !annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {en ? "Monthly" : "月払い"}
        </span>
        <Switch
          checked={annual}
          onCheckedChange={setAnnual}
          aria-label={en ? "Switch to annual billing" : "年払いに切り替え"}
        />
        <span
          className={cn(
            "text-sm font-medium",
            annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {en ? "Annual" : "年払い"}
        </span>
        <Badge className="border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/15">
          {en ? "Save 20%" : "20% お得"}
        </Badge>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          const saved = (plan.monthly - plan.annual) * 12;
          return (
            <div
              key={plan.nameEn}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-shadow",
                plan.featured && "border-primary/50 ring-1 ring-primary/30"
              )}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-6 gap-1">
                  <Sparkles className="size-3" />
                  {en ? "Popular" : "人気"}
                </Badge>
              )}

              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  {en ? plan.nameEn : plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {en ? plan.descriptionEn : plan.description}
                </p>
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {yen(price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {en ? "/ mo" : "/ 月"}
                </span>
              </div>
              <p className="mt-1 h-5 text-xs text-emerald-500">
                {annual &&
                  (en
                    ? `Save ${yen(saved)} per year`
                    : `年払いで ${yen(saved)} 節約`)}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {(en ? plan.featuresEn : plan.features).map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-6 w-full"
                variant={plan.featured ? "default" : "outline"}
              >
                {en ? `Choose ${plan.nameEn}` : `${plan.name}を選ぶ`}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
