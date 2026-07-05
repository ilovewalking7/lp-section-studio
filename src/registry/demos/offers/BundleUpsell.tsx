import { useState } from "react";
import { Check, Package, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "バンドル・アップセル",
  category: "価格・オファー",
  description:
    "ベース＋アドオンをスイッチで選び、合計とバンドル割引をリアルタイム表示する構成ツール。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["bundle", "upsell", "addons"],
  principle:
    "抱き合わせとアンカリング。アドオン個別価格を基準に「まとめ買い割引」を提示し、追加購入の合理化と単価向上を同時に実現する。",
};

type AddOn = {
  id: string;
  labelJa: string;
  labelEn: string;
  price: number;
  hintJa: string;
  hintEn: string;
};

const BASE = {
  labelJa: "コアプラン（年額）",
  labelEn: "Core plan (annual)",
  price: 48000,
};

const ADDONS: AddOn[] = [
  {
    id: "analytics",
    labelJa: "高度な分析",
    labelEn: "Advanced analytics",
    price: 12000,
    hintJa: "ダッシュボード & レポート",
    hintEn: "Dashboards & reports",
  },
  {
    id: "support",
    labelJa: "優先サポート",
    labelEn: "Priority support",
    price: 9000,
    hintJa: "24時間以内に返信",
    hintEn: "Replies within 24 hours",
  },
  {
    id: "ai",
    labelJa: "AIアシスト",
    labelEn: "AI assist",
    price: 15000,
    hintJa: "自動下書き & 提案",
    hintEn: "Auto drafts & suggestions",
  },
  {
    id: "seats",
    labelJa: "追加メンバー5名",
    labelEn: "5 extra seats",
    price: 18000,
    hintJa: "チーム拡張",
    hintEn: "Grow your team",
  },
];

const BUNDLE_RATE = 0.2; // アドオン合計から20%引き

function yen(n: number) {
  return "¥" + n.toLocaleString("ja-JP");
}

export default function BundleUpsell() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    analytics: true,
    ai: true,
  });

  const toggle = (id: string) =>
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  const chosen = ADDONS.filter((a) => enabled[a.id]);
  const addonTotal = chosen.reduce((s, a) => s + a.price, 0);
  // 2つ以上選ぶとバンドル割引が発動
  const discount = chosen.length >= 2 ? Math.round(addonTotal * BUNDLE_RATE) : 0;
  const total = BASE.price + addonTotal - discount;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package className="size-4" />
            </span>
            <span className="font-semibold">
              {en ? "Build your plan" : "プランを組み立てる"}
            </span>
          </div>
          {discount > 0 && (
            <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent">
              <Sparkles className="size-3" />{" "}
              {en ? "Bundle discount" : "バンドル割引"}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {en
            ? `${Math.round(BUNDLE_RATE * 100)}% off with 2 or more add-ons.`
            : `2つ以上のアドオンで ${Math.round(BUNDLE_RATE * 100)}% オフ。`}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3 text-sm">
          <div>
            <p className="font-medium">{en ? BASE.labelEn : BASE.labelJa}</p>
            <p className="text-xs text-muted-foreground">
              {en
                ? "Required — includes all core features"
                : "必須・基本機能をすべて含む"}
            </p>
          </div>
          <span className="font-semibold tabular-nums">{yen(BASE.price)}</span>
        </div>

        <ul className="space-y-2">
          {ADDONS.map((a) => {
            const on = !!enabled[a.id];
            return (
              <li
                key={a.id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors",
                  on ? "border-primary/40 bg-primary/5" : "bg-card"
                )}
              >
                <label
                  htmlFor={`addon-${a.id}`}
                  className="flex flex-1 cursor-pointer flex-col"
                >
                  <span className="text-sm font-medium">
                    {en ? a.labelEn : a.labelJa}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {en ? a.hintEn : a.hintJa}
                  </span>
                </label>
                <span
                  className={cn(
                    "text-sm font-medium tabular-nums",
                    on ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  +{yen(a.price)}
                </span>
                <Switch
                  id={`addon-${a.id}`}
                  checked={on}
                  onCheckedChange={() => toggle(a.id)}
                />
              </li>
            );
          })}
        </ul>

        <div className="space-y-1.5 border-t pt-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{en ? "Subtotal" : "小計"}</span>
            <span className="tabular-nums">{yen(BASE.price + addonTotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between font-medium text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1">
                <Check className="size-3.5" />{" "}
                {en ? "Bundle discount" : "バンドル割引"}
              </span>
              <span className="tabular-nums">-{yen(discount)}</span>
            </div>
          )}
          <div className="flex items-baseline justify-between pt-1">
            <span className="font-semibold">
              {en ? "Total (annual)" : "合計（年額）"}
            </span>
            <span className="text-2xl font-bold tracking-tight tabular-nums">
              {yen(total)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          {en
            ? `Get this setup (${chosen.length} add-ons)`
            : `この構成で申し込む（${chosen.length}件のアドオン）`}
        </Button>
        {discount > 0 && (
          <p className="text-center text-xs text-emerald-600 dark:text-emerald-400">
            {en
              ? `You saved ${yen(discount)} by bundling`
              : `まとめ買いで ${yen(discount)} お得になりました`}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
