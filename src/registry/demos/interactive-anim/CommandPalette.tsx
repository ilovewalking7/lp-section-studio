import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  FileText,
  Home,
  Search,
  Settings,
  User,
  Plus,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドパレット",
  category: "インタラクション",
  description: "⌘Kで開く検索パレット。ふわっと開いてリストを即時フィルタ。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "command"],
};

const COMMANDS = [
  { icon: Home, label: "ホームへ移動", labelEn: "Go to home", hint: "ナビ", hintEn: "Nav" },
  { icon: FileText, label: "新規ドキュメント", labelEn: "New document", hint: "作成", hintEn: "Create" },
  { icon: User, label: "プロフィールを開く", labelEn: "Open profile", hint: "アカウント", hintEn: "Account" },
  { icon: Settings, label: "設定を開く", labelEn: "Open settings", hint: "アカウント", hintEn: "Account" },
  { icon: Plus, label: "メンバーを招待", labelEn: "Invite members", hint: "チーム", hintEn: "Team" },
  { icon: Moon, label: "ダークモード切替", labelEn: "Toggle dark mode", hint: "外観", hintEn: "Appearance" },
] as const;

export default function CommandPalette() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () =>
      COMMANDS.filter((c) =>
        (en ? c.labelEn : c.label).toLowerCase().includes(query.toLowerCase())
      ),
    [query, en]
  );

  useEffect(() => {
    if (open) {
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  return (
    <div className="relative flex min-h-[20rem] w-full max-w-lg flex-col items-center justify-start overflow-hidden rounded-xl border bg-muted/30 p-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted"
      >
        <Search className="size-4" />
        {en ? "Search commands…" : "コマンドを検索…"}
        <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5 text-xs font-medium">⌘K</kbd>
      </button>

      <div
        className={cn(
          "absolute inset-0 z-10 flex items-start justify-center bg-background/60 p-4 pt-10 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={en ? "Command palette" : "コマンドパレット"}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "w-full max-w-md overflow-hidden rounded-xl border bg-popover shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            open ? "scale-100 translate-y-0 opacity-100" : "scale-95 -translate-y-2 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 border-b px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(results.length - 1, a + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(0, a - 1));
                } else if (e.key === "Escape") {
                  setOpen(false);
                } else if (e.key === "Enter" && results[active]) {
                  setOpen(false);
                }
              }}
              placeholder={en ? "Type a command or search…" : "コマンドや検索語を入力…"}
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto p-1.5">
            {results.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                {en ? "No results found" : "結果が見つかりません"}
              </li>
            )}
            {results.map((cmd, i) => (
              <li key={cmd.labelEn}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active === i ? "bg-primary/10 text-foreground" : "text-muted-foreground"
                  )}
                >
                  <cmd.icon className="size-4" />
                  <span className="flex-1 text-left">{en ? cmd.labelEn : cmd.label}</span>
                  <span className="text-xs text-muted-foreground">{en ? cmd.hintEn : cmd.hint}</span>
                  <ArrowRight
                    className={cn(
                      "size-3.5 transition-all",
                      active === i ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
