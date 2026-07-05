import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドーナツグロウ",
  category: "ダッシュボード",
  description: "マウント時にセグメントが伸びるグロウ付きドーナツチャート。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const SEGMENTS = [
  { label: "オーガニック", en: "Organic", value: 42, color: "hsl(217 91% 60%)" },
  { label: "リファラル", en: "Referral", value: 26, color: "hsl(160 84% 39%)" },
  { label: "ソーシャル", en: "Social", value: 18, color: "hsl(38 92% 50%)" },
  { label: "ダイレクト", en: "Direct", value: 14, color: "hsl(280 80% 62%)" },
];

export default function DonutGlow() {
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

  const total = SEGMENTS.reduce((s, x) => s + x.value, 0);
  const R = 60;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-center gap-6 rounded-2xl border bg-card p-6 text-card-foreground sm:flex-row sm:justify-center"
    >
      <div className="relative size-44 shrink-0">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle cx={80} cy={80} r={R} fill="none" strokeWidth={18} className="stroke-muted" />
          {SEGMENTS.map((s) => {
            const len = (s.value / total) * C;
            const el = (
              <circle
                key={s.label}
                cx={80}
                cy={80}
                r={R}
                fill="none"
                strokeWidth={18}
                strokeLinecap="round"
                stroke={s.color}
                strokeDasharray={`${len} ${C}`}
                strokeDashoffset={run ? -offset : -offset + len}
                style={{
                  opacity: run ? 1 : 0,
                  transition: "stroke-dashoffset 1100ms ease-out, opacity 600ms ease-out",
                  filter: `drop-shadow(0 0 6px ${s.color}66)`,
                }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tabular-nums">{total}%</span>
          <span className="text-xs text-muted-foreground">
            {en ? "Total traffic" : "合計トラフィック"}
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
        {SEGMENTS.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span
              className="size-2.5 rounded-full"
              style={{ background: s.color, boxShadow: `0 0 6px ${s.color}88` }}
            />
            <span className="text-sm">{en ? s.en : s.label}</span>
            <span
              className="ml-auto text-sm font-medium tabular-nums text-muted-foreground transition-opacity duration-500"
              style={{ opacity: run ? 1 : 0, transitionDelay: `${600 + i * 80}ms` }}
            >
              {s.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
