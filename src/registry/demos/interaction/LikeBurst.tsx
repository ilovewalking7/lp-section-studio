import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "いいねバースト",
  category: "インタラクション",
  description: "クリックでハートが弾けて数が増えるボタン。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "particles"],
  principle:
    "クリックに対する華やかな粒子フィードバックが行為の楽しさを増幅し、再操作を促す（正の強化）。即時の数値更新で反応性も伝わる。",
};

type Particle = { id: number; tx: number; ty: number; rot: number; delay: number };

function makeBurst(seed: number): Particle[] {
  return Array.from({ length: 7 }, (_, i) => {
    const angle = (-90 + (i - 3) * 26 + (seed % 11)) * (Math.PI / 180);
    const dist = 42 + (i % 3) * 14;
    return {
      id: seed * 10 + i,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      rot: (i - 3) * 25,
      delay: i * 12,
    };
  });
}

export default function LikeBurst() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [count, setCount] = useState(128);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<{ key: number; parts: Particle[] }[]>([]);

  const onClick = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    if (next) {
      const key = Date.now();
      setBursts((b) => [...b, { key, parts: makeBurst(key) }]);
      window.setTimeout(
        () => setBursts((b) => b.filter((x) => x.key !== key)),
        700
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {bursts.map((b) =>
          b.parts.map((p) => (
            <Heart
              key={p.id}
              className="pointer-events-none absolute left-1/2 top-1/2 size-3.5 fill-rose-500 text-rose-500"
              style={{
                animation: `like-fly 650ms cubic-bezier(0.22,1,0.36,1) ${p.delay}ms forwards`,
                ["--tx" as string]: `${p.tx}px`,
                ["--ty" as string]: `${p.ty}px`,
                ["--rot" as string]: `${p.rot}deg`,
              }}
            />
          ))
        )}
        <button
          type="button"
          onClick={onClick}
          aria-pressed={liked}
          className={cn(
            "relative flex size-16 items-center justify-center rounded-full border bg-card shadow-sm transition-all duration-200 active:scale-90",
            liked
              ? "border-rose-500/40 bg-rose-500/10"
              : "hover:border-rose-400/50 hover:bg-rose-500/5"
          )}
        >
          <Heart
            className={cn(
              "size-7 transition-all duration-300",
              liked
                ? "scale-110 fill-rose-500 text-rose-500"
                : "fill-transparent text-muted-foreground"
            )}
          />
        </button>
      </div>
      <div className="text-sm tabular-nums text-muted-foreground">
        <span className="font-semibold text-foreground">{count}</span>{" "}
        {en ? "likes" : "いいね"}
      </div>
      <style>{`
        @keyframes like-fly {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          25% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1) rotate(var(--rot));
          }
        }
      `}</style>
    </div>
  );
}
