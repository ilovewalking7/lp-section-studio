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
import { LangToggle } from "@/components/LangToggle";
import { Phrased } from "@/components/Phrased";
import { getPlans, getComparison, type PlanId } from "@/lib/plan";
import type { Lang } from "@/lib/i18n";

/** 3桁区切りの円表記 */
const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

interface Copy {
  back: string;
  badgeSections: string;
  title: string;
  subcopy: string;
  free: string;
  oneTime: string;
  usdNote: (u: number) => string;
  freeNote: string;
  fullNote: string;
  recommended: string;
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
    badgeSections: "880 コンポーネント",
    title: "買い切り。|月額はありません。",
    subcopy:
      "一度払えば終わりです。|追加も更新も無料で、|解約というものがありません。",
    free: "¥0",
    oneTime: "買い切り",
    usdNote: (u) => `およそ $${u}`,
    freeNote: "登録は不要です。MCP を入れるだけで使えます。",
    fullNote: "追加費用はありません。更新も無料です。",
    recommended: "おすすめ",
    currentPlan: "利用中",
    demoNote:
      "※ 決済は BOOTH で行います。このページからの購入導線は準備中です。",
    yesAria: "あり",
    noAria: "なし",
    compareTitle: "無料版と買い切り版の違い",
    compareSubtitle:
      "無料版でも 880 個すべてを|ブラウザで見られます。|違うのは「取り出せる数」です。",
    featureCol: "項目",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "なぜ月額ではないのですか？",
        a: "コンポーネント集は一度コピーしたら終わりの買い物で、毎月払い続ける理由がないからです。月額にすると、こちらにも継続して更新やサポートを出す義務が生まれ、その分が値段に乗ります。買い切りなら、必要なときに一度だけ払えば済みます。",
      },
      {
        q: "React を使っていない案件でも使えますか？",
        a: "はい。880 個のうち 397 個は状態を持たない純粋な表示部品で、React 抜きの静的 HTML として書き出せます。出力に React も Babel も含まれないので、PHP・Rails・Hugo・WordPress にもそのまま貼れます。残りの 483 個は状態や操作を持つため、静的版は見た目だけになります（操作は動きません）。",
      },
      {
        q: "「検証済み」とは具体的に何ですか？",
        a: "880 個すべてに対して、4 つの検査を CI で毎回通しています。axe-core による構造アクセシビリティ検査、デザイントークンのコントラスト計算（WCAG の相対輝度）、キーボードで操作できるかの検査、そして実ブラウザ・幅375px で横スクロールが起きないかの検査です。導入したときには 109 件の違反が見つかり、すべて修正しました。現在はいずれも 0 件です。",
      },
      {
        q: "無料版と買い切り版の違いは？",
        a: "無料版は MCP 経由で 100 個を取り出せます（すべて React 不要のもの）。買い切り版は 880 個すべてに加えて、shadcn レジストリ配信と商用利用が付きます。なお閲覧とライブプレビューは、無料でも 880 個すべてが対象です。",
      },
      {
        q: "商用利用はできますか？",
        a: "買い切り版に商用利用ライセンスが含まれます。無料版は個人利用・非商用の範囲です。作った成果物の所有権はあなたにあります。ただし、コンポーネント自体をそのまま再配布・再販することはできません。",
      },
      {
        q: "支払い方法は？",
        a: "BOOTH での販売を予定しています。クレジットカード・コンビニ払い・PayPay などに対応します。※ 現在は準備中です。",
      },
    ],
    ctaTitle: "まず無料の MCP から。",
    ctaSubcopy:
      "100 個をそのまま使えます。|すべて React 不要のものなので、|違いはすぐ分かります。",
    ctaButton: "スタジオを開く",
  },
  en: {
    back: "Back to studio",
    badgeSections: "880 components",
    title: "Pay once. No subscription.",
    subcopy:
      "One payment and you're done. Additions and updates are included, and there is nothing to cancel.",
    free: "Free",
    oneTime: "one time",
    usdNote: (u) => `about $${u}`,
    freeNote: "No sign-up. Just install the MCP.",
    fullNote: "No further charges. Updates included.",
    recommended: "Recommended",
    currentPlan: "Current",
    demoNote:
      "Note: checkout runs on BOOTH. The purchase link from this page is not live yet.",
    yesAria: "Yes",
    noAria: "No",
    compareTitle: "Free vs. Full",
    compareSubtitle:
      "You can browse all 880 either way. What differs is how many you can take.",
    featureCol: "Item",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Why not a subscription?",
        a: "A component library is a one-off purchase — you copy what you need and you are done. Charging monthly would also oblige us to keep shipping just to justify the fee, and that cost ends up in the price. Pay once, take what you need.",
      },
      {
        q: "Can I use these without React?",
        a: "Yes. 397 of the 880 are purely presentational and export as static HTML with no React and no Babel in the output. Paste them into PHP, Rails, Hugo or WordPress as-is. The other 483 hold state, so their static version is visual only — the interactions will not work.",
      },
      {
        q: "What does “verified” actually mean?",
        a: "All 880 pass four automated checks on every CI run: structural accessibility via axe-core, contrast computed from the design tokens using WCAG relative luminance, keyboard reachability, and a real-browser check at 375px wide for horizontal overflow. Introducing these checks surfaced 109 real defects. All are fixed; all four now report zero.",
      },
      {
        q: "What is the difference between Free and Full?",
        a: "Free gives you 100 components over MCP, all of them React-free. Full gives you all 880, plus shadcn registry delivery and a commercial license. Browsing and live preview cover all 880 either way.",
      },
      {
        q: "Is commercial use allowed?",
        a: "Yes, with the Full edition. Free is for personal, non-commercial use. You own what you build. You may not redistribute or resell the components themselves.",
      },
      {
        q: "How do I pay?",
        a: "Sales will run through BOOTH, which supports credit cards, convenience-store payment and PayPay. Not live yet.",
      },
    ],
    ctaTitle: "Start with the free MCP.",
    ctaSubcopy:
      "100 components, ready to use. All React-free, so the difference is obvious right away.",
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
  setLang,
  onChoosePlan,
  onOpenStudio,
}: {
  currentPlan: PlanId;
  lang?: Lang;
  /** 渡されたときだけヘッダーに言語切替を出す（テスト等の簡易利用では省略可） */
  setLang?: (l: Lang) => void;
  onChoosePlan: (p: PlanId) => void;
  onOpenStudio: () => void;
}) {
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
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
          <div className="mb-8 flex items-center justify-between gap-2 sm:mb-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenStudio}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              {t.back}
            </Button>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="hidden gap-1.5 border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300 sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.badgeSections}
              </Badge>
              {/* 言語切替はヘッダー内に置く（固定配置だと他の要素に重なる） */}
              {setLang && <LangToggle lang={lang} setLang={setLang} />}
            </div>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <Phrased text={t.title} />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              <Phrased text={t.subcopy} />
            </p>
          </div>
        </div>
      </header>

      {/* Pricing cards */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const isFree = plan.id === "free";
            const isCurrent = currentPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex h-full flex-col transition-shadow",
                  plan.highlight
                    ? "border-primary/40 shadow-lg ring-2 ring-primary md:scale-[1.03]"
                    : "hover:shadow-md"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1 border-transparent bg-primary text-primary-foreground shadow">
                      <Zap className="h-3.5 w-3.5" />
                      {t.recommended}
                    </Badge>
                  </div>
                )}

                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold tracking-tight">
                        {isFree ? t.free : yen(plan.price)}
                      </span>
                      {!isFree && (
                        <span className="text-sm text-muted-foreground">
                          {t.oneTime}
                        </span>
                      )}
                    </div>
                    {!isFree && plan.priceUsd > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t.usdNote(plan.priceUsd)}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {isFree ? t.freeNote : t.fullNote}
                    </p>
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
                    // 「利用中」は押せない状態ではなく状態表示。無効ボタン
                    // （opacity-50）だとライトテーマで読みにくいので静的な印にする
                    <p className="flex w-full items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                      <Check className="h-4 w-4" aria-hidden />
                      {t.currentPlan}
                    </p>
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
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {t.compareTitle}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <Phrased text={t.compareSubtitle} />
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[560px] border-collapse text-left">
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
                      value={row.full}
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
          <h2 className="text-3xl font-bold tracking-tight">
            <Phrased text={t.ctaTitle} />
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            <Phrased text={t.ctaSubcopy} />
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
