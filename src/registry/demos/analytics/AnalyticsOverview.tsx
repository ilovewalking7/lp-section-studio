import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アナリティクス概要",
  category: "ダッシュボード",
  description: "3つのKPIタイルとグラデーション付きエリアチャートを備えた概要パネル。",
  align: "full",
  isNew: true,
  tags: ["analytics", "charts", "kpi"],
};

const KPIS = [
  {
    label: { ja: "総収益", en: "Total revenue" },
    value: "¥4,820,400",
    delta: 12.4,
    icon: DollarSign,
    up: true,
  },
  {
    label: { ja: "アクティブユーザー", en: "Active users" },
    value: "38,294",
    delta: 8.1,
    icon: Users,
    up: true,
  },
  {
    label: { ja: "ページビュー", en: "Page views" },
    value: "1.24M",
    delta: -2.6,
    icon: Eye,
    up: false,
  },
];

// 28日分のサンプルデータ（0-100）
const SERIES = [
  32, 38, 30, 44, 41, 52, 48, 60, 55, 67, 62, 71, 69, 78, 74, 82, 79, 88, 84,
  92, 86, 95, 90, 98, 93, 100, 96, 99,
];

function buildPaths(data: number[], width: number, height: number, pad: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * innerW;
    const y = pad + innerH - ((v - min) / span) * innerH;
    return [x, y] as const;
  });
  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const area = `${line} L${(width - pad).toFixed(2)},${(height - pad).toFixed(
    2
  )} L${pad.toFixed(2)},${(height - pad).toFixed(2)} Z`;
  return { line, area, points };
}

export default function AnalyticsOverview() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const W = 760;
  const H = 240;
  const PAD = 12;
  const { line, area, points } = buildPaths(SERIES, W, H, PAD);
  const last = points[points.length - 1];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {en ? "Performance overview" : "パフォーマンス概要"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {en ? "Last 28 days" : "過去28日間の推移"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              {en ? "Revenue" : "収益"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              {en ? "Previous period" : "前期間"}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label.en}
              className="rounded-lg border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {en ? kpi.label.en : kpi.label.ja}
                </span>
                <kpi.icon className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-bold tabular-nums tracking-tight">
                {kpi.value}
              </div>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs font-medium tabular-nums",
                  kpi.up ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {kpi.up ? (
                  <ArrowUpRight className="size-3.5" />
                ) : (
                  <ArrowDownRight className="size-3.5" />
                )}
                {kpi.up ? "+" : ""}
                {kpi.delta}%
                <span className="text-muted-foreground">
                  {en ? "vs last month" : "先月比"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full overflow-hidden rounded-lg border bg-muted/20 p-2">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-56 w-full"
            preserveAspectRatio="none"
            role="img"
            aria-label={en ? "Revenue trend chart" : "収益推移チャート"}
          >
            <defs>
              <linearGradient id="ao-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.35"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1={PAD}
                x2={W - PAD}
                y1={PAD + (H - PAD * 2) * g}
                y2={PAD + (H - PAD * 2) * g}
                className="stroke-border"
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            ))}
            <path d={area} fill="url(#ao-fill)" />
            <path
              d={line}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={last[0]}
              cy={last[1]}
              r={4}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
