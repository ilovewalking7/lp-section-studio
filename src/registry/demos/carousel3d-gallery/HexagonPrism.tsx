import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "六角プリズム",
  category: "3Dカルーセル",
  description: "6面の六角柱を回転させて項目を切り替える。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const SIDES = [
  { label: "01", grad: "from-rose-500 to-pink-600" },
  { label: "02", grad: "from-orange-500 to-amber-600" },
  { label: "03", grad: "from-emerald-500 to-teal-600" },
  { label: "04", grad: "from-cyan-500 to-sky-600" },
  { label: "05", grad: "from-indigo-500 to-violet-600" },
  { label: "06", grad: "from-fuchsia-500 to-purple-600" },
];

export default function HexagonPrism() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const step = 60;
  const radius = 156;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 180, height: 200, perspective: "1000px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-index * step}deg)`,
          }}
        >
          {SIDES.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br text-4xl font-black text-white/90 shadow-2xl",
                s.grad
              )}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((v) => v - 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/70"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((v) => v + 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/70"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
