import { useState } from "react";
import { Bell, Home, Plus, Search, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モバイルタブバー",
  category: "ナビゲーション",
  description:
    "中央にFABを配したモバイル下部タブバー（4項目+アクティブ強調）。スマホ幅フレーム内に表示。",
  align: "center",
  isNew: true,
  tags: ["navigation", "mobile", "tabbar"],
  principle:
    "主要導線を親指の届く下部に集約し（フィッツの法則/サムゾーン）、中央FABで第一級アクションを際立たせる。",
};

type Tab = { icon: LucideIcon; label: string; labelEn: string; badge?: number };

const TABS: Tab[] = [
  { icon: Home, label: "ホーム", labelEn: "Home" },
  { icon: Search, label: "検索", labelEn: "Search" },
  { icon: Bell, label: "通知", labelEn: "Alerts", badge: 3 },
  { icon: User, label: "マイ", labelEn: "Profile" },
];

export default function MobileTabBar() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState("ホーム");

  return (
    <div className="w-full bg-muted/30 p-6">
      <div className="mx-auto w-[20rem] overflow-hidden rounded-[2rem] border-4 border-foreground/10 bg-background shadow-xl">
        <div className="h-[26rem] bg-gradient-to-b from-muted/40 to-background p-5">
          <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-foreground/15" />
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {en ? "Selected" : "選択中"}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {en ? TABS.find((t) => t.label === active)?.labelEn ?? active : active}
          </p>
          <div className="mt-5 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <div className="h-2.5 w-1/3 rounded-full bg-muted" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-muted/60" />
              </div>
            ))}
          </div>
        </div>

        <nav
          aria-label={en ? "Bottom navigation" : "下部ナビゲーション"}
          className="relative grid grid-cols-5 items-center border-t bg-card/95 px-2 pb-3 pt-2 backdrop-blur"
        >
          {TABS.slice(0, 2).map((tab) => (
            <TabButton key={tab.label} tab={tab} active={active} onClick={setActive} />
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              aria-label={en ? "Create new" : "新規作成"}
              className="-mt-7 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-card transition-transform hover:scale-105 active:scale-95"
            >
              <Plus className="size-6" />
            </button>
          </div>

          {TABS.slice(2).map((tab) => (
            <TabButton key={tab.label} tab={tab} active={active} onClick={setActive} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: Tab;
  active: string;
  onClick: (label: string) => void;
}) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const Icon = tab.icon;
  const on = active === tab.label;
  return (
    <button
      type="button"
      onClick={() => onClick(tab.label)}
      aria-current={on ? "page" : undefined}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg py-1 text-[11px] font-medium transition-colors",
        on ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="relative">
        <Icon className={cn("size-5", on && "fill-primary/10")} />
        {tab.badge && (
          <span className="absolute -right-1.5 -top-1 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
            {tab.badge}
          </span>
        )}
      </span>
      {en ? tab.labelEn : tab.label}
    </button>
  );
}
