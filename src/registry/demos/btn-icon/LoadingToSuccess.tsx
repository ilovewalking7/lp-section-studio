import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "完了チェック",
  category: "ボタン",
  description: "スピナーで処理後にチェックへ切り替わる、成功フィードバック付きボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

type State = "idle" | "loading" | "done";

export default function LoadingToSuccess() {
  const [state, setState] = useState<State>("idle");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    window.setTimeout(() => setState("done"), 1500);
    window.setTimeout(() => setState("idle"), 3200);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-emerald-50 p-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={state !== "idle"}
        className={cn(
          "inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 active:scale-[0.97]",
          state === "done"
            ? "bg-emerald-500 shadow-emerald-500/30"
            : "bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-700"
        )}
      >
        {state === "idle" && (en ? "Upload" : "アップロード")}
        {state === "loading" && (
          <>
            <Loader2 className="size-4 animate-spin" />
            {en ? "Processing…" : "処理中…"}
          </>
        )}
        {state === "done" && (
          <>
            <Check className="size-4" />
            {en ? "Done" : "完了しました"}
          </>
        )}
      </button>
    </div>
  );
}
