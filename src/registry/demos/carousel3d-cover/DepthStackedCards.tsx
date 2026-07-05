import { useState } from "react";
import { ArrowDown } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "深度スタックカード",
  category: "3Dカルーセル",
  description: "Z軸に積層したカードを前後に送って閲覧する3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const ITEMS = [
  { title: "Aurora", sub: "Plan", from: "#0ea5e9", to: "#2563eb" },
  { title: "Comet", sub: "Pro", from: "#8b5cf6", to: "#6d28d9" },
  { title: "Nebula", sub: "Team", from: "#ec4899", to: "#be185d" },
  { title: "Quasar", sub: "Scale", from: "#f59e0b", to: "#d97706" },
];

export default function DepthStackedCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="relative mx-auto flex h-80 max-w-lg items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div className="relative h-60 w-72" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((item, i) => {
            const depth = (i - active + ITEMS.length) % ITEMS.length;
            return (
              <div
                key={item.title}
                className="absolute inset-0 flex flex-col justify-between rounded-3xl p-6 text-white shadow-2xl transition-all duration-500 ease-out"
                style={{
                  transform: `translateZ(${-depth * 80}px) translateY(${depth * 22}px) scale(${1 - depth * 0.05})`,
                  zIndex: ITEMS.length - depth,
                  opacity: depth > 2 ? 0 : 1 - depth * 0.2,
                  background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-widest opacity-80">
                    {item.sub}
                  </span>
                  <span className="text-xs opacity-70">{i + 1}/{ITEMS.length}</span>
                </div>
                <p className="text-3xl font-bold">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={() => setActive((a) => (a + 1) % ITEMS.length)}
          className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:opacity-90"
        >
          <ArrowDown className="h-4 w-4" /> {en ? "Next" : "次へ送る"}
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              aria-label={item.title}
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
