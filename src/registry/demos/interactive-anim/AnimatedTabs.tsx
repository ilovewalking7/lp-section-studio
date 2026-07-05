import { useState } from "react";
import { Compass, Flame, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ付きタブ",
  category: "インタラクション",
  description: "アクティブなピルがスライドし、パネルがクロスフェードするタブ。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "tabs"],
};

const TABS = [
  { id: "trending", label: "トレンド", labelEn: "Trending", icon: Flame, body: "いま注目の話題を厳選してお届け。リアルタイムで更新されます。", bodyEn: "A curated feed of what's hot right now, updated in real time." },
  { id: "new", label: "新着", labelEn: "New", icon: Sparkles, body: "公開されたばかりの最新コンテンツをチェックしましょう。", bodyEn: "Check out the freshest content just released." },
  { id: "top", label: "人気", labelEn: "Top", icon: Star, body: "多くのユーザーに支持されている定番のおすすめです。", bodyEn: "Tried-and-true favorites loved by plenty of users." },
  { id: "explore", label: "発見", labelEn: "Explore", icon: Compass, body: "まだ知らない新しいジャンルとの出会いがここに。", bodyEn: "Discover new genres you haven't met yet." },
] as const;

export default function AnimatedTabs() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-md">
      <div className="relative flex rounded-full bg-muted p-1">
        <div
          className="absolute inset-y-1 rounded-full bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `calc((100% - 0.5rem) / ${TABS.length})`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-sm font-medium transition-colors",
                active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              <span className="hidden sm:inline">{en ? tab.labelEn : tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 min-h-[7rem] overflow-hidden rounded-xl border bg-card p-5">
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            aria-hidden={active !== i}
            className={cn(
              "transition-all duration-300",
              active === i
                ? "translate-y-0 opacity-100"
                : "pointer-events-none absolute inset-5 translate-y-2 opacity-0"
            )}
          >
            <div className="mb-1.5 flex items-center gap-2 font-semibold">
              <tab.icon className="size-4 text-primary" />
              {en ? tab.labelEn : tab.label}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{en ? tab.bodyEn : tab.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
