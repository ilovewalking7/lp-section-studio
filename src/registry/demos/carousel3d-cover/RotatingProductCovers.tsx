import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Pause, Play } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転プロダクトカバー",
  category: "3Dカルーセル",
  description: "自動回転する円環状の商品カバー。reduced-motion 配慮の3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const PRODUCTS = [
  { t: "Sneaker", emoji: "👟", price: "¥12,800" },
  { t: "Watch", emoji: "⌚", price: "¥34,000" },
  { t: "Camera", emoji: "📷", price: "¥58,000" },
  { t: "Headset", emoji: "🎧", price: "¥9,800" },
  { t: "Backpack", emoji: "🎒", price: "¥7,200" },
  { t: "Sunglass", emoji: "🕶️", price: "¥5,400" },
];

const RADIUS = 260;

export default function RotatingProductCovers() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = 360 / PRODUCTS.length;

  useEffect(() => {
    if (!playing) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), 2200);
    return () => window.clearInterval(id);
  }, [playing]);

  const current = ((index % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length;

  return (
    <div className="w-full overflow-hidden bg-background py-12">
      <div
        className="relative mx-auto flex h-60 max-w-2xl items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div
          className="relative h-40 w-40 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}px) rotateY(${-index * step}deg)`,
          }}
        >
          {PRODUCTS.map((p, i) => (
            <button
              key={p.t}
              onClick={() => setIndex(i)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card shadow-lg"
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${RADIUS}px)`,
              }}
            >
              <span className="text-4xl">{p.emoji}</span>
              <span className="text-xs font-bold text-foreground">{p.t}</span>
              <span className="text-[11px] text-muted-foreground">{p.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setIndex((i) => i - 1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={
            playing
              ? en
                ? "Pause"
                : "停止"
              : en
                ? "Play"
                : "再生"
          }
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setIndex((i) => i + 1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="ml-2 inline-flex items-center gap-1 text-sm font-medium text-foreground">
          <ShoppingBag className="h-4 w-4" />
          {PRODUCTS[current].t}
        </span>
      </div>
    </div>
  );
}
