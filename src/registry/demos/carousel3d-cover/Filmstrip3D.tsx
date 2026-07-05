import { useState } from "react";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dフィルムストリップ",
  category: "3Dカルーセル",
  description: "曲面状に並ぶフィルムコマを送って観る3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const FRAMES = [
  { t: "OPENING", h: 10 },
  { t: "RISING", h: 45 },
  { t: "TWIST", h: 90 },
  { t: "CLIMAX", h: 200 },
  { t: "FALL", h: 280 },
  { t: "ENDING", h: 330 },
];

export default function Filmstrip3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);

  return (
    <div className="w-full overflow-hidden bg-neutral-950 py-12">
      <div
        className="relative mx-auto flex h-56 max-w-3xl items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative h-40 w-40" style={{ transformStyle: "preserve-3d" }}>
          {FRAMES.map((f, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={f.t}
                onClick={() => setActive(i)}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border-2 border-neutral-700 text-white shadow-xl transition-all duration-500"
                style={{
                  transform: `translateX(${offset * 110}px) translateZ(${-abs * 90}px) rotateY(${-offset * 32}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  background: `linear-gradient(160deg, hsl(${f.h} 65% 45%), hsl(${f.h} 65% 25%))`,
                }}
              >
                <Film className="mb-1 h-5 w-5 opacity-80" />
                <span className="text-xs font-bold tracking-widest">{f.t}</span>
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111_8px,#111_16px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111_8px,#111_16px)]" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-neutral-700 bg-neutral-900 p-2 text-white transition hover:bg-neutral-800 disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-neutral-300">{FRAMES[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(FRAMES.length - 1, a + 1))}
          disabled={active === FRAMES.length - 1}
          className="rounded-full border border-neutral-700 bg-neutral-900 p-2 text-white transition hover:bg-neutral-800 disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
