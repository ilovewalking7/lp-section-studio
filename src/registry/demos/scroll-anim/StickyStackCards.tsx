import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタッキングカード",
  category: "スクロール演出",
  description: "スクロールでカードがピン留めされ重なって積み上がる。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "sticky"],
};

const CARDS = [
  { t: "Plan", d: "目標とスコープを定義する。", dEn: "Define goals and scope.", c: "bg-gradient-to-br from-indigo-500 to-blue-600" },
  { t: "Design", d: "体験とUIを設計する。", dEn: "Design the experience and UI.", c: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { t: "Build", d: "コンポーネントを実装する。", dEn: "Implement the components.", c: "bg-gradient-to-br from-amber-500 to-orange-600" },
  { t: "Ship", d: "本番へリリースする。", dEn: "Release to production.", c: "bg-gradient-to-br from-pink-500 to-rose-600" },
];

export default function StickyStackCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full">
      <div className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-background">
        <div className="px-6 pt-6 text-center text-sm text-muted-foreground">
          {en ? "↓ Scroll to stack" : "↓ スクロールで重なる"}
        </div>
        <div className="px-6 pb-[120px] pt-4">
          {CARDS.map((card, i) => (
            <div
              key={card.t}
              className="sticky"
              style={{ top: `${24 + i * 18}px` }}
            >
              <div
                className={cn(
                  "mb-6 flex h-44 flex-col justify-end rounded-2xl p-6 text-white shadow-xl",
                  card.c,
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-black">{card.t}</h3>
                <p className="text-sm text-white/90">{en ? card.dEn : card.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
