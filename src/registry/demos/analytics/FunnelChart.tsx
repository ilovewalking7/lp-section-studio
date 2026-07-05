import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コンバージョンファネル",
  category: "ダッシュボード",
  description: "各ステージの割合と離脱率を表示する降順のコンバージョンファネル。",
  align: "full",
  isNew: true,
  tags: ["analytics", "funnel", "conversion"],
};

const STAGES = [
  { label: "訪問", labelEn: "Visits", value: 48200 },
  { label: "サインアップ", labelEn: "Sign-ups", value: 21400 },
  { label: "トライアル開始", labelEn: "Trial started", value: 12850 },
  { label: "アクティブ化", labelEn: "Activated", value: 7320 },
  { label: "有料転換", labelEn: "Converted", value: 3180 },
];

const ACCENTS = [
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
];

export default function FunnelChart() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const top = STAGES[0].value;

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {en ? "Conversion funnel" : "コンバージョンファネル"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {en ? "Overall conversion " : "全体転換率"}{" "}
              <span className="font-medium text-foreground tabular-nums">
                {((STAGES[STAGES.length - 1].value / top) * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {STAGES.map((stage, i) => {
            const pct = (stage.value / top) * 100;
            const prev = i === 0 ? stage.value : STAGES[i - 1].value;
            const dropoff = i === 0 ? 0 : ((prev - stage.value) / prev) * 100;
            return (
              <div key={stage.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {en ? stage.labelEn : stage.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="tabular-nums text-muted-foreground">
                      {stage.value.toLocaleString(en ? "en-US" : "ja-JP")}
                    </span>
                    <span className="w-12 text-right font-semibold tabular-nums">
                      {pct.toFixed(1)}%
                    </span>
                  </span>
                </div>
                <div className="relative h-9 overflow-hidden rounded-md bg-muted/40">
                  <div
                    className={cn(
                      "flex h-full items-center rounded-md transition-all",
                      ACCENTS[i]
                    )}
                    style={{ width: `${Math.max(pct, 6)}%` }}
                  />
                  {i > 0 && (
                    <span className="absolute inset-y-0 right-2.5 flex items-center text-xs font-medium tabular-nums text-rose-500">
                      −{dropoff.toFixed(1)}% {en ? "drop-off" : "離脱"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
