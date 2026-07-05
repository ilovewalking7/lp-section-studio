import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Minus,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { getPlans, getComparison, type PlanId } from "@/lib/plan";
import type { Lang } from "@/lib/i18n";

/** 年払いの割引率（月額×12 と年額の差）を整数%で返す。0なら割引なし。 */
function annualDiscountPct(priceMonthly: number, priceAnnual: number): number {
  const full = priceMonthly * 12;
  if (full <= 0 || priceAnnual <= 0) return 0;
  return Math.round(((full - priceAnnual) / full) * 100);
}

interface Copy {
  back: string;
  badgeSections: string;
  title: string;
  subcopy: string;
  monthly: string;
  annual: string;
  toggleAria: string;
  maxSave: string;
  popular: string;
  free: string;
  perMonth: string;
  billedYearly: (annualPrice: number) => string;
  saveYearly: (pct: number) => string;
  freeNote: string;
  monthlyNote: string;
  currentPlan: string;
  demoNote: string;
  yesAria: string;
  noAria: string;
  compareTitle: string;
  compareSubtitle: string;
  featureCol: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaSubcopy: string;
  ctaButton: string;
}

const COPY: { ja: Copy; en: Copy } = {
  ja: {
    back: "スタジオに戻る",
    badgeSections: "830+ セクション",
    title: "シンプルな料金。",
    subcopy: "あなたが必要なのはコードだけ。所有権はすべてあなたに。",
    monthly: "月払い",
    annual: "年払い",
    toggleAria: "年払いに切り替え",
    maxSave: "最大 20% お得",
    popular: "人気",
    free: "¥0",
    perMonth: "/月",
    billedYearly: (annualPrice) => `年 $${annualPrice} 一括`,
    saveYearly: (pct) => `年払いで${pct}% お得`,
    freeNote: "ずっと無料。カード登録は不要です。",
    monthlyNote: "月ごとの請求。いつでも解約できます。",
    currentPlan: "現在のプラン",
    demoNote: "※ 現在は決済未接続のデモです。プランは体験用に切り替えできます。",
    yesAria: "あり",
    noAria: "なし",
    compareTitle: "プランの比較",
    compareSubtitle:
      "すべてのプランに共通する機能と、上位プランで解放される機能。",
    featureCol: "機能",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "支払い方法は？",
        a: "クレジットカード（Visa / Mastercard / American Express）に対応予定です。請求は月払い・年払いから選べます。※ 現在は決済未接続のデモのため、実際の課金は発生しません。",
      },
      {
        q: "いつでも解約できますか？",
        a: "はい。いつでもダッシュボードから解約でき、解約後も請求期間の終了まではご利用いただけます。違約金や解約手数料はありません。",
      },
      {
        q: "商用利用のライセンスは含まれますか？",
        a: "Pro と Studio には商用利用ライセンスが含まれます（Pro は1名、Studio はチーム）。Free は個人・非商用の範囲でご利用いただけます。生成したコードの所有権はすべてあなたにあります。",
      },
      {
        q: "Free と Pro の違いは？",
        a: "Free でも 830+ セクションの閲覧・ライブプレビューは無制限ですが、コードのコピーは1日10回までです。Pro はコピー無制限・バニラ HTML エクスポート・shadcn レジストリ配信・新着の先行アクセス・商用ライセンスが付きます。",
      },
      {
        q: "チーム（Studio）のシートはどう使いますか？",
        a: "Studio は5シートまで含まれ、メンバーを招待して社内・チームで共有利用できます。各メンバーがそれぞれ自分のアカウントでログインし、商用ライセンスはチーム全体に適用されます。",
      },
      {
        q: "返金はできますか？",
        a: "ご購入から14日以内であれば、ご利用状況にかかわらず全額返金に対応します。サポートまでご連絡ください。※ 現在は決済未接続のデモのため、返金処理は発生しません。",
      },
    ],
    ctaTitle: "まずは無料で。",
    ctaSubcopy:
      "830+ のセクションを今すぐ閲覧・プレビュー。気に入ったらいつでもアップグレードできます。",
    ctaButton: "スタジオを開く",
  },
  en: {
    back: "Back to studio",
    badgeSections: "830+ sections",
    title: "Simple pricing.",
    subcopy: "All you need is the code. You own all of it.",
    monthly: "Monthly",
    annual: "Annual",
    toggleAria: "Switch to annual billing",
    maxSave: "Save up to 20%",
    popular: "Popular",
    free: "Free",
    perMonth: "/mo",
    billedYearly: (annualPrice) => `$${annualPrice} billed yearly`,
    saveYearly: (pct) => `Save ${pct}% yearly`,
    freeNote: "Free forever. No card required.",
    monthlyNote: "Billed monthly. Cancel anytime.",
    currentPlan: "Current plan",
    demoNote:
      "Note: payments are not connected in this demo. Plans can be switched to try them out.",
    yesAria: "Yes",
    noAria: "No",
    compareTitle: "Compare plans",
    compareSubtitle:
      "Features shared by every plan, and the ones unlocked on higher tiers.",
    featureCol: "Feature",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What payment methods are supported?",
        a: "Credit cards (Visa / Mastercard / American Express) will be supported. You can choose monthly or annual billing. Note: payments are not connected in this demo, so no actual charges are made.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. You can cancel anytime from your dashboard, and you keep access until the end of the billing period. There are no penalties or cancellation fees.",
      },
      {
        q: "Is a commercial license included?",
        a: "Pro and Studio include a commercial license (Pro for 1 user, Studio for a team). Free is for personal, non-commercial use. You own all of the code you generate.",
      },
      {
        q: "What's the difference between Free and Pro?",
        a: "On Free you can browse and live-preview all 830+ sections without limits, but code copying is capped at 10 per day. Pro adds unlimited copying, vanilla HTML export, shadcn registry delivery, early access to new sections, and a commercial license.",
      },
      {
        q: "How do the team (Studio) seats work?",
        a: "Studio includes up to 5 seats, so you can invite members and share it across your team or company. Each member signs in with their own account, and the commercial license applies to the whole team.",
      },
      {
        q: "Can I get a refund?",
        a: "Within 14 days of purchase we offer a full refund regardless of usage. Just contact support. Note: payments are not connected in this demo, so no refunds are processed.",
      },
    ],
    ctaTitle: "Start for free.",
    ctaSubcopy:
      "Browse and preview 830+ sections right now. Upgrade anytime once you're hooked.",
    ctaButton: "Open the studio",
  },
};

