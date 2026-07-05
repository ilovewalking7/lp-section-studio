import { useEffect, useState } from "react";
import { Bot, RotateCcw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ストリーミング表示",
  category: "AI / チャット",
  description: "トークンを逐次表示する点滅カーソル付きの回答。",
  align: "center",
};

const FULL_TEXT_JA =
  "ストリーミングでは、モデルが生成したトークンを到着順に少しずつ表示します。これにより最初の応答までの体感待ち時間が短くなり、ユーザーは回答が組み立てられていく様子をリアルタイムに確認できます。";

const FULL_TEXT_EN =
  "With streaming, the model reveals tokens little by little in the order they arrive. This shortens the perceived wait until the first response, and lets users watch the answer being assembled in real time.";

export default function StreamingMessage() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const tokens = (en ? FULL_TEXT_EN : FULL_TEXT_JA).match(/[\s\S]{1,3}/g) ?? [];
  const [count, setCount] = useState(0);
  const [runId, setRunId] = useState(0);
  const done = count >= tokens.length;

  useEffect(() => {
    setCount(0);
    const interval = window.setInterval(() => {
      setCount((c) => {
        if (c >= tokens.length) {
          window.clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 55);
    return () => window.clearInterval(interval);
  }, [runId]);

  const shown = tokens.slice(0, count).join("");

  return (
    <div className="w-full max-w-[560px]">
      <div className="flex gap-3 rounded-2xl border bg-card p-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white">
          <Bot className="size-4" />
        </div>
        <div className="min-h-[3.5rem] flex-1 text-sm leading-relaxed text-foreground">
          {shown}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-violet-400 align-middle" />
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-xs text-muted-foreground">
          {done ? "生成完了" : "生成中…"}
        </span>
        <button
          type="button"
          onClick={() => setRunId((r) => r + 1)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          もう一度
        </button>
      </div>
    </div>
  );
}
