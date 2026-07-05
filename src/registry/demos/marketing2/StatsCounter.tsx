import { useEffect, useRef, useState } from "react";
import { Activity, Globe2, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "KPIカウンター",
  category: "マーケティング",
  description:
    "マウント時に0から数値がカウントアップする3〜4指標のKPIバンド（rAF駆動）。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["marketing", "stats", "kpi"],
  principle:
    "数字がアニメーションで増えると注意が引きつけられ、実績の規模感が記憶に残りやすくなる。",
};

type Stat = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  suffixEn?: string;
  prefix?: string;
  label: string;
  labelEn: string;
  decimals?: number;
};

const STATS: Stat[] = [
  {
    icon: Users,
    value: 48000,
    suffix: "+",
    label: "アクティブユーザー",
    labelEn: "Active users",
  },
  {
    icon: TrendingUp,
    value: 99.98,
    suffix: "%",
    label: "稼働率",
    labelEn: "Uptime",
    decimals: 2,
  },
  {
    icon: Globe2,
    value: 120,
    suffix: "カ国",
    suffixEn: " countries",
    label: "導入国・地域",
    labelEn: "Countries & regions",
  },
  {
    icon: Activity,
    value: 4.2,
    suffix: "億",
    suffixEn: "00M",
    label: "月間リクエスト",
    labelEn: "Monthly requests",
    decimals: 1,
  },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration = 1600, decimals = 0): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return decimals > 0
    ? Number(value.toFixed(decimals))
    : Math.round(value);
}

function StatItem({ stat }: { stat: Stat }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const animated = useCountUp(stat.value, 1600, stat.decimals ?? 0);
  const locale = en ? "en-US" : "ja-JP";
  const formatted =
    stat.decimals && stat.decimals > 0
      ? animated.toLocaleString(locale, {
          minimumFractionDigits: stat.decimals,
          maximumFractionDigits: stat.decimals,
        })
      : animated.toLocaleString(locale);

  const Icon = stat.icon;
  return (
    <div className="group flex flex-col items-center gap-3 px-4 py-8 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl border bg-background text-primary transition-colors group-hover:bg-primary/5">
        <Icon className="size-5" />
      </span>
      <div className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
        {stat.prefix}
        {formatted}
        {en ? stat.suffixEn ?? stat.suffix : stat.suffix}
      </div>
      <p className="text-sm text-muted-foreground">
        {en ? stat.labelEn : stat.label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border bg-card">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
