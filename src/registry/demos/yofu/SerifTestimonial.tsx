import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "セリフの推薦文",
  category: "洋風",
  description: "大きな引用符にセリフの推薦文と署名を添えた、上品なテスティモニアル。",
  align: "center",
  isNew: true,
  tags: ["洋風", "testimonial", "quote", "elegant"],
  principle: "巨大な引用符と直筆風署名が『個人の生の声』を権威ある証言に格上げする。",
};

export default function SerifTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-2xl bg-[#f8f5ef] p-6 text-stone-800">
      <figure className="relative border border-stone-300 bg-[#f3ede1] px-8 py-14 text-center sm:px-14">
        <span className="pointer-events-none absolute left-6 top-2 select-none font-display text-8xl leading-none text-amber-600/40">
          “
        </span>

        <blockquote className="relative font-display text-2xl italic leading-relaxed text-stone-800 sm:text-3xl">
          {en
            ? "In every single stitch of the tailoring lives an unmistakable sense of beauty. I have yet to find another garment that fills the heart so quietly."
            : "仕立ての一針ひと針に、確かな美意識が宿っている。これほど静かに心を満たしてくれる一着に、私はまだ出会ったことがない。"}
        </blockquote>

        <div className="mx-auto my-8 flex w-28 items-center gap-3 text-stone-400">
          <span className="h-px flex-1 bg-stone-300" />
          <span className="text-xs text-amber-700">✦</span>
          <span className="h-px flex-1 bg-stone-300" />
        </div>

        <figcaption>
          <p className="font-display text-xl italic text-[#7b2d3a]">
            Camille Laurent
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Rédactrice en Chef · Vogue Paris
          </p>
        </figcaption>

        <span className="pointer-events-none absolute bottom-0 right-6 select-none font-display text-8xl leading-none text-amber-600/40">
          ”
        </span>
      </figure>
    </div>
  );
}
