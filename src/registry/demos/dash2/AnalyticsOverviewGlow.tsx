import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Eye, MousePointerClick, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アナリティクス概要グロウ",
  category: "ダッシュボード",
  description: "グロウするKPIタイルとマウント時に伸びるミニチャート付きの概要パネル。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

function useCountUp(target: number, run: boolean, ms = 900) {
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

const TILES = [
  { label: "アクティブユーザー", labelEn: "Active users", value: 48213, glow: "from-violet-500/30", icon: Users, delta: "+12.4%", bars: [40, 55, 48, 70, 64, 82, 90] },
  { label: "ページビュー", labelEn: "Page views", value: 192847, glow: "from-sky-500/30", icon: Eye, delta: "+8.1%", bars: [60, 52, 66, 58, 74, 80, 88] },
  { label: "クリック率", labelEn: "Click rate", value: 6.4, suffix: "%", glow: "from-emerald-500/30", icon: MousePointerClick, delta: "+1.2%", bars: [30, 44, 50, 48, 62, 70, 76] },
];

export default function AnalyticsOverviewGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{en ? "Analytics overview" : "アナリティクス概要"}</h3>
          <p className="text-xs text-muted-foreground">{en ? "Performance over the last 7 days" : "過去7日間のパフォーマンス"}</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
          {en ? "Live" : "リアルタイム"}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {TILES.map((t) => (
          <Tile key={t.label} {...t} run={run} />
        ))}
      </div>
    </div>
  );
}

function Tile({
  label,
  labelEn,
  value,
  suffix,
  glow,
  icon: Icon,
  delta,
  bars,
  run,
}: (typeof TILES)[number] & { run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const v = useCountUp(value, run);
  const display = suffix
    ? v.toFixed(1)
    : Math.round(v).toLocaleString("en-US");
  const max = Math.max(...bars);
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background p-4">
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          glow
        )}
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-500">
          <ArrowUpRight className="size-3" />
          {delta}
        </span>
      </div>
      <p className="relative mt-3 text-2xl font-semibold tabular-nums tracking-tight">
        {display}
        {suffix}
      </p>
      <p className="relative text-xs text-muted-foreground">{en ? labelEn : label}</p>
      <div className="relative mt-3 flex h-10 items-end gap-1">
        {bars.map((b, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm bg-foreground/15 transition-all duration-700 ease-out group-hover:bg-foreground/25"
            style={{
              height: run ? `${(b / max) * 100}%` : "0%",
              transitionDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
