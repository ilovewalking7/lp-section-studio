import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "斜めポスターカルーセル",
  category: "3Dカルーセル",
  description: "角度をつけて並ぶ映画ポスター風の3Dカバーカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const POSTERS = [
  { t: "Voyager", genre: "SF", rate: 4.6, c: "from-indigo-600 to-blue-900" },
  { t: "Ember", genre: "Drama", rate: 4.2, c: "from-rose-600 to-red-900" },
  { t: "Hollow", genre: "Horror", rate: 4.8, c: "from-slate-700 to-zinc-900" },
  { t: "Bloom", genre: "Romance", rate: 4.1, c: "from-pink-500 to-fuchsia-800" },
  { t: "Circuit", genre: "Action", rate: 4.5, c: "from-amber-500 to-orange-800" },
];

export default function AngledPosterCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);

  return (
    <div className="w-full overflow-hidden bg-neutral-950 py-12">
      <div
        className="relative mx-auto flex h-80 max-w-3xl items-center justify-center"
        style={{ perspective: "1300px" }}
      >
        <div className="relative h-64 w-44" style={{ transformStyle: "preserve-3d" }}>
          {POSTERS.map((p, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={p.t}
                onClick={() => setActive(i)}
                className={`bg-gradient-to-br ${p.c} absolute inset-0 flex flex-col justify-end rounded-xl p-4 text-left text-white shadow-2xl transition-all duration-500`}
                style={{
                  transform: `translateX(${offset * 140}px) translateZ(${-abs * 140}px) rotateY(${offset < 0 ? 35 : offset > 0 ? -35 : 0}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                }}
              >
                <span className="mb-1 inline-flex w-fit items-center gap-1 rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium">
                  <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                  {p.rate}
                </span>
                <p className="text-xl font-bold leading-tight">{p.t}</p>
                <p className="text-xs opacity-75">{p.genre}</p>
              </button>
            );
          })}
        </div>
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
        <span className="text-sm font-medium text-neutral-200">{POSTERS[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(POSTERS.length - 1, a + 1))}
          disabled={active === POSTERS.length - 1}
          className="rounded-full border border-neutral-700 bg-neutral-900 p-2 text-white transition hover:bg-neutral-800 disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
