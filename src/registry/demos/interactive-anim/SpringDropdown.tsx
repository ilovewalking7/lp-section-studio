import { useEffect, useRef, useState } from "react";
import { ChevronDown, CreditCard, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スプリングドロップダウン",
  category: "インタラクション",
  description: "原点からバネのように開き、外側クリックで閉じるメニュー。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "dropdown"],
};

const ITEMS: { icon: typeof User; label: string; labelEn: string; danger?: boolean }[] = [
  { icon: User, label: "プロフィール", labelEn: "Profile" },
  { icon: CreditCard, label: "お支払い", labelEn: "Billing" },
  { icon: Settings, label: "設定", labelEn: "Settings" },
  { icon: LogOut, label: "ログアウト", labelEn: "Log out", danger: true },
];

export default function SpringDropdown() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex min-h-[16rem] w-full items-start justify-center pt-6">
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground">
            T
          </span>
          {en ? "Taro Tanaka" : "田中 太郎"}
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </button>

        <div
          role="menu"
          className={cn(
            "absolute left-0 top-full z-20 mt-2 w-56 origin-top-left rounded-xl border bg-popover p-1.5 shadow-lg transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            open
              ? "scale-100 opacity-100 translate-y-0"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          )}
        >
          {ITEMS.map((item) => (
            <button
              key={item.labelEn}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                item.danger
                  ? "text-destructive hover:bg-destructive/10"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="size-4" />
              {en ? item.labelEn : item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
