import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dキューブ回転",
  category: "3Dカルーセル",
  description: "4面のキューブをY軸回転で切り替えるカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const FACES = [
  { labelJa: "デザイン", labelEn: "Design", grad: "from-rose-500 to-orange-500" },
  { labelJa: "開発", labelEn: "Develop", grad: "from-violet-500 to-indigo-500" },
  { labelJa: "運用", labelEn: "Operate", grad: "from-emerald-500 to-teal-500" },
  { labelJa: "分析", labelEn: "Analyze", grad: "from-sky-500 to-blue-500" },
];

export default function CubeRotator() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const angle = -index * 90;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <div
        className="relative"
        style={{ width: 240, height: 240, perspective: "900px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-120px) rotateY(${angle}deg)`,
          }}
        >
          {FACES.map((face, i) => (
            <div
              key={face.labelEn}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-white shadow-xl",
                face.grad
              )}
              style={{
                transform: `rotateY(${i * 90}deg) translateZ(120px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {en ? face.labelEn : face.labelJa}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((v) => v - 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/70"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="w-20 text-center text-sm font-medium text-muted-foreground">
          {en
            ? FACES[((index % 4) + 4) % 4].labelEn
            : FACES[((index % 4) + 4) % 4].labelJa}
        </span>
        <button
          type="button"
          onClick={() => setIndex((v) => v + 1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/70"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
