import { useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "シャドウデプス・スライドデッキ",
  category: "3Dカルーセル",
  description: "影の濃さで奥行きを表現しながら横へスライドするカードデッキ型3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Deck = { title: string; sub: string; from: string; to: string };

const DECK: Deck[] = [
  { title: "Platinum", sub: "•••• 4821", from: "#475569", to: "#94a3b8" },
  { title: "Gold", sub: "•••• 7710", from: "#b45309", to: "#fbbf24" },
  { title: "Emerald", sub: "•••• 0093", from: "#047857", to: "#34d399" },
  { title: "Sapphire", sub: "•••• 5564", from: "#1d4ed8", to: "#60a5fa" },
];

export default function SlidingDeckShadow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12 overflow-x-hidden">
      <div
        className="relative mx-auto flex h-60 max-w-2xl items-center justify-center"
        style={{ perspective: "1300px" }}
      >
        <div className="relative h-44 w-72" style={{ transformStyle: "preserve-3d" }}>
          {DECK.map((d, i) => {
            const offset = (i - active + DECK.length) % DECK.length;
            return (
              <button
                key={d.title}
                onClick={() => setActive(i)}
                aria-label={d.title}
                className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 text-left text-white transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${d.from}, ${d.to})`,
                  transform: `translateX(${offset * 26}px) translateZ(${-offset * 80}px)`,
                  boxShadow: `0 ${10 + offset * 8}px ${20 + offset * 14}px rgba(0,0,0,${0.4 - offset * 0.07})`,
                  zIndex: DECK.length - offset,
                  opacity: offset > 3 ? 0 : 1,
                }}
              >
                <CreditCard className="h-7 w-7 opacity-90" />
                <div>
                  <p className="text-lg font-bold">{d.title}</p>
                  <p className="text-xs opacity-80">{d.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + DECK.length) % DECK.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className={cn("text-sm font-medium text-foreground")}>{DECK[active].title}</span>
        <button
          onClick={() => setActive((a) => (a + 1) % DECK.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
