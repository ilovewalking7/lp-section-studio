import { useEffect, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "在庫希少インジケーター",
  category: "コンバージョン",
  description:
    "「残りX点」を減っていくプログレスバーと緊急コピーで示す低在庫表示。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["scarcity", "stock", "urgency"],
  principle:
    "供給が限られていると示す希少性の原理が「今買わないと手に入らない」という損失回避を刺激し、意思決定を先送りせず即決させる。",
};

const TOTAL = 50;

export default function ScarcityStock() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [left, setLeft] = useState(7);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setLeft((n) => {
        if (n <= 2) return 7;
        return n - 1;
      });
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const pct = Math.max(4, Math.round((left / TOTAL) * 100));
  const critical = left <= 5;

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {en ? "Limited color" : "限定カラー"}
          </p>
          <h3 className="mt-1 text-base font-semibold">
            {en ? "Aurora Wireless Earbuds" : "Aurora ワイヤレスイヤホン"}
          </h3>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            critical
              ? "bg-rose-500/15 text-rose-500"
              : "bg-amber-500/15 text-amber-500"
          )}
        >
          <Flame className="size-3.5" />
          {critical
            ? en
              ? "Almost gone"
              : "売り切れ間近"
            : en
              ? "Low stock"
              : "在庫わずか"}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {en ? "Stock" : "在庫"}
          </span>
          <span
            className={cn(
              "text-sm font-semibold tabular-nums transition-transform",
              critical ? "text-rose-500" : "text-foreground",
              pulse && "scale-110"
            )}
          >
            {en ? `${left} left` : `残り ${left} 点`}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              critical
                ? "bg-gradient-to-r from-rose-500 to-orange-500"
                : "bg-gradient-to-r from-amber-400 to-amber-500"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {en ? (
            <>
              <span className="font-medium text-foreground">18 people</span>{" "}
              have this in their cart right now.
            </>
          ) : (
            <>
              現在 <span className="font-medium text-foreground">18人</span>{" "}
              がこの商品をカートに入れています。
            </>
          )}
        </p>
      </div>

      <Button className="mt-5 w-full gap-2">
        <Zap className="size-4" />
        {en ? "Secure yours now" : "今すぐ確保する"}
      </Button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        {en ? "Stock updates in real time." : "在庫はリアルタイムで変動します。"}
      </p>
    </div>
  );
}
