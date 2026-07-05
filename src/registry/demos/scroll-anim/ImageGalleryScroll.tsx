import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ギャラリー・スクロール",
  category: "スクロール演出",
  description: "グラデーションのギャラリータイルがスクロールで現れる。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "gallery"],
};

const TILES = [
  { c: "from-rose-500 via-pink-500 to-fuchsia-600", t: "Sunset", span: "row-span-2" },
  { c: "from-sky-400 via-cyan-500 to-blue-600", t: "Ocean", span: "" },
  { c: "from-amber-400 via-orange-500 to-red-500", t: "Ember", span: "" },
  { c: "from-emerald-400 via-green-500 to-teal-600", t: "Forest", span: "" },
  { c: "from-violet-500 via-purple-500 to-indigo-600", t: "Twilight", span: "row-span-2" },
  { c: "from-slate-400 via-slate-500 to-slate-700", t: "Stone", span: "" },
];

export default function ImageGalleryScroll() {
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
      { root, threshold: 0.3 },
    );
    root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div ref={rootRef} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">{en ? "Gallery" : "ギャラリー"}</h3>
        <div className="grid auto-rows-[120px] grid-cols-2 gap-4 pb-10">
          {TILES.map((tile, i) => (
            <figure
              key={tile.t}
              data-idx={i}
              style={{ transitionDelay: shown.has(i) ? `${(i % 2) * 100}ms` : "0ms" }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-md transition-all duration-700 ease-out",
                tile.c,
                tile.span,
                shown.has(i)
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-90 opacity-0",
              )}
            >
              <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-3 text-sm font-semibold text-white">
                {tile.t}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
