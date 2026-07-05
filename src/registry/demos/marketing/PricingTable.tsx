import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "料金テーブル",
  category: "マーケティング",
  description: "月額/年額トグルで価格が切り替わる、推奨プラン強調の3段料金表。",
  align: "full",
};

type Tier = {
  nameJa: string;
  nameEn: string;
  monthly: number;
  taglineJa: string;
  taglineEn: string;
  features: { ja: string; en: string }[];
  featured?: boolean;
  ctaJa: string;
  ctaEn: string;
};

const tiers: Tier[] = [
  {
    nameJa: "スターター",
    nameEn: "Starter",
    monthly: 0,
    taglineJa: "個人とお試しに。",
    taglineEn: "For individuals and trying things out.",
    features: [
      { ja: "メンバー3名まで", en: "Up to 3 members" },
      { ja: "基本的な分析", en: "Basic analytics" },
      { ja: "コミュニティサポート", en: "Community support" },
    ],
    ctaJa: "無料で始める",
    ctaEn: "Start free",
  },
  {
    nameJa: "プロ",
    nameEn: "Pro",
    monthly: 1800,
    taglineJa: "成長中のチームに。",
    taglineEn: "For growing teams.",
    features: [
      { ja: "メンバー無制限", en: "Unlimited members" },
      { ja: "高度な自動化", en: "Advanced automation" },
      { ja: "優先サポート", en: "Priority support" },
      { ja: "監査ログ", en: "Audit logs" },
    ],
    featured: true,
    ctaJa: "プロを始める",
    ctaEn: "Get Pro",
  },
  {
    nameJa: "エンタープライズ",
    nameEn: "Enterprise",
    monthly: 4800,
    taglineJa: "大規模組織に。",
    taglineEn: "For large organizations.",
    features: [
      { ja: "SSO / SCIM", en: "SSO / SCIM" },
      { ja: "専任担当者", en: "Dedicated manager" },
      { ja: "SLA 99.99%", en: "99.99% SLA" },
      { ja: "オンプレ連携", en: "On-prem integration" },
    ],
    ctaJa: "問い合わせる",
    ctaEn: "Contact us",
  },
];

const yen = (n: number) => "¥" + n.toLocaleString("ja-JP");
const usd = (n: number) => "$" + n.toLocaleString("en-US");

export default function PricingTable() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const money = en ? usd : yen;
  const [yearly, setYearly] = useState(false);

  const priceFor = (t: Tier) => {
    if (t.monthly === 0) return 0;
    // 年額は2か月分割引 → 実質月額
    return yearly ? Math.round((t.monthly * 10) / 12) : t.monthly;
  };

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Simple, transparent pricing." : "シンプルで、透明な料金。"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {en
              ? "No hidden fees. Upgrade or cancel anytime."
              : "隠れた費用はありません。いつでもアップグレード・解約できます。"}
          </p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !yearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {en ? "Monthly" : "月額"}
            </span>
            <Switch
              checked={yearly}
              onCheckedChange={setYearly}
              aria-label={en ? "Switch to annual billing" : "年額請求に切り替え"}
            />
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                yearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {en ? "Annual" : "年額"}
            </span>
            <Badge variant="secondary" className="ml-1 text-emerald-500">
              {en ? "Save 2 months" : "2か月分お得"}
            </Badge>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((t) => {
            const price = priceFor(t);
            return (
              <div
                key={t.nameJa}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-7",
                  t.featured &&
                    "border-primary/50 shadow-lg shadow-primary/5 lg:-mt-3 lg:mb-3"
                )}
              >
                {t.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 rounded-full px-3">
                    <Sparkles className="size-3" />
                    {en ? "Recommended" : "おすすめ"}
                  </Badge>
                )}

                <h3 className="text-lg font-semibold tracking-tight">
                  {en ? t.nameEn : t.nameJa}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {en ? t.taglineEn : t.taglineJa}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {money(price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {en ? "/ mo" : "/ 月"}
                  </span>
                </div>
                <p className="mt-1 h-4 text-xs text-muted-foreground">
                  {yearly && t.monthly > 0
                    ? en
                      ? `${money(price * 12)} billed annually`
                      : `年額 ${money(price * 12)} 一括`
                    : " "}
                </p>

                <Button
                  className="mt-6 w-full"
                  variant={t.featured ? "default" : "outline"}
                >
                  {en ? t.ctaEn : t.ctaJa}
                </Button>

                <ul className="mt-7 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f.ja} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          t.featured ? "text-primary" : "text-emerald-500"
                        )}
                      />
                      <span>{en ? f.en : f.ja}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
