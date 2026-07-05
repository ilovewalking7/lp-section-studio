import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パースペクティブ・カードデッキ",
  category: "3Dカルーセル",
  description: "奥行きのあるデッキから一番上のカードを送って入れ替える3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const CARDS = [
  { labelJa: "戦略", labelEn: "Strategy", hue: 220 },
  { labelJa: "発見", labelEn: "Discovery", hue: 280 },
  { labelJa: "設計", labelEn: "Design", hue: 160 },
  { labelJa: "実装", labelEn: "Build", hue: 30 },
  { labelJa: "検証", labelEn: "Validate", hue: 340 },
];

export default function PerspectiveCardDeck() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [order, setOrder] = useState<number[]>(CARDS.map((_, i) => i));

  const sendBack = () =>
    setOrder((o) => [...o.slice(1), o[0]]);
  const reset = () => setOrder(CARDS.map((_, i) => i));

  return (
    <div className="w-full bg-background py-12">
      <div
        className="relative mx-auto flex h-72 max-w-md items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative h-56 w-44" style={{ transformStyle: "preserve-3d" }}>
          {order.map((cardIndex, pos) => {
            const card = CARDS[cardIndex];
            return (
              <div
                key={cardIndex}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/20 text-white shadow-xl transition-all duration-500"
                style={{
                  transform: `translateY(${pos * -14}px) translateZ(${-pos * 60}px) rotateX(${pos * 4}deg)`,
                  zIndex: CARDS.length - pos,
                  opacity: pos > 3 ? 0 : 1,
                  background: `linear-gradient(160deg, hsl(${card.hue} 70% 55%), hsl(${card.hue + 40} 70% 40%))`,
                }}
              >
                <Sparkles className="mb-2 h-7 w-7 opacity-80" />
                <span className="text-xl font-bold">{en ? card.labelEn : card.labelJa}</span>
                <span className="mt-1 text-xs opacity-70">STEP {cardIndex + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={sendBack}
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {en ? "Next card" : "次のカードへ"}
        </button>
        <button
          onClick={reset}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Reset" : "リセット"}
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
