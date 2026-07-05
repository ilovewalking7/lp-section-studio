import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ゴムひもドラッグ",
  category: "ドラッグ操作",
  description: "離すとゴムのように原点へ跳ね返る弾性ドラッグ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

export default function ElasticDrag() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const springBack = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      posRef.current = { x: 0, y: 0 };
      setPos({ x: 0, y: 0 });
      return;
    }
    const step = () => {
      const cur = posRef.current;
      const nx = cur.x * 0.78;
      const ny = cur.y * 0.78;
      if (Math.abs(nx) < 0.5 && Math.abs(ny) < 0.5) {
        posRef.current = { x: 0, y: 0 };
        setPos({ x: 0, y: 0 });
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
    startRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    const damp = (v: number) => Math.sign(v) * Math.pow(Math.abs(v), 0.85);
    const next = { x: damp(dx), y: damp(dy) };
    posRef.current = next;
    setPos(next);
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    springBack();
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 py-10">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-muted/40">
        <div className="absolute h-3 w-3 rounded-full bg-muted-foreground/40" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <line
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${pos.x}px)`}
            y2={`calc(50% + ${pos.y}px)`}
            stroke="currentColor"
            strokeWidth="2"
            className="text-violet-400"
          />
        </svg>
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative z-10 flex h-16 w-16 cursor-grab touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl text-white shadow-lg active:cursor-grabbing"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${dragging ? 1.1 : 1})` }}
        >
          🪀
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Pull and release" : "引っ張って離す"}</p>
    </div>
  );
}
