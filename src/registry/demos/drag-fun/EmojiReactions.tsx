import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "絵文字リアクション",
  category: "ドラッグ操作",
  description: "絵文字をメッセージへドラッグして貼り付けるリアクション。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const EMOJIS = ["❤️", "😂", "👍", "🎉", "😮"];

type Placed = { id: number; emoji: string; x: number; y: number };

export default function EmojiReactions() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [drag, setDrag] = useState<{ emoji: string; x: number; y: number } | null>(null);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const idRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent, emoji: string) => {
    activeRef.current = true;
    setDrag({ emoji, x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!activeRef.current || !drag) return;
    activeRef.current = false;
    const r = dropRef.current?.getBoundingClientRect();
    if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      setPlaced((p) => [
        ...p,
        { id: idRef.current++, emoji: drag.emoji, x: e.clientX - r.left, y: e.clientY - r.top },
      ]);
    }
    setDrag(null);
  };

  return (
    <div className="flex w-full flex-col items-center gap-5 py-6">
      <div
        ref={dropRef}
        className="relative h-40 w-full max-w-sm overflow-hidden rounded-2xl bg-card p-4 shadow ring-1 ring-border"
      >
        <p className="text-sm text-muted-foreground">{en ? "Drag an emoji here 👇" : "下の絵文字をここへドラッグ 👇"}</p>
        {placed.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute text-2xl"
            style={{ left: p.x - 12, top: p.y - 12 }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div className="flex gap-2 rounded-full bg-muted/50 p-2">
        {EMOJIS.map((em) => (
          <div
            key={em}
            onPointerDown={(e) => onPointerDown(e, em)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "flex h-10 w-10 cursor-grab touch-none select-none items-center justify-center rounded-full text-xl transition-transform hover:scale-125 active:cursor-grabbing",
              drag?.emoji === em && activeRef.current ? "opacity-30" : ""
            )}
          >
            {em}
          </div>
        ))}
      </div>

      {drag && (
        <span
          className="pointer-events-none fixed z-50 text-3xl"
          style={{ left: drag.x - 16, top: drag.y - 16 }}
        >
          {drag.emoji}
        </span>
      )}
    </div>
  );
}
