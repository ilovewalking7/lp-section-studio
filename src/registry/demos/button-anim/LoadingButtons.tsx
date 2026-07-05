import { useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ローディングボタン",
  category: "ボタン演出",
  description: "クリックでスピナー→チェックへ遷移するローディング状態ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "loading"],
};

type State = "idle" | "loading" | "success";

function useLoadingState() {
  const [state, setState] = useState<State>("idle");
  const timers = useRef<number[]>([]);

  function run() {
    if (state !== "idle") return;
    setState("loading");
    timers.current.push(
      window.setTimeout(() => setState("success"), 1400),
      window.setTimeout(() => setState("idle"), 3000)
    );
  }
  return { state, run };
}

export default function LoadingButtons() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const a = useLoadingState();
  const b = useLoadingState();

  return (
    <div className="flex flex-col items-center gap-5">
      {/* ソリッド */}
      <button
        onClick={a.run}
        className={cn(
          "inline-flex w-44 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors",
          a.state === "success" ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
        )}
      >
        {a.state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {a.state === "success" && <Check className="h-4 w-4" />}
        <span>
          {a.state === "idle"
            ? en ? "Save" : "保存する"
            : a.state === "loading"
            ? en ? "Saving…" : "保存中…"
            : en ? "Saved" : "保存しました"}
        </span>
      </button>

      {/* アウトライン */}
      <button
        onClick={b.run}
        className={cn(
          "inline-flex w-44 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors",
          b.state === "success"
            ? "border-emerald-500 text-emerald-400"
            : "border-neutral-500 text-neutral-200 hover:bg-white/5"
        )}
      >
        {b.state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {b.state === "success" && <Check className="h-4 w-4" />}
        <span>
          {b.state === "idle"
            ? en ? "Send" : "送信"
            : b.state === "loading"
            ? en ? "Sending…" : "送信中…"
            : en ? "Done" : "完了"}
        </span>
      </button>
    </div>
  );
}
