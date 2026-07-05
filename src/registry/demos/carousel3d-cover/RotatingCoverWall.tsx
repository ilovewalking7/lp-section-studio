import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転カバーウォール",
  category: "3Dカルーセル",
  description: "円柱状に並んだカバーを回転させて選ぶ3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const COVERS = ["⚡", "🌊", "🔥", "🌙", "🌿", "✨", "🪐", "🍂"];
const RADIUS = 280;

export default function RotatingCoverWall() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const step = 360 / COVERS.length;
  const rotation = -index * step;

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-64 max-w-2xl items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div
          className="relative h-40 w-40 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}px) rotateY(${rotation}deg)`,
          }}
        >
          {COVERS.map((emoji, i) => {
            const isActive = i === ((index % COVERS.length) + COVERS.length) % COVERS.length;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="absolute inset-0 flex items-center justify-center rounded-2xl border border-border text-5xl shadow-lg transition-colors"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${RADIUS}px)`,
                  background: isActive
                    ? "hsl(var(--primary) / 0.15)"
                    : "hsl(var(--card))",
                }}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setIndex((i) => i - 1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm tabular-nums text-muted-foreground">
          {(((index % COVERS.length) + COVERS.length) % COVERS.length) + 1} / {COVERS.length}
        </span>
        <button
          onClick={() => setIndex((i) => i + 1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
