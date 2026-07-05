import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Cog,
  CreditCard,
  FileText,
  Folder,
  Home,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "サイドバーナビ",
  category: "ナビゲーション",
  description:
    "セクション・アイコン・アクティブ状態・折りたたみグループ・ユーザーフッターを備えたアプリ用サイドバー。",
  align: "center",
  isNew: true,
  tags: ["navigation", "sidebar", "app"],
  principle:
    "頻度の高い項目を上部に固定し、関連項目を折りたたみグループにまとめることで走査コストを削減（情報設計）。明確なアクティブ状態で現在地を即座に伝える。",
};

type Item = { icon: LucideIcon; label: string; labelEn: string; badge?: string };

const MAIN: Item[] = [
  { icon: Home, label: "ホーム", labelEn: "Home" },
  { icon: BarChart3, label: "分析", labelEn: "Analytics", badge: "12" },
  { icon: Folder, label: "プロジェクト", labelEn: "Projects" },
];

const WORKSPACE: Item[] = [
  { icon: Users, label: "メンバー", labelEn: "Members" },
  { icon: FileText, label: "ドキュメント", labelEn: "Documents" },
  { icon: CreditCard, label: "請求", labelEn: "Billing" },
];

export default function SidebarNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState("分析");
  const [groupOpen, setGroupOpen] = useState(true);

  const Row = ({ item }: { item: Item }) => {
    const Icon = item.icon;
    const on = active === item.label;
    return (
      <button
        type="button"
        onClick={() => setActive(item.label)}
        aria-current={on ? "page" : undefined}
        className={cn(
          "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          on
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        <Icon
          className={cn(
            "size-4 shrink-0",
            on ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span className="flex-1 text-left">{en ? item.labelEn : item.label}</span>
        {item.badge && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              on ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
            )}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full bg-muted/30 p-6">
      <aside className="mx-auto flex h-[30rem] w-64 flex-col rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            N
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Nimbus Inc.</p>
            <p className="truncate text-xs text-muted-foreground">
              {en ? "Pro plan" : "Pro プラン"}
            </p>
          </div>
        </div>

        <div className="px-3 pb-2">
          <label className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-ring">
            <Search className="size-4 shrink-0" />
            <input
              placeholder={en ? "Search" : "検索"}
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              aria-label={en ? "Search the sidebar" : "サイドバー内を検索"}
            />
            <kbd className="rounded border bg-muted px-1 text-[10px]">⌘K</kbd>
          </label>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2" aria-label={en ? "Sidebar" : "サイドバー"}>
          {MAIN.map((item) => (
            <Row key={item.label} item={item} />
          ))}

          <div className="pt-3">
            <button
              type="button"
              onClick={() => setGroupOpen((v) => !v)}
              aria-expanded={groupOpen}
              className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {en ? "Workspace" : "ワークスペース"}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  !groupOpen && "-rotate-90"
                )}
              />
            </button>
            {groupOpen && (
              <div className="mt-1 space-y-1">
                {WORKSPACE.map((item) => (
                  <Row key={item.label} item={item} />
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="border-t p-2">
          <Row item={{ icon: Cog, label: "設定", labelEn: "Settings" }} />
          <div className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-semibold text-white">
              YK
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {en ? "Kenta Yamada" : "山田 健太"}
              </p>
              <p className="truncate text-xs text-muted-foreground">kenta@nimbus.io</p>
            </div>
            <button
              type="button"
              aria-label={en ? "Log out" : "ログアウト"}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
