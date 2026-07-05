import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "風船ドラッグ",
  category: "ドラッグ操作",
  description: "離すとふわりと上に浮き上がる風船のドラッグ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const SIZE = 56;

export default function BalloonDrag() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 130, y: 160 });
  const [dragging, setDragging] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const posRef = useRef({ x: 130, y: 160 });
  const grabRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const floatUp = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let drift = 0;
    const step = () => {
      const cur = posRef.current;
      drift += 0.06;
      const ny = cur.y - 1.4;
      const nx = cur.x + Math.sin(drift) * 0.8;
      if (ny < -SIZE) {
        rafRef.current = null;
        return;
      }
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    activeRef.current = true;
    setDragging(true);
    grabRef.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const next = { x: e.clientX - grabRef.current.x, y: e.clientY - grabRef.current.y };
    posRef.current = next;
    setPos(next);
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    floatUp();
  };

  const reset = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    posRef.current = { x: 130, y: 160 };
    setPos({ x: 130, y: 160 });
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative h-60 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300/30 to-sky-100/10 ring-1 ring-sky-400/20"
        onDoubleClick={reset}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${dragging ? 1.08 : 1})` }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-2xl shadow-lg">
            🎈
          </div>
          <div className="mx-auto h-8 w-px bg-rose-400/60" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Release to float up · double-click to reset" : "離すと浮く・ダブルクリックで戻す"}</p>
    </div>
  );
}
