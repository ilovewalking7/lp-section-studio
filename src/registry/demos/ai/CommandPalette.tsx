import { useMemo, useState } from "react";
import {
  FileText,
  type LucideIcon,
  MessageSquarePlus,
  Moon,
  Search,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドパレット",
  category: "AI / チャット",
  description: "検索でフィルタできる⌘K形式のコマンド一覧。",
  align: "center",
};

type Command = {
  id: string;
  ja: string;
  en: string;
  groupJa: string;
  groupEn: string;
  icon: LucideIcon;
  keys: string[];
};

const commands: Command[] = [
  { id: "new", ja: "新しいチャット", en: "New chat", groupJa: "操作", groupEn: "Actions", icon: MessageSquarePlus, keys: ["⌘", "N"] },
  { id: "ask", ja: "AIに質問する", en: "Ask AI", groupJa: "操作", groupEn: "Actions", icon: Sparkles, keys: ["⌘", "J"] },
  { id: "docs", ja: "ドキュメントを開く", en: "Open docs", groupJa: "移動", groupEn: "Go to", icon: FileText, keys: ["G", "D"] },
  { id: "settings", ja: "設定を開く", en: "Open settings", groupJa: "移動", groupEn: "Go to", icon: Settings, keys: ["⌘", ","] },
  { id: "theme", ja: "テーマを切り替え", en: "Toggle theme", groupJa: "表示", groupEn: "View", icon: Moon, keys: ["⌘", "T"] },
  { id: "clear", ja: "会話を削除", en: "Delete conversation", groupJa: "操作", groupEn: "Actions", icon: Trash2, keys: ["⌘", "⌫"] },
];

export default function CommandPalette() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      (en ? c.en : c.ja).toLowerCase().includes(q)
    );
  }, [query, en]);

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      const group = en ? c.groupEn : c.groupJa;
      const list = map.get(group) ?? [];
      list.push(c);
      map.set(group, list);
    }
    return [...map.entries()];
  }, [filtered, en]);

  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-xl border bg-popover shadow-2xl">
      <div className="flex items-center gap-2.5 border-b px-3.5">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder={en ? "Search commands…" : "コマンドを検索…"}
          className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <kbd className="hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          ESC
        </kbd>
      </div>

      <div className="max-h-[300px] overflow-y-auto p-1.5">
        {groups.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            {en
              ? `No results match "${query}"`
              : `「${query}」に一致する結果はありません`}
          </p>
        ) : (
          groups.map(([group, items]) => (
            <div key={group} className="mb-1">
              <p className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {group}
              </p>
              {items.map((c, i) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent",
                      i === 0 && group === groups[0][0] && "bg-accent/50"
                    )}
                  >
                    <Icon className="size-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="flex-1 text-foreground">
                      {en ? c.en : c.ja}
                    </span>
                    <span className="flex items-center gap-1">
                      {c.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
