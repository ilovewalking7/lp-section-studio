import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "フリップカード・カルーセル",
  category: "3Dカルーセル",
  description: "クリックで表裏が3D回転するフリップカードを左右に切り替えるカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Item = { title: string; backJa: string; backEn: string; from: string; to: string };

const ITEMS: Item[] = [
  { title: "Aurora", backJa: "北極の光をテーマにした配色。", backEn: "A palette inspired by the northern lights.", from: "#6366f1", to: "#06b6d4" },
  { title: "Ember", backJa: "炎のグラデーションで構成。", backEn: "Built from a fiery gradient.", from: "#f97316", to: "#db2777" },
  { title: "Moss", backJa: "苔と森の落ち着いた緑。", backEn: "The calm green of moss and forest.", from: "#10b981", to: "#0ea5e9" },
  { title: "Bloom", backJa: "花弁のような明るい桃色。", backEn: "A bright petal-like pink.", from: "#a855f7", to: "#f43f5e" },
];

export default function FlipCardCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const item = ITEMS[active];

  const move = (dir: number) => {
    setFlipped(false);
    setActive((a) => (a + dir + ITEMS.length) % ITEMS.length);
  };

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-64 max-w-md items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label={en ? `Flip ${item.title}` : `${item.title} を裏返す`}
          className="relative h-56 w-72 rounded-2xl text-left transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <span
            className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 text-white shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
            }}
          >
            <Sparkles className="h-7 w-7" />
            <span className="text-2xl font-bold">{item.title}</span>
            <span className="text-xs opacity-80">{en ? "Click to flip" : "クリックで裏面へ"}</span>
          </span>
          <span
            className="absolute inset-0 flex flex-col justify-center gap-3 rounded-2xl bg-card p-6 shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <RotateCw className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">{item.title}</span>
            <span className="text-sm text-muted-foreground">{en ? item.backEn : item.backJa}</span>
          </span>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => move(-1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((it, i) => (
            <span
              key={it.title}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => move(1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
