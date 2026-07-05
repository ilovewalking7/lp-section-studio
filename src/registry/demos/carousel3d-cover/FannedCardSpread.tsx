import { useState } from "react";
import { Heart } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "扇形カードスプレッド",
  category: "3Dカルーセル",
  description: "トランプのように扇状に開いたカードを選ぶ3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const CARDS = [
  { t: "A", hue: 0 },
  { t: "K", hue: 45 },
  { t: "Q", hue: 95 },
  { t: "J", hue: 160 },
  { t: "10", hue: 210 },
  { t: "9", hue: 270 },
  { t: "8", hue: 320 },
];

export default function FannedCardSpread() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(3);
  const mid = (CARDS.length - 1) / 2;

  return (
    <div className="w-full bg-background py-16">
      <div
        className="relative mx-auto flex h-64 max-w-2xl items-end justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative h-48 w-32"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CARDS.map((c, i) => {
            const rel = i - mid;
            const isActive = i === active;
            return (
              <button
                key={c.t}
                onClick={() => setActive(i)}
                className="absolute bottom-0 left-0 flex h-48 w-32 flex-col items-center justify-between rounded-xl border border-white/20 p-3 text-white shadow-xl transition-all duration-300"
                style={{
                  transformOrigin: "bottom center",
                  transform: `rotate(${rel * 12}deg) translateY(${isActive ? -28 : 0}px) translateZ(${isActive ? 40 : 0}px)`,
                  zIndex: isActive ? 50 : 10 + i,
                  background: `linear-gradient(160deg, hsl(${c.hue} 70% 55%), hsl(${c.hue} 70% 38%))`,
                }}
              >
                <span className="self-start text-lg font-bold">{c.t}</span>
                <Heart className="h-7 w-7 fill-white/80" />
                <span className="self-end rotate-180 text-lg font-bold">{c.t}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {en ? "Selected: " : "選択中: "}<span className="font-bold text-foreground">{CARDS[active].t}</span>
      </p>
    </div>
  );
}
