import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "展開する検索バー",
  category: "インタラクション",
  description: "検索アイコンが滑らかに幅を広げて入力欄へ変化する。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "search"],
};

export default function ExpandableSearch() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node) && !value) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, value]);

  return (
    <div className="flex min-h-[6rem] w-full items-center justify-center">
      <div
        ref={rootRef}
        className={cn(
          "flex items-center overflow-hidden rounded-full border bg-card shadow-sm transition-[width,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]",
          open ? "w-72 shadow-md ring-2 ring-primary/30" : "w-11"
        )}
      >
        <button
          type="button"
          aria-label={en ? "Open search" : "検索を開く"}
          onClick={() => setOpen(true)}
          className="flex size-11 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <Search className="size-4" />
        </button>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && (setValue(""), setOpen(false))}
          placeholder={en ? "Search…" : "検索…"}
          tabIndex={open ? 0 : -1}
          className="min-w-0 flex-1 bg-transparent py-2.5 pr-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          aria-label={en ? "Clear" : "クリア"}
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
          className={cn(
            "mr-2 flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted",
            open && value ? "scale-100 opacity-100" : "pointer-events-none scale-50 opacity-0"
          )}
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
