import { useEffect, useRef, useState } from "react";
import { Cpu, Database, HardDrive, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "使用量メーター",
  category: "ダッシュボード",
  description: "プランの使用量を伸びるバーとカウントアップで表すメーター群。",
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

const METERS = [
  { label: "ストレージ", en: "Storage", icon: HardDrive, used: 64, total: 100, unit: "GB", color: "bg-sky-500" },
  { label: "帯域", en: "Bandwidth", icon: Zap, used: 820, total: 1000, unit: "GB", color: "bg-violet-500" },
  { label: "API リクエスト", en: "API requests", icon: Cpu, used: 184, total: 200, unit: "K", color: "bg-amber-500" },
  { label: "データベース行", en: "Database rows", icon: Database, used: 42, total: 50, unit: "M", color: "bg-emerald-500" },
];

export default function UsageMeter() {
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
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{en ? "Plan usage" : "プラン使用量"}</h3>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">Pro</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {METERS.map((m) => (
          <Meter key={m.label} {...m} run={run} />
        ))}
      </div>
    </div>
  );
}

function Meter({
  label,
  en: enLabel,
  icon: Icon,
  used,
  total,
  unit,
  color,
  run,
}: (typeof METERS)[number] & { run: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const pct = (used / total) * 100;
  const v = useCountUp(used, run);
  const near = pct > 85;
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">{en ? enLabel : label}</span>
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
          {v.toFixed(unit === "K" || unit === "M" ? 0 : 0)}
          {unit} / {total}
          {unit}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", near ? "bg-rose-500" : color)}
          style={{
            width: run ? `${pct}%` : "0%",
            transition: "width 900ms ease-out",
          }}
        />
      </div>
      <p className={cn("mt-1.5 text-[11px]", near ? "text-rose-500" : "text-muted-foreground")}>
        {en
          ? `${pct.toFixed(0)}% used${near ? " · near limit" : ""}`
          : `${pct.toFixed(0)}% 使用中${near ? " · 上限間近" : ""}`}
      </p>
    </div>
  );
}
