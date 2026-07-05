import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CornerDownLeft,
  FileText,
  Hash,
  Moon,
  Search,
  Settings,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドパレット ⌘K",
  category: "ナビゲーション",
  description:
    "⌘K / Ctrl+K で開閉するコマンドパレット。ズームインで出現し、矢印キーで候補を移動できる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Cmd = { icon: LucideIcon; ja: string; en: string; hint?: string };

const CMDS: Cmd[] = [
  { icon: FileText, ja: "新規ドキュメント", en: "New document", hint: "N" },
  { icon: Hash, ja: "チャンネルへ移動", en: "Go to channel" },
  { icon: User, ja: "プロフィールを開く", en: "Open profile", hint: "G P" },
  { icon: Settings, ja: "設定を開く", en: "Open settings", hint: "," },
  { icon: Moon, ja: "ダークモード切替", en: "Toggle dark mode" },
];

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const results = useMemo(
    () =>
      CMDS.filter((c) =>
        (en ? c.en : c.ja).toLowerCase().includes(q.trim().toLowerCase())
      ),
    [q, en]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  return (
    <div className="relative w-full bg-muted/30 p-6 sm:p-10">
      <div className="relative mx-auto grid h-72 max-w-2xl place-items-center overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/40 to-background">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 rounded-xl border bg-background px-4 py-2.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent"
        >
          <Search className="size-4" />
          {en ? "Search commands…" : "コマンドを検索…"}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>

        {open && (
          <div
            className="absolute inset-0 z-20 grid place-items-start justify-center bg-background/60 p-4 pt-10 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-label={en ? "Command palette" : "コマンドパレット"}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md origin-top animate-[cmdpop_180ms_ease-out] overflow-hidden rounded-xl border bg-popover shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b px-4">
                <Search className="size-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((a) => Math.min(results.length - 1, a + 1));
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((a) => Math.max(0, a - 1));
                    }
                  }}
                  placeholder={en ? "Type a command…" : "操作を入力…"}
                  aria-label={en ? "Search commands" : "コマンドを検索"}
                  className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <ul className="max-h-56 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    {en ? "No results" : "結果なし"}
                  </li>
                ) : (
                  results.map((c, i) => {
                    const Icon = c.icon;
                    const on = i === active;
                    return (
                      <li key={c.en}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          aria-selected={on}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                            on ? "bg-accent text-accent-foreground" : "text-foreground"
                          )}
                        >
                          <Icon className="size-4 text-muted-foreground" />
                          <span className="flex-1">{en ? c.en : c.ja}</span>
                          {c.hint && (
                            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {c.hint}
                            </kbd>
                          )}
                          {on && <ArrowRight className="size-4 text-muted-foreground" />}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
              <div className="flex items-center gap-1.5 border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
                <CornerDownLeft className="size-3" />{" "}
                {en ? "Run · ESC to close" : "実行 · ESC で閉じる"}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes cmdpop{from{opacity:0;transform:scale(.96) translateY(-6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
