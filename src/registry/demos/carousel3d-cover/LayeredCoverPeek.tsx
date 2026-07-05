import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "レイヤード・カバーピーク",
  category: "3Dカルーセル",
  description: "重なったカバーの端だけ覗かせ、選ぶと前面へ出る3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const LAYERS = [
  { t: "Today", descJa: "今日の予定", descEn: "Today's agenda", from: "#2563eb", to: "#1e40af" },
  { t: "Week", descJa: "週間サマリー", descEn: "Weekly summary", from: "#7c3aed", to: "#5b21b6" },
  { t: "Month", descJa: "月次レポート", descEn: "Monthly report", from: "#db2777", to: "#9d174d" },
  { t: "Year", descJa: "年間の振り返り", descEn: "Yearly review", from: "#059669", to: "#047857" },
];

export default function LayeredCoverPeek() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="relative mx-auto flex h-80 max-w-md items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative h-64 w-72" style={{ transformStyle: "preserve-3d" }}>
          {LAYERS.map((l, i) => {
            const depth = (i - active + LAYERS.length) % LAYERS.length;
            return (
              <button
                key={l.t}
                onClick={() => setActive(i)}
                className="absolute inset-x-0 top-0 flex h-40 flex-col justify-between rounded-2xl p-5 text-left text-white shadow-2xl transition-all duration-500"
                style={{
                  transform: `translateY(${depth * 44}px) translateZ(${-depth * 50}px) scale(${1 - depth * 0.04})`,
                  zIndex: LAYERS.length - depth,
                  opacity: depth > 3 ? 0 : 1,
                  background: `linear-gradient(135deg, ${l.from}, ${l.to})`,
                }}
              >
                <p className="text-2xl font-bold">{l.t}</p>
                <p className="text-sm opacity-80">{en ? l.descEn : l.descJa}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => (a - 1 + LAYERS.length) % LAYERS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Up" : "上へ"}
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {LAYERS.map((l, i) => (
            <span
              key={l.t}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % LAYERS.length)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Down" : "下へ"}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
