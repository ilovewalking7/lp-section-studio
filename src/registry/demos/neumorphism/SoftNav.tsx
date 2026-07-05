import { useState } from "react";
import { Bell, Compass, Home, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトナビ",
  category: "ニューモーフィズム",
  description: "押し込み式のアクティブ状態を持つ、柔らかなピルタブのトップナビ。",
  align: "full",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "nav"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff]";

const tabs = [
  { id: "home", icon: Home, label: "ホーム", labelEn: "Home" },
  { id: "explore", icon: Compass, label: "探索", labelEn: "Explore" },
  { id: "search", icon: Search, label: "検索", labelEn: "Search" },
  { id: "profile", icon: User, label: "プロフィール", labelEn: "Profile" },
];

export default function SoftNav() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full rounded-3xl bg-[#e0e5ec] p-5 text-slate-600">
      <nav className={cn("flex items-center justify-between gap-4 rounded-2xl bg-[#e0e5ec] p-3", RAISED)}>
        <div className="flex items-center gap-2 pl-2">
          <span className={cn("grid size-9 place-items-center rounded-xl bg-[#e0e5ec] text-indigo-500", RAISED)}>
            <span className="text-sm font-bold">S</span>
          </span>
          <span className="hidden text-sm font-semibold text-slate-700 sm:block">Soft Studio</span>
        </div>

        <div className={cn("flex flex-1 justify-center gap-1 rounded-2xl bg-[#e0e5ec] p-1.5", INSET)}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition sm:px-4",
                active === i
                  ? "bg-[#e0e5ec] text-indigo-600 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <t.icon className="size-4" />
              <span className="hidden md:inline">{en ? t.labelEn : t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-1">
          <button aria-label={en ? "Notifications" : "通知"} className={cn("grid size-10 place-items-center rounded-xl bg-[#e0e5ec] text-slate-500 transition active:scale-95", RAISED)}>
            <Bell className="size-5" />
          </button>
          <button aria-label={en ? "Settings" : "設定"} className={cn("grid size-10 place-items-center rounded-xl bg-[#e0e5ec] text-slate-500 transition active:scale-95", RAISED)}>
            <Settings className="size-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
