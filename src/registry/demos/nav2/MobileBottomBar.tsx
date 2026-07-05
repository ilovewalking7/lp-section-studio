import { useState } from "react";
import { Heart, Home, PlusCircle, Search, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "モバイル下部バー",
  category: "ナビゲーション",
  description:
    "選択中のタブにインジケータがスライドするモバイル用ボトムナビ。中央に強調アクション。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Tab = { icon: LucideIcon; ja: string; en: string; primary?: boolean };

const TABS: Tab[] = [
  { icon: Home, ja: "ホーム", en: "Home" },
  { icon: Search, ja: "検索", en: "Search" },
  { icon: PlusCircle, ja: "投稿", en: "Post", primary: true },
  { icon: Heart, ja: "アクティビティ", en: "Activity" },
  { icon: User, ja: "プロフィール", en: "Profile" },
];

export default function MobileBottomBar() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl border bg-background shadow-lg">
        <div className="grid h-48 place-items-center bg-gradient-to-b from-muted/40 to-background text-sm text-muted-foreground">
          {en
            ? `${TABS[active].en} screen`
            : `${TABS[active].ja}画面`}
        </div>
        <nav className="relative border-t bg-card/80 backdrop-blur">
          <div className="relative grid grid-cols-5">
            <span
              className="absolute top-0 h-0.5 w-1/5 rounded-full bg-primary transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const on = active === i;
              return (
                <button
                  key={t.en}
                  type="button"
                  aria-label={en ? t.en : t.ja}
                  aria-current={on ? "page" : undefined}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-0.5 py-2.5"
                >
                  <span
                    className={cn(
                      "grid place-items-center transition-all duration-200",
                      t.primary && "-mt-5 size-11 rounded-full bg-primary text-primary-foreground shadow-lg",
                      !t.primary && (on ? "text-primary" : "text-muted-foreground"),
                      !t.primary && on && "-translate-y-0.5"
                    )}
                  >
                    <Icon className={cn(t.primary ? "size-5" : "size-5")} />
                  </span>
                  {!t.primary && (
                    <span
                      className={cn(
                        "text-[10px] transition-colors",
                        on ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {en ? t.en : t.ja}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
