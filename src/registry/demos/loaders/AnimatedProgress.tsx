import { useEffect, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ進捗バー",
  category: "ローダー・マイクロ",
  description: "不確定ストライプ・グラデーション・円形SVGリングの3種進捗インジケータ。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "progress"],
};

const styles = `
@keyframes ldr-stripe-move { from { background-position: 0 0; } to { background-position: 40px 0; } }
@keyframes ldr-indeterminate { 0% { left: -40%; width: 40%; } 50% { width: 60%; } 100% { left: 100%; width: 40%; } }
@keyframes ldr-grad-shift { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
`;

export default function AnimatedProgress() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pct, setPct] = useState(8);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 8 : p + 2));
    }, 90);
    return () => clearInterval(id);
  }, []);

  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="w-full max-w-sm space-y-7">
      <style>{styles}</style>

      {/* Indeterminate stripe */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">{en ? "Indeterminate (stripe)" : "不確定（ストライプ）"}</p>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="absolute top-0 h-full rounded-full bg-primary"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%, transparent)",
              backgroundSize: "40px 40px",
              animation: "ldr-indeterminate 1.6s ease-in-out infinite, ldr-stripe-move 0.6s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Gradient fill */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{en ? "Gradient" : "グラデーション"}</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-[width] duration-100 ease-linear"
            style={{
              width: `${pct}%`,
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5), hsl(var(--primary)))",
              backgroundSize: "200% 100%",
              animation: "ldr-grad-shift 1.5s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Circular SVG ring */}
      <div className="flex flex-col items-center">
        <p className="mb-2 self-start text-xs font-medium text-muted-foreground">{en ? "Circular ring" : "円形リング"}</p>
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={r} fill="none" strokeWidth="7" className="stroke-muted" />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              className="stroke-primary transition-[stroke-dashoffset] duration-100 ease-linear"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-foreground">
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
