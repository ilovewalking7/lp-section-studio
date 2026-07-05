import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "バーレース",
  category: "ダッシュボード",
  description: "数フレームごとに値が変わり、棒が並び替わるアニメーション順位グラフ。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

type Item = { name: string; nameEn: string; color: string; base: number };

const ITEMS: Item[] = [
  { name: "東京", nameEn: "Tokyo", color: "bg-violet-500", base: 82 },
  { name: "大阪", nameEn: "Osaka", color: "bg-sky-500", base: 64 },
  { name: "名古屋", nameEn: "Nagoya", color: "bg-emerald-500", base: 48 },
  { name: "福岡", nameEn: "Fukuoka", color: "bg-amber-500", base: 38 },
  { name: "札幌", nameEn: "Sapporo", color: "bg-rose-500", base: 30 },
];

const ROW_H = 44;

export default function BarRace() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [vals, setVals] = useState(ITEMS.map((i) => i.base));
  const seedRef = useRef(29);

  useEffect(() => {
    const id = setInterval(() => {
      setVals((prev) =>
        prev.map((v) => {
          seedRef.current = (seedRef.current * 9301 + 49297) % 233280;
          const r = seedRef.current / 233280;
          return Math.max(10, Math.min(100, v + Math.round((r - 0.45) * 16)));
        })
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const order = ITEMS.map((it, i) => ({ it, v: vals[i] }))
    .sort((a, b) => b.v - a.v);
  const max = Math.max(...vals);

  return (
    <div className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-4 text-sm font-semibold">{en ? "Active users by city (thousands)" : "都市別アクティブユーザー（千）"}</h3>
      <div className="relative" style={{ height: ITEMS.length * ROW_H }}>
        {order.map((o, rank) => (
          <div
            key={o.it.name}
            className="absolute left-0 right-0 flex items-center gap-3"
            style={{
              top: rank * ROW_H,
              height: ROW_H - 8,
              transition: "top 600ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <span className="w-16 shrink-0 text-right text-xs font-medium">{en ? o.it.nameEn : o.it.name}</span>
            <div className="h-6 flex-1 overflow-hidden rounded bg-muted">
              <div
                className={cn("flex h-full items-center justify-end rounded pr-2", o.it.color)}
                style={{
                  width: `${(o.v / max) * 100}%`,
                  transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <span className="text-[11px] font-semibold tabular-nums text-white">{o.v}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
