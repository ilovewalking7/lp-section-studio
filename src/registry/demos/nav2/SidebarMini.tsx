import { useState } from "react";
import {
  BarChart3,
  Bookmark,
  Hexagon,
  Home,
  Search,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニサイドバー展開",
  category: "ナビゲーション",
  description:
    "通常はアイコンのみのミニサイドバー。ホバーで横に展開しラベルがスライドして現れる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Nav = { icon: LucideIcon; ja: string; en: string };

const NAV: Nav[] = [
  { icon: Home, ja: "ダッシュボード", en: "Dashboard" },
  { icon: Search, ja: "検索", en: "Search" },
  { icon: BarChart3, ja: "分析", en: "Analytics" },
  { icon: Bookmark, ja: "保存済み", en: "Saved" },
  { icon: Settings, ja: "設定", en: "Settings" },
];

export default function SidebarMini() {
  const [active, setActive] = useState("Dashboard");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const activeNav = NAV.find((n) => n.en === active);

  return (
    <div className="w-full bg-muted/30 p-4 sm:p-6">
      <div className="mx-auto flex h-72 max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <aside className="group/side w-16 shrink-0 border-r bg-card transition-[width] duration-300 ease-in-out hover:w-52">
          <div className="flex h-14 items-center gap-3 overflow-hidden border-b px-[18px]">
            <Hexagon className="size-6 shrink-0 text-primary" />
            <span className="whitespace-nowrap font-semibold opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
              Vertex
            </span>
          </div>
          <nav className="space-y-1 p-2">
            {NAV.map((n) => {
              const Icon = n.icon;
              const on = active === n.en;
              return (
                <button
                  key={n.en}
                  type="button"
                  title={en ? n.en : n.ja}
                  onClick={() => setActive(n.en)}
                  className={cn(
                    "flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 transition-colors",
                    on
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="whitespace-nowrap text-sm opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
                    {en ? n.en : n.ja}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {en ? "Hover the sidebar to expand" : "サイドバーにホバーして展開"}
          </p>
          <h3 className="mt-2 text-sm font-medium">
            {activeNav ? (en ? activeNav.en : activeNav.ja) : active}
          </h3>
        </main>
      </div>
    </div>
  );
}
