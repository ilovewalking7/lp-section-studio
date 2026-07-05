import { Quote, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・お客様の声",
  category: "ボタニカル",
  description: "評価付きの穏やかなレビューカード。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

export default function BotanicalTestimonial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <figure className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] p-8 text-[#3f4a35] shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]">
      <svg
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-20"
        aria-hidden
      >
        <path
          d="M60 110 C60 80 60 50 60 20"
          stroke="#86a06d"
          strokeWidth="2"
        />
        <path d="M60 50 C44 42 34 46 32 52 C44 56 54 54 60 50Z" fill="#86a06d" />
        <path d="M60 38 C76 30 86 34 88 40 C76 44 66 42 60 38Z" fill="#86a06d" />
      </svg>

      <Quote className="size-8 text-[#86a06d]" />

      <div className="mt-4 flex items-center gap-1 text-[#b3753f]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>

      <blockquote className="mt-4 font-serif text-lg leading-relaxed tracking-tight text-[#3f4a35]">
        {en
          ? "“My skin used to react to everything, but this one stays gentle. The scent is so natural that my nightly skincare has become a moment of calm.”"
          : "「敏感肌で何を使っても荒れていたのに、これだけは穏やか。香りも自然で、夜のスキンケアが癒やしの時間になりました。」"}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-[#5e6b4f]/10 pt-5">
        <span className="flex size-11 items-center justify-center rounded-full bg-[#5e6b4f]/15 font-serif text-base font-medium text-[#5e6b4f]">
          M
        </span>
        <div>
          <p className="text-sm font-medium">
            {en ? "Misaki Miura" : "三浦 美咲"}
          </p>
          <p className="text-xs text-[#5e6b4f]/80">
            {en ? "Bloom member · 6 months" : "ブルーム会員 · 6ヶ月利用"}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
