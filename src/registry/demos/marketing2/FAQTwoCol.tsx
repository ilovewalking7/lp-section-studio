import { useState } from "react";
import { ArrowRight, MessageCircleQuestion, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "2カラムFAQ",
  category: "マーケティング",
  description:
    "開閉できる2カラムのFAQと『まだ質問が？』のコンタクト誘導を組み合わせたセクション。",
  align: "full",
  isNew: true,
  tags: ["marketing", "faq"],
  principle:
    "購入前の疑問を先回りで解消すると不安が減り、離脱を防げる。残った質問の受け皿を用意して取りこぼしを最小化する。",
};

type Faq = { qJa: string; aJa: string; qEn: string; aEn: string };

const FAQS: Faq[] = [
  {
    qJa: "無料トライアルにクレジットカードは必要ですか？",
    aJa: "不要です。メールアドレスだけで14日間すべての機能をお試しいただけます。期間終了後に自動課金されることもありません。",
    qEn: "Do I need a credit card for the free trial?",
    aEn: "No. With just an email address you can try every feature for 14 days. You won't be charged automatically when the trial ends.",
  },
  {
    qJa: "途中でプランを変更できますか？",
    aJa: "いつでもアップグレード・ダウングレードが可能です。差額は日割りで自動精算されます。",
    qEn: "Can I change my plan later?",
    aEn: "You can upgrade or downgrade anytime. The difference is prorated and settled automatically.",
  },
  {
    qJa: "既存ツールからのデータ移行は大変ですか？",
    aJa: "CSVインポートと主要サービスとの連携を用意しています。大規模な移行は専任チームが無償で支援します。",
    qEn: "Is migrating data from my existing tools difficult?",
    aEn: "We offer CSV import and integrations with major services. For large migrations, a dedicated team assists you free of charge.",
  },
  {
    qJa: "セキュリティ対策はどうなっていますか？",
    aJa: "通信・保存ともに暗号化し、SOC 2 Type II と ISO 27001 に準拠しています。アクセス権限も細かく設定できます。",
    qEn: "How do you handle security?",
    aEn: "Data is encrypted in transit and at rest, and we comply with SOC 2 Type II and ISO 27001. Access permissions are fully configurable.",
  },
  {
    qJa: "解約したい場合はどうすればいいですか？",
    aJa: "設定画面からワンクリックで解約できます。引き止めの電話や面倒な手続きは一切ありません。",
    qEn: "How do I cancel if I want to?",
    aEn: "You can cancel with one click from the settings screen. No retention calls, no tedious paperwork.",
  },
  {
    qJa: "サポートはどの言語に対応していますか？",
    aJa: "日本語と英語に対応し、平日は数分以内、休日も24時間以内に返信しています。",
    qEn: "Which languages does support cover?",
    aEn: "We support Japanese and English, replying within minutes on weekdays and within 24 hours on weekends.",
  },
];

function FaqItem({ faq }: { faq: Faq }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-medium">{en ? faq.qEn : faq.qJa}</span>
        <Plus
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-45 text-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
            {en ? faq.aEn : faq.aJa}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQTwoCol() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const mid = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, mid), FAQS.slice(mid)];

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Frequently asked questions" : "よくあるご質問"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Everything you might want to know before getting started."
              : "導入前に気になる点をまとめました。"}
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {columns.map((col, ci) => (
            <div key={ci} className="space-y-3 sm:space-y-4">
              {col.map((faq) => (
                <FaqItem key={faq.qJa} faq={faq} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-muted/30 px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageCircleQuestion className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">
                {en ? "Still have questions?" : "まだ質問が？"}
              </p>
              <p className="text-sm text-muted-foreground">
                {en
                  ? "Our support team replies in about 5 minutes on average."
                  : "サポートチームが平均5分以内に返信します。"}
              </p>
            </div>
          </div>
          <Button className="group shrink-0">
            {en ? "Contact us" : "問い合わせる"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
