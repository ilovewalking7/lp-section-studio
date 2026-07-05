import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "自動回転カルーセル",
  category: "3Dカルーセル",
  description: "再生／停止できる自動スピンの3Dパネルカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const PANELS = [
  "from-rose-500 to-pink-600",
  "from-orange-500 to-amber-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-sky-600",
  "from-indigo-500 to-violet-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-green-600",
];

export default function AutoSpinCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rot, setRot] = useState(0);
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!playing || reduce) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRot((r) => (r + dt * 0.03) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  const count = PANELS.length;
  const step = 360 / count;
  const radius = 200;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 180, height: 160, perspective: "1000px" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rot}deg)`,
          }}
        >
          {PANELS.map((grad, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br text-2xl font-bold text-white/90 shadow-2xl",
                grad
              )}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {playing ? (en ? "Pause" : "停止") : en ? "Play" : "再生"}
      </button>
    </div>
  );
}
