import { useEffect, useRef, useState } from "react";
import { RefreshCw, TrendingUp } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カウントアップ統計",
  category: "テキストアニメ",
  description: "大きな数値がイージングで滑らかにカウントアップする統計表示。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "counter"],
};

const TARGET = 128_540;
const DURATION = 1800;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUpStat() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState(0);
  const [runId, setRunId] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(easeOutExpo(t) * TARGET));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [runId]);

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-background px-8 py-14 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <TrendingUp className="size-3.5" />
        {en ? "Total downloads" : "累計ダウンロード"}
      </span>
      <div className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-6xl font-extrabold tabular-nums tracking-tight text-transparent sm:text-7xl">
        {value.toLocaleString("en-US")}
      </div>
      <p className="text-sm text-muted-foreground">
        {en
          ? "Smoothly counts up on mount."
          : "マウント時に滑らかにカウントアップします。"}
      </p>
      <button
        type="button"
        onClick={() => {
          setValue(0);
          setRunId((n) => n + 1);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <RefreshCw className="size-4" />
        {en ? "Again" : "もう一度"}
      </button>
    </div>
  );
}
