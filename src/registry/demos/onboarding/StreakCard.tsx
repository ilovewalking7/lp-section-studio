import { useState } from "react";
import { Flame, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "連続記録カード",
  category: "オンボーディング",
  description: "🔥 連続日数と直近7日のドット行で習慣化を可視化するストリークカード。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "streak", "habit", "retention"],
  principle:
    "積み上げた連続記録を見せることで一貫性の原理と習慣化を促し、「途切れさせたくない」という損失回避が毎日の再訪を強く後押しする。",
};

const DAYS = ["月", "火", "水", "木", "金", "土", "日"];
const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function StreakCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  // 過去の状態: true=達成, false=未達成。最後の要素が「今日」。
  const [history, setHistory] = useState<boolean[]>([
    true,
    true,
    false,
    true,
    true,
    true,
    false,
  ]);

  const todayDone = history[history.length - 1];

  // 末尾から連続している達成数
  const streak = (() => {
    let n = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i]) n++;
      else break;
    }
    return n;
  })();

  const checkIn = () => {
    if (todayDone) return;
    setHistory((h) => {
      const next = [...h];
      next[next.length - 1] = true;
      return next;
    });
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="relative bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent p-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-2xl text-white transition-transform",
              todayDone
                ? "bg-gradient-to-br from-orange-500 to-amber-500 scale-100"
                : "bg-muted-foreground/20"
            )}
          >
            <Flame
              className={cn("size-6", todayDone && "drop-shadow")}
              strokeWidth={2.2}
            />
          </span>
          <div>
            <p className="text-3xl font-bold tabular-nums leading-none">
              {streak}
              <span className="ml-1 text-base font-semibold text-muted-foreground">
                {en ? "day streak" : "日連続"}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {todayDone
                ? en
                  ? "Done for today! Keep it going."
                  : "今日も達成！この調子で続けよう"
                : en
                  ? "Check in today to extend your streak"
                  : "今日チェックインして記録を伸ばそう"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 pt-4">
        <div className="flex justify-between">
          {history.map((done, i) => {
            const isToday = i === history.length - 1;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 transition-all",
                    done
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-dashed border-muted-foreground/30 text-muted-foreground/40",
                    isToday && !done && "border-primary/60"
                  )}
                >
                  {done ? (
                    <Check className="size-4" strokeWidth={3} />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    isToday ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {en ? DAYS_EN[i] : DAYS[i]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-3">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="size-4 text-primary" />
            {en ? "Protect your streak" : "記録を守ろう"}
          </span>
          <Button size="sm" onClick={checkIn} disabled={todayDone}>
            {todayDone
              ? en
                ? "Checked in"
                : "チェックイン済み"
              : en
                ? "Check in today"
                : "今日チェックイン"}
          </Button>
        </div>
      </div>
    </div>
  );
}
