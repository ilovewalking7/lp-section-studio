import { useCallback, useEffect, useRef, useState } from "react";
import { Move } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドラッグできるカード",
  category: "ドラッグ操作",
  description: "ポインターで自由に移動できるカード。掴んだ位置を基準に追従します。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function DraggableCard() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPos({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) });
  }, []);

  const onUp = useCallback(() => {
    drag.current = null;
    setActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  function onDown(e: React.PointerEvent) {
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    setActive(true);
  }

  return (
    <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-muted/40">
      <div
        onPointerDown={onDown}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className={
          "flex w-48 cursor-grab select-none flex-col gap-2 rounded-xl border bg-card p-4 shadow-lg active:cursor-grabbing " +
          (active ? "ring-2 ring-primary" : "")
        }
      >
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Move className="h-4 w-4" /> {en ? "Drag to move" : "ドラッグして移動"}
        </div>
        <p className="text-xs text-muted-foreground">
          {en
            ? "Grab this card and move it anywhere you like."
            : "このカードを掴んで好きな位置へ動かせます。"}
        </p>
      </div>
    </div>
  );
}
