import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタッツ・ヒーロー",
  category: "ヒーロー・LP",
  description: "ビューポート進入で数値がカウントアップする指標付きヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

const stats = [
  { ja: "アクティブユーザー", en: "Active users", to: 128000, suffix: "+", fmt: true },
  { ja: "稼働率", en: "Uptime", to: 99.99, suffix: "%", fmt: false },
  { ja: "対応国", en: "Countries", to: 142, suffix: "", fmt: false },
  { ja: "平均応答", en: "Avg. response", to: 38, suffix: "ms", fmt: false },
];

function useCountUp(to: number, run: boolean, fmt: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setV(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  const num = fmt ? Math.round(v).toLocaleString("en-US") : Number.isInteger(to) ? Math.round(v).toString() : v.toFixed(2);
  return num;
}

function Stat({ s, run }: { s: (typeof stats)[number]; run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const display = useCountUp(s.to, run, s.fmt);
  return (
    <div className="text-center">
      <p className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
        {display}
        {s.suffix}
      </p>
      <p className="mt-1 text-sm text-white/45">{en ? s.en : s.ja}</p>
    </div>
  );
}

export default function StatsHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#06060a] py-28 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60vw] -translate-x-1/2 rounded-full bg-sky-600/15 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Numbers speak trust." : "数字が、信頼を語る。"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "Infrastructure backed by a proven track record. An unshakable foundation that scales globally."
            : "実績に裏打ちされたインフラ。世界規模でスケールする、揺るがない基盤。"}
        </p>
        <Button size="lg" className="group mt-8 bg-white text-black hover:bg-white/90">
          {en ? "Start for free" : "無料で始める"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.en} s={s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
