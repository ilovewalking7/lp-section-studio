import { useState } from "react";
import { ArrowUp, Globe, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロンプト入力",
  category: "AI / チャット",
  description: "添付・モデル選択チップ付きの送信フォーム。",
  align: "center",
};

export default function PromptComposer() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const empty = value.trim().length === 0;

  return (
    <div className="w-full max-w-[640px]">
      <div className="rounded-2xl border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/40">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={Math.min(6, Math.max(2, value.split("\n").length))}
          placeholder={en ? "Ask anything…" : "何でも聞いてください…"}
          className="block w-full resize-none bg-transparent px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex items-center justify-between gap-2 px-1 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label={en ? "Attach" : "添付"}
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setWebSearch((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                webSearch
                  ? "border-sky-500/40 bg-sky-500/10 text-sky-400"
                  : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Globe className="size-3.5" />
              {en ? "Web search" : "Web検索"}
            </button>
            <span className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-violet-400" />
              GPT-4o
            </span>
          </div>
          <button
            type="button"
            disabled={empty}
            aria-label={en ? "Send" : "送信"}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg transition-all",
              empty
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
      <p className="mt-2 px-1 text-center text-xs text-muted-foreground">
        {en
          ? "Enter to send, Shift+Enter for a new line"
          : "Enterで送信、Shift+Enterで改行"}
      </p>
    </div>
  );
}
