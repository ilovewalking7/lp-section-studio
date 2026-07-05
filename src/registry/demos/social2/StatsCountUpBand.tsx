import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Star, Globe } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "統計カウントアップ帯",
  category: "マーケティング",
  description: "画面に入るとゼロから目標値へ滑らかに数えあがる、信頼を示す統計バンド。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const STATS = [
  { icon: Users, value: 92000, suffix: "+", label: { ja: "アクティブユーザー", en: "Active users" } },
  { icon: Star, value: 4.9, decimals: 1, label: { ja: "平均評価", en: "Average rating" }, suffix: "/5" },
  { icon: Globe, value: 48, label: { ja: "対応国", en: "Countries" } },
  { icon: TrendingUp, value: 99.9, decimals: 1, suffix: "%", label: { ja: "稼働率", en: "Uptime" } },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Counter({ value, decimals = 0, run, locale }: { value: number; decimals?: number; run: boolean; locale: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

export default function StatsCountUpBand() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <section className="w-full px-6 py-12">
      <div ref={ref} className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label.en} className="text-center">
              <s.icon className="mx-auto size-6 text-primary" aria-hidden />
              <div className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <Counter value={s.value} decimals={s.decimals} run={seen} locale={en ? "en-US" : "ja-JP"} />
                {s.suffix}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{en ? s.label.en : s.label.ja}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
