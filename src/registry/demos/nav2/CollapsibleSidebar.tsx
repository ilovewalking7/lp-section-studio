import { useState } from "react";
import {
  ChevronLeft,
  Folder,
  Home,
  Inbox,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "折りたたみサイドバー",
  category: "ナビゲーション",
  description:
    "幅をアニメーションで切り替えるサイドバー。折りたたむとアイコンのみ表示しラベルがフェードアウト。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Nav = { icon: LucideIcon; ja: string; en: string };

const NAV: Nav[] = [
  { icon: Home, ja: "ホーム", en: "Home" },
  { icon: Inbox, ja: "受信箱", en: "Inbox" },
  { icon: Folder, ja: "プロジェクト", en: "Projects" },
  { icon: Users, ja: "メンバー", en: "Members" },
  { icon: PieChart, ja: "レポート", en: "Reports" },
  { icon: Settings, ja: "設定", en: "Settings" },
];

export default function CollapsibleSidebar() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Home");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const activeNav = NAV.find((n) => n.en === active);

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-6">
      <div className="mx-auto flex h-80 max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <aside
          className={cn(
            "flex flex-col border-r bg-card transition-[width] duration-300 ease-in-out",
            open ? "w-52" : "w-16"
          )}
        >
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              N
            </span>
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap font-semibold transition-all duration-200",
                open ? "w-auto opacity-100" : "w-0 opacity-0"
              )}
            >
              Nimbus
            </span>
          </div>
          <nav className="flex-1 space-y-1 p-2">
            {NAV.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.en}
                  type="button"
                  onClick={() => setActive(n.en)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active === n.en
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span
                    className={cn(
                      "overflow-hidden whitespace-nowrap transition-all duration-200",
                      open ? "w-auto opacity-100" : "w-0 opacity-0"
                    )}
                  >
                    {en ? n.en : n.ja}
                  </span>
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={en ? "Toggle sidebar" : "サイドバーを開閉"}
            aria-expanded={open}
            className="m-2 flex items-center justify-center gap-2 rounded-lg border py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            <ChevronLeft
              className={cn("size-4 transition-transform duration-300", !open && "rotate-180")}
            />
            {open && <span>{en ? "Collapse" : "折りたたむ"}</span>}
          </button>
        </aside>
        <main className="flex-1 p-6">
          <h3 className="text-sm font-medium">
            {activeNav ? (en ? activeNav.en : activeNav.ja) : active}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground">
            {en
              ? "The width transitions smoothly with the toggle button."
              : "サイドバーの開閉ボタンで幅が滑らかに変化します。"}
          </p>
        </main>
      </div>
    </div>
  );
}
