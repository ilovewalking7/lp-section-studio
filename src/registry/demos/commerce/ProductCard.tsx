import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "商品カード",
  category: "コマース",
  description: "セールバッジ・星評価・お気に入り・カート追加を備えた商品カード。",
  align: "center",
};

const RATING = 4;
const REVIEWS = 128;

export default function ProductCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div className="w-full max-w-xs overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* 画像エリア（CSS グラデーション） */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none text-6xl font-black tracking-tighter text-white/90 drop-shadow">
            A
          </span>
        </div>
        <Badge className="absolute left-3 top-3 border-transparent bg-rose-500 text-white hover:bg-rose-500">
          -25%
        </Badge>
        <button
          type="button"
          aria-label={en ? "Add to favorites" : "お気に入りに追加"}
          aria-pressed={favorite}
          onClick={() => setFavorite((v) => !v)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart
            className={cn(
              "size-[18px] transition-colors",
              favorite ? "fill-rose-500 text-rose-500" : "text-foreground"
            )}
          />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {en ? "Audio" : "オーディオ"}
          </p>
          <h3 className="text-base font-semibold leading-tight">
            {en ? "Aurora Wireless Headphones" : "Aurora ワイヤレスヘッドホン"}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < RATING
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {RATING.toFixed(1)} ({REVIEWS})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-emerald-500">
            ¥14,900
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ¥19,800
          </span>
        </div>

        <Button
          className="w-full"
          variant={added ? "secondary" : "default"}
          onClick={() => setAdded((v) => !v)}
        >
          <ShoppingCart className="size-4" />
          {added
            ? en
              ? "Added to cart"
              : "カートに追加済み"
            : en
            ? "Add to cart"
            : "カートに追加"}
        </Button>
      </div>
    </div>
  );
}
