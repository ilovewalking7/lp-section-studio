import { useState } from "react";
import { ChevronLeft, ChevronRight, Gauge } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "慣性スナップ・カルーセル",
  category: "3Dカルーセル",
  description: "慣性のある減速カーブで指定位置へスナップする、状態ベースの3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Item = { label: string; from: string; to: string };

const ITEMS: Item[] = [
  { label: "Tokyo", from: "#ef4444", to: "#f97316" },
  { label: "Kyoto", from: "#8b5cf6", to: "#ec4899" },
  { label: "Osaka", from: "#0ea5e9", to: "#22d3ee" },
  { label: "Sapporo", from: "#3b82f6", to: "#6366f1" },
  { label: "Naha", from: "#10b981", to: "#84cc16" },
];

export default function MomentumSnapCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  const move = (d: number) =>
    setActive((a) => (a + d + ITEMS.length) % ITEMS.length);

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-56 max-w-3xl items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative h-40 w-52" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((it, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={it.label}
                onClick={() => setActive(i)}
                aria-label={it.label}
                className="absolute inset-0 flex items-center justify-center rounded-2xl text-xl font-bold text-white shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${it.from}, ${it.to})`,
                  transform: `translateX(${offset * 180}px) rotateY(${offset * -22}deg) scale(${offset === 0 ? 1 : 0.82})`,
                  transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms",
                  opacity: abs > 2 ? 0 : 1 - abs * 0.25,
                  zIndex: 10 - abs,
                }}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => move(-1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className={cn("flex items-center gap-1.5 text-sm text-muted-foreground")}>
          <Gauge className="h-4 w-4" /> {en ? "Momentum snap" : "慣性スナップ"}
        </span>
        <button
          onClick={() => move(1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
