import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・なめらかFAQ",
  category: "マーケティング",
  description: "高さがスムーズに開閉し、ホバーで微反応するアコーディオンFAQ。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

const FAQS = [
  {
    qJa: "無料プランでもずっと使えますか？",
    qEn: "Can I use the free plan forever?",
    aJa: "はい。クレジットカード不要で無期限にご利用いただけます。必要になったら任意のタイミングで上位プランへ移行できます。",
    aEn: "Yes. Use it indefinitely with no credit card. Upgrade to a higher plan anytime you need to.",
  },
  {
    qJa: "途中で解約できますか？",
    qEn: "Can I cancel midway?",
    aJa: "いつでもワンクリックで解約可能です。日割り計算で残期間分を返金します。",
    aEn: "Cancel anytime in one click. We refund the remaining period, prorated by the day.",
  },
  {
    qJa: "データのエクスポートは可能ですか？",
    qEn: "Can I export my data?",
    aJa: "CSV・JSON 形式でいつでも全データを書き出せます。ロックインはありません。",
    aEn: "Export all your data anytime in CSV or JSON. There's no lock-in.",
  },
  {
    qJa: "サポート体制について教えてください。",
    qEn: "What support is available?",
    aJa: "全プランでメールサポート、Pro 以上はチャットと優先対応をご利用いただけます。",
    aEn: "Email support on every plan; Pro and above add chat and priority handling.",
  },
];

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="group border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors group-hover:text-indigo-300"
      >
        <span className="text-base font-medium">{q}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 transition-transform duration-300",
            open && "rotate-45 bg-indigo-500 border-indigo-500",
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
        style={{ maxHeight: open ? (ref.current?.scrollHeight ?? 200) : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={ref} className="pb-5 pr-10 text-sm leading-relaxed text-white/60">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function SmoothFAQ() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Frequently asked questions" : "よくある質問"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en
              ? "Can't find the answer you're looking for? Reach out anytime."
              : "お探しの答えが見つからない場合はお気軽に。"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 sm:px-8">
          {FAQS.map((f) => (
            <Row key={f.qJa} q={en ? f.qEn : f.qJa} a={en ? f.aEn : f.aJa} />
          ))}
        </div>
      </div>
    </section>
  );
}
