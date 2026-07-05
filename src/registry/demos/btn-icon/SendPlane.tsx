import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "送信フライト",
  category: "ボタン",
  description: "クリックで紙飛行機が飛び去り、送信完了に切り替わるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

type State = "idle" | "sending" | "sent";

export default function SendPlane() {
  const [state, setState] = useState<State>("idle");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    if (state !== "idle") return;
    setState("sending");
    window.setTimeout(() => setState("sent"), 600);
    window.setTimeout(() => setState("idle"), 2600);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={state !== "idle"}
        className="inline-flex min-w-[10rem] items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 active:scale-[0.97]"
      >
        {state === "sent" ? (
          <>
            <Check className="size-4" />
            {en ? "Sent" : "送信しました"}
          </>
        ) : (
          <>
            <Send
              className={cn(
                "size-4 transition-all duration-500 ease-in",
                state === "sending"
                  ? "translate-x-8 -translate-y-8 opacity-0"
                  : "translate-x-0 translate-y-0 opacity-100"
              )}
            />
            {en ? "Send" : "送信する"}
          </>
        )}
      </button>
    </div>
  );
}
