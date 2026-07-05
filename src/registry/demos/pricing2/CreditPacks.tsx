import { useState } from "react";
import { Check, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クレジットパック",
  category: "価格・オファー",
  description: "選んだパックが浮き上がる、買い切りクレジット販売。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const packs = [
  { credits: 100, price: 1000, bonus: 0 },
  { credits: 500, price: 4500, bonus: 50, best: true },
  { credits: 1200, price: 9800, bonus: 200 },
];

export default function CreditPacks() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [sel, setSel] = useState(1);
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Top up credits" : "クレジットをチャージ"}
        </h2>
        <p className="mt-3 text-muted-foreground">{en ? "Pay once for what you use. Never expires." : "使う分だけ、買い切りで。有効期限なし。"}</p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
        {packs.map((p, i) => {
          const active = sel === i;
          return (
            <button
              key={p.credits}
              type="button"
              onClick={() => setSel(i)}
              className={cn(
                "group relative rounded-2xl border bg-card p-7 text-left transition-all duration-300",
                active
                  ? "-translate-y-1.5 border-primary shadow-xl ring-1 ring-primary"
                  : "border-border hover:-translate-y-1 hover:shadow-md"
              )}
            >
              {p.best && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {en ? "Best value" : "お得"}
                </span>
              )}
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                )}
              >
                <Coins className="size-6" />
              </span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {p.credits}
                </span>
                <span className="text-sm text-muted-foreground">{en ? "credits" : "クレジット"}</span>
              </div>
              {p.bonus > 0 && (
                <div className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  +{p.bonus} {en ? "bonus" : "ボーナス"}
                </div>
              )}
              <div className="mt-4 text-2xl font-bold text-foreground">
                ¥{p.price.toLocaleString()}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="size-3.5 text-primary" />
                {en ? "Never expires" : "有効期限なし"}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-8 max-w-sm">
        <Button className="w-full" size="lg">
          {en ? (
            <>
              Buy {packs[sel].credits + packs[sel].bonus} credits for ¥
              {packs[sel].price.toLocaleString()}
            </>
          ) : (
            <>
              {packs[sel].credits + packs[sel].bonus} クレジットを ¥
              {packs[sel].price.toLocaleString()} で購入
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
