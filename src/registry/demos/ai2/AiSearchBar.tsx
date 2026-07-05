import { useState } from "react";
import { CornerDownLeft, Loader2, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "AI検索バー",
  category: "AI / チャット",
  description: "AIアシスト付きの大きめ検索バー。送信で擬似ローディング。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const QUICK = [
  { ja: "最新のトレンドは？", en: "What's trending?" },
  { ja: "要約して", en: "Summarize this" },
  { ja: "コードを書いて", en: "Write some code" },
];

export default function AiSearchBar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const submit = () => {
    if (!value.trim() || loading) return;
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1600);
  };

  return (
    <div className="w-full max-w-[560px]">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm transition-all",
          focused && "border-violet-500/50 shadow-lg shadow-violet-500/10"
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-white">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder={en ? "Ask or search anything with AI…" : "AIに何でも質問・検索…"}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {value ? (
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-xs font-medium text-violet-500 transition-colors hover:bg-violet-500/20 disabled:opacity-50"
          >
            <CornerDownLeft className="size-3.5" />
            {en ? "Search" : "検索"}
          </button>
        ) : (
          <Search className="size-4 shrink-0 text-muted-foreground" />
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 px-1">
        {QUICK.map((q) => (
          <button
            key={q.ja}
            type="button"
            onClick={() => setValue(en ? q.en : q.ja)}
            className="rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-violet-500/40 hover:text-foreground"
          >
            {en ? q.en : q.ja}
          </button>
        ))}
      </div>
    </div>
  );
}
