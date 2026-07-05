import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "KPIスパークライン",
  category: "ダッシュボード",
  description: "描画アニメ付きの小さなスパークラインを並べたKPIストリップ。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const KPIS = [
  { label: "MRR", en: "MRR", value: "¥3.8M", delta: "+6.2%", up: true, color: "stroke-violet-500", data: [12, 18, 15, 22, 20, 28, 26, 34] },
  { label: "アクティブ率", en: "Active rate", value: "72%", delta: "+2.4%", up: true, color: "stroke-sky-500", data: [40, 38, 44, 42, 50, 48, 56, 60] },
  { label: "解約率", en: "Churn rate", value: "1.9%", delta: "-0.5%", up: false, color: "stroke-rose-500", data: [30, 28, 26, 27, 22, 20, 18, 16] },
  { label: "NPS", en: "NPS", value: "58", delta: "+4", up: true, color: "stroke-emerald-500", data: [20, 26, 24, 30, 34, 32, 40, 46] },
];

export default function KpiSparklines() {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {KPIS.map((k, idx) => {
        const max = Math.max(...k.data);
        const min = Math.min(...k.data);
        const pts = k.data
          .map((d, i) => {
            const x = (i / (k.data.length - 1)) * 100;
            const y = 28 - ((d - min) / (max - min || 1)) * 24 - 2;
            return `${x},${y}`;
          })
          .join(" ");
        return (
          <div key={k.label} className="rounded-xl border bg-card p-4 text-card-foreground">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{en ? k.en : k.label}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[11px] font-medium",
                  k.up ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {k.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {k.delta}
              </span>
            </div>
            <p className="mt-1 text-xl font-semibold tabular-nums">{k.value}</p>
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-2 h-8 w-full">
              <polyline
                points={pts}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={k.color}
                style={{
                  strokeDasharray: 240,
                  strokeDashoffset: run ? 0 : 240,
                  transition: "stroke-dashoffset 1200ms ease-out",
                  transitionDelay: `${idx * 100}ms`,
                }}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
