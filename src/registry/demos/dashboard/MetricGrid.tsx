import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メトリクスグリッド",
  category: "ダッシュボード",
  description: "ラベル・大きな数値・前期比デルタ・ミニスパークラインを並べた KPI グリッド。",
  align: "full",
};

type Metric = {
  label: string;
  labelEn: string;
  value: string;
  delta: number;
  data: number[];
};

const METRICS: Metric[] = [
  { label: "総収益", labelEn: "Total revenue", value: "¥4,820,400", delta: 12.4, data: [12, 18, 14, 22, 19, 28, 26, 34] },
  { label: "新規ユーザー", labelEn: "New users", value: "8,240", delta: 7.1, data: [20, 22, 19, 24, 23, 28, 30, 33] },
  { label: "解約率", labelEn: "Churn rate", value: "1.8%", delta: -3.2, data: [30, 28, 31, 26, 24, 22, 21, 18] },
  { label: "平均注文額", labelEn: "Avg. order value", value: "¥6,180", delta: 4.6, data: [14, 16, 15, 18, 17, 19, 21, 22] },
];

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 96;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * step;
    const y = h - ((d - min) / range) * (h - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const stroke = positive ? "stroke-emerald-500" : "stroke-rose-500";
  const fill = positive ? "text-emerald-500/15" : "text-rose-500/15";
  const id = `spark-${positive ? "up" : "dn"}-${data.join("")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24 overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className={fill} stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={fill} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} className={fill} />
      <path d={line} fill="none" className={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MetricGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map((m) => {
        const up = m.delta >= 0;
        return (
          <Card key={m.label} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-muted-foreground">
                  {en ? m.labelEn : m.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{m.value}</p>
              </div>
              <Sparkline data={m.data} positive={up} />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                  up ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}
              >
                {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {Math.abs(m.delta).toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">
                {en ? "vs last month" : "前月比"}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
