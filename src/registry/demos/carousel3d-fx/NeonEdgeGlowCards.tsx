import { useState } from "react";
import { ChevronLeft, ChevronRight, Cpu } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ネオンエッジグロー3Dカード",
  category: "3Dカルーセル",
  description: "縁がネオンに発光しながら回転して切り替わる、ダークテック調の3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Item = { label: string; glow: string };

const ITEMS: Item[] = [
  { label: "QUANTUM", glow: "#22d3ee" },
  { label: "NEBULA", glow: "#a855f7" },
  { label: "PULSE", glow: "#f43f5e" },
  { label: "VECTOR", glow: "#34d399" },
];

export default function NeonEdgeGlowCards() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-slate-950 py-12 overflow-x-hidden">
      <div
        className="relative mx-auto flex h-64 max-w-3xl items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div className="relative h-48 w-48" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((it, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <button
                key={it.label}
                onClick={() => setActive(i)}
                aria-label={it.label}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border bg-slate-900/80 transition-all duration-500 ease-out"
                style={{
                  borderColor: it.glow,
                  boxShadow:
                    offset === 0
                      ? `0 0 24px ${it.glow}, inset 0 0 16px ${it.glow}55`
                      : `0 0 6px ${it.glow}55`,
                  transform: `translateX(${offset * 130}px) translateZ(${-abs * 130}px) rotateY(${offset * -28}deg)`,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.25,
                  zIndex: 10 - abs,
                  color: it.glow,
                }}
              >
                <Cpu className="h-9 w-9" style={{ filter: `drop-shadow(0 0 6px ${it.glow})` }} />
                {offset === 0 && (
                  <span
                    className="text-sm font-black tracking-widest"
                    style={{ textShadow: `0 0 10px ${it.glow}` }}
                  >
                    {it.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + ITEMS.length) % ITEMS.length)}
          className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:bg-slate-800"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((it, i) => (
            <span
              key={it.label}
              className={cn("h-2 w-2 rounded-full transition")}
              style={{
                backgroundColor: i === active ? it.glow : "#475569",
                boxShadow: i === active ? `0 0 8px ${it.glow}` : "none",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % ITEMS.length)}
          className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:bg-slate-800"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
