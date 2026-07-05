import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プライスティッカー",
  category: "マーキー",
  description: "上下を色分けした株価風スクロールティッカー。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "ticker", "price"],
};

const QUOTES = [
  { symbol: "NMBS", price: "182.40", change: "+1.82%", up: true },
  { symbol: "VOLT", price: "57.21", change: "-0.94%", up: false },
  { symbol: "ORBT", price: "1,204.10", change: "+3.41%", up: true },
  { symbol: "TRIA", price: "88.66", change: "-2.13%", up: false },
  { symbol: "BOXL", price: "33.05", change: "+0.62%", up: true },
  { symbol: "APRO", price: "412.78", change: "+5.07%", up: true },
  { symbol: "SPRK", price: "9.84", change: "-1.27%", up: false },
  { symbol: "NEBA", price: "246.33", change: "+0.18%", up: true },
];

export default function PriceTicker() {
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes priceTickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .price-track { animation: priceTickerScroll 28s linear infinite; }
        .price-band:hover .price-track { animation-play-state: paused; }
      `}</style>
      <div
        className="price-band group relative overflow-hidden border-y border-border bg-neutral-950 py-3 text-neutral-100"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="price-track flex w-max items-center gap-8 pr-8">
          {[...QUOTES, ...QUOTES].map((q, i) => {
            const Icon = q.up ? TrendingUp : TrendingDown;
            return (
              <div key={`${q.symbol}-${i}`} className="flex shrink-0 items-center gap-2 text-sm">
                <span className="font-bold tracking-wider">{q.symbol}</span>
                <span className="font-mono tabular-nums text-neutral-300">{q.price}</span>
                <span
                  className={cn(
                    "flex items-center gap-0.5 font-mono font-medium tabular-nums",
                    q.up ? "text-emerald-400" : "text-rose-400",
                  )}
                >
                  <Icon className="size-3.5" />
                  {q.change}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
