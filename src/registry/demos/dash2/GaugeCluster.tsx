import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ゲージクラスター",
  category: "ダッシュボード",
  description: "針が回り込む半円ゲージを並べたシステム健全性クラスター。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const GAUGES = [
  { label: "CPU 使用率", en: "CPU usage", value: 64, color: "hsl(217 91% 60%)" },
  { label: "メモリ", en: "Memory", value: 78, color: "hsl(38 92% 50%)" },
  { label: "ディスク I/O", en: "Disk I/O", value: 42, color: "hsl(160 84% 39%)" },
];

function useCountUp(target: number, run: boolean, ms = 1100) {
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

export default function GaugeCluster() {
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
      <h3 className="mb-2 text-sm font-semibold">
        {en ? "System health" : "システム健全性"}
      </h3>
      <div className="grid gap-2 sm:grid-cols-3">
        {GAUGES.map((g) => (
          <Gauge key={g.label} {...g} run={run} />
        ))}
      </div>
    </div>
  );
}

function Gauge({
  label,
  en: enLabel,
  value,
  color,
  run,
}: (typeof GAUGES)[number] & { run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const v = useCountUp(value, run);
  const R = 52;
  const C = Math.PI * R; // semicircle length
  const len = (v / 100) * C;
  return (
    <div className="flex flex-col items-center p-2">
      <div className="relative">
        <svg viewBox="0 0 140 78" className="w-36">
          <path
            d="M 14 70 A 56 56 0 0 1 126 70"
            fill="none"
            strokeWidth={12}
            strokeLinecap="round"
            className="stroke-muted"
          />
          <path
            d="M 14 70 A 56 56 0 0 1 126 70"
            fill="none"
            strokeWidth={12}
            strokeLinecap="round"
            stroke={color}
            strokeDasharray={`${len} ${C}`}
            style={{
              strokeDasharray: run ? `${len} ${C}` : `0 ${C}`,
              transition: "stroke-dasharray 1100ms ease-out",
            }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center">
          <span className="text-xl font-semibold tabular-nums">{Math.round(v)}%</span>
        </div>
      </div>
      <span className="mt-1 text-xs text-muted-foreground">
        {en ? enLabel : label}
      </span>
    </div>
  );
}
