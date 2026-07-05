import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "トラフィックソース",
  category: "ダッシュボード",
  description: "SVGドーナツと%・シェアバー付きのランク一覧によるトラフィック内訳。",
  align: "full",
  isNew: true,
  tags: ["analytics", "traffic", "donut"],
};

type Source = {
  label: string;
  labelEn: string;
  value: number;
  color: string;
  stroke: string;
};

const SOURCES: Source[] = [
  { label: "オーガニック検索", labelEn: "Organic search", value: 4820, color: "bg-sky-500", stroke: "#0ea5e9" },
  { label: "ダイレクト", labelEn: "Direct", value: 3140, color: "bg-violet-500", stroke: "#8b5cf6" },
  { label: "リファラル", labelEn: "Referral", value: 1980, color: "bg-emerald-500", stroke: "#10b981" },
  { label: "ソーシャル", labelEn: "Social", value: 1260, color: "bg-amber-500", stroke: "#f59e0b" },
  { label: "メール", labelEn: "Email", value: 640, color: "bg-rose-500", stroke: "#f43f5e" },
];

export default function TrafficSources() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const total = SOURCES.reduce((a, s) => a + s.value, 0);
  const R = 60;
  const C = 2 * Math.PI * R;
  let offset = 0;

  const arcs = SOURCES.map((s) => {
    const frac = s.value / total;
    const dash = frac * C;
    const arc = {
      stroke: s.stroke,
      dasharray: `${dash} ${C - dash}`,
      dashoffset: -offset,
    };
    offset += dash;
    return arc;
  });

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-5">
          <h3 className="text-base font-semibold tracking-tight">
            {en ? "Traffic sources" : "トラフィックソース"}
          </h3>
          <p className="text-sm text-muted-foreground tabular-nums">
            {en
              ? `${total.toLocaleString("en-US")} sessions total`
              : `合計 ${total.toLocaleString("ja-JP")} セッション`}
          </p>
        </div>

        <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div className="relative mx-auto size-44">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={R}
                fill="none"
                className="stroke-muted"
                strokeWidth={18}
              />
              {arcs.map((a, i) => (
                <circle
                  key={i}
                  cx="80"
                  cy="80"
                  r={R}
                  fill="none"
                  stroke={a.stroke}
                  strokeWidth={18}
                  strokeDasharray={a.dasharray}
                  strokeDashoffset={a.dashoffset}
                  strokeLinecap="butt"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tabular-nums tracking-tight">
                {(total / 1000).toFixed(1)}K
              </span>
              <span className="text-xs text-muted-foreground">
                {en ? "sessions" : "セッション"}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {SOURCES.map((s) => {
              const pct = (s.value / total) * 100;
              return (
                <li key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className={cn("size-2.5 rounded-full", s.color)}
                      />
                      {en ? s.labelEn : s.label}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="tabular-nums text-muted-foreground">
                        {s.value.toLocaleString(en ? "en-US" : "ja-JP")}
                      </span>
                      <span className="w-12 text-right font-semibold tabular-nums">
                        {pct.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", s.color)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
