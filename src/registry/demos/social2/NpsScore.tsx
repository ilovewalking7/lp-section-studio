import { useEffect, useRef, useState } from "react";
import { ThumbsUp } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "NPSスコアメーター",
  category: "マーケティング",
  description: "推奨者・中立者・批判者の比率バーと、半円ゲージで描かれるNPSスコア。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const SEGMENTS = [
  { label: "推奨者", labelEn: "Promoters", pct: 74, color: "bg-emerald-500" },
  { label: "中立者", labelEn: "Passives", pct: 18, color: "bg-amber-400" },
  { label: "批判者", labelEn: "Detractors", pct: 8, color: "bg-rose-500" },
];
const NPS = 66;

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

export default function NpsScore() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  const r = 70;
  const half = Math.PI * r;
  // NPS ranges -100..100, map to 0..1
  const frac = (NPS + 100) / 200;

  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="mx-auto grid max-w-3xl items-center gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm sm:grid-cols-2 sm:p-10">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 180 100" className="w-full max-w-[16rem]">
            <path d="M10 95 A80 80 0 0 1 170 95" fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-muted" />
            <path
              d="M10 95 A80 80 0 0 1 170 95"
              fill="none"
              strokeWidth="14"
              strokeLinecap="round"
              className="stroke-emerald-500 transition-[stroke-dashoffset] duration-[1400ms] ease-out"
              style={{ strokeDasharray: half, strokeDashoffset: seen ? half * (1 - frac) : half }}
            />
          </svg>
          <div className="-mt-6 flex flex-col items-center">
            <ThumbsUp className="size-5 text-emerald-500" />
            <span className="mt-1 text-4xl font-bold tabular-nums text-foreground">{NPS}</span>
            <span className="text-xs font-medium text-muted-foreground">{en ? "NPS score" : "NPS スコア"}</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{en ? "“Would recommend to a friend”" : "「友人に薦めたい」"}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{en ? "Based on the latest 12,000 responses." : "直近12,000件の回答より。"}</p>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full">
            {SEGMENTS.map((s) => (
              <span
                key={s.label}
                className={`${s.color} transition-[width] duration-1000 ease-out`}
                style={{ width: seen ? `${s.pct}%` : "0%" }}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {SEGMENTS.map((s) => (
              <li key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className={`size-2.5 rounded-full ${s.color}`} />
                  {en ? s.labelEn : s.label}
                </span>
                <span className="font-semibold tabular-nums text-foreground">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
