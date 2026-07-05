import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Globe2, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・カウントアップ統計",
  category: "マーケティング",
  description: "ビューに入ると数値がカウントアップする統計バンド（IntersectionObserver）。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

type Stat = {
  icon: React.ReactNode;
  to: number;
  suffix: string;
  suffixEn?: string;
  labelJa: string;
  labelEn: string;
  decimals?: number;
};

const STATS: Stat[] = [
  {
    icon: <Users className="h-5 w-5" />,
    to: 48000,
    suffix: "+",
    labelJa: "アクティブユーザー",
    labelEn: "Active users",
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    to: 120,
    suffix: "ヶ国",
    suffixEn: " countries",
    labelJa: "サービス提供国",
    labelEn: "Countries served",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    to: 99.98,
    suffix: "%",
    labelJa: "稼働率",
    labelEn: "Uptime",
    decimals: 2,
  },
  {
    icon: <Star className="h-5 w-5" />,
    to: 4.9,
    suffix: "/5",
    labelJa: "平均評価",
    labelEn: "Average rating",
    decimals: 1,
  },
];

function useCountUp(target: number, run: boolean, decimals = 0, duration = 1600) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, target, duration]);

  const fixed = val.toFixed(decimals);
  return decimals === 0 ? Number(fixed).toLocaleString("en-US") : fixed;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const display = useCountUp(stat.to, run, stat.decimals ?? 0);
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-indigo-300 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
        {stat.icon}
      </div>
      <div className="text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
        {display}
        <span className="text-indigo-300">
          {en ? stat.suffixEn ?? stat.suffix : stat.suffix}
        </span>
      </div>
      <div className="mt-1 text-sm text-white/55">
        {en ? stat.labelEn : stat.labelJa}
      </div>
    </div>
  );
}

export default function StatsCountUp() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <div ref={rootRef} className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "The numbers speak for trust" : "数字が信頼を語る"}
          </h2>
          <p className="mt-3 text-sm text-white/60">
            {en
              ? "Chosen by teams around the world."
              : "世界中のチームに選ばれ続けています。"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <StatItem key={s.labelJa} stat={s} run={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
