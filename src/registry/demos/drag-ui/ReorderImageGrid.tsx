import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "画像グリッド並べ替え",
  category: "ドラッグ操作",
  description: "サムネイルをドラッグしてギャラリーの順序を入れ替える。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Cell = { id: string; hue: number };

const INITIAL: Cell[] = Array.from({ length: 9 }, (_, i) => ({
  id: `c${i}`,
  hue: (i * 40) % 360,
}));

export default function ReorderImageGrid() {
  const [cells, setCells] = useState<Cell[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const grid = gridRef.current;
    if (!grid) return;
    const tiles = Array.from(
      grid.querySelectorAll<HTMLElement>("[data-tile]")
    );
    let target = -1;
    let best = Infinity;
    for (let i = 0; i < tiles.length; i++) {
      const r = tiles[i].getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = dx * dx + dy * dy;
      if (d < best) {
        best = d;
        target = i;
      }
    }
    const from = cells.findIndex((c) => c.id === id);
    if (target === -1 || target === from) return;
    setCells((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div className="w-full max-w-xs rounded-xl border bg-card p-4">
      <div ref={gridRef} className="grid grid-cols-3 gap-2">
        {cells.map((c, i) => (
          <button
            key={c.id}
            data-tile
            type="button"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragId(c.id);
            }}
            onPointerMove={(e) => onMove(e, c.id)}
            onPointerUp={() => setDragId(null)}
            style={{ backgroundColor: `hsl(${c.hue} 70% 60%)` }}
            className={cn(
              "relative aspect-square cursor-grab touch-none rounded-lg text-xs font-bold text-white/90 transition active:cursor-grabbing",
              dragId === c.id && "scale-110 ring-2 ring-foreground shadow-xl"
            )}
          >
            <span className="absolute left-1.5 top-1 drop-shadow">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
