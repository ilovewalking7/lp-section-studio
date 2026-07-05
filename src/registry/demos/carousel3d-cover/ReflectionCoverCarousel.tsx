import { useState } from "react";
import { ChevronLeft, ChevronRight, Disc3 } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "反射付きカバーカルーセル",
  category: "3Dカルーセル",
  description: "床面に映り込む反射を持つクラシックなカバーフロー3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const COVERS = [
  { t: "Midnight", from: "#312e81", to: "#1e1b4b" },
  { t: "Sunset", from: "#9a3412", to: "#7c2d12" },
  { t: "Mint", from: "#065f46", to: "#064e3b" },
  { t: "Berry", from: "#9d174d", to: "#831843" },
  { t: "Gold", from: "#a16207", to: "#854d0e" },
];

function Face({ from, to, t }: { from: string; to: string; t: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-xl text-white shadow-2xl"
      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
    >
      <div className="flex flex-col items-center gap-2">
        <Disc3 className="h-9 w-9 opacity-80" />
        <span className="text-sm font-bold">{t}</span>
      </div>
    </div>
  );
}

export default function ReflectionCoverCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);
  return (
    <div className="w-full overflow-hidden bg-neutral-900 py-12">
      <div
        className="relative mx-auto flex h-64 max-w-3xl items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative h-40 w-40" style={{ transformStyle: "preserve-3d" }}>
          {COVERS.map((c, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={c.t}
                onClick={() => setActive(i)}
                aria-label={c.t}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  transform: `translateX(${offset * 120}px) translateZ(${-abs * 110}px) rotateY(${offset < 0 ? 42 : offset > 0 ? -42 : 0}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                }}
              >
                <Face from={c.from} to={c.to} t={c.t} />
                <div
                  className="mt-1 h-full w-full origin-top"
                  style={{
                    transform: "scaleY(-1)",
                    opacity: 0.25,
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)",
                  }}
                >
                  <Face from={c.from} to={c.to} t={c.t} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-neutral-700 bg-neutral-800 p-2 text-white transition hover:bg-neutral-700 disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-neutral-200">{COVERS[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(COVERS.length - 1, a + 1))}
          disabled={active === COVERS.length - 1}
          className="rounded-full border border-neutral-700 bg-neutral-800 p-2 text-white transition hover:bg-neutral-700 disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
