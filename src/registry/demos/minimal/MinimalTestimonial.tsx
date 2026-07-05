import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル・テスティモニアル",
  category: "ミニマル",
  description: "疎な引用と小さな署名だけで構成した推薦文。",
  align: "center",
  isNew: true,
  tags: ["minimal", "swiss", "quote"],
  principle: "装飾を排した引用は、言葉そのものの重みを際立たせる。",
};

export default function MinimalTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <figure className="w-full max-w-xl bg-white font-sans text-neutral-900">
      <div className="mb-8 h-px w-12 bg-[#e5341a]" aria-hidden />

      <blockquote className="text-2xl font-medium leading-snug tracking-tight md:text-[1.75rem]">
        {en
          ? "“Design is finished when there is nothing left to remove. Whitespace is the tool we trust most.”"
          : "「削るべきものが何も残らなくなったとき、設計は完成する。余白は、私たちが最も信頼する道具だ。」"}
      </blockquote>

      <figcaption className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-5">
        <div>
          <div className="text-sm font-medium tracking-tight">
            {en ? "Rena Miyake" : "三宅 玲奈"}
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Design Director — Atelier
          </div>
        </div>
        <span className="text-[11px] tabular-nums uppercase tracking-[0.2em] text-neutral-400">
          № 03
        </span>
      </figcaption>
    </figure>
  );
}
