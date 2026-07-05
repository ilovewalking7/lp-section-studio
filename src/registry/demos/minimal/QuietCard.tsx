import { ArrowUpRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クワイエット・カード",
  category: "ミニマル",
  description: "抑制の効いた、静かなコンテンツカード。",
  align: "center",
  isNew: true,
  tags: ["minimal", "swiss", "card"],
  principle: "ヘアラインと余白だけで構造を示し、内容に集中させる。",
};

export default function QuietCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm border border-neutral-200 bg-white font-sans text-neutral-900">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Note
        </span>
        <span className="text-[11px] tabular-nums text-neutral-400">№ 014</span>
      </div>

      <div className="px-6 py-8">
        <h3 className="text-xl font-medium leading-snug tracking-tight">
          {en ? (
            <>
              Silence is
              <br />
              a deliberate design.
            </>
          ) : (
            <>
              静けさは、
              <br />
              意図された設計である。
            </>
          )}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {en
            ? "Whitespace is not emptiness but a language of relationships. The more you remove, the louder what remains speaks."
            : "余白は空白ではなく、要素同士の関係を語る言語。削るほどに、残したものが強く語りはじめる。"}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          2026 — 06
        </span>
        <a
          href="#"
          className="group inline-flex items-center gap-1 text-sm font-medium"
        >
          {en ? "Read more" : "続きを読む"}
          <ArrowUpRight className="size-4 text-[#e5341a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
