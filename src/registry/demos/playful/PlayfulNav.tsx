import { useState } from "react";
import { Home, Compass, Heart, Bell, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ・ナビ",
  category: "プレイフル",
  description: "丸いピル型ナビと弾むアクティブ状態。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "nav"],
};

const items = [
  { id: "home", label: "ホーム", labelEn: "Home", icon: Home, color: "#ff8fab" },
  { id: "explore", label: "さがす", labelEn: "Explore", icon: Compass, color: "#4cc9f0" },
  { id: "likes", label: "お気に入り", labelEn: "Likes", icon: Heart, color: "#06d6a0" },
  { id: "news", label: "おしらせ", labelEn: "News", icon: Bell, color: "#ffd166" },
];

export default function PlayfulNav() {
  const [active, setActive] = useState("home");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <nav className="font-rounded w-full">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border-2 border-slate-100 bg-white p-2 pl-5 shadow-[0_10px_0_#eef1f4]">
        <div className="flex items-center gap-2 font-extrabold text-slate-800">
          <span
            className="inline-flex size-9 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "#b388ff" }}
          >
            <Smile className="size-5" />
          </span>
          <span className="hidden sm:inline">{en ? "Pop" : "ぽっぷ"}</span>
        </div>

        <div className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition-all duration-200 sm:px-4",
                  isActive
                    ? "-translate-y-0.5 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                )}
                style={isActive ? { backgroundColor: item.color, boxShadow: `0 5px 0 ${item.color}99` } : undefined}
              >
                <Icon className={cn("size-4 transition-transform", isActive && "scale-110")} />
                <span className={cn("hidden sm:inline", isActive && "inline")}>{en ? item.labelEn : item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          className="rounded-full px-4 py-2 text-sm font-extrabold text-white transition-all hover:brightness-105 active:translate-y-0.5"
          style={{ backgroundColor: "#ff8fab", boxShadow: "0 5px 0 #e26d8c" }}
        >
          {en ? "Log in" : "ログイン"}
        </button>
      </div>
    </nav>
  );
}
