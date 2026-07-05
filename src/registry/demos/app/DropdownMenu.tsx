import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Copy,
  LogOut,
  Pencil,
  Settings,
  Share2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドロップダウンメニュー",
  category: "アプリUI",
  description: "アイコン付き項目・区切り線・破壊的操作を含む、外側クリックで閉じるメニュー。",
  align: "center",
};

type Item = {
  icon: typeof Pencil;
  ja: string;
  en: string;
  shortcut?: string;
  destructive?: boolean;
};

const ITEMS: Item[] = [
  { icon: Pencil, ja: "編集", en: "Edit", shortcut: "E" },
  { icon: Copy, ja: "複製", en: "Duplicate", shortcut: "D" },
  { icon: Share2, ja: "共有", en: "Share", shortcut: "S" },
  { icon: Settings, ja: "設定", en: "Settings" },
];

export default function DropdownMenu() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white">
          A
        </div>
        {en ? "Options" : "オプション"}
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute left-0 top-full z-30 mt-2 w-56 origin-top-left rounded-lg border bg-card p-1 shadow-xl transition-all duration-150",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.en}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-left">{en ? item.en : item.ja}</span>
              {item.shortcut && (
                <kbd className="text-[10px] font-medium tracking-wider text-muted-foreground">
                  ⌘{item.shortcut}
                </kbd>
              )}
            </button>
          );
        })}

        <div className="my-1 h-px bg-border" role="separator" />

        <button
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
        >
          <LogOut className="h-4 w-4" />
          <span className="flex-1 text-left">{en ? "Log out" : "ログアウト"}</span>
        </button>

        <button
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-rose-500 transition-colors hover:bg-rose-500/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="flex-1 text-left">{en ? "Delete" : "削除"}</span>
        </button>
      </div>
    </div>
  );
}
