import { useEffect, useState } from "react";
import { Coins, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "トークン使用量メーター",
  category: "AI / チャット",
  description: "入力・出力トークンの内訳を示すアニメ付きメーター。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const INPUT = 3200;
const OUTPUT = 5400;
const LIMIT = 16000;

export default function TokenUsageMeter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setProgress(1), 80);
    return () => window.clearTimeout(t);
  }, []);

  const total = INPUT + OUTPUT;
  const inputPct = (INPUT / LIMIT) * 100 * progress;
  const outputPct = (OUTPUT / LIMIT) * 100 * progress;
  const usedPct = Math.round((total / LIMIT) * 100);

  return (
    <div className="w-full max-w-[380px] rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
            <Coins className="size-4" />
          </div>
          <span className="text-sm font-semibold">{en ? "Token usage" : "トークン使用量"}</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-emerald-500">
          <TrendingUp className="size-3.5" />
          {usedPct}%
        </span>
      </div>

      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-sky-500 transition-[width] duration-700 ease-out"
          style={{ width: `${inputPct}%` }}
        />
        <div
          className="h-full bg-violet-500 transition-[width] duration-700 ease-out"
          style={{ width: `${outputPct}%` }}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Legend
          color="bg-sky-500"
          label={en ? "Input" : "入力"}
          value={INPUT.toLocaleString()}
        />
        <Legend
          color="bg-violet-500"
          label={en ? "Output" : "出力"}
          value={OUTPUT.toLocaleString()}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
        <span className="text-muted-foreground">
          {en ? "Total" : "合計"} {total.toLocaleString()} / {LIMIT.toLocaleString()}
        </span>
        <span
          className={cn(
            "font-semibold",
            usedPct > 80 ? "text-amber-500" : "text-muted-foreground"
          )}
        >
          {en ? "Remaining" : "残り"} {(LIMIT - total).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-2.5 rounded-full", color)} />
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  );
}
