import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タイムライン点灯",
  category: "スクロール演出",
  description: "縦タイムラインのノードが到達点で順に点灯する。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "timeline"],
};

const EVENTS = [
  { y: "2021", t: "創業", tEn: "Founded", d: "小さなチームで始動。", dEn: "Started with a small team." },
  { y: "2022", t: "β版公開", tEn: "Beta launch", d: "最初のユーザーを獲得。", dEn: "Won our first users." },
  { y: "2023", t: "正式リリース", tEn: "GA release", d: "本番品質に到達。", dEn: "Reached production quality." },
  { y: "2024", t: "1万ユーザー", tEn: "10k users", d: "大きな節目を突破。", dEn: "Passed a major milestone." },
  { y: "2025", t: "グローバル展開", tEn: "Global rollout", d: "多言語に対応。", dEn: "Added multi-language support." },
];

export default function TimelineScroll() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        setLit((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (e.isIntersecting) next.add(idx);
          }
          return next;
        });
      },
      { root, threshold: 0.7 },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          {en ? "↓ Scroll to light up the nodes" : "↓ スクロールでノード点灯"}
        </p>
        <div className="relative ml-3 border-l-2 border-dashed border-border pb-10 pl-8">
          {EVENTS.map((ev, i) => {
            const on = lit.has(i);
            return (
              <div key={ev.y} data-idx={i} className="relative mb-10 last:mb-0">
                <span
                  className={cn(
                    "absolute -left-[42px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 transition-all duration-500",
                    on
                      ? "scale-110 border-primary bg-primary shadow-[0_0_0_4px] shadow-primary/25"
                      : "border-border bg-background",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      on ? "bg-primary-foreground" : "bg-muted-foreground/40",
                    )}
                  />
                </span>
                <div
                  className={cn(
                    "transition-all duration-500",
                    on ? "translate-x-0 opacity-100" : "translate-x-3 opacity-40",
                  )}
                >
                  <span className="text-xs font-bold text-primary">{ev.y}</span>
                  <h4 className="font-semibold text-foreground">{en ? ev.tEn : ev.t}</h4>
                  <p className="text-sm text-muted-foreground">{en ? ev.dEn : ev.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
