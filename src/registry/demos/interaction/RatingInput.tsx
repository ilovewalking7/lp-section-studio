import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "星評価入力",
  category: "インタラクション",
  description: "ホバープレビュー付きの5段階スター評価。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "rating"],
  principle:
    "ホバーで選ぶ前の結果を先に見せることで操作の不確実性を減らす。選択時の小さな弾みが達成感のフィードバックになる。",
};

const LABELS = [
  { ja: "", en: "" },
  { ja: "残念", en: "Poor" },
  { ja: "いまひとつ", en: "Fair" },
  { ja: "ふつう", en: "Okay" },
  { ja: "良い", en: "Good" },
  { ja: "最高！", en: "Amazing!" },
];

export default function RatingInput() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= shown;
          return (
            <button
              key={n}
              type="button"
              aria-label={en ? `${n} stars` : `${n} 点`}
              onMouseEnter={() => setHover(n)}
              onClick={() => setValue(n)}
              className="rounded-md p-1 transition-transform duration-150 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star
                className={cn(
                  "size-8 transition-all duration-200",
                  filled
                    ? "scale-100 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    : "scale-95 fill-transparent text-muted-foreground/40"
                )}
              />
            </button>
          );
        })}
      </div>
      <div className="h-5 text-sm font-medium text-muted-foreground">
        {shown > 0 ? (
          <span className="text-foreground">
            {en ? LABELS[shown].en : LABELS[shown].ja}
          </span>
        ) : en ? (
          "Tap a star to rate"
        ) : (
          "星をタップして評価"
        )}
      </div>
    </div>
  );
}
