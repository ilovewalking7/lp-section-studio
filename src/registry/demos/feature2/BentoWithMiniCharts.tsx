import type * as React from "react";
import { TrendingUp, Users, Activity, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニチャート付きベント",
  category: "マーケティング",
  description:
    "インラインSVGの折れ線・棒・ドーナツ・スパークラインを並べた、データ志向のベントグリッド。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

function Line() {
  const pts = [8, 20, 14, 28, 22, 36, 30, 46];
  const w = 200,
    h = 64;
  const max = Math.max(...pts);
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bmc-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#bmc-l)" />
      <path
        d={d}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: 600,
          animation: "bmc-draw 1.4s ease-out forwards",
        }}
      />
    </svg>
  );
}

function Bars() {
  const bars = [40, 65, 50, 80, 60, 95];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-primary/70"
          style={{
            height: `${b}%`,
            transformOrigin: "bottom",
            animation: `bmc-grow .7s ease-out both`,
            animationDelay: `${i * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}

function Donut() {
  const r = 26,
    c = 2 * Math.PI * r;
  const pct = 0.72;
  return (
    <svg viewBox="0 0 70 70" className="size-20">
      <circle cx="35" cy="35" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
      <circle
        cx="35"
        cy="35"
        r={r}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(-90 35 35)"
        style={
          {
            strokeDasharray: c,
            strokeDashoffset: c,
            animation: "bmc-donut 1.2s ease-out forwards",
            "--target": c * (1 - pct),
          } as React.CSSProperties
        }
      />
      <text x="35" y="39" textAnchor="middle" className="fill-foreground text-[14px] font-semibold">
        72%
      </text>
    </svg>
  );
}

function Spark() {
  const pts = [10, 14, 9, 18, 13, 22, 19, 28];
  const w = 120,
    h = 40,
    max = Math.max(...pts);
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - (p / max) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none">
      <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const STATS = [
  { icon: TrendingUp, label: "月間成長", labelEn: "Monthly growth", value: "+38%" },
  { icon: Users, label: "アクティブ", labelEn: "Active users", value: "12,480" },
  { icon: Activity, label: "稼働率", labelEn: "Uptime", value: "99.98%" },
  { icon: DollarSign, label: "売上", labelEn: "Revenue", value: "¥4.2M" },
];

export default function BentoWithMiniCharts() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes bmc-draw { to { stroke-dashoffset: 0; } }
        @keyframes bmc-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes bmc-donut { to { stroke-dashoffset: var(--target); } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Your data starts to speak." : "データが、語りはじめる。"}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {en
              ? "The metrics that matter, in clear visuals on a single screen."
              : "重要な指標を、見やすいビジュアルで一画面に。"}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-card p-5 sm:col-span-2 sm:row-span-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {en ? "Traffic trend" : "トラフィック推移"}
              </span>
              <span className="text-sm font-semibold text-emerald-500">+24%</span>
            </div>
            <p className="mt-1 text-3xl font-semibold tracking-tight">84.2k</p>
            <div className="mt-6">
              <Line />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 sm:col-span-2">
            <span className="text-sm font-medium text-muted-foreground">
              {en ? "Weekly activity" : "週間アクティビティ"}
            </span>
            <div className="mt-4">
              <Bars />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-5">
            <Donut />
            <span className="mt-2 text-xs font-medium text-muted-foreground">
              {en ? "Goal completion" : "目標達成率"}
            </span>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <span className="text-sm font-medium text-muted-foreground">
              {en ? "Conversion rate" : "変換率"}
            </span>
            <p className="mt-1 text-2xl font-semibold tracking-tight">6.4%</p>
            <div className="mt-3">
              <Spark />
            </div>
          </div>

          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.value}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-card p-4 sm:col-span-2"
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{en ? s.labelEn : s.label}</p>
                  <p className="text-lg font-semibold tracking-tight">{s.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
