import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "目標進捗リング",
  category: "ダッシュボード",
  description: "マウント時に伸びる同心円リングで複数の目標達成度を表示。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const RINGS = [
  { label: "売上", en: "Revenue", value: 78, color: "hsl(217 91% 60%)", r: 64 },
  { label: "新規顧客", en: "New customers", value: 62, color: "hsl(160 84% 39%)", r: 48 },
  { label: "リテンション", en: "Retention", value: 90, color: "hsl(38 92% 50%)", r: 32 },
];

export default function GoalProgressRings() {
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-center gap-6 rounded-2xl border bg-card p-6 text-card-foreground sm:flex-row sm:justify-center"
    >
      <div className="relative size-44 shrink-0">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          {RINGS.map((ring) => {
            const C = 2 * Math.PI * ring.r;
            const len = (ring.value / 100) * C;
            return (
              <g key={ring.label}>
                <circle
                  cx={80}
                  cy={80}
                  r={ring.r}
                  fill="none"
                  strokeWidth={10}
                  className="stroke-muted"
                />
                <circle
                  cx={80}
                  cy={80}
                  r={ring.r}
                  fill="none"
                  strokeWidth={10}
                  strokeLinecap="round"
                  stroke={ring.color}
                  strokeDasharray={`${len} ${C}`}
                  style={{
                    strokeDasharray: run ? `${len} ${C}` : `0 ${C}`,
                    transition: "stroke-dasharray 1100ms ease-out",
                    filter: `drop-shadow(0 0 4px ${ring.color}55)`,
                  }}
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">77%</span>
          <span className="text-[10px] text-muted-foreground">
            {en ? "Overall progress" : "全体達成率"}
          </span>
        </div>
      </div>
      <ul className="space-y-3">
        {RINGS.map((ring) => (
          <li key={ring.label} className="flex items-center gap-2.5">
            <span className="size-3 rounded-full" style={{ background: ring.color }} />
            <span className="text-sm">{en ? ring.en : ring.label}</span>
            <span className="ml-auto w-12 text-right text-sm font-semibold tabular-nums">
              {ring.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
