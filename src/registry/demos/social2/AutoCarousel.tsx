import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "自動再生カルーセル",
  category: "マーケティング",
  description: "推薦コメントが5秒ごとに自動で切り替わるカルーセル。進行バーとドット付き。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const SLIDES = [
  { id: "misaki", name: "佐藤 美咲", nameEn: "Misaki Sato", role: "PdM @ Acme", color: "bg-rose-500", quote: "導入初日でチームの生産性が跳ね上がりました。もう手放せません。", quoteEn: "On day one our team's productivity shot up. We can't go back." },
  { id: "liam", name: "Liam Carter", nameEn: "Liam Carter", role: "Engineer @ Globe", color: "bg-sky-500", quote: "API が驚くほど素直で、ドキュメントも丁寧。実装が圧倒的に速い。", quoteEn: "The API is remarkably intuitive and the docs are thorough. Shipping is so much faster." },
  { id: "ken", name: "田中 健", nameEn: "Ken Tanaka", role: "Designer @ Studio", color: "bg-violet-500", quote: "細部の作り込みが本当に美しい。見ていて楽しいプロダクトです。", quoteEn: "The attention to detail is truly beautiful. It's a product that's a joy to use." },
  { id: "aria", name: "Aria Novak", nameEn: "Aria Novak", role: "Founder @ Nova", color: "bg-amber-500", quote: "投資対効果が明確で、経営判断として迷いはありませんでした。", quoteEn: "The ROI was clear — it was an easy call as a business decision." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("");
}

export default function AutoCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  const go = (dir: number) => setIdx((i) => (i + dir + total) % total);

  return (
    <section className="w-full px-6 py-12">
      <div
        className="mx-auto max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <Quote className="size-8 text-primary/30" aria-hidden />
          <div className="mt-4 min-h-[7rem]">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                aria-hidden={i !== idx}
                className={`transition-all duration-500 ${i === idx ? "opacity-100" : "pointer-events-none absolute inset-x-8 top-20 opacity-0"}`}
              >
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, st) => (
                    <Star key={st} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-3 text-lg font-medium leading-relaxed text-foreground">{en ? s.quoteEn : s.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ${s.color}`}>
                    {initials(en ? s.nameEn : s.name)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-foreground">{en ? s.nameEn : s.name}</span>
                    <span className="block text-xs text-muted-foreground">{s.role}</span>
                  </span>
                </figcaption>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={en ? `Slide ${i + 1}` : `スライド ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-7 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label={en ? "Previous" : "前へ"} onClick={() => go(-1)} className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" aria-label={en ? "Next" : "次へ"} onClick={() => go(1)} className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
