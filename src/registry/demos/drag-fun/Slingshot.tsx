import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パチンコ発射",
  category: "ドラッグ操作",
  description: "引っ張って離すと弾が飛び出すスリングショット。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const ANCHOR = { x: 70, y: 150 };
const SIZE = 36;

export default function Slingshot() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pull, setPull] = useState({ x: ANCHOR.x, y: ANCHOR.y });
  const [flying, setFlying] = useState(false);
  const [proj, setProj] = useState({ x: ANCHOR.x, y: ANCHOR.y });
  const fieldRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const launch = (vx: number, vy: number) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    setFlying(true);
    if (reduce) {
      setProj({ x: ANCHOR.x, y: ANCHOR.y });
      setPull({ x: ANCHOR.x, y: ANCHOR.y });
      setFlying(false);
      return;
    }
    const rect = fieldRef.current?.getBoundingClientRect();
    const maxX = (rect?.width ?? 300) - SIZE;
    const maxY = (rect?.height ?? 200) - SIZE;
    let x = ANCHOR.x;
    let y = ANCHOR.y;
    let v = { x: vx, y: vy };
    const step = () => {
      v.y += 0.5;
      x += v.x;
      y += v.y;
      if (x < 0 || x > maxX || y > maxY) {
        setPull({ x: ANCHOR.x, y: ANCHOR.y });
        setProj({ x: ANCHOR.x, y: ANCHOR.y });
        setFlying(false);
        rafRef.current = null;
        return;
      }
      setProj({ x, y });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (flying) return;
    activeRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(10, Math.min(rect.width - SIZE, e.clientX - rect.left - SIZE / 2));
    const y = Math.max(10, Math.min(rect.height - SIZE, e.clientY - rect.top - SIZE / 2));
    setPull({ x, y });
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    const vx = (ANCHOR.x - pull.x) * 0.22;
    const vy = (ANCHOR.y - pull.y) * 0.22;
    launch(vx, vy);
  };

  const ball = flying ? proj : pull;

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative h-52 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-amber-100/20 to-amber-300/20 ring-1 ring-amber-500/20"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <line x1={20} y1={ANCHOR.y + 30} x2={ball.x + SIZE / 2} y2={ball.y + SIZE / 2} stroke="#a16207" strokeWidth="3" />
          <line x1={120} y1={ANCHOR.y + 30} x2={ball.x + SIZE / 2} y2={ball.y + SIZE / 2} stroke="#a16207" strokeWidth="3" />
        </svg>
        <div className="absolute bottom-2 left-3 h-12 w-2 rounded bg-amber-800" />
        <div className="absolute bottom-2 left-[118px] h-12 w-2 rounded bg-amber-800" />
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute flex cursor-grab touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 text-lg shadow-lg active:cursor-grabbing"
          style={{ width: SIZE, height: SIZE, transform: `translate(${ball.x}px, ${ball.y}px)` }}
        >
          🪨
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Pull back and release to launch" : "引っ張って離して発射"}</p>
    </div>
  );
}
