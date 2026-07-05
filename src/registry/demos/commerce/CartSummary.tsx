import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カート概要",
  category: "コマース",
  description: "数量ステッパーで小計が更新されるショッピングカートパネル。",
  align: "center",
};

type Line = {
  id: string;
  name: string;
  nameEn: string;
  variant: string;
  variantEn: string;
  price: number;
  qty: number;
  gradient: string;
  initial: string;
};

const INITIAL: Line[] = [
  {
    id: "a",
    name: "Aurora ヘッドホン",
    nameEn: "Aurora Headphones",
    variant: "ミッドナイト",
    variantEn: "Midnight",
    price: 14900,
    qty: 1,
    gradient: "from-indigo-500 to-fuchsia-500",
    initial: "A",
  },
  {
    id: "b",
    name: "Pebble スピーカー",
    nameEn: "Pebble Speaker",
    variant: "サンド",
    variantEn: "Sand",
    price: 8900,
    qty: 2,
    gradient: "from-emerald-500 to-teal-500",
    initial: "P",
  },
  {
    id: "c",
    name: "Loop ケーブル",
    nameEn: "Loop Cable",
    variant: "1.5m",
    variantEn: "1.5m",
    price: 1500,
    qty: 1,
    gradient: "from-amber-500 to-orange-500",
    initial: "L",
  },
];

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
const SHIPPING = 800;
const TAX_RATE = 0.1;

export default function CartSummary() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [lines, setLines] = useState<Line[]>(INITIAL);

  const setQty = (id: string, delta: number) =>
    setLines((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l
      )
    );

  const { subtotal, tax, total } = useMemo(() => {
    const sub = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const t = Math.round(sub * TAX_RATE);
    return { subtotal: sub, tax: t, total: sub + t + SHIPPING };
  }, [lines]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="size-5 text-muted-foreground" />
          {en ? "Cart" : "カート"}
          <span className="text-sm font-normal text-muted-foreground">
            ({lines.reduce((s, l) => s + l.qty, 0)}
            {en ? " items" : "点"})
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {lines.map((l) => (
          <div key={l.id} className="flex items-center gap-3">
            <div
              className={`grid size-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${l.gradient}`}
            >
              <span className="text-lg font-bold text-white/90">
                {l.initial}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {en ? l.nameEn : l.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {en ? l.variantEn : l.variant}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                size="icon"
                variant="outline"
                className="size-7"
                aria-label={en ? "Decrease quantity" : "数量を減らす"}
                onClick={() => setQty(l.id, -1)}
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="w-6 text-center text-sm tabular-nums">
                {l.qty}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="size-7"
                aria-label={en ? "Increase quantity" : "数量を増やす"}
                onClick={() => setQty(l.id, 1)}
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
            <span className="w-20 shrink-0 text-right text-sm font-medium tabular-nums">
              {yen(l.price * l.qty)}
            </span>
          </div>
        ))}

        <div className="space-y-2 border-t pt-4 text-sm">
          <Row label={en ? "Subtotal" : "小計"} value={yen(subtotal)} />
          <Row label={en ? "Shipping" : "送料"} value={yen(SHIPPING)} />
          <Row label={en ? "Tax (10%)" : "消費税 (10%)"} value={yen(tax)} />
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <div className="flex w-full items-baseline justify-between border-t pt-4">
          <span className="text-base font-semibold">
            {en ? "Total" : "合計"}
          </span>
          <span className="text-xl font-bold tracking-tight text-emerald-500 tabular-nums">
            {yen(total)}
          </span>
        </div>
        <Button className="w-full" size="lg">
          {en ? "Proceed to checkout" : "レジに進む"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}
