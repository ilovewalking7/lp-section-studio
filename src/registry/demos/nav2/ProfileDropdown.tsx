import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロフィールメニュー",
  category: "ナビゲーション",
  description:
    "アバターからフェード&スライドで開くアカウントメニュー。外側クリックで閉じる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Item = { icon: LucideIcon; ja: string; en: string; danger?: boolean };

const ITEMS: Item[] = [
  { icon: User, ja: "プロフィール", en: "Profile" },
  { icon: CreditCard, ja: "請求と支払い", en: "Billing" },
  { icon: Settings, ja: "設定", en: "Settings" },
  { icon: Sparkles, ja: "Pro にアップグレード", en: "Upgrade to Pro" },
  { icon: LogOut, ja: "ログアウト", en: "Log out", danger: true },
];

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto flex max-w-md justify-end" ref={ref}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="flex items-center gap-2 rounded-full border bg-background py-1 pl-1 pr-3 transition-colors hover:bg-accent"
          >
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
              {en ? "S" : "さ"}
            </span>
            <span className="text-sm font-medium">
              {en ? "Sakura Sato" : "佐藤 さくら"}
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          <div
            role="menu"
            className={cn(
              "absolute right-0 top-12 z-20 w-60 origin-top-right transition-all duration-200",
              open
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-95 opacity-0"
            )}
          >
            <div className="overflow-hidden rounded-xl border bg-popover shadow-xl">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-medium">
                  {en ? "Sakura Sato" : "佐藤 さくら"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  sakura@example.com
                </p>
              </div>
              <div className="p-1.5">
                {ITEMS.map((it) => {
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.en}
                      type="button"
                      role="menuitem"
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        it.danger
                          ? "text-destructive hover:bg-destructive/10"
                          : "hover:bg-accent"
                      )}
                    >
                      <Icon className="size-4" />
                      {en ? it.en : it.ja}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
