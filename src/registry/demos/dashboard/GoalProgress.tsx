import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "目標プログレス",
  category: "ダッシュボード",
  description: "マウント時にアニメーションする複数のラベル付きプログレスバー。",
  align: "center",
};

type Goal = { label: { ja: string; en: string }; value: number; hint: { ja: string; en: string }; bar: string };

const GOALS: Goal[] = [
  { label: { ja: "月間売上目標", en: "Monthly revenue goal" }, value: 78, hint: { ja: "¥3.9M / ¥5.0M", en: "¥3.9M / ¥5.0M" }, bar: "bg-primary" },
  { label: { ja: "新規契約", en: "New contracts" }, value: 64, hint: { ja: "128 / 200 件", en: "128 / 200" }, bar: "bg-violet-500" },
  { label: { ja: "サポート解決率", en: "Support resolution" }, value: 92, hint: { ja: "451 / 490 件", en: "451 / 490" }, bar: "bg-emerald-500" },
  { label: { ja: "NPS スコア", en: "NPS score" }, value: 46, hint: { ja: "目標 60", en: "Target 60" }, bar: "bg-amber-500" },
];

export default function GoalProgress() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{en ? "Quarterly goals" : "四半期の目標"}</CardTitle>
        <CardDescription>{en ? "Q2 2024 progress" : "2024年 Q2 の進捗状況"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {GOALS.map((g) => (
          <div key={g.label.en}>
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-foreground">{en ? g.label.en : g.label.ja}</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{g.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-[width] duration-700 ease-out", g.bar)}
                style={{ width: mounted ? `${g.value}%` : "0%" }}
              />
            </div>
            <p className="mt-1.5 text-xs tabular-nums text-muted-foreground">{en ? g.hint.en : g.hint.ja}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
