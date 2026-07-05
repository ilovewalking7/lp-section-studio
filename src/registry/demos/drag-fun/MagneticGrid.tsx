import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "マグネットグリッド",
  category: "ドラッグ操作",
  description: "離すと最寄りのグリッドにスナップする磁石ドラッグ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const CELL = 64;
const COLS = 4;
const ROWS = 3;

export default function MagneticGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: CELL, y: CELL });
  const [dragging, setDragging] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const grabRef = useRef({ x: 0, y: 0 });

  const snap = (v: number, max: number) =>
    Math.max(0, Math.min(max, Math.round(v / CELL) * CELL));

  const onPointerDown = (e: React.PointerEvent) => {
    activeRef.current = true;
    setDragging(true);
    grabRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    const maxX = (rect?.width ?? COLS * CELL) - CELL;
    const maxY = (rect?.height ?? ROWS * CELL) - CELL;
    const x = Math.max(0, Math.min(maxX, e.clientX - grabRef.current.x));
    const y = Math.max(0, Math.min(maxY, e.clientY - grabRef.current.y));
    setPos({ x, y });
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    setPos((p) => ({ x: snap(p.x, (COLS - 1) * CELL), y: snap(p.y, (ROWS - 1) * CELL) }));
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative rounded-2xl bg-muted/30 p-0"
        style={{ width: COLS * CELL, height: ROWS * CELL }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-lg border border-dashed border-muted-foreground/20"
            style={{
              width: CELL - 8,
              height: CELL - 8,
              left: (i % COLS) * CELL + 4,
              top: Math.floor(i / COLS) * CELL + 4,
            }}
          />
        ))}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "absolute flex cursor-grab touch-none select-none items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl text-white shadow-lg active:cursor-grabbing",
            dragging ? "scale-110" : "transition-all duration-200"
          )}
          style={{ width: CELL - 8, height: CELL - 8, transform: `translate(${pos.x + 4}px, ${pos.y + 4}px)` }}
        >
          🧲
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Release to snap to the grid" : "離すとマスに吸い付く"}</p>
    </div>
  );
}
