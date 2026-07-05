import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スライダー料金",
  category: "価格・オファー",
  description: "シート数スライダーで価格がリアルタイムに変わる料金表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const PER_SEAT = 900;

export default function SliderBasedPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [seats, setSeats] = useState(5);
  const total = seats * PER_SEAT;
  const pct = ((seats - 1) / (50 - 1)) * 100;

  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {en ? "Price by team size" : "チームの人数で選ぶ"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {en
              ? `¥${PER_SEAT.toLocaleString()} per user /mo. Slide to adjust.`
              : `1人あたり ¥${PER_SEAT.toLocaleString()} / 月。スライドして調整。`}
          </p>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{en ? "Monthly total" : "月額合計"}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-5xl font-bold tabular-nums text-foreground">
                  ¥{total.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
              </div>
            </div>
            <div className="rounded-xl bg-primary/10 px-4 py-2 text-center">
              <div className="text-2xl font-bold tabular-nums text-primary">{seats}</div>
              <div className="text-xs text-muted-foreground">{en ? "seats" : "シート"}</div>
            </div>
          </div>

          <div className="mt-8">
            <input
              type="range"
              min={1}
              max={50}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              aria-label={en ? "Number of seats" : "シート数"}
              className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--muted)) ${pct}%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>50+</span>
            </div>
          </div>

          <ul className="mt-7 space-y-3 text-sm">
            {[
              { ja: "全機能アクセス", en: "Full feature access" },
              { ja: "メンバー管理", en: "Member management" },
              { ja: "優先サポート", en: "Priority support" },
              { ja: "請求書一括", en: "Consolidated invoicing" },
            ].map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-foreground/90">
                <Check className="size-4 text-primary" />
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-7 w-full" size="lg">
            {en ? "Start with this plan" : "このプランで始める"}
          </Button>
        </div>
      </div>
    </div>
  );
}
