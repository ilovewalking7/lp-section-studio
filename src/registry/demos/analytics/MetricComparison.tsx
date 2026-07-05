import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メトリクス比較",
  category: "ダッシュボード",
  description: "今期と前期をデュアルスパークラインと増減で比較するメトリクスカード。",
  align: "center",
  isNew: true,
  tags: ["analytics", "sparkline", "comparison"],
};

const CURRENT = [12, 18, 15, 22, 19, 26, 24, 31, 28, 35, 33, 42];
const PREVIOUS = [14, 13, 16, 15, 18, 17, 20, 19, 22, 21, 24, 26];

function sparkPath(data: number[], w: number, h: number) {
  const max = Math.max(...data, ...PREVIOUS, ...CURRENT);
  const min = Math.min(...data, ...PREVIOUS, ...CURRENT);
  const span = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function MetricComparison() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const W = 240;
  const H = 56;
  const curTotal = CURRENT.reduce((a, b) => a + b, 0);
  const prevTotal = PREVIOUS.reduce((a, b) => a + b, 0);
  const delta = ((curTotal - prevTotal) / prevTotal) * 100;
  const up = delta >= 0;

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {en ? "Monthly active revenue" : "月間アクティブ収益"}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums tracking-tight">
                ¥{(curTotal * 1000).toLocaleString(en ? "en-US" : "ja-JP")}
              </span>
            </div>
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold tabular-nums",
              up
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-rose-500/10 text-rose-500"
            )}
          >
            <ArrowUpRight
              className={cn("size-3.5", !up && "rotate-90")}
            />
            {up ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        </div>

        <div className="mt-5">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-14 w-full"
            preserveAspectRatio="none"
            role="img"
            aria-label={
              en
                ? "Sparkline comparing this period and the previous period"
                : "今期と前期の比較スパークライン"
            }
          >
            <path
              d={sparkPath(PREVIOUS, W, H)}
              fill="none"
              className="stroke-muted-foreground/40"
              strokeWidth={2}
              strokeDasharray="3 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={sparkPath(CURRENT, W, H)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              {en ? "This period" : "今期"}
            </span>
            <span className="font-semibold tabular-nums">
              ¥{(curTotal * 1000).toLocaleString(en ? "en-US" : "ja-JP")}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-muted-foreground/40" />
            <span className="text-muted-foreground">
              {en ? "Previous period" : "前期"}
            </span>
            <span className="font-semibold tabular-nums">
              ¥{(prevTotal * 1000).toLocaleString(en ? "en-US" : "ja-JP")}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
