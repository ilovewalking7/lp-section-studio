import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スイベル・カバーピッカー",
  category: "3Dカルーセル",
  description: "中央のカバーが正面を向くよう旋回するカバーフロー3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const ITEMS = [
  { t: "Lo-Fi", emoji: "🎧", hue: 265 },
  { t: "Focus", emoji: "🧠", hue: 200 },
  { t: "Sleep", emoji: "🌙", hue: 230 },
  { t: "Energy", emoji: "⚡", hue: 40 },
  { t: "Nature", emoji: "🌿", hue: 140 },
  { t: "Rain", emoji: "🌧️", hue: 210 },
];

export default function SwivelCoverPicker() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-60 max-w-3xl items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative h-44 w-44" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((item, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={item.t}
                onClick={() => setActive(i)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl text-white shadow-xl transition-all duration-500"
                style={{
                  transformOrigin: offset < 0 ? "right center" : offset > 0 ? "left center" : "center",
                  transform: `translateX(${offset * 100}px) translateZ(${-abs * 70}px) rotateY(${offset < 0 ? 55 : offset > 0 ? -55 : 0}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  background: `linear-gradient(150deg, hsl(${item.hue} 70% 55%), hsl(${item.hue} 70% 38%))`,
                }}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-sm font-bold">{item.t}</span>
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
        <span className="text-sm font-medium text-foreground">{ITEMS[active].t}</span>
        <button
          onClick={() => setActive((a) => Math.min(ITEMS.length - 1, a + 1))}
          disabled={active === ITEMS.length - 1}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
