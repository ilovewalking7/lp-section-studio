import { useState } from "react";
import { ImageIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "アコーディオン折り畳みギャラリー",
  category: "3Dカルーセル",
  description: "ホバーしたパネルだけが開き、他は3Dで折り畳まれるアコーディオン式ギャラリー。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Slab = { label: string; emoji: string; from: string; to: string };

const SLABS: Slab[] = [
  { label: "Mountain", emoji: "⛰️", from: "#64748b", to: "#0ea5e9" },
  { label: "Forest", emoji: "🌲", from: "#15803d", to: "#84cc16" },
  { label: "Desert", emoji: "🏜️", from: "#f59e0b", to: "#f97316" },
  { label: "Ocean", emoji: "🌊", from: "#0891b2", to: "#2563eb" },
  { label: "Aurora", emoji: "🌌", from: "#7c3aed", to: "#ec4899" },
];

export default function AccordionFoldGallery() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-60 max-w-3xl items-stretch justify-center gap-1.5 px-4"
        style={{ perspective: "1400px" }}
      >
        {SLABS.map((s, i) => {
          const isOpen = i === open;
          return (
            <button
              key={s.label}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-label={s.label}
              className="relative origin-bottom overflow-hidden rounded-xl text-white shadow-xl transition-all duration-500 ease-out"
              style={{
                flex: isOpen ? 4 : 1,
                background: `linear-gradient(160deg, ${s.from}, ${s.to})`,
                transform: isOpen ? "rotateX(0deg)" : "rotateX(28deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <span className="flex h-full w-full flex-col items-center justify-end gap-2 p-4">
                <span className="text-3xl">{s.emoji}</span>
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0"
                  )}
                >
                  <ImageIcon className="h-4 w-4" /> {s.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {en ? "Hover or tap a panel to expand" : "パネルにホバー／タップで展開"}
      </p>
    </div>
  );
}
