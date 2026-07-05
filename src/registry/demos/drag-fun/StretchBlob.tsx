import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ぷよぷよブロブ",
  category: "ドラッグ操作",
  description: "ドラッグで引き伸ばし、離すとプルンと戻るブロブ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

export default function StretchBlob() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [stretch, setStretch] = useState({ x: 0, y: 0 });
  const [wobbling, setWobbling] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const wobble = (sx: number, sy: number) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStretch({ x: 0, y: 0 });
      return;
    }
    setWobbling(true);
    let t = 0;
    const ampX = sx;
    const ampY = sy;
    const step = () => {
      t += 0.18;
      const decay = Math.exp(-t * 1.6);
      const x = ampX * Math.cos(t * 6) * decay;
      const y = ampY * Math.cos(t * 6) * decay;
      setStretch({ x, y });
      if (decay < 0.02) {
        setStretch({ x: 0, y: 0 });
        setWobbling(false);
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setWobbling(false);
    activeRef.current = true;
    const r = blobRef.current?.getBoundingClientRect();
    if (r) centerRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const dx = (e.clientX - centerRef.current.x) / 200;
    const dy = (e.clientY - centerRef.current.y) / 200;
    const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
    setStretch({ x: clamp(dx), y: clamp(dy) });
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    wobble(stretch.x, stretch.y);
  };

  const sx = 1 + stretch.x;
  const sy = 1 + stretch.y - stretch.x * 0.5;

  return (
    <div className="flex w-full flex-col items-center gap-4 py-10">
      <div
        ref={blobRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex h-32 w-32 cursor-grab touch-none select-none items-center justify-center bg-gradient-to-br from-lime-400 to-emerald-500 text-4xl shadow-lg active:cursor-grabbing"
        style={{
          borderRadius: "46% 54% 50% 50% / 55% 50% 50% 45%",
          transform: `scale(${sx}, ${sy})`,
          transition: activeRef.current || wobbling ? "none" : "transform 0.2s",
        }}
      >
        😆
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Pull and release to wobble" : "引っ張って離すとプルプル"}</p>
    </div>
  );
}
