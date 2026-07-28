import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アンカリング料金表",
  category: "価格・オファー",
  description:
    "高額なEnterpriseをアンカーに、中位のProを賢い選択として際立たせる3段階の料金表。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["pricing", "anchoring", "tiers"],
  principle:
    "アンカリング効果。最初に提示する高額プランが基準値となり、中位プランの価格判断が相対的に割安へと引き寄せられる。",
};

type Tier = {
  name: string;
  taglineJa: string;
  taglineEn: string;
  monthly: number;
  featuresJa: string[];
  featuresEn: string[];
  ctaJa: string;
  ctaEn: string;
  featured?: boolean;
  anchor?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    taglineJa: "個人で試す",
    taglineEn: "Try it solo",
    monthly: 980,
    featuresJa: ["プロジェクト3件", "コミュニティ支援", "基本テンプレート"],
    featuresEn: ["3 projects", "Community support", "Basic templates"],
    ctaJa: "無料で始める",
    ctaEn: "Start for free",
  },
  {
    name: "Pro",
    taglineJa: "成長チーム向けの定番",
    taglineEn: "The go-to for growing teams",
    monthly: 4800,
    featuresJa: [
      "プロジェクト無制限",
      "優先サポート",
      "高度な分析ダッシュボード",
      "チーム共同編集",
      "カスタムドメイン",
    ],
    featuresEn: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics dashboard",
      "Team collaboration",
      "Custom domain",
    ],
    ctaJa: "Proを選ぶ",
    ctaEn: "Choose Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    taglineJa: "大規模組織向け",
    taglineEn: "For large organizations",
    monthly: 24000,
    featuresJa: [
      "Proの全機能",
      "専任担当者 (CSM)",
      "SSO / 監査ログ",
      "SLA 99.99%",
      "オンプレ対応",
    ],
    featuresEn: [
      "Everything in Pro",
      "Dedicated CSM",
      "SSO / audit logs",
      "SLA 99.99%",
      "On-premise support",
    ],
    ctaJa: "見積もりを依頼",
    ctaEn: "Request a quote",
    anchor: true,
  },
];

function yen(n: number) {
  return "¥" + n.toLocaleString("ja-JP");
}

export default function AnchoredPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [annual, setAnnual] = useState(true);
  const factor = annual ? 10 : 1; // 年額は実質2ヶ月分お得

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3" />{" "}
          {en ? "14-day free trial on all plans" : "全プラン14日間無料"}
        </Badge>
        <h3 className="text-2xl font-bold tracking-tight">
          {en ? "Find the plan that fits your team" : "チームに合うプランを"}
        </h3>
        <div className="flex items-center gap-3 text-sm">
          <span className={cn(!annual && "font-semibold text-foreground", annual && "text-muted-foreground")}>
            {en ? "Monthly" : "月払い"}
          </span>
          <Switch
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label={en ? "Switch to annual billing" : "年払いに切り替え"}
            />
          <span className={cn(annual && "font-semibold text-foreground", !annual && "text-muted-foreground")}>
            {en ? "Annual" : "年払い"}
          </span>
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent">
            {en ? "2 months free" : "2ヶ月分お得"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {TIERS.map((t) => (
          <Card
            key={t.name}
            className={cn(
              "relative flex flex-col transition-all",
              t.featured &&
                "border-primary shadow-lg ring-1 ring-primary lg:-mt-3 lg:mb-3 lg:scale-[1.02]",
              t.anchor && "opacity-95"
            )}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="shadow-md">
                  {en ? "Most popular" : "いちばん人気"}
                </Badge>
              </div>
            )}
            <CardHeader className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-semibold">{t.name}</span>
                {t.anchor && (
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {en ? "Reference price" : "基準価格"}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {en ? t.taglineEn : t.taglineJa}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-bold tracking-tight",
                    t.featured && "text-primary"
                  )}
                >
                  {yen(t.monthly)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {en ? "/ mo" : "/ 月"}
                </span>
              </div>
              {annual && (
                <p className="text-xs text-muted-foreground">
                  {en
                    ? `${yen(t.monthly * factor)} billed annually (2 months free)`
                    : `年額 ${yen(t.monthly * factor)} を一括 (2ヶ月分無料)`}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2.5 text-sm">
                {(en ? t.featuresEn : t.featuresJa).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        t.featured ? "text-primary" : "text-emerald-500"
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={t.featured ? "default" : t.anchor ? "outline" : "secondary"}
              >
                {en ? t.ctaEn : t.ctaJa}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
