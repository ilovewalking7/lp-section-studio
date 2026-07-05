import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "スケールフォーカス・スライダー",
  category: "3Dカルーセル",
  description: "中央に来たカードが拡大して前面に出る、自動再生付きスケールフォーカスカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Slide = { label: string; emoji: string; from: string; to: string };

const SLIDES: Slide[] = [
  { label: "Focus", emoji: "🎯", from: "#6366f1", to: "#06b6d4" },
  { label: "Flow", emoji: "🌊", from: "#10b981", to: "#0ea5e9" },
  { label: "Spark", emoji: "✨", from: "#f97316", to: "#db2777" },
  { label: "Calm", emoji: "🌿", from: "#a855f7", to: "#f43f5e" },
];

export default function ScaleFocusSlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!playing || reduced.current) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 2200);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="relative mx-auto flex h-60 max-w-3xl items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative h-44 w-44" style={{ transformStyle: "preserve-3d" }}>
          {SLIDES.map((s, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                aria-label={s.label}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl text-white shadow-2xl transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                  transform: `translateX(${offset * 150}px) scale(${offset === 0 ? 1.1 : 0.78})`,
                  opacity: abs > 1 ? 0 : offset === 0 ? 1 : 0.6,
                  zIndex: 10 - abs,
                }}
              >
                <span className="text-3xl">{s.emoji}</span>
                {offset === 0 && <span className="text-lg font-bold">{s.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-muted"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {playing ? (en ? "Pause" : "停止") : en ? "Play" : "再生"}
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((s, i) => (
            <span
              key={s.label}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
