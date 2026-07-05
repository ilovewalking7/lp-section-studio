import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "総合評価サマリー",
  category: "マーケティング",
  description: "各レビューサイトの評価をカード化し、円形リングが描画される総合評価サマリー。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const SOURCES = [
  { name: "App Store", score: 4.9, of: 5, color: "text-sky-500", count: "8.2k" },
  { name: "G2", score: 4.8, of: 5, color: "text-rose-500", count: "1.4k" },
  { name: "Capterra", score: 4.7, of: 5, color: "text-amber-500", count: "920" },
  { name: "Google", score: 4.9, of: 5, color: "text-emerald-500", count: "3.1k" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Ring({ pct, run, color }: { pct: number; run: boolean; color: string }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="size-20 -rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" strokeWidth="6" className="stroke-muted" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        className={`${color} transition-[stroke-dashoffset] duration-1000 ease-out`}
        style={{ stroke: "currentColor", strokeDasharray: c, strokeDashoffset: run ? c * (1 - pct) : c }}
      />
    </svg>
  );
}

export default function RatingSummary() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "Highly rated everywhere" : "どこを見ても高評価"}</h2>
        <p className="mt-2 text-center text-muted-foreground">{en ? "Average scores across major review sites." : "主要レビューサイトでの平均スコア。"}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((s) => (
            <div key={s.name} className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="relative grid place-items-center">
                <Ring pct={s.score / s.of} run={seen} color={s.color} />
                <span className="absolute text-lg font-bold tabular-nums text-foreground">{s.score}</span>
              </div>
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400" />
                ))}
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">{s.name}</div>
              <div className="text-xs text-muted-foreground">{en ? `${s.count} reviews` : `${s.count} 件のレビュー`}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
