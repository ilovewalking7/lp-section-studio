import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const meta: DemoMeta = {
  name: "パズルスナップ",
  category: "ドラッグ操作",
  description: "ピースをドラッグして近づくと正位置に吸い付くパズル。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

type Piece = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  done: boolean;
};

const INITIAL: Piece[] = [
  { id: 0, emoji: "🌅", x: 20, y: 150, tx: 24, ty: 24, done: false },
  { id: 1, emoji: "🏔️", x: 120, y: 150, tx: 96, ty: 24, done: false },
  { id: 2, emoji: "🌊", x: 220, y: 150, tx: 24, ty: 96, done: false },
  { id: 3, emoji: "🌴", x: 60, y: 200, tx: 96, ty: 96, done: false },
];

export default function PuzzleSnap() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pieces, setPieces] = useState<Piece[]>(INITIAL);
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; offX: number; offY: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent, p: Piece) => {
    if (p.done) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { id: p.id, offX: e.clientX - rect.left - p.x, offY: e.clientY - rect.top - p.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(rect.width - 56, e.clientX - rect.left - d.offX));
    const y = Math.max(0, Math.min(rect.height - 56, e.clientY - rect.top - d.offY));
    setPieces((arr) => arr.map((p) => (p.id === d.id ? { ...p, x, y } : p)));
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    setPieces((arr) =>
      arr.map((p) => {
        if (p.id !== d.id) return p;
        const dist = Math.hypot(p.x - p.tx, p.y - p.ty);
        if (dist < 30) return { ...p, x: p.tx, y: p.ty, done: true };
        return p;
      })
    );
  };

  const solved = pieces.every((p) => p.done);

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border"
      >
        <div className="absolute left-6 top-6 grid grid-cols-2 gap-0">
          {INITIAL.map((p) => (
            <div
              key={p.id}
              className="h-14 w-14 rounded-lg border-2 border-dashed border-muted-foreground/25"
            />
          ))}
        </div>
        {pieces.map((p) => (
          <div
            key={p.id}
            onPointerDown={(e) => onPointerDown(e, p)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "absolute flex h-14 w-14 items-center justify-center rounded-lg bg-card text-2xl shadow-md ring-1 ring-border",
              p.done ? "cursor-default ring-2 ring-emerald-400" : "cursor-grab touch-none active:cursor-grabbing"
            )}
            style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
              transition: dragRef.current?.id === p.id ? "none" : "transform 0.2s",
            }}
          >
            {p.emoji}
          </div>
        ))}
        {solved && (
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 text-sm font-bold text-emerald-500">
            <Check className="h-4 w-4" /> {en ? "Done!" : "完成!"}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Snaps in near the slot" : "枠に近づけると吸い付く"}</p>
    </div>
  );
}