function CompareCell({
  value,
  yesLabel,
  noLabel,
}: {
  value: string | boolean;
  yesLabel: string;
  noLabel: string;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-primary" aria-label={yesLabel} />
    ) : (
      <Minus
        className="mx-auto h-4 w-4 text-muted-foreground/50"
        aria-label={noLabel}
      />
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

export default function Pricing({
  currentPlan,
  lang = "ja",
  onChoosePlan,
  onOpenStudio,
}: {
  currentPlan: PlanId;
  lang?: Lang;
  onChoosePlan: (p: PlanId) => void;
  onOpenStudio: () => void;
}) {
  const [annual, setAnnual] = useState<boolean>(true);
  const t = COPY[lang];
  const plans = getPlans(lang);
  const comparison = getComparison(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.violet.500/0.14),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
          <div className="mb-10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenStudio}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              {t.back}
            </Button>
            <Badge
              variant="secondary"
              className="gap-1.5 border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t.badgeSections}
            </Badge>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t.subcopy}</p>

            {/* Monthly / Annual toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2 shadow-sm">
              <span
                className={cn(
                  "text-sm transition-colors",
                  !annual
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {t.monthly}
              </span>
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                aria-label={t.toggleAria}
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  annual
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {t.annual}
              </span>
              <Badge className="ml-1 border-transparent bg-primary/15 text-primary hover:bg-primary/15">
                {t.maxSave}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing cards */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const isFree = plan.id === "free";
            const isCurrent = currentPlan === plan.id;
            const discount = annualDiscountPct(
              plan.priceMonthly,
              plan.priceAnnual
            );
            const monthlyEffective = Math.round(plan.priceAnnual / 12);

            const priceLabel = isFree
              ? t.free
              : annual
                ? `$${monthlyEffective}${t.perMonth}`
                : `$${plan.priceMonthly}${t.perMonth}`;

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex h-full flex-col transition-shadow",
                  plan.highlight
                    ? "border-primary/40 shadow-lg ring-2 ring-primary lg:scale-[1.03]"
                    : "hover:shadow-md"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1 border-transparent bg-primary text-primary-foreground shadow">
                      <Zap className="h-3.5 w-3.5" />
                      {t.popular}
                    </Badge>
                  </div>
                )}

                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {plan.seats}
                    </span>
                  </div>
                  <CardDescription>{plan.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight">
                        {priceLabel}
                      </span>
                    </div>
                    {!isFree && annual ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {t.billedYearly(plan.priceAnnual)}
                        </span>
                        {discount > 0 && (
                          <Badge
                            variant="secondary"
                            className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            {t.saveYearly(discount)}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {isFree ? t.freeNote : t.monthlyNote}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={`${plan.id}-feat-${i}`}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {isCurrent ? (
                    <Button disabled className="w-full" variant="secondary">
                      {t.currentPlan}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                      onClick={() => {
                        onChoosePlan(plan.id);
                        if (isFree) onOpenStudio();
                      }}
                    >
                      {plan.cta}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t.demoNote}
        </p>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {t.compareTitle}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.compareSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b bg-muted/40">
                <th
                  scope="col"
                  className="px-5 py-4 text-sm font-medium text-muted-foreground"
                >
                  {t.featureCol}
                </th>
                {plans.map((plan) => (
                  <th
                    key={`col-${plan.id}`}
                    scope="col"
                    className={cn(
                      "px-5 py-4 text-center text-sm font-semibold",
                      plan.highlight && "bg-primary/5 text-primary"
                    )}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={`row-${i}-${row.label}`}
                  className="border-b last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-left text-sm font-normal text-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-3.5 text-center">
                    <CompareCell
                      value={row.free}
                      yesLabel={t.yesAria}
                      noLabel={t.noAria}
                    />
                  </td>
                  <td className="bg-primary/5 px-5 py-3.5 text-center">
                    <CompareCell
                      value={row.pro}
                      yesLabel={t.yesAria}
                      noLabel={t.noAria}
                    />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <CompareCell
                      value={row.studio}
                      yesLabel={t.yesAria}
                      noLabel={t.noAria}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{t.faqTitle}</h2>
        </div>
        <dl className="divide-y rounded-xl border bg-card">
          {t.faq.map((item, i) => (
            <div key={`faq-${i}`} className="px-6 py-5">
              <dt className="flex items-start gap-2 font-medium text-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-primary" />
                {item.q}
              </dt>
              <dd className="mt-2 pl-6 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bottom CTA band */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {t.ctaSubcopy}
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={onOpenStudio} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {t.ctaButton}
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t.demoNote}</p>
        </div>
      </section>
    </div>
  );
}
