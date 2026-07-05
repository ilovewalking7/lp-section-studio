import { useState, useRef, useCallback } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";
import { Heart, X } from "lucide-react";

export const meta: DemoMeta = {
  name: "スワイプカード",
  category: "ドラッグ操作",
  description: "Tinder風に左右へスワイプして判定するカードスタック。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

type CardData = { id: number; emoji: string; label: string; labelEn: string; color: string };

const INITIAL: CardData[] = [
  { id: 1, emoji: "🍕", label: "ピザ", labelEn: "Pizza", color: "from-orange-400 to-red-400" },
  { id: 2, emoji: "🍜", label: "ラーメン", labelEn: "Ramen", color: "from-amber-400 to-yellow-400" },
  { id: 3, emoji: "🍣", label: "寿司", labelEn: "Sushi", color: "from-cyan-400 to-sky-400" },
  { id: 4, emoji: "🍰", label: "ケーキ", labelEn: "Cake", color: "from-pink-400 to-rose-400" },
];

export default function SwipeCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [cards, setCards] = useState<CardData[]>(INITIAL);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);

  const top = cards[cards.length - 1];

  const finish = useCallback((dir: number) => {
    setCards((c) => c.slice(0, -1));
    setDrag({ x: 0, y: 0 });
    void dir;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!top) return;
    activeRef.current = true;
    setDragging(true);
    startRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: e.clientY - startRef.current.y,
    });
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    if (Math.abs(drag.x) > 110) {
      finish(drag.x > 0 ? 1 : -1);
    } else {
      setDrag({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    setCards(INITIAL);
    setDrag({ x: 0, y: 0 });
  };

  const rot = drag.x / 18;
  const likeOpacity = Math.max(0, Math.min(1, drag.x / 110));
  const nopeOpacity = Math.max(0, Math.min(1, -drag.x / 110));

  return (
    <div className="flex w-full flex-col items-center gap-5 py-6">
      <div className="relative h-72 w-56">
        {cards.length === 0 ? (
          <button
            onClick={reset}
            className="flex h-full w-full items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/30 text-sm text-muted-foreground"
          >
            {en ? "Again" : "もう一度"}
          </button>
        ) : (
          cards.map((card, i) => {
            const isTop = i === cards.length - 1;
            const depth = cards.length - 1 - i;
            return (
              <div
                key={card.id}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                className={cn(
                  "absolute inset-0 flex select-none flex-col items-center justify-center rounded-3xl bg-gradient-to-br text-white shadow-xl",
                  card.color,
                  isTop ? "cursor-grab active:cursor-grabbing" : "",
                  dragging && isTop ? "" : "transition-transform duration-300"
                )}
                style={{
                  transform: isTop
                    ? `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)`
                    : `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                  zIndex: i,
                }}
              >
                <span className="text-7xl drop-shadow">{card.emoji}</span>
                <span className="mt-3 text-lg font-bold">
                  {en ? card.labelEn : card.label}
                </span>
                {isTop && (
                  <>
                    <span
                      className="absolute left-4 top-4 rounded-lg border-4 border-green-300 px-2 py-0.5 text-sm font-black text-green-100"
                      style={{ opacity: likeOpacity }}
                    >
                      LIKE
                    </span>
                    <span
                      className="absolute right-4 top-4 rounded-lg border-4 border-rose-300 px-2 py-0.5 text-sm font-black text-rose-100"
                      style={{ opacity: nopeOpacity }}
                    >
                      NOPE
                    </span>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <X className="h-5 w-5" />
        <span className="text-xs">{en ? "Swipe left or right" : "左右にドラッグ"}</span>
        <Heart className="h-5 w-5" />
      </div>
    </div>
  );
}
