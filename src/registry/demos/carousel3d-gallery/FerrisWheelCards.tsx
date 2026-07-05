import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "観覧車カード",
  category: "3Dカルーセル",
  description: "ゴンドラが水平を保ったまま回る観覧車型カルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const CARDS = [
  { t: "🎡", grad: "from-rose-400 to-pink-500" },
  { t: "🎠", grad: "from-amber-400 to-orange-500" },
  { t: "🎢", grad: "from-emerald-400 to-teal-500" },
  { t: "🎪", grad: "from-sky-400 to-blue-500" },
  { t: "🎨", grad: "from-violet-400 to-purple-500" },
  { t: "🎭", grad: "from-fuchsia-400 to-pink-500" },
];

export default function FerrisWheelCards() {
  const [rot, setRot] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRot((r) => (r + dt * 0.02) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const count = CARDS.length;
  const step = 360 / count;
  const radius = 110;

  return (
    <div className="flex w-full justify-center py-10">
      <div className="relative" style={{ width: 260, height: 260 }}>
        <div
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `rotate(${rot}deg)` }}
        >
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{ transform: `rotate(${i * step}deg) translateY(-${radius}px)` }}
            >
              <div
                className={cn(
                  "flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-to-br text-3xl shadow-lg",
                  c.grad
                )}
                style={{ transform: `rotate(${-rot - i * step}deg)` }}
              >
                {c.t}
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/70 ring-4 ring-foreground/20"
          aria-hidden
        />
      </div>
    </div>
  );
}
