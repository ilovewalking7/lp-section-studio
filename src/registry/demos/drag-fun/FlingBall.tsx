import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボール投げ",
  category: "ドラッグ操作",
  description: "ドラッグで掴んで放ると重力で落ちて床で弾むボール。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const SIZE = 48;
const GRAVITY = 0.6;

export default function FlingBall() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 30, y: 20 });
  const [dragging, setDragging] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const posRef = useRef({ x: 30, y: 20 });
  const velRef = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const grabRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const animate = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      rafRef.current = null;
      return;
    }
    const rect = fieldRef.current?.getBoundingClientRect();
    const maxX = (rect?.width ?? 320) - SIZE;
    const maxY = (rect?.height ?? 220) - SIZE;
    const step = () => {
      const v = velRef.current;
      let { x, y } = posRef.current;
      v.y += GRAVITY;
      x += v.x;
      y += v.y;
      if (x < 0) {
        x = 0;
        v.x = -v.x * 0.7;
      } else if (x > maxX) {
        x = maxX;
        v.x = -v.x * 0.7;
      }
      if (y > maxY) {
        y = maxY;
        v.y = -v.y * 0.65;
        v.x *= 0.9;
      } else if (y < 0) {
        y = 0;
        v.y = -v.y * 0.5;
      }
      posRef.current = { x, y };
      setPos({ x, y });
      const atRest = y >= maxY - 1 && Math.abs(v.y) < 1.2 && Math.abs(v.x) < 0.5;
      if (atRest) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    activeRef.current = true;
    setDragging(true);
    velRef.current = { x: 0, y: 0 };
    grabRef.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    lastRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    const maxX = (rect?.width ?? 320) - SIZE;
    const maxY = (rect?.height ?? 220) - SIZE;
    const x = Math.max(0, Math.min(maxX, e.clientX - grabRef.current.x));
    const y = Math.max(0, Math.min(maxY, e.clientY - grabRef.current.y));
    posRef.current = { x, y };
    setPos({ x, y });
    const now = performance.now();
    const dt = now - lastRef.current.t || 16;
    velRef.current = {
      x: ((e.clientX - lastRef.current.x) / dt) * 16,
      y: ((e.clientY - lastRef.current.y) / dt) * 16,
    };
    lastRef.current = { x: e.clientX, y: e.clientY, t: now };
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    animate();
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative h-56 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-sky-400/20 to-sky-600/20 ring-1 ring-sky-500/20"
      >
        <div className="absolute bottom-0 left-0 h-3 w-full bg-emerald-500/40" />
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute flex cursor-grab touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-xl shadow-lg active:cursor-grabbing"
          style={{
            width: SIZE,
            height: SIZE,
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${dragging ? 1.1 : 1})`,
          }}
        >
          ⚽
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Grab and fling" : "掴んで放り投げる"}</p>
    </div>
  );
}
