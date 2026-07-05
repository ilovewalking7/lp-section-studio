import { useState } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "折り畳みパネル・カルーセル",
  category: "3Dカルーセル",
  description: "パネルが屏風のように折れ曲がりながら切り替わる折り畳み3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Panel = { label: string; from: string; to: string };

const PANELS: Panel[] = [
  { label: "Studio", from: "#f97316", to: "#fbbf24" },
  { label: "Gallery", from: "#6366f1", to: "#a855f7" },
  { label: "Atelier", from: "#10b981", to: "#22d3ee" },
  { label: "Lab", from: "#ef4444", to: "#f472b6" },
];

export default function FoldingPanelCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-60 max-w-3xl items-center justify-center gap-2"
        style={{ perspective: "1200px" }}
      >
        {PANELS.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.label}
              onClick={() => setActive(i)}
              aria-label={p.label}
              className="relative h-52 origin-left rounded-lg text-white shadow-xl transition-all duration-500 ease-out"
              style={{
                width: isActive ? 220 : 64,
                transform: isActive ? "rotateY(0deg)" : "rotateY(55deg)",
                background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                transformStyle: "preserve-3d",
              }}
            >
              <span className="flex h-full w-full flex-col items-center justify-center gap-2">
                <Layers className="h-6 w-6" />
                <span
                  className={cn(
                    "font-bold transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  {p.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + PANELS.length) % PANELS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-foreground">{PANELS[active].label}</span>
        <button
          onClick={() => setActive((a) => (a + 1) % PANELS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
