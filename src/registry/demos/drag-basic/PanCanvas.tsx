import { useCallback, useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パンできるキャンバス",
  category: "ドラッグ操作",
  description: "ドラッグで格子の背景をスクロール(パン)できるビューポート。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function PanCanvas() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );
  const [grabbing, setGrabbing] = useState(false);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPos({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) });
  }, []);
  const onUp = useCallback(() => {
    drag.current = null;
    setGrabbing(false);
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
    setGrabbing(true);
  }

  return (
    <div
      onPointerDown={onDown}
      className={
        "relative h-64 w-80 select-none overflow-hidden rounded-xl border bg-card " +
        (grabbing ? "cursor-grabbing" : "cursor-grab")
      }
    >
      <div
        className="absolute h-[600px] w-[600px]"
        style={{
          left: "-150px",
          top: "-150px",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="absolute left-44 top-44 h-16 w-16 rounded-lg bg-primary/80" />
        <div className="absolute left-72 top-60 h-12 w-20 rounded-lg bg-amber-400" />
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground">
        <Hand className="h-3 w-3" /> {en ? "Drag to pan" : "ドラッグで移動"}
      </div>
    </div>
  );
}
