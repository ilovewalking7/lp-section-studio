import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "縦回転ホイール",
  category: "3Dカルーセル",
  description: "X軸回転で項目が縦に巡る3Dホイールピッカー。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const ITEMS = [
  { ja: "朝食", en: "Breakfast" },
  { ja: "昼食", en: "Lunch" },
  { ja: "おやつ", en: "Snack" },
  { ja: "夕食", en: "Dinner" },
  { ja: "夜食", en: "Late bite" },
  { ja: "ドリンク", en: "Drinks" },
  { ja: "デザート", en: "Dessert" },
  { ja: "前菜", en: "Starter" },
];

export default function VerticalWheel3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const count = ITEMS.length;
  const step = 360 / count;
  const radius = 130;

  return (
    <div className="flex w-full flex-col items-center gap-5 py-8">
      <div className="flex items-center gap-5">
        <div
          className="relative"
          style={{ width: 200, height: 160, perspective: "900px" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-500 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${index * step}deg)`,
            }}
          >
            {ITEMS.map((item, i) => {
              const isOn = i === ((index % count) + count) % count;
              return (
                <div
                  key={item.en}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-lg border text-lg font-semibold transition-colors",
                    isOn
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  )}
                  style={{ transform: `rotateX(${-i * step}deg) translateZ(${radius}px)` }}
                >
                  {en ? item.en : item.ja}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setIndex((v) => v - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/70"
            aria-label={en ? "Up" : "上へ"}
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((v) => v + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-muted/70"
            aria-label={en ? "Down" : "下へ"}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
