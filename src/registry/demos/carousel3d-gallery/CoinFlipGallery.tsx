import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コインフリップギャラリー",
  category: "3Dカルーセル",
  description: "コインのように裏表が反転して進むフリップカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const CARDS = [
  { front: "¥", back: "100", grad: "from-amber-400 to-yellow-600" },
  { front: "$", back: "USD", grad: "from-emerald-400 to-green-600" },
  { front: "€", back: "EUR", grad: "from-sky-400 to-blue-600" },
  { front: "£", back: "GBP", grad: "from-violet-400 to-purple-600" },
];

export default function CoinFlipGallery() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const angle = index * 180;
  const current = CARDS[((index % CARDS.length) + CARDS.length) % CARDS.length];
  const showingBack = index % 2 !== 0;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 160, height: 160, perspective: "800px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
          }}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br text-5xl font-black text-white shadow-2xl",
              current.grad
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            {showingBack ? "" : current.front}
          </div>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-white shadow-2xl",
              current.grad
            )}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {current.back}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIndex((v) => v + 1)}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {en ? "Flip" : "フリップ"} <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
