import { useState } from "react";
import { Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "使用量メーター料金",
  category: "価格・オファー",
  description: "アニメするメーターで使用量に応じた従量課金を可視化。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const tiers = [
  { label: { ja: "〜10万", en: "Up to 100K" }, req: 100_000, price: 0 },
  { label: { ja: "〜50万", en: "Up to 500K" }, req: 500_000, price: 2000 },
  { label: { ja: "〜200万", en: "Up to 2M" }, req: 2_000_000, price: 7000 },
];

export default function UsageMeterPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [sel, setSel] = useState(1);
  const cur = tiers[sel];
  const pct = Math.min(100, ((sel + 1) / tiers.length) * 100);

  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes ump-fill { from{ width:0; } }
        @media (prefers-reduced-motion: reduce){ .ump-bar{ animation:none !important; } }
      `}</style>
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {en ? "Pay only for what you use" : "使った分だけ"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {en ? "Usage-based pricing by API request volume." : "API リクエスト数に応じた従量課金。"}
          </p>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Zap className="size-4 text-primary" />
              {en ? "Monthly requests" : "月間リクエスト"}
            </div>
            <div className="text-sm tabular-nums text-muted-foreground">
              {en ? `Up to ${cur.req.toLocaleString()}` : `最大 ${cur.req.toLocaleString()}`}
            </div>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              key={sel}
              className="ump-bar h-full rounded-full bg-gradient-to-r from-primary to-violet-500 [animation:ump-fill_.6s_ease]"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {tiers.map((t, i) => (
              <button
                key={t.req}
                type="button"
                onClick={() => setSel(i)}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  sel === i
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-foreground/30"
                )}
              >
                <div className="text-xs text-muted-foreground">{en ? t.label.en : t.label.ja}</div>
                <div className="mt-1 text-sm font-bold text-foreground">
                  {t.price === 0
                    ? en
                      ? "Free"
                      : "無料"
                    : `¥${t.price.toLocaleString()}`}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold tabular-nums text-foreground">
              {cur.price === 0 ? "¥0" : `¥${cur.price.toLocaleString()}`}
            </span>
            <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
          </div>
          <ul className="mx-auto mt-6 max-w-xs space-y-2 text-sm">
            {[
              { ja: "超過分は自動で次の段へ", en: "Overages auto-roll to the next tier" },
              { ja: "上限アラート設定", en: "Usage limit alerts" },
              { ja: "詳細な使用量レポート", en: "Detailed usage reports" },
            ].map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                <Check className="size-4 text-primary" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-7 w-full">{en ? "Start with this plan" : "このプランで開始"}</Button>
        </div>
      </div>
    </div>
  );
}
