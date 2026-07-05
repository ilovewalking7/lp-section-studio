import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パララックス・カバー列",
  category: "3Dカルーセル",
  description: "前景・背景が異なる速度で動く視差付き3Dカバーカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const COVERS = [
  { tJa: "山", tEn: "Mountain", emoji: "⛰️", bg: "#1e3a8a", fg: "#60a5fa" },
  { tJa: "海", tEn: "Ocean", emoji: "🌊", bg: "#0f766e", fg: "#5eead4" },
  { tJa: "森", tEn: "Forest", emoji: "🌲", bg: "#166534", fg: "#86efac" },
  { tJa: "砂漠", tEn: "Desert", emoji: "🏜️", bg: "#92400e", fg: "#fcd34d" },
  { tJa: "都市", tEn: "City", emoji: "🌆", bg: "#581c87", fg: "#d8b4fe" },
];

export default function ParallaxCoverRow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const item = COVERS[active];

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-64 max-w-md items-center justify-center overflow-hidden rounded-3xl"
        style={{ perspective: "900px", background: item.bg, transition: "background 600ms" }}
      >
        <div style={{ transformStyle: "preserve-3d" }} className="relative h-full w-full">
          {COVERS.map((c, i) => {
            const offset = i - active;
            return (
              <span
                key={`bg-${c.tEn}`}
                className="absolute left-1/2 top-1/2 text-[9rem] transition-transform duration-700"
                style={{
                  transform: `translate(-50%,-50%) translateX(${offset * 40}px) translateZ(-200px)`,
                  opacity: offset === 0 ? 0.25 : 0,
                  color: c.fg,
                }}
              >
                {c.emoji}
              </span>
            );
          })}
          {COVERS.map((c, i) => {
            const offset = i - active;
            return (
              <span
                key={`fg-${c.tEn}`}
                className="absolute left-1/2 top-1/2 text-7xl transition-transform duration-500"
                style={{
                  transform: `translate(-50%,-50%) translateX(${offset * 120}px) translateZ(60px)`,
                  opacity: offset === 0 ? 1 : 0,
                }}
              >
                {c.emoji}
              </span>
            );
          })}
        </div>
        <span className="absolute bottom-4 left-0 right-0 text-center text-2xl font-bold text-white drop-shadow">
          {en ? item.tEn : item.tJa}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + COVERS.length) % COVERS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % COVERS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
