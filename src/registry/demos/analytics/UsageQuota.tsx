import { AlertTriangle, Cpu, Database, HardDrive, Mail, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "使用量・クォータ",
  category: "ダッシュボード",
  description: "複数のリソースをX/Yで計測し、上限付近で警告するクォータカード。",
  align: "center",
  isNew: true,
  tags: ["analytics", "quota", "usage"],
};

type Resource = {
  label: string;
  labelEn: string;
  icon: typeof Cpu;
  used: number;
  total: number;
  unit: string;
};

const RESOURCES: Resource[] = [
  { label: "APIリクエスト", labelEn: "API requests", icon: Zap, used: 84200, total: 100000, unit: "" },
  { label: "ストレージ", labelEn: "Storage", icon: HardDrive, used: 38, total: 50, unit: "GB" },
  { label: "データベース行", labelEn: "Database rows", icon: Database, used: 9650000, total: 10000000, unit: "" },
  { label: "コンピュート時間", labelEn: "Compute hours", icon: Cpu, used: 142, total: 500, unit: "h" },
  { label: "送信メール", labelEn: "Emails sent", icon: Mail, used: 2410, total: 3000, unit: "" },
];

function fmt(n: number, unit: string, en: boolean): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M" + unit;
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K" + unit;
  return n.toLocaleString(en ? "en-US" : "ja-JP") + unit;
}

function tone(pct: number) {
  if (pct >= 90) return { bar: "bg-rose-500", text: "text-rose-500" };
  if (pct >= 75) return { bar: "bg-amber-500", text: "text-amber-500" };
  return { bar: "bg-primary", text: "text-muted-foreground" };
}

export default function UsageQuota() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {en ? "Usage & quota" : "使用量とクォータ"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {en ? "Pro plan · Monthly" : "プロプラン · 月次"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {RESOURCES.map((r) => {
            const pct = Math.min((r.used / r.total) * 100, 100);
            const t = tone(pct);
            const near = pct >= 90;
            return (
              <div key={r.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <r.icon className="size-4 text-muted-foreground" />
                    {en ? r.labelEn : r.label}
                    {near && (
                      <AlertTriangle className="size-3.5 text-rose-500" />
                    )}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    <span className={cn("font-semibold", near && t.text)}>
                      {fmt(r.used, r.unit, en)}
                    </span>{" "}
                    / {fmt(r.total, r.unit, en)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full transition-all", t.bar)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
