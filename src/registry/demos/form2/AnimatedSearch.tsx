import { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ検索バー",
  category: "フォーム",
  description: "フォーカスで横に伸びる検索バー。候補がふわっと現れる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

const SUGGESTIONS = [
  { ja: "ダッシュボード", en: "Dashboard" },
  { ja: "請求設定", en: "Billing settings" },
  { ja: "チームメンバー", en: "Team members" },
  { ja: "APIキー", en: "API keys" },
];

export default function AnimatedSearch() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = SUGGESTIONS.filter((s) =>
    (en ? s.en : s.ja).includes(q)
  );

  return (
    <div className="flex min-h-[260px] w-full max-w-md items-start justify-center pt-8">
      <style>{`@keyframes as-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="w-full">
        <div
          className={cn(
            "relative flex items-center rounded-full border bg-white shadow-sm transition-all duration-300 dark:bg-slate-900",
            focused
              ? "border-violet-500 shadow-lg shadow-violet-500/20 ring-2 ring-violet-500/20"
              : "border-slate-300 dark:border-slate-700"
          )}
        >
          <Search className={cn("ml-4 h-4 w-4 transition-colors", focused ? "text-violet-500" : "text-slate-400")} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            placeholder={en ? "Search…" : "検索…"}
            className="w-full bg-transparent px-3 py-3 text-sm outline-none dark:text-white"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label={en ? "Clear" : "クリア"}
              className="mr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {focused && (
          <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900" style={{ animation: "as-in .2s ease-out" }}>
            <p className="flex items-center gap-1.5 px-4 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">
              <TrendingUp className="h-3 w-3" /> {en ? "Suggestions" : "候補"}
            </p>
            {(filtered.length ? filtered : SUGGESTIONS).map((s, i) => (
              <button
                key={s.en}
                type="button"
                onClick={() => setQ(en ? s.en : s.ja)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-violet-50 dark:text-slate-200 dark:hover:bg-violet-500/10"
                style={{ animation: `as-in .25s ease-out ${i * 40}ms both` }}
              >
                <Search className="h-3.5 w-3.5 text-slate-400" /> {en ? s.en : s.ja}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
