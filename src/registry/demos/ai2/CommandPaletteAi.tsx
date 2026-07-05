import { useMemo, useState } from "react";
import {
  ArrowRight,
  CornerDownLeft,
  FileText,
  MessageSquarePlus,
  Search,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドパレット (⌘K)",
  category: "AI / チャット",
  description: "AIアクションを絞り込み実行する⌘K風パレット。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Cmd = {
  id: string;
  icon: typeof Search;
  labelJa: string;
  labelEn: string;
  hintJa: string;
  hintEn: string;
};

const COMMANDS: Cmd[] = [
  { id: "new", icon: MessageSquarePlus, labelJa: "新しいチャットを開始", labelEn: "Start a new chat", hintJa: "アクション", hintEn: "Action" },
  { id: "summarize", icon: FileText, labelJa: "選択範囲を要約", labelEn: "Summarize selection", hintJa: "AI", hintEn: "AI" },
  { id: "improve", icon: Wand2, labelJa: "文章を改善する", labelEn: "Improve writing", hintJa: "AI", hintEn: "AI" },
  { id: "ask", icon: Sparkles, labelJa: "AIに質問する", labelEn: "Ask AI", hintJa: "AI", hintEn: "AI" },
  { id: "settings", icon: Settings, labelJa: "設定を開く", labelEn: "Open settings", hintJa: "移動", hintEn: "Go to" },
];

export default function CommandPaletteAi() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) =>
      (en ? c.labelEn : c.labelJa).toLowerCase().includes(q)
    );
  }, [query, en]);

  return (
    <div className="w-full max-w-[520px]">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            autoFocus
            placeholder={en ? "Search commands or ask AI…" : "コマンドを検索またはAIに依頼…"}
            className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              {en ? `No commands match "${query}"` : `「${query}」に一致するコマンドはありません`}
            </div>
          ) : (
            filtered.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  i === active ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                <c.icon
                  className={cn(
                    "size-4 shrink-0",
                    c.hintEn === "AI" ? "text-violet-500" : "text-muted-foreground"
                  )}
                />
                <span className="flex-1 text-sm">{en ? c.labelEn : c.labelJa}</span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {en ? c.hintEn : c.hintJa}
                </span>
                {i === active ? (
                  <CornerDownLeft className="size-3.5 text-muted-foreground" />
                ) : (
                  <ArrowRight className="size-3.5 text-transparent" />
                )}
              </button>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 border-t px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border bg-muted px-1">↑</kbd>
            <kbd className="rounded border bg-muted px-1">↓</kbd>
            {en ? "Navigate" : "移動"}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border bg-muted px-1">↵</kbd>
            {en ? "Run" : "実行"}
          </span>
        </div>
      </div>
    </div>
  );
}
