import { useEffect, useId, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "売上エリアチャート",
  category: "ダッシュボード",
  description: "グラデーション塗りとマウント時に描画されるSVGエリアチャート。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const DATA = [32, 40, 36, 52, 48, 64, 58, 72, 68, 84, 80, 96];
const LABELS_JA = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const LABELS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueAreaChart() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const LABELS = en ? LABELS_EN : LABELS_JA;
  const gid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

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

  const W = 600;
  const H = 220;
  const max = Math.max(...DATA);
  const min = Math.min(...DATA);
  const pad = 16;
  const xy = DATA.map((d, i) => {
    const x = (i / (DATA.length - 1)) * (W - pad * 2) + pad;
    const y = H - pad - ((d - min) / (max - min)) * (H - pad * 2);
    return { x, y };
  });
  const line = xy.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`;

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl border bg-card p-5 text-card-foreground"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{en ? "Monthly revenue" : "月間売上"}</p>
          <p className="text-2xl font-semibold tabular-nums">
            ¥{(DATA[hover ?? DATA.length - 1] * 12480).toLocaleString("en-US")}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
          <TrendingUp className="size-3" /> +24.8%
        </span>
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-48 w-full"
          preserveAspectRatio="none"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1={pad}
              x2={W - pad}
              y1={pad + g * (H - pad * 2)}
              y2={pad + g * (H - pad * 2)}
              className="stroke-border"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
          ))}
          <polygon
            points={area}
            fill={`url(#g${gid})`}
            className="transition-opacity duration-700"
            style={{ opacity: run ? 1 : 0 }}
          />
          <polyline
            points={line}
            fill="none"
            stroke="hsl(217 91% 60%)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 1600,
              strokeDashoffset: run ? 0 : 1600,
              transition: "stroke-dashoffset 1400ms ease-out",
            }}
          />
          {xy.map((p, i) => (
            <g key={i}>
              <rect
                x={p.x - (W - pad * 2) / DATA.length / 2}
                y={0}
                width={(W - pad * 2) / DATA.length}
                height={H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              {hover === i && (
                <circle cx={p.x} cy={p.y} r={5} fill="hsl(217 91% 60%)" stroke="white" strokeWidth={2} />
              )}
            </g>
          ))}
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          {LABELS.filter((_, i) => i % 2 === 0).map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
