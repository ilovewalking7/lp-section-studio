import { useState } from "react";
import { Sticker, RotateCcw } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "3Dピールカード",
  category: "3Dカルーセル",
  description: "ステッカーをめくるように角が3Dで剥がれて次のカードが現れるピールカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Card = { title: string; from: string; to: string };

const CARDS: Card[] = [
  { title: "Peach", from: "#fb7185", to: "#fbbf24" },
  { title: "Mint", from: "#34d399", to: "#22d3ee" },
  { title: "Grape", from: "#a78bfa", to: "#f472b6" },
  { title: "Sky", from: "#60a5fa", to: "#818cf8" },
];

export default function PeelCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [top, setTop] = useState(0);

  const order = CARDS.map((_, i) => (top + i) % CARDS.length);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-64 max-w-md items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div className="relative h-52 w-72" style={{ transformStyle: "preserve-3d" }}>
          {order.map((cardIdx, pos) => {
            const c = CARDS[cardIdx];
            const isTop = pos === 0;
            return (
              <div
                key={c.title}
                className="absolute inset-0 origin-top-left rounded-2xl text-white shadow-2xl transition-all duration-700 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  transform: isTop
                    ? "rotate(0deg)"
                    : `translate(${pos * 8}px, ${pos * 8}px) scale(${1 - pos * 0.04})`,
                  zIndex: CARDS.length - pos,
                  opacity: pos > 3 ? 0 : 1,
                }}
              >
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <Sticker className="h-7 w-7 opacity-90" />
                  <span className="text-2xl font-bold">{c.title}</span>
                </div>
                {isTop && (
                  <div
                    className="absolute right-0 top-0 h-16 w-16 origin-top-right rounded-bl-3xl bg-white/30 shadow-lg"
                    style={{ transform: "rotateX(40deg) rotateY(-40deg)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setTop((t) => (t + 1) % CARDS.length)}
          className={cn(
            "flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          )}
        >
          <RotateCcw className="h-4 w-4" /> {en ? "Peel" : "めくる"}
        </button>
      </div>
    </div>
  );
}
