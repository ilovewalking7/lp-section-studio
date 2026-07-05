import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドラッグ範囲選択",
  category: "ドラッグ操作",
  description: "ドラッグした矩形に重なるセルをまとめて選択する。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

const CELLS = Array.from({ length: 24 }, (_, i) => `s${i}`);

export default function DragSelectGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [rect, setRect] = useState<null | {
    x: number;
    y: number;
    w: number;
    h: number;
  }>(null);

  function onDown(e: React.PointerEvent) {
    const grid = gridRef.current;
    if (!grid) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const g = grid.getBoundingClientRect();
    start.current = { x: e.clientX - g.left, y: e.clientY - g.top };
    setSelected(new Set());
    setRect({ x: start.current.x, y: start.current.y, w: 0, h: 0 });
  }
  function onMove(e: React.PointerEvent) {
    const grid = gridRef.current;
    if (!grid || !start.current) return;
    const g = grid.getBoundingClientRect();
    const cx = e.clientX - g.left;
    const cy = e.clientY - g.top;
    const x = Math.min(cx, start.current.x);
    const y = Math.min(cy, start.current.y);
    const w = Math.abs(cx - start.current.x);
    const h = Math.abs(cy - start.current.y);
    setRect({ x, y, w, h });
    const next = new Set<string>();
    grid.querySelectorAll<HTMLElement>("[data-cell]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const ex = r.left - g.left;
      const ey = r.top - g.top;
      if (ex < x + w && ex + r.width > x && ey < y + h && ey + r.height > y) {
        const id = el.dataset.cell;
        if (id) next.add(id);
      }
    });
    setSelected(next);
  }
  function onUp() {
    start.current = null;
    setRect(null);
  }

  return (
    <div className="w-full max-w-sm">
      <div
        ref={gridRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className="relative grid touch-none grid-cols-6 gap-1.5 rounded-xl border bg-card p-3 select-none"
      >
        {CELLS.map((id) => (
          <div
            key={id}
            data-cell={id}
            className={cn(
              "aspect-square rounded-md border transition-colors",
              selected.has(id)
                ? "border-primary bg-primary/30"
                : "border-border bg-background"
            )}
          />
        ))}
        {rect && (
          <div
            style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
            className="pointer-events-none absolute rounded border-2 border-primary bg-primary/10"
          />
        )}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {en ? `Selected: ${selected.size}` : `選択中: ${selected.size} 個`}
      </p>
    </div>
  );
}
