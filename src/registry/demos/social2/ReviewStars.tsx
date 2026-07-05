import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レビュー星アニメ",
  category: "マーケティング",
  description: "星が左から順にきらっと点灯し、評価分布バーが伸びるレビューサマリー。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const DIST = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

export default function ReviewStars() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2StarPop { 0%{ transform:scale(.4); opacity:0 } 60%{ transform:scale(1.25) } 100%{ transform:scale(1); opacity:1 } }
        .star-pop { animation: social2StarPop .5s ease both }
        @media (prefers-reduced-motion: reduce){ .star-pop{ animation:none; opacity:1 } }
      `}</style>
      <div ref={ref} className="mx-auto grid max-w-3xl items-center gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm sm:grid-cols-2 sm:p-10">
        <div className="text-center">
          <div className="text-5xl font-bold tracking-tight text-foreground">4.9</div>
          <div className="mt-2 flex justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-6 fill-amber-400 ${seen ? "star-pop" : "opacity-0"}`} style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{en ? "12,480 reviews" : "12,480 件のレビュー"}</p>
        </div>
        <div className="space-y-2.5">
          {DIST.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-sm">
              <span className="flex w-10 items-center gap-1 text-muted-foreground">
                {d.stars}<Star className="size-3 fill-amber-400 text-amber-400" />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-amber-400 transition-[width] duration-1000 ease-out"
                  style={{ width: seen ? `${d.pct}%` : "0%" }}
                />
              </span>
              <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
