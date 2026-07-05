import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メトリクス比較",
  category: "ダッシュボード",
  description: "今期と前期を並べた、伸びる二重バーの比較ウィジェット。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const ROWS = [
  { label: "売上", en: "Revenue", current: 4825, prev: 4080, unit: "万円", unitEn: "k JPY" },
  { label: "新規ユーザー", en: "New users", current: 12480, prev: 10240, unit: "", unitEn: "" },
  { label: "セッション", en: "Sessions", current: 86200, prev: 79400, unit: "", unitEn: "" },
  { label: "平均滞在", en: "Avg. time", current: 248, prev: 226, unit: "秒", unitEn: "s" },
];

export default function MetricComparison() {
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
        <h3 className="text-sm font-semibold">
          {en ? "Period comparison" : "前期比較"}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-violet-500" /> {en ? "This period" : "今期"}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-muted-foreground/40" /> {en ? "Prev period" : "前期"}
          </span>
        </div>
      </div>
      <ul className="space-y-4">
        {ROWS.map((r, i) => {
          const max = Math.max(r.current, r.prev);
          const growth = ((r.current - r.prev) / r.prev) * 100;
          return (
            <li key={r.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium">{en ? r.en : r.label}</span>
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-500">
                  <ArrowUpRight className="size-3" />
                  {growth.toFixed(1)}%
                </span>
              </div>
              <div className="space-y-1">
                <Bar
                  value={r.current}
                  max={max}
                  unit={en ? r.unitEn : r.unit}
                  className="bg-violet-500"
                  run={run}
                  delay={i * 90}
                />
                <Bar
                  value={r.prev}
                  max={max}
                  unit={en ? r.unitEn : r.unit}
                  className="bg-muted-foreground/40"
                  run={run}
                  delay={i * 90 + 60}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Bar({
  value,
  max,
  unit,
  className,
  run,
  delay,
}: {
  value: number;
  max: number;
  unit: string;
  className: string;
  run: boolean;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-5 flex-1 overflow-hidden rounded bg-muted">
        <div
          className={cn("flex h-full items-center justify-end rounded pr-2", className)}
          style={{
            width: run ? `${(value / max) * 100}%` : "0%",
            transition: "width 800ms ease-out",
            transitionDelay: `${delay}ms`,
          }}
        >
          <span className="text-[10px] font-medium tabular-nums text-white/95">
            {value.toLocaleString("en-US")}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
