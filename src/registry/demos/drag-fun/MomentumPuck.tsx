import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "慣性パック",
  category: "ドラッグ操作",
  description: "投げると勢いで滑り、壁で跳ね返る慣性ドラッグ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const SIZE = 56;

export default function MomentumPuck() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const posRef = useRef({ x: 20, y: 20 });
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
    const maxX = (rect?.width ?? 280) - SIZE;
    const maxY = (rect?.height ?? 200) - SIZE;
    const step = () => {
      let { x, y } = posRef.current;
      const v = velRef.current;
      x += v.x;
      y += v.y;
      if (x < 0) {
        x = 0;
        v.x = -v.x * 0.7;
      } else if (x > maxX) {
        x = maxX;
        v.x = -v.x * 0.7;
      }
      if (y < 0) {
        y = 0;
        v.y = -v.y * 0.7;
      } else if (y > maxY) {
        y = maxY;
        v.y = -v.y * 0.7;
      }
      v.x *= 0.97;
      v.y *= 0.97;
      posRef.current = { x, y };
      setPos({ x, y });
      if (Math.abs(v.x) < 0.2 && Math.abs(v.y) < 0.2) {
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
    const maxX = (rect?.width ?? 280) - SIZE;
    const maxY = (rect?.height ?? 200) - SIZE;
    let x = e.clientX - grabRef.current.x;
    let y = e.clientY - grabRef.current.y;
    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));
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
        className="relative h-52 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-500/20"
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute flex cursor-grab touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg active:cursor-grabbing"
          style={{
            width: SIZE,
            height: SIZE,
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${dragging ? 1.1 : 1})`,
          }}
        >
          🏒
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Fling it hard" : "勢いよく投げてみて"}</p>
    </div>
  );
}
