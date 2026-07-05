import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";
import { Trash2, RotateCcw } from "lucide-react";

export const meta: DemoMeta = {
  name: "ゴミ箱へドラッグ",
  category: "ドラッグ操作",
  description: "アイテムをゴミ箱までドラッグして削除するインタラクション。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

type Item = { id: number; emoji: string };

const INITIAL: Item[] = [
  { id: 1, emoji: "📄" },
  { id: 2, emoji: "📦" },
  { id: 3, emoji: "🗒️" },
  { id: 4, emoji: "📁" },
];

export default function DragToTrash() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [dragId, setDragId] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [overTrash, setOverTrash] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });
  const trashRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent, id: number) => {
    setDragId(id);
    startRef.current = { x: e.clientX, y: e.clientY };
    setPos({ x: 0, y: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragId === null) return;
    setPos({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y });
    const t = trashRef.current?.getBoundingClientRect();
    if (t) {
      setOverTrash(
        e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom
      );
    }
  };

  const onPointerUp = () => {
    if (dragId === null) return;
    if (overTrash) setItems((arr) => arr.filter((it) => it.id !== dragId));
    setDragId(null);
    setOverTrash(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {items.map((it) => {
          const active = it.id === dragId;
          return (
            <div
              key={it.id}
              onPointerDown={(e) => onPointerDown(e, it.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={cn(
                "flex h-16 w-16 cursor-grab touch-none select-none items-center justify-center rounded-2xl bg-card text-3xl shadow-md ring-1 ring-border active:cursor-grabbing",
                active ? "z-20 scale-110" : "transition-transform"
              )}
              style={active ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
            >
              {it.emoji}
            </div>
          );
        })}
        {items.length === 0 && (
          <button
            onClick={() => setItems(INITIAL)}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" /> {en ? "Undo" : "元に戻す"}
          </button>
        )}
      </div>

      <div
        ref={trashRef}
        className={cn(
          "flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
          overTrash
            ? "scale-110 border-rose-500 bg-rose-500/10 text-rose-500"
            : "border-muted-foreground/40 text-muted-foreground"
        )}
      >
        <Trash2 className={cn("h-8 w-8", overTrash && "animate-bounce")} />
        <span className="mt-1 text-[10px]">{en ? "Drop here" : "ここへ"}</span>
      </div>
    </div>
  );
}
