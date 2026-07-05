import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コホートグリッド",
  category: "ダッシュボード",
  description: "リテンション率を色の濃淡で表すコホート分析ヒートグリッド。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const COHORTS_JA = ["1月", "2月", "3月", "4月", "5月"];
const COHORTS_EN = ["Jan", "Feb", "Mar", "Apr", "May"];
const ROWS = [
  [100, 68, 54, 47, 41],
  [100, 72, 58, 49],
  [100, 65, 51],
  [100, 74],
  [100],
];

function cellStyle(v: number) {
  const alpha = 0.12 + (v / 100) * 0.78;
  return { backgroundColor: `hsla(217, 91%, 55%, ${alpha})` };
}

export default function CohortGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const COHORTS = en ? COHORTS_EN : COHORTS_JA;
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-x-auto rounded-2xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-4 text-sm font-semibold">
        {en ? "Retention by cohort" : "コホート別リテンション"}
      </h3>
      <div className="min-w-[480px]">
        <div className="mb-1 grid grid-cols-[88px_repeat(5,1fr)] gap-1.5 text-[11px] text-muted-foreground">
          <span />
          {COHORTS.map((_, i) => (
            <span key={i} className="text-center">
              {en ? `Mo ${i}` : `${i}ヶ月後`}
            </span>
          ))}
        </div>
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="mb-1.5 grid grid-cols-[88px_repeat(5,1fr)] items-center gap-1.5"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {en ? `${COHORTS[r]} signups` : `${COHORTS[r]} 登録`}
            </span>
            {Array.from({ length: 5 }).map((_, c) => {
              const v = row[c];
              return (
                <div
                  key={c}
                  className="flex h-9 items-center justify-center rounded-md text-xs font-medium tabular-nums"
                  style={{
                    ...(v != null ? cellStyle(v) : { backgroundColor: "transparent" }),
                    color: v != null && v > 55 ? "white" : undefined,
                    opacity: run ? 1 : 0,
                    transform: run ? "scale(1)" : "scale(0.8)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    transitionDelay: `${(r * 5 + c) * 35}ms`,
                  }}
                >
                  {v != null ? `${v}%` : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
