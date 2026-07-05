import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クラッカードラッグ",
  category: "ドラッグ操作",
  description: "つまみをドラッグして引くと紙吹雪が弾けるクラッカー。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

type Bit = { id: number; x: number; y: number; vx: number; vy: number; color: string };

const COLORS = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"];

export default function ConfettiPopper() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pull, setPull] = useState(0);
  const [bits, setBits] = useState<Bit[]>([]);
  const activeRef = useRef(false);
  const startRef = useRef(0);
  const idRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pop = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const fresh: Bit[] = Array.from({ length: 24 }).map(() => ({
      id: idRef.current++,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 9 - 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setBits(fresh);
    if (reduce) return;
    const step = () => {
      setBits((arr) => {
        const next = arr
          .map((b) => ({ ...b, x: b.x + b.vx, y: b.y + b.vy, vy: b.vy + 0.4 }))
          .filter((b) => b.y < 200);
        if (next.length === 0) {
          rafRef.current = null;
        } else {
          rafRef.current = requestAnimationFrame(step);
        }
        return next;
      });
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    activeRef.current = true;
    startRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const d = Math.max(0, Math.min(60, startRef.current - e.clientX));
    setPull(d);
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (pull > 40) pop();
    setPull(0);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 py-8">
      <div className="relative flex items-center">
        <div className="relative flex h-16 w-12 items-center justify-center rounded-l-full rounded-r-lg bg-gradient-to-br from-rose-500 to-red-600 text-2xl shadow-lg">
          🎉
          {bits.map((b) => (
            <span
              key={b.id}
              className="pointer-events-none absolute left-2 top-2 h-2 w-2 rounded-sm"
              style={{ backgroundColor: b.color, transform: `translate(${b.x}px, ${b.y}px)` }}
            />
          ))}
        </div>
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex h-8 w-8 cursor-grab touch-none select-none items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-900 shadow active:cursor-grabbing"
          style={{ transform: `translateX(${-pull}px)`, transition: activeRef.current ? "none" : "transform 0.2s" }}
        >
          {en ? "Pull" : "引"}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Pull the knob left to pop" : "つまみを左へ引いて発射"}</p>
    </div>
  );
}
