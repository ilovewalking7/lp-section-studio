import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フェードアップ・グリッド",
  category: "スクロール演出",
  description: "グリッドのセルが入域時に時間差でフェードアップ。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "grid"],
};

const COLORS = [
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-lime-400 to-emerald-500",
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-fuchsia-400 to-pink-500",
  "from-teal-400 to-cyan-500",
  "from-indigo-400 to-violet-500",
  "from-yellow-400 to-amber-500",
];

export default function FadeUpGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Set<number>>(new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        setShown((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.idx));
          }
          return next;
        });
      },
      { root, threshold: 0.4 },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          {en ? "↓ Scroll to reveal the grid" : "↓ スクロールでグリッド出現"}
        </div>
        <div className="grid grid-cols-3 gap-4 pb-10">
          {COLORS.map((c, i) => (
            <div
              key={i}
              data-idx={i}
              style={{ transitionDelay: shown.has(i) ? `${(i % 3) * 80 + Math.floor(i / 3) * 60}ms` : "0ms" }}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br text-lg font-black text-white shadow-md transition-all duration-500 ease-out",
                c,
                shown.has(i) ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0",
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
