import { useState } from "react";
import { Activity, Compass, Flame, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ピルナビ",
  category: "ナビゲーション",
  description:
    "選択中の項目を背景ピルがスライドして包むセグメント型ナビ。アイコンとラベルを併記。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Item = { icon: LucideIcon; ja: string; en: string };

const ITEMS: Item[] = [
  { icon: Flame, ja: "トレンド", en: "Trending" },
  { icon: Star, ja: "おすすめ", en: "For you" },
  { icon: Activity, ja: "最新", en: "Latest" },
  { icon: Compass, ja: "発見", en: "Discover" },
];

export default function PillNav() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto flex max-w-fit justify-center">
        <div
          className="relative grid rounded-full border bg-background p-1 shadow-sm"
          style={{ gridTemplateColumns: `repeat(${ITEMS.length}, minmax(0,1fr))` }}
        >
          <span
            className="absolute inset-y-1 rounded-full bg-primary transition-transform duration-300 ease-out"
            style={{
              width: `calc((100% - 0.5rem) / ${ITEMS.length})`,
              transform: `translateX(${active * 100}%)`,
            }}
          />
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            const on = active === i;
            return (
              <button
                key={it.en}
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => setActive(i)}
                className={cn(
                  "relative z-10 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  on ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{en ? it.en : it.ja}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
