import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "逐次ストリーミング応答",
  category: "AI / チャット",
  description: "トークンが流れるように現れるカーソル付きの逐次表示。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const FULL_JA =
  "ストリーミング応答では、モデルが生成したトークンを到着順に少しずつ描画します。これにより最初の文字までの体感待ち時間が短くなり、回答が組み立てられていく過程をリアルタイムに確認できます。長文でも先頭から読み進められるのが利点です。";

const FULL_EN =
  "With streaming responses, the model paints out tokens little by little as they arrive. This shortens the perceived wait before the first character, letting you watch the answer take shape in real time. Even with long replies, you can start reading from the top.";

const TOKENS_JA = FULL_JA.match(/[\s\S]{1,2}/g) ?? [];
const TOKENS_EN = FULL_EN.match(/[\s\S]{1,3}/g) ?? [];

export default function StreamingMessage() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const TOKENS = en ? TOKENS_EN : TOKENS_JA;
  const [count, setCount] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [runId, setRunId] = useState(0);
  const stopRef = useRef(false);
  const done = count >= TOKENS.length || stopped;

  useEffect(() => {
    stopRef.current = false;
    setStopped(false);
    setCount(0);
    const interval = window.setInterval(() => {
      if (stopRef.current) {
        window.clearInterval(interval);
        return;
      }
      setCount((c) => {
        if (c >= TOKENS.length) {
          window.clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 45);
    return () => window.clearInterval(interval);
  }, [runId]);

  const shown = TOKENS.slice(0, count).join("");

  return (
    <div className="w-full max-w-[560px]">
      <div className="flex gap-3 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-md shadow-violet-500/20">
          <Bot className="size-4" />
        </div>
        <div className="min-h-[4.5rem] flex-1 text-sm leading-relaxed text-foreground">
          {shown}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 animate-pulse rounded-full bg-violet-500 align-middle" />
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span
          className={cn(
            "flex items-center gap-1.5 text-xs",
            done ? "text-muted-foreground" : "text-violet-500"
          )}
        >
          {!done && (
            <span className="flex size-1.5 animate-ping rounded-full bg-violet-500" />
          )}
          {done
            ? stopped
              ? en
                ? "Stopped"
                : "停止しました"
              : en
                ? "Done"
                : "生成完了"
            : en
              ? "Generating…"
              : "生成中…"}
        </span>
        <div className="flex items-center gap-1">
          {!done && (
            <button
              type="button"
              onClick={() => {
                stopRef.current = true;
                setStopped(true);
              }}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Square className="size-3 fill-current" />
              {en ? "Stop" : "停止"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setRunId((r) => r + 1)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            {en ? "Try again" : "もう一度"}
          </button>
        </div>
      </div>
    </div>
  );
}
