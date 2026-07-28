import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "被写界深度ブラー・フォーカス",
  category: "3Dカルーセル",
  description: "中央のカードだけがピントを合わせ、奥のカードはぼけて沈む深度ブラーカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Shot = { title: string; from: string; to: string };

const SHOTS: Shot[] = [
  { title: "Dawn", from: "#fbbf24", to: "#fb7185" },
  { title: "Mist", from: "#a5b4fc", to: "#5eead4" },
  { title: "Dusk", from: "#c084fc", to: "#f472b6" },
  { title: "Night", from: "#1e293b", to: "#3b82f6" },
  { title: "Frost", from: "#7dd3fc", to: "#bae6fd" },
];

export default function DepthBlurFocus() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(2);
  const move = (d: number) =>
    setActive((a) => Math.min(SHOTS.length - 1, Math.max(0, a + d)));

  return (
    <div className="w-full bg-background py-12 overflow-x-hidden">
      <div
        className="relative mx-auto flex h-64 max-w-3xl items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div className="relative h-48 w-48" style={{ transformStyle: "preserve-3d" }}>
          {SHOTS.map((s, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                aria-label={s.title}
                className="absolute inset-0 flex items-center justify-center rounded-2xl text-white shadow-2xl transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                  transform: `translateX(${offset * 120}px) translateZ(${-abs * 140}px) scale(${1 - abs * 0.12})`,
                  filter: `blur(${abs * 2.5}px)`,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.2,
                  zIndex: 10 - abs,
                }}
              >
                {offset === 0 && <Camera className="h-10 w-10" />}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-lg font-bold text-foreground">
        {SHOTS[active].title}
      </p>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => move(-1)}
          disabled={active === 0}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {SHOTS.map((s, i) => (
            <span
              key={s.title}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => move(1)}
          disabled={active === SHOTS.length - 1}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
