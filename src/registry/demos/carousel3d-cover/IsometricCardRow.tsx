import { useState } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アイソメトリック・カード列",
  category: "3Dカルーセル",
  description: "等角投影風に傾いたカードを横送りする3Dカバーカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const CARDS = [
  { t: "Inbox", n: 12, c: "from-blue-500 to-blue-700" },
  { t: "Tasks", n: 5, c: "from-emerald-500 to-emerald-700" },
  { t: "Calendar", n: 3, c: "from-amber-500 to-amber-700" },
  { t: "Notes", n: 24, c: "from-fuchsia-500 to-fuchsia-700" },
  { t: "Files", n: 8, c: "from-cyan-500 to-cyan-700" },
];

export default function IsometricCardRow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full overflow-hidden bg-background py-14">
      <div
        className="mx-auto max-w-3xl"
        style={{ perspective: "1400px" }}
      >
        <div
          className="flex justify-center gap-6"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(50deg) rotateZ(-42deg)",
          }}
        >
          {CARDS.map((card, i) => {
            const isActive = i === active;
            return (
              <button
                key={card.t}
                onClick={() => setActive(i)}
                className={`bg-gradient-to-br ${card.c} flex h-32 w-32 shrink-0 flex-col justify-between rounded-2xl p-4 text-left text-white shadow-2xl transition-all duration-500`}
                style={{
                  transform: isActive ? "translateZ(70px)" : "translateZ(0px)",
                }}
              >
                <Layers className="h-6 w-6 opacity-80" />
                <div>
                  <p className="text-sm font-bold">{card.t}</p>
                  <p className="text-xs opacity-75">
                    {en ? `${card.n} items` : `${card.n} 件`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + CARDS.length) % CARDS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-foreground">{CARDS[active].t}</span>
        <button
          onClick={() => setActive((a) => (a + 1) % CARDS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
