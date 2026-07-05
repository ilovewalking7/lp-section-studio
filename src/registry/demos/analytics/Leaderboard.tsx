import { Crown, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リーダーボード",
  category: "ダッシュボード",
  description: "順位・アバター・スコア・変動を表示し、上位3名を強調するランキング。",
  align: "center",
  isNew: true,
  tags: ["analytics", "leaderboard", "ranking"],
};

type Entry = {
  name: string;
  score: number;
  move: number; // 順位の変動 (+上昇 / -下降 / 0)
};

const ENTRIES: Entry[] = [
  { name: "佐藤 美咲", score: 9824, move: 0 },
  { name: "Liam Carter", score: 9410, move: 2 },
  { name: "田中 翔太", score: 9187, move: -1 },
  { name: "Aisha Khan", score: 8640, move: 1 },
  { name: "鈴木 健", score: 8021, move: -2 },
  { name: "Noah Kim", score: 7755, move: 0 },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0][0] + parts[1][0];
}

const TOP_RING = [
  "ring-amber-400/70 text-amber-500",
  "ring-slate-400/60 text-slate-400",
  "ring-orange-500/60 text-orange-500",
];

export default function Leaderboard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-tight">
            {en ? "Leaderboard" : "リーダーボード"}
          </h3>
          <span className="text-xs text-muted-foreground">
            {en ? "This week" : "今週"}
          </span>
        </div>

        <ol className="space-y-1.5">
          {ENTRIES.map((e, i) => {
            const rank = i + 1;
            const isTop = rank <= 3;
            return (
              <li
                key={e.name}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  isTop ? "bg-muted/50" : "hover:bg-muted/30"
                )}
              >
                <span
                  className={cn(
                    "w-5 text-center text-sm font-bold tabular-nums",
                    isTop ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {rank}
                </span>

                <div className="relative">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary",
                      isTop && "ring-2",
                      isTop && TOP_RING[i]
                    )}
                  >
                    {initials(e.name)}
                  </div>
                  {rank === 1 && (
                    <Crown className="absolute -right-1 -top-1.5 size-3.5 rotate-12 fill-amber-400 text-amber-500" />
                  )}
                </div>

                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {e.name}
                </span>

                <span className="tabular-nums text-sm font-semibold">
                  {e.score.toLocaleString(en ? "en-US" : "ja-JP")}
                </span>

                <span
                  className={cn(
                    "flex w-10 items-center justify-end gap-0.5 text-xs font-medium tabular-nums",
                    e.move > 0 && "text-emerald-500",
                    e.move < 0 && "text-rose-500",
                    e.move === 0 && "text-muted-foreground"
                  )}
                >
                  {e.move > 0 && <TrendingUp className="size-3" />}
                  {e.move < 0 && <TrendingDown className="size-3" />}
                  {e.move === 0 && <Minus className="size-3" />}
                  {e.move !== 0 && Math.abs(e.move)}
                </span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
