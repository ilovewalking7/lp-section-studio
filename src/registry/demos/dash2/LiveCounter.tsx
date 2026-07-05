import { useEffect, useRef, useState } from "react";
import { Activity, Eye, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ライブカウンター",
  category: "ダッシュボード",
  description: "数秒ごとに更新され、ティッカーで増減を示すリアルタイム指標。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

type Metric = {
  label: string;
  en: string;
  icon: typeof Users;
  base: number;
  jitter: number;
  color: string;
};

const METRICS: Metric[] = [
  { label: "オンライン", en: "Online", icon: Users, base: 1284, jitter: 40, color: "text-violet-500" },
  { label: "ページ閲覧", en: "Page views", icon: Eye, base: 8420, jitter: 120, color: "text-sky-500" },
  { label: "カート内", en: "In cart", icon: ShoppingCart, base: 342, jitter: 18, color: "text-amber-500" },
  { label: "リクエスト/秒", en: "Requests/sec", icon: Activity, base: 920, jitter: 60, color: "text-emerald-500" },
];

export default function LiveCounter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [vals, setVals] = useState(METRICS.map((m) => m.base));
  const [pulse, setPulse] = useState<boolean[]>(METRICS.map(() => false));
  const seedRef = useRef(13);

  useEffect(() => {
    const id = setInterval(() => {
      setVals((prev) =>
        prev.map((v, i) => {
          seedRef.current = (seedRef.current * 9301 + 49297) % 233280;
          const r = seedRef.current / 233280;
          const delta = Math.round((r - 0.5) * METRICS[i].jitter);
          return Math.max(0, v + delta);
        })
      );
      setPulse(METRICS.map(() => true));
      window.setTimeout(() => setPulse(METRICS.map(() => false)), 400);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map((m, i) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="rounded-xl border bg-card p-4 text-card-foreground">
            <div className="flex items-center justify-between">
              <span className={cn("flex size-9 items-center justify-center rounded-lg bg-muted", m.color)}>
                <Icon className="size-4" />
              </span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
            </div>
            <p
              className={cn(
                "mt-3 text-2xl font-semibold tabular-nums tracking-tight transition-colors duration-300",
                pulse[i] && m.color
              )}
            >
              {vals[i].toLocaleString("en-US")}
            </p>
            <p className="text-xs text-muted-foreground">{en ? m.en : m.label}</p>
          </div>
        );
      })}
    </div>
  );
}
