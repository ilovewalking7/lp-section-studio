import { useEffect, useRef, useState } from "react";
import { RefreshCw, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "段差3Dリビール行",
  category: "3Dカルーセル",
  description: "カードが時間差で奥から立ち上がって現れる、ステージャード3Dリビール行。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Card = { title: string; from: string; to: string };

const CARDS: Card[] = [
  { title: "Plan", from: "#6366f1", to: "#06b6d4" },
  { title: "Build", from: "#f97316", to: "#db2777" },
  { title: "Ship", from: "#10b981", to: "#0ea5e9" },
  { title: "Grow", from: "#a855f7", to: "#f43f5e" },
];

export default function StaggeredRevealRow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [shown, setShown] = useState(0);
  const reduced = useRef(false);

  const reveal = () => setShown(0);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (shown >= CARDS.length) return;
    if (reduced.current) {
      setShown(CARDS.length);
      return;
    }
    const id = setTimeout(() => setShown((s) => s + 1), 260);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-5 px-4"
        style={{ perspective: "1100px" }}
      >
        {CARDS.map((c, i) => {
          const visible = i < shown;
          return (
            <div
              key={c.title}
              className="flex h-44 w-40 flex-col items-center justify-center gap-2 rounded-2xl text-white shadow-2xl transition-all duration-500 ease-out"
              style={{
                background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                transform: visible
                  ? "translateY(0) rotateX(0deg)"
                  : "translateY(40px) rotateX(45deg)",
                opacity: visible ? 1 : 0,
                transformStyle: "preserve-3d",
              }}
            >
              <Star className="h-7 w-7" />
              <span className="text-lg font-bold">{c.title}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex justify-center">
        <button
          onClick={reveal}
          className={cn(
            "flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          )}
        >
          <RefreshCw className="h-4 w-4" /> {en ? "Replay" : "もう一度"}
        </button>
      </div>
    </div>
  );
}
