import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コントリビューションヒートマップ",
  category: "ダッシュボード",
  description: "週×曜日のGitHub風コントリビューショングリッド。強度バケットと凡例付き。",
  align: "full",
  isNew: true,
  tags: ["analytics", "heatmap", "activity"],
};

const WEEKS = 26;
const DAYS = 7;
const DAY_LABELS_JA = ["月", "", "水", "", "金", "", "日"];
const DAY_LABELS_EN = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

// 決定的な擬似乱数で強度バケット(0-4)を生成
function bucket(week: number, day: number): number {
  const seed = (week * 7 + day) * 9301 + 49297;
  const r = (seed % 233280) / 233280;
  const weekend = day >= 5 ? 0.5 : 1;
  const v = r * weekend;
  if (v < 0.45) return 0;
  if (v < 0.62) return 1;
  if (v < 0.78) return 2;
  if (v < 0.9) return 3;
  return 4;
}

const LEVELS = [
  "bg-muted",
  "bg-emerald-500/25",
  "bg-emerald-500/50",
  "bg-emerald-500/75",
  "bg-emerald-500",
];

const MONTH_LABELS_JA = ["1月", "", "2月", "", "3月", "", "4月", "", "5月", "", "6月", "", "7月"];
const MONTH_LABELS_EN = ["Jan", "", "Feb", "", "Mar", "", "Apr", "", "May", "", "Jun", "", "Jul"];

export default function ContributionHeatmap() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const dayLabels = en ? DAY_LABELS_EN : DAY_LABELS_JA;
  const monthLabels = en ? MONTH_LABELS_EN : MONTH_LABELS_JA;
  const grid = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => bucket(w, d))
  );
  const total = grid.flat().reduce((a, b) => a + b * 3, 0);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {en ? "Activity" : "アクティビティ"}
            </h3>
            <p className="text-sm text-muted-foreground tabular-nums">
              {en ? (
                <>
                  {total.toLocaleString("en-US")} contributions in the last 6
                  months
                </>
              ) : (
                <>過去6ヶ月で {total.toLocaleString("ja-JP")} 件のコントリビューション</>
              )}
            </p>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="inline-flex gap-1.5">
            <div className="flex flex-col gap-[3px] pr-1 pt-5 text-[10px] text-muted-foreground">
              {dayLabels.map((l, i) => (
                <span key={i} className="flex h-3 items-center">
                  {l}
                </span>
              ))}
            </div>

            <div>
              <div className="mb-1 flex text-[10px] text-muted-foreground">
                {grid.map((_, w) => (
                  <span key={w} className="w-3" style={{ marginRight: 3 }}>
                    {w < monthLabels.length ? monthLabels[w] : ""}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {grid.map((week, w) => (
                  <div key={w} className="flex flex-col gap-[3px]">
                    {week.map((lvl, d) => (
                      <div
                        key={d}
                        className={cn("size-3 rounded-[3px]", LEVELS[lvl])}
                        title={
                          en
                            ? `Week ${w + 1} ${dayLabels[d] || ""}: level ${lvl}`
                            : `第${w + 1}週 ${dayLabels[d] || ""}: 強度${lvl}`
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
          <span>{en ? "Less" : "少"}</span>
          {LEVELS.map((c, i) => (
            <span key={i} className={cn("size-3 rounded-[3px]", c)} />
          ))}
          <span>{en ? "More" : "多"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
