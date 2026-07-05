import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ファネルチャート",
  category: "ダッシュボード",
  description: "各ステージの幅がマウント時に広がるコンバージョンファネル。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const STAGES = [
  { label: "訪問", en: "Visits", value: 18420, color: "hsl(217 91% 60%)" },
  { label: "サインアップ", en: "Sign-ups", value: 9240, color: "hsl(199 89% 48%)" },
  { label: "トライアル開始", en: "Trial started", value: 4820, color: "hsl(160 84% 39%)" },
  { label: "課金", en: "Paid", value: 1680, color: "hsl(142 71% 45%)" },
];

export default function FunnelChart() {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const max = STAGES[0].value;

  return (
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-4 text-sm font-semibold">
        {en ? "Conversion funnel" : "コンバージョンファネル"}
      </h3>
      <div className="space-y-2">
        {STAGES.map((s, i) => {
          const w = (s.value / max) * 100;
          const prev = i === 0 ? s.value : STAGES[i - 1].value;
          const rate = ((s.value / prev) * 100).toFixed(1);
          return (
            <div key={s.label} className="group">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">{en ? s.en : s.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {s.value.toLocaleString("en-US")}
                  {i > 0 && (
                    <span className="ml-2 text-[10px] text-muted-foreground/70">
                      {rate}%
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-center">
                <div
                  className="h-9 rounded-md transition-all duration-700 ease-out"
                  style={{
                    width: run ? `${w}%` : "0%",
                    background: s.color,
                    transitionDelay: `${i * 120}ms`,
                    boxShadow: `0 4px 14px ${s.color}44`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
