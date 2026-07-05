import { useState, useRef, useEffect } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回して回すホイール",
  category: "ドラッグ操作",
  description: "ドラッグで弾みをつけて回し、慣性で止まるルーレット。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

const SEGMENTS = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];

export default function SpinWheel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [angle, setAngle] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });
  const lastAngleRef = useRef(0);
  const velRef = useRef(0);
  const angleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pointerAngle = (e: React.PointerEvent) =>
    (Math.atan2(e.clientY - centerRef.current.y, e.clientX - centerRef.current.x) * 180) / Math.PI;

  const coast = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const step = () => {
      velRef.current *= 0.97;
      angleRef.current += velRef.current;
      setAngle(angleRef.current);
      if (Math.abs(velRef.current) < 0.15) {
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
    velRef.current = 0;
    const r = wheelRef.current?.getBoundingClientRect();
    if (r) centerRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    lastAngleRef.current = pointerAngle(e);
    lastTimeRef.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const a = pointerAngle(e);
    let delta = a - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    angleRef.current += delta;
    setAngle(angleRef.current);
    const now = performance.now();
    const dt = now - lastTimeRef.current || 16;
    velRef.current = (delta / dt) * 16;
    lastAngleRef.current = a;
    lastTimeRef.current = now;
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    coast();
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div className="relative">
        <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 text-xl">🔻</div>
        <div
          ref={wheelRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-44 w-44 cursor-grab touch-none select-none rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl ring-4 ring-white/50 active:cursor-grabbing"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {SEGMENTS.map((s, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex h-20 origin-left items-center text-2xl"
              style={{ transform: `rotate(${(360 / SEGMENTS.length) * i}deg)` }}
            >
              <span className="ml-8">{s}</span>
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Flick to spin" : "勢いをつけて回す"}</p>
    </div>
  );
}
