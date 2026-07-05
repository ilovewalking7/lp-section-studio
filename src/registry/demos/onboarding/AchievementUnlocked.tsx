import { useEffect, useState } from "react";
import { Trophy, Sparkles, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "実績解除トースト",
  category: "オンボーディング",
  description: "バッジが弾けて現れる「実績解除」トースト。ボタンで再生できる。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "achievement", "gamification"],
  principle:
    "進捗に対する明確な報酬演出が達成感を脳に刻むゲーミフィケーションの典型で、ドーパミン報酬により次の行動への意欲（継続）を高める。",
};

export default function AchievementUnlocked() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [show, setShow] = useState(false);
  const [pop, setPop] = useState(false);

  const trigger = () => {
    setShow(true);
    setPop(false);
    // 次フレームでアニメーションを起動
    requestAnimationFrame(() => requestAnimationFrame(() => setPop(true)));
  };

  useEffect(() => {
    // 初回マウントで一度披露する
    const t = setTimeout(trigger, 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, [show, pop]);

  const sparks = [
    "-top-2 left-3",
    "-top-1 right-4",
    "top-4 -right-2",
    "bottom-2 -left-2",
    "-bottom-1 right-6",
  ];

  return (
    <div className="relative flex w-80 max-w-full flex-col items-center gap-6 py-4">
      <div className="relative h-[112px] w-full">
        {show && (
          <div
            className={cn(
              "absolute inset-x-0 top-0 mx-auto flex max-w-sm items-center gap-3 overflow-hidden rounded-2xl border border-amber-500/30 bg-card p-4 shadow-lg transition-all duration-500",
              pop
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            )}
          >
            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500" />
            <div className="relative">
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow transition-transform duration-700",
                  pop ? "scale-100 rotate-0" : "scale-0 -rotate-45"
                )}
              >
                <Trophy className="size-6" />
              </span>
              {pop &&
                sparks.map((pos, i) => (
                  <Sparkles
                    key={i}
                    className={cn(
                      "absolute size-3 animate-ping text-amber-400",
                      pos
                    )}
                    style={{ animationDuration: "1.4s", animationDelay: `${i * 90}ms` }}
                  />
                ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex min-w-0 items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-amber-500">
                <Star className="size-3 shrink-0 fill-amber-500" />
                <span className="truncate">
                  {en ? "Achievement unlocked" : "実績解除"}
                </span>
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold">
                {en ? "First step" : "はじめの一歩"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {en ? "You completed your first task" : "最初のタスクを完了しました"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              aria-label={en ? "Close" : "閉じる"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        {!show && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {en
              ? "Complete a task to unlock a badge"
              : "タスクを完了するとバッジが解除されます"}
          </div>
        )}
      </div>

      <Button onClick={trigger} variant="secondary">
        <Trophy className="size-4" />
        {en ? "Replay achievement" : "実績解除を再生"}
      </Button>
    </div>
  );
}
