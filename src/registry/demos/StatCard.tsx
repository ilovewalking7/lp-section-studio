import { TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "統計カード",
  category: "ダッシュボード",
  description: "KPI と前月比トレンドを表示するカード。",
};

export default function StatCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {en ? "Active users" : "アクティブユーザー"}
          </span>
          <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Users className="size-4" />
          </div>
        </div>
        <div className="mt-3 text-3xl font-bold tracking-tight">12,480</div>
        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
          <TrendingUp className="size-3.5" />
          <span>+14.2%</span>
          <span className="text-muted-foreground">
            {en ? "vs. last month" : "先月比"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
