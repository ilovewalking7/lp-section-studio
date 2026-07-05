import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "FAQつき料金",
  category: "価格・オファー",
  description: "よくある質問のアコーディオンを併設した料金セクション。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "全機能アクセス", en: "Full feature access" },
  { ja: "無制限メンバー", en: "Unlimited members" },
  { ja: "優先サポート", en: "Priority support" },
  { ja: "カスタム連携", en: "Custom integrations" },
];
const faqs = [
  {
    id: "cancel",
    q: { ja: "いつでも解約できますか？", en: "Can I cancel anytime?" },
    a: {
      ja: "はい。マイページからワンクリックで解約でき、違約金は一切ありません。",
      en: "Yes. Cancel with one click from your account page, with no penalties.",
    },
  },
  {
    id: "trial",
    q: { ja: "無料トライアルはありますか？", en: "Is there a free trial?" },
    a: {
      ja: "14日間の無料トライアルをご用意しています。クレジットカード登録不要です。",
      en: "We offer a 14-day free trial. No credit card required.",
    },
  },
  {
    id: "payment",
    q: { ja: "支払い方法は？", en: "What payment methods do you accept?" },
    a: {
      ja: "主要なクレジットカード、銀行振込、請求書払いに対応しています。",
      en: "We accept major credit cards, bank transfers, and invoicing.",
    },
  },
  {
    id: "change",
    q: { ja: "プランの変更は可能ですか？", en: "Can I change plans?" },
    a: {
      ja: "いつでもアップグレード・ダウングレードでき、差額は日割りで調整されます。",
      en: "Upgrade or downgrade anytime; the difference is prorated.",
    },
  },
];

export default function FaqPlusPrice() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-lg md:sticky md:top-8">
          <h3 className="text-lg font-semibold text-foreground">
            {en ? "Pro plan" : "プロプラン"}
          </h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-5xl font-bold text-foreground">¥2,480</span>
            <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {feats.map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                <Check className="size-4 text-primary" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-7 w-full" size="lg">
            {en ? "Start for free" : "無料で始める"}
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {en ? "Frequently asked questions" : "よくある質問"}
          </h2>
          <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-medium text-foreground">{en ? f.q.en : f.q.ja}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {en ? f.a.en : f.a.ja}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
