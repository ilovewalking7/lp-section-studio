import { useState } from "react";
import { ChevronRight, ChevronLeft, Disc } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ズームスルー・トンネルカード",
  category: "3Dカルーセル",
  description: "カードが奥から手前へ突き抜けてくるトンネル状のズーム3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Item = { label: string; from: string; to: string };

const ITEMS: Item[] = [
  { label: "01", from: "#6366f1", to: "#06b6d4" },
  { label: "02", from: "#f97316", to: "#db2777" },
  { label: "03", from: "#10b981", to: "#0ea5e9" },
  { label: "04", from: "#a855f7", to: "#f43f5e" },
  { label: "05", from: "#eab308", to: "#ef4444" },
];

export default function ZoomTunnelCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-64 max-w-2xl items-center justify-center"
        style={{ perspective: "700px" }}
      >
        <div className="relative h-40 w-40" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((it, i) => {
            const offset = (i - active + ITEMS.length) % ITEMS.length;
            const depth = offset;
            return (
              <div
                key={it.label}
                className="absolute inset-0 flex items-center justify-center rounded-2xl text-white shadow-2xl transition-all duration-700 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${it.from}, ${it.to})`,
                  transform: `translateZ(${-depth * 220}px) scale(${1 - depth * 0.06})`,
                  opacity: depth > 3 ? 0 : 1 - depth * 0.18,
                  zIndex: ITEMS.length - depth,
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Disc className="h-8 w-8" />
                  <span className="text-2xl font-black">{it.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + ITEMS.length) % ITEMS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((it, i) => (
            <span
              key={it.label}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % ITEMS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
