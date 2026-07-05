import { useEffect, useRef, useState } from "react";
import { Bell, Search, Waves, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "展開する検索ナビ",
  category: "ナビゲーション",
  description:
    "検索アイコンをタップすると入力欄が横に伸びてナビリンクを覆い隠す、展開式の検索バー。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const LINKS = [
  { ja: "ホーム", en: "Home" },
  { ja: "発見", en: "Discover" },
  { ja: "ライブラリ", en: "Library" },
];

export default function SearchExpand() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto max-w-2xl">
        <nav className="flex items-center gap-3 rounded-xl border bg-background px-4 py-2.5 shadow-sm">
          <div className="flex shrink-0 items-center gap-2 font-semibold">
            <Waves className="size-5 text-primary" />
            <span className="hidden sm:inline">Tide</span>
          </div>

          <ul
            className={cn(
              "flex items-center gap-1 transition-all duration-300",
              open ? "pointer-events-none w-0 overflow-hidden opacity-0" : "opacity-100"
            )}
          >
            {LINKS.map((l) => (
              <li key={l.en}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {en ? l.en : l.ja}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex flex-1 items-center justify-end gap-2">
            <div
              className={cn(
                "flex items-center overflow-hidden rounded-full border bg-muted/50 transition-all duration-300 ease-out",
                open ? "w-full max-w-full opacity-100" : "w-9 max-w-9 opacity-100"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? (en ? "Close search" : "検索を閉じる") : en ? "Search" : "検索"}
                className="grid size-9 shrink-0 place-items-center text-muted-foreground"
              >
                {open ? <X className="size-4" /> : <Search className="size-4" />}
              </button>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                tabIndex={open ? 0 : -1}
                placeholder={en ? "Search…" : "検索…"}
                aria-label={en ? "Search" : "検索"}
                className={cn(
                  "h-9 min-w-0 flex-1 bg-transparent pr-3 text-sm outline-none placeholder:text-muted-foreground transition-opacity",
                  open ? "opacity-100" : "pointer-events-none w-0 opacity-0"
                )}
              />
            </div>
            <button
              type="button"
              aria-label={en ? "Notifications" : "通知"}
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full border text-muted-foreground transition-all hover:text-foreground",
                open && "pointer-events-none scale-0 opacity-0"
              )}
            >
              <Bell className="size-4" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
