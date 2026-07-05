import { useState } from "react";
import { Heart } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "いいねバースト",
  category: "ローダー・マイクロ",
  description: "クリックでパーティクルが弾け、カウントが跳ねるいいねボタン。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "like"],
};

const styles = `
@keyframes ldr-heart-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
@keyframes ldr-count-bump {
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-6px); opacity: 0.6; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes ldr-particle {
  0% { transform: translate(-50%, -50%) translate(0, 0) scale(0.4); opacity: 1; }
  100% { transform: translate(-50%, -50%) var(--end) scale(1); opacity: 0; }
}
`;

const PARTICLES = Array.from({ length: 8 }).map((_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const dist = 26;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    color: ["#f43f5e", "#fb7185", "#fbbf24", "#a78bfa"][i % 4],
  };
});

export default function LikeBurst() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [burstKey, setBurstKey] = useState(0);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    if (next) setBurstKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <style>{styles}</style>

      <button
        type="button"
        onClick={toggle}
        className="group relative flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 transition-colors hover:bg-accent"
        aria-pressed={liked}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {liked &&
            PARTICLES.map((p, i) => (
              <span
                key={`${burstKey}-${i}`}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                style={
                  {
                    backgroundColor: p.color,
                    "--end": `translate(${p.x}px, ${p.y}px)`,
                    animation: "ldr-particle 0.6s ease-out forwards",
                  } as React.CSSProperties
                }
              />
            ))}
          <Heart
            className={cn(
              "h-6 w-6 transition-colors",
              liked ? "fill-rose-500 text-rose-500" : "text-muted-foreground",
            )}
            style={liked ? { animation: "ldr-heart-pop 0.45s ease-out" } : undefined}
          />
        </span>
        <span
          key={count}
          className="min-w-[2.5rem] text-left text-sm font-semibold tabular-nums text-foreground"
          style={{ animation: "ldr-count-bump 0.4s ease-out" }}
        >
          {count}
        </span>
      </button>

      <p className="text-xs text-muted-foreground">{en ? "Tap to like" : "タップしていいね"}</p>
    </div>
  );
}
