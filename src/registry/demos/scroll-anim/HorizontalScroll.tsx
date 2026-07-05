import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "横スクロール・ストリップ",
  category: "スクロール演出",
  description: "コンテナ内を横スクロールするカード列と進捗インジケーター。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "horizontal"],
};

const CARDS = [
  { t: "01", c: "from-rose-500 to-orange-500" },
  { t: "02", c: "from-amber-500 to-yellow-500" },
  { t: "03", c: "from-emerald-500 to-teal-500" },
  { t: "04", c: "from-sky-500 to-blue-500" },
  { t: "05", c: "from-indigo-500 to-violet-500" },
  { t: "06", c: "from-fuchsia-500 to-pink-500" },
];

export default function HorizontalScroll() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pct, setPct] = useState(0);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    setPct(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  }

  return (
    <div className="w-full">
      <div className="flex h-[420px] w-full flex-col justify-center rounded-2xl border bg-background p-6">
        <h3 className="mb-1 text-lg font-bold text-foreground">{en ? "Horizontal scroll" : "横スクロール"}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{en ? "→ Drag or scroll sideways" : "→ 横にドラッグ／スクロール"}</p>
        <div
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]"
        >
          {CARDS.map((card) => (
            <div
              key={card.t}
              className={`flex h-56 w-64 shrink-0 snap-center flex-col justify-end rounded-2xl bg-gradient-to-br ${card.c} p-6 text-white shadow-lg`}
            >
              <span className="text-5xl font-black">{card.t}</span>
              <span className="text-sm text-white/80">{en ? `Slide ${card.t}` : `スライド ${card.t}`}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-100"
            style={{ width: `${Math.max(pct, 6)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
