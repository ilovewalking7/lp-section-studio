import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CreditCard, ShoppingBag, TrendingUp, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ統計カード",
  category: "ダッシュボード",
  description: "カウントアップ数値と伸びるトレンドラインを持つ統計カードの集合。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, run };
}

function useCountUp(target: number, run: boolean, ms = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return v;
}

const CARDS = [
  { label: "総売上", labelEn: "Total revenue", prefix: "¥", value: 4825300, icon: Wallet, up: true, delta: "18.2%", color: "text-violet-500", line: [10, 30, 24, 44, 38, 62, 70] },
  { label: "注文数", labelEn: "Orders", value: 12480, icon: ShoppingBag, up: true, delta: "9.7%", color: "text-sky-500", line: [20, 18, 32, 28, 40, 52, 60] },
  { label: "返金", labelEn: "Refunds", prefix: "¥", value: 86200, icon: CreditCard, up: false, delta: "3.1%", color: "text-rose-500", line: [50, 44, 48, 36, 40, 30, 26] },
  { label: "コンバージョン", labelEn: "Conversion", value: 3.8, suffix: "%", icon: TrendingUp, up: true, delta: "0.6%", color: "text-emerald-500", line: [18, 26, 22, 34, 40, 46, 58] },
];

export default function AnimatedStatCards() {
  const { ref, run } = useReveal();
  return (
    <div ref={ref} className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((c) => (
        <StatCard key={c.label} {...c} run={run} />
      ))}
    </div>
  );
}

function StatCard({
  label,
  labelEn,
  prefix,
  suffix,
  value,
  icon: Icon,
  up,
  delta,
  color,
  line,
  run,
}: (typeof CARDS)[number] & { run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const v = useCountUp(value, run);
  const num = suffix ? v.toFixed(1) : Math.round(v).toLocaleString("en-US");
  const max = Math.max(...line);
  const min = Math.min(...line);
  const pts = line
    .map((d, i) => {
      const x = (i / (line.length - 1)) * 100;
      const y = 30 - ((d - min) / (max - min || 1)) * 26 - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="group rounded-xl border bg-card p-4 text-card-foreground transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className={cn("flex size-9 items-center justify-center rounded-lg bg-muted", color)}>
          <Icon className="size-4" />
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-xs font-medium",
            up ? "text-emerald-500" : "text-rose-500"
          )}
        >
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {delta}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">
        {prefix}
        {num}
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground">{en ? labelEn : label}</p>
      <svg viewBox="0 0 100 30" className="mt-2 h-8 w-full" preserveAspectRatio="none">
        <polyline
          points={pts}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-[stroke-dashoffset] duration-[1200ms] ease-out", color)}
          style={{
            strokeDasharray: 200,
            strokeDashoffset: run ? 0 : 200,
          }}
        />
      </svg>
    </div>
  );
}
