import { useEffect, useMemo, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カレンダーヒートマップ",
  category: "ダッシュボード",
  description: "GitHub風の貢献グラフ。セルが順にフェードインする草マップ。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const WEEKS = 26;
const DAYS = 7;
const MONTHS_JA = ["1月", "3月", "5月", "7月", "9月", "11月"];
const MONTHS_EN = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];

function level(n: number) {
  if (n === 0) return "bg-muted";
  if (n === 1) return "bg-emerald-500/30";
  if (n === 2) return "bg-emerald-500/55";
  if (n === 3) return "bg-emerald-500/75";
  return "bg-emerald-500";
}

export default function CalendarHeatmap() {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const grid = useMemo(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: WEEKS }, () =>
      Array.from({ length: DAYS }, () => {
        const r = rand();
        return r > 0.78 ? 4 : r > 0.62 ? 3 : r > 0.42 ? 2 : r > 0.25 ? 1 : 0;
      })
    );
  }, []);

  const total = grid.flat().reduce<number>((s, x) => s + x, 0);

  return (
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">
          {en ? "Contributions" : "貢献グラフ"}
        </h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {en
            ? `${total} in the last 26 weeks`
            : `過去26週間で ${total} 件`}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="mb-1 flex gap-[3px] pl-6 text-[10px] text-muted-foreground">
            {(en ? MONTHS_EN : MONTHS_JA).map((m) => (
              <span key={m} className="w-[calc(4.3*0.95rem)]">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="mr-1 flex flex-col justify-between py-[3px] text-[9px] text-muted-foreground">
              <span>{en ? "Mon" : "月"}</span>
              <span>{en ? "Wed" : "水"}</span>
              <span>{en ? "Fri" : "金"}</span>
            </div>
            {grid.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((d, day) => (
                  <span
                    key={day}
                    className={`size-3 rounded-[2px] ${level(d)}`}
                    title={en ? `${d} contributions` : `${d} 件`}
                    style={{
                      opacity: run ? 1 : 0,
                      transform: run ? "scale(1)" : "scale(0.4)",
                      transition: "opacity 300ms ease-out, transform 300ms ease-out",
                      transitionDelay: `${(w * DAYS + day) * 4}ms`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>{en ? "Less" : "少"}</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`size-3 rounded-[2px] ${level(l)}`} />
        ))}
        <span>{en ? "More" : "多"}</span>
      </div>
    </div>
  );
}
