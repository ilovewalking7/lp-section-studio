import { Activity, Gauge, ServerCog, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デベロッパー統計",
  category: "ダークテック",
  description: "スパークラインSVG付きのメトリクスタイル（リクエスト・レイテンシ等）。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / range) * h]);
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const id = `g-${color.replace(/[^a-z]/gi, "")}-${points[0]}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

type Tile = {
  label: string;
  labelEn: string;
  value: string;
  delta: string;
  up: boolean;
  good: boolean;
  icon: typeof Activity;
  color: string;
  data: number[];
};

const TILES: Tile[] = [
  {
    label: "リクエスト",
    labelEn: "Requests",
    value: "2.84M",
    delta: "+12.4%",
    up: true,
    good: true,
    icon: Activity,
    color: "#34d399",
    data: [12, 18, 14, 22, 19, 28, 24, 31, 27, 36],
  },
  {
    label: "p95 レイテンシ",
    labelEn: "p95 latency",
    value: "42ms",
    delta: "-8.1%",
    up: false,
    good: true,
    icon: Gauge,
    color: "#22d3ee",
    data: [60, 55, 58, 50, 48, 52, 45, 43, 44, 42],
  },
  {
    label: "エラー率",
    labelEn: "Error rate",
    value: "0.03%",
    delta: "+0.4%",
    up: true,
    good: false,
    icon: ServerCog,
    color: "#a78bfa",
    data: [4, 3, 5, 3, 4, 2, 3, 4, 3, 5],
  },
  {
    label: "稼働率",
    labelEn: "Uptime",
    value: "99.98%",
    delta: "+0.02%",
    up: true,
    good: true,
    icon: TrendingUp,
    color: "#fbbf24",
    data: [98, 99, 98, 99, 99, 100, 99, 100, 99, 100],
  },
];

export default function DevStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0a0a0f] px-6 py-16 text-zinc-200">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Live metrics
          </span>
          <span className="font-mono text-xs text-zinc-600">{en ? "Last 24 hours" : "過去24時間"}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => {
            const Icon = t.icon;
            const Trend = t.up ? TrendingUp : TrendingDown;
            return (
              <div
                key={t.label}
                className="rounded-xl border border-white/10 bg-[#0d1117] p-5 transition-colors hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400">{en ? t.labelEn : t.label}</span>
                  <Icon className="size-4 text-zinc-500" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-white">{t.value}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 font-mono text-xs",
                      t.good ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    <Trend className="size-3" />
                    {t.delta}
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline points={t.data} color={t.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
