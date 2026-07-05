import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "FAQアコーディオン",
  category: "マーケティング",
  description: "シェブロン回転と開閉アニメーションを備えたFAQアコーディオン。",
  align: "full",
};

type QA = { qJa: string; qEn: string; aJa: string; aEn: string };

const items: QA[] = [
  {
    qJa: "無料プランに期限はありますか？",
    qEn: "Does the free plan expire?",
    aJa: "いいえ。無料プランは期間無制限でご利用いただけます。クレジットカードの登録も不要です。",
    aEn: "No. The free plan is available forever, with no time limit and no credit card required.",
  },
  {
    qJa: "途中でプランを変更できますか？",
    qEn: "Can I change plans later?",
    aJa: "いつでもアップグレード・ダウングレードできます。差額は日割りで自動計算され、次回の請求に反映されます。",
    aEn: "You can upgrade or downgrade anytime. The difference is prorated automatically and applied to your next invoice.",
  },
  {
    qJa: "データのエクスポートは可能ですか？",
    qEn: "Can I export my data?",
    aJa: "CSV と JSON でいつでも全データをエクスポートできます。ロックインはありません。",
    aEn: "You can export all your data as CSV or JSON anytime. There's no lock-in.",
  },
  {
    qJa: "どのようなサポートが受けられますか？",
    qEn: "What kind of support is included?",
    aJa: "全プランでメールサポートを提供しています。プロ以上のプランでは優先対応と専用チャンネルをご利用いただけます。",
    aEn: "Every plan includes email support. Pro and above also get priority response times and a dedicated channel.",
  },
];

function FAQRow({ item }: { item: QA }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
      >
        <span className="text-base font-medium tracking-tight">
          {en ? item.qEn : item.qJa}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <p className="pb-5 pr-9 text-sm text-muted-foreground">
            {en ? item.aEn : item.aJa}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Frequently asked questions" : "よくある質問"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {en
              ? "Can't find the answer you're looking for? Reach out to our support team."
              : "探している答えが見つからない場合は、サポートまでお問い合わせください。"}
          </p>
        </div>

        <div className="mt-10 border-t">
          {items.map((item) => (
            <FAQRow key={item.qJa} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
