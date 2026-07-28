import { useState } from "react";
import { ArrowUp, Paperclip, Sparkles, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "発光プロンプト入力",
  category: "AI / チャット",
  description: "フォーカスでグラデが流れる発光リング付きの入力欄。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

export default function PromptComposerGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full max-w-[560px]">
      <style>{`
        @keyframes ai2-glow-spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="relative">
        <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
          <div
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500",
              focused && "opacity-100"
            )}
            style={{
              background:
                "conic-gradient(from 0deg, #8b5cf6, #38bdf8, #d946ef, #8b5cf6)",
              animation: "ai2-glow-spin 4s linear infinite",
            }}
          />
        </div>
        <div className="relative rounded-2xl border bg-card p-2 shadow-xl">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={3}
            placeholder={en ? "Ask me anything…" : "何でも聞いてください…"}
            className="w-full resize-none bg-transparent px-3 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between px-1 pb-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={en ? "Attach a file" : "ファイルを添付"}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Paperclip className="size-4" />
              </button>
              <button
                type="button"
                aria-label={en ? "Voice input" : "音声入力"}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Mic className="size-4" />
              </button>
              <span className="ml-1 flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-500">
                <Sparkles className="size-3" />
                Pro
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {value.length}/2000
              </span>
              <button
                type="button"
                disabled={!value.trim()}
                aria-label={en ? "Send" : "送信"}
                className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-sky-600 text-white shadow-md transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        {en ? "Enter to send, Shift+Enter for a new line" : "Enter で送信、Shift+Enter で改行"}
      </p>
    </div>
  );
}
