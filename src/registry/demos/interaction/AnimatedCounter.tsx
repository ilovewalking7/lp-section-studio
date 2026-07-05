import { useCallback, useEffect, useRef, useState } from "react";
import { Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメカウンター",
  category: "インタラクション",
  description: "マウント時とボタンで 0→目標値へ滑らかに数えるカウンター。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "counter"],
  principle:
    "数字が動くと変化量が直感的に伝わり、達成感や進捗を強調できる。easing で減速させると自然で上質な印象になる。",
};

const TARGET = 12480;
const DURATION = 1400;

// easeOutExpo: 最後にふわっと減速する上質なイージング
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  const run = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(easeOutExpo(p) * TARGET));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    run();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [run]);

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-5 p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <TrendingUp className="size-4 text-primary" />
          {en ? "Active users this month" : "今月のアクティブユーザー"}
        </div>
        <div className="flex items-baseline gap-1 tabular-nums">
          <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            {value.toLocaleString(en ? "en-US" : "ja-JP")}
          </span>
          {!en && (
            <span className="text-lg font-semibold text-muted-foreground">
              人
            </span>
          )}
        </div>
        <Button onClick={run} size="sm" className="gap-1.5">
          <Play className="size-3.5" />
          {en ? "Replay" : "再生"}
        </Button>
      </CardContent>
    </Card>
  );
}
