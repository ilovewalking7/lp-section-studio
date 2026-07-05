import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "傾斜ギャラリースライダー",
  category: "3Dカルーセル",
  description: "全体を傾けた板面に並ぶサムネを横スクロールする3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const SHOTS = [
  { t: "Sunrise", c: "from-amber-400 to-rose-500" },
  { t: "Forest", c: "from-emerald-400 to-teal-600" },
  { t: "Ocean", c: "from-sky-400 to-indigo-600" },
  { t: "Desert", c: "from-orange-400 to-yellow-600" },
  { t: "Aurora", c: "from-fuchsia-400 to-purple-600" },
  { t: "Frost", c: "from-cyan-300 to-blue-500" },
];

export default function TiltedGallerySlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full overflow-hidden bg-background py-14">
      <div
        className="mx-auto max-w-3xl"
        style={{ perspective: "1200px" }}
      >
        <div
          className="flex justify-center gap-4 transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(18deg) rotateZ(-4deg)",
          }}
        >
          {SHOTS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.t}
                onClick={() => setActive(i)}
                className={`bg-gradient-to-br ${s.c} flex h-40 w-28 shrink-0 items-end justify-center rounded-xl p-2 text-xs font-bold text-white shadow-xl transition-all duration-500`}
                style={{
                  transform: isActive
                    ? "translateZ(60px) translateY(-10px)"
                    : "translateZ(0px)",
                  outline: isActive ? "2px solid white" : "none",
                  outlineOffset: "2px",
                }}
              >
                {s.t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-foreground">{SHOTS[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(SHOTS.length - 1, a + 1))}
          disabled={active === SHOTS.length - 1}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
