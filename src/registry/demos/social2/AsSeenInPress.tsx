import { Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メディア掲載実績",
  category: "マーケティング",
  description: "「掲載実績」風のプレスロゴ列と引用。下線がホバーでスライドインする上質な帯。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const PRESS = ["TechCrunch", "WIRED", "Forbes", "The Verge", "Nikkei", "Bloomberg"];
const QUOTE = {
  text: "ここ数年で最も洗練されたプロダクトのひとつ。業界の標準を塗り替えるだろう。",
  textEn: "One of the most refined products of the past few years — it will redefine the industry standard.",
  source: "WIRED",
};

export default function AsSeenInPress() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">As seen in</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PRESS.map((p) => (
            <span
              key={p}
              className="group relative cursor-default font-serif text-lg font-semibold text-muted-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              {p}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          ))}
        </div>
        <figure className="mx-auto mt-12 max-w-2xl text-center">
          <Quote className="mx-auto size-7 text-primary/30" aria-hidden />
          <blockquote className="mt-3 text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            “{en ? QUOTE.textEn : QUOTE.text}”
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            — {QUOTE.source}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
