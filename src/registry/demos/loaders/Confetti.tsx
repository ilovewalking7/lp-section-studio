import { useState } from "react";
import { PartyPopper } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "紙吹雪バースト",
  category: "ローダー・マイクロ",
  description: "ボタンクリックで紙吹雪が弾ける自己完結コンフェッティ。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "confetti"],
};

const styles = `
@keyframes ldr-confetti-fall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
}
`;

const COLORS = ["#f43f5e", "#fb7185", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"];

type Piece = {
  id: number;
  left: number;
  dx: number;
  dy: number;
  rot: number;
  color: string;
  size: number;
  round: boolean;
  delay: number;
};

function makePieces(batch: number): Piece[] {
  return Array.from({ length: 28 }).map((_, i) => ({
    id: batch * 100 + i,
    left: 50 + (Math.random() - 0.5) * 30,
    dx: (Math.random() - 0.5) * 240,
    dy: 120 + Math.random() * 140,
    rot: (Math.random() - 0.5) * 720,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 6,
    round: Math.random() > 0.5,
    delay: Math.random() * 0.12,
  }));
}

export default function Confetti() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [batch, setBatch] = useState(0);

  const fire = () => {
    const b = batch + 1;
    setBatch(b);
    const fresh = makePieces(b);
    setPieces(fresh);
    window.setTimeout(() => {
      setPieces((cur) => cur.filter((p) => !fresh.some((f) => f.id === p.id)));
    }, 1500);
  };

  return (
    <div className="relative flex h-[260px] w-full max-w-md items-center justify-center overflow-hidden">
      <style>{styles}</style>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="absolute"
            style={
              {
                left: `${p.left}%`,
                top: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.round ? "9999px" : "2px",
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--rot": `${p.rot}deg`,
                animation: `ldr-confetti-fall 1.4s ${p.delay}s cubic-bezier(0.2,0.6,0.4,1) forwards`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={fire}
        className="relative z-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform active:scale-95"
      >
        <PartyPopper className="h-4 w-4" />
        {en ? "Celebrate" : "お祝いする"}
      </button>
    </div>
  );
}
