import { useState } from "react";
import { MousePointer2 } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ホバーチルト3D行",
  category: "3Dカルーセル",
  description: "ホバーした位置に応じてカードが3Dで傾く、チルトインタラクション付きカード行。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Card = { title: string; emoji: string; from: string; to: string };

const CARDS: Card[] = [
  { title: "Speed", emoji: "⚡", from: "#f59e0b", to: "#ef4444" },
  { title: "Cloud", emoji: "☁️", from: "#3b82f6", to: "#06b6d4" },
  { title: "Magic", emoji: "🪄", from: "#8b5cf6", to: "#ec4899" },
  { title: "Growth", emoji: "🌱", from: "#10b981", to: "#84cc16" },
];

type Tilt = { rx: number; ry: number };

function TiltCard({ card }: { card: Card }) {
  const [tilt, setTilt] = useState<Tilt>({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 18, ry: px * 18 });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="relative h-44 w-40 cursor-pointer rounded-2xl text-white shadow-2xl transition-transform duration-150 ease-out"
      style={{
        background: `linear-gradient(135deg, ${card.from}, ${card.to})`,
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-2"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="text-4xl">{card.emoji}</span>
        <span className="text-lg font-bold">{card.title}</span>
      </div>
    </div>
  );
}

export default function TiltHoverRow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full bg-background py-12">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-5 px-4">
        {CARDS.map((c) => (
          <TiltCard key={c.title} card={c} />
        ))}
      </div>
      <p
        className={cn(
          "mt-7 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        )}
      >
        <MousePointer2 className="h-4 w-4" />{" "}
        {en ? "Move your mouse over a card" : "カードの上でマウスを動かす"}
      </p>
    </div>
  );
}
