import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "カバーフロー・アルバム切替",
  category: "3Dカルーセル",
  description: "iTunes 風のカバーフローでアルバムを左右に切り替える3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

type Album = { title: string; artist: string; from: string; to: string };

const ALBUMS: Album[] = [
  { title: "Neon Drift", artist: "Aera", from: "#f97316", to: "#db2777" },
  { title: "Glass Hours", artist: "Mono", from: "#6366f1", to: "#06b6d4" },
  { title: "Slow Tide", artist: "Reverb", from: "#10b981", to: "#0ea5e9" },
  { title: "Paper Moon", artist: "Lull", from: "#a855f7", to: "#f43f5e" },
  { title: "Dust Lines", artist: "Kite", from: "#eab308", to: "#ef4444" },
];

export default function CoverflowAlbumSwitcher() {
  const [active, setActive] = useState(2);
  const move = (dir: number) =>
    setActive((a) => Math.min(ALBUMS.length - 1, Math.max(0, a + dir)));

  return (
    <div className="w-full bg-background py-12 overflow-x-hidden">
      <div
        className="relative mx-auto flex h-72 max-w-3xl items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative h-56 w-56" style={{ transformStyle: "preserve-3d" }}>
          {ALBUMS.map((al, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const translateX = offset * 130;
            const rotateY = offset === 0 ? 0 : offset < 0 ? 45 : -45;
            return (
              <button
                key={al.title}
                onClick={() => setActive(i)}
                aria-label={al.title}
                className="absolute inset-0 rounded-xl shadow-2xl transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${-abs * 120}px) rotateY(${rotateY}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                  background: `linear-gradient(135deg, ${al.from}, ${al.to})`,
                }}
              >
                <span className="flex h-full w-full items-center justify-center rounded-xl">
                  {offset === 0 && (
                    <Play className="h-12 w-12 fill-white/90 text-white/90" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-foreground">{ALBUMS[active].title}</p>
        <p className="text-sm text-muted-foreground">{ALBUMS[active].artist}</p>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => move(-1)}
          disabled={active === 0}
          aria-label="前のアルバム"
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {ALBUMS.map((al, i) => (
            <span
              key={al.title}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => move(1)}
          disabled={active === ALBUMS.length - 1}
          aria-label="次のアルバム"
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
