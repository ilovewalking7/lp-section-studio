import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dポートフォリオ棚",
  category: "3Dカルーセル",
  description: "棚に背表紙のように並ぶ作品を引き出して見せる3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const WORKS = [
  { t: "Brand Site", year: "2024", c: "from-violet-500 to-violet-800" },
  { t: "Mobile App", year: "2023", c: "from-sky-500 to-sky-800" },
  { t: "Dashboard", year: "2023", c: "from-emerald-500 to-emerald-800" },
  { t: "Campaign", year: "2022", c: "from-rose-500 to-rose-800" },
  { t: "E-Commerce", year: "2022", c: "from-amber-500 to-amber-800" },
  { t: "Design Sys", year: "2021", c: "from-cyan-500 to-cyan-800" },
];

export default function PortfolioShelf3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-60 max-w-3xl items-end justify-center"
        style={{ perspective: "1100px" }}
      >
        <div
          className="flex items-end gap-2"
          style={{ transformStyle: "preserve-3d", transform: "rotateY(-14deg)" }}
        >
          {WORKS.map((w, i) => {
            const isActive = i === active;
            return (
              <button
                key={w.t}
                onClick={() => setActive(i)}
                className={`bg-gradient-to-b ${w.c} flex flex-col justify-between rounded-md p-3 text-left text-white shadow-xl transition-all duration-500`}
                style={{
                  height: isActive ? "13rem" : "11rem",
                  width: isActive ? "9rem" : "2.75rem",
                  transform: isActive ? "translateZ(60px)" : "translateZ(0px)",
                }}
              >
                {isActive ? (
                  <>
                    <ExternalLink className="h-5 w-5 opacity-80" />
                    <div>
                      <p className="text-lg font-bold leading-tight">{w.t}</p>
                      <p className="text-xs opacity-75">{w.year}</p>
                    </div>
                  </>
                ) : (
                  <span
                    className="mx-auto whitespace-nowrap text-xs font-bold tracking-wider"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {w.t}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-foreground">{WORKS[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(WORKS.length - 1, a + 1))}
          disabled={active === WORKS.length - 1}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
