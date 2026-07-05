import { useState } from "react";
import { BarChart2, Bell, LayoutGrid, Mail, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アイコンタブバー",
  category: "ナビゲーション",
  description:
    "アイコン＋ラベルのタブバー。下線インジケータが等幅でスライドし、選択タブが拡大する。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Tab = { icon: LucideIcon; ja: string; en: string; badge?: number };

const TABS: Tab[] = [
  { icon: LayoutGrid, ja: "概要", en: "Overview" },
  { icon: BarChart2, ja: "統計", en: "Stats" },
  { icon: Mail, ja: "受信", en: "Inbox", badge: 3 },
  { icon: Bell, ja: "通知", en: "Alerts" },
  { icon: Settings, ja: "設定", en: "Settings" },
];

export default function TabBarUnderline() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <nav className="relative border-b px-2">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${TABS.length}, minmax(0,1fr))` }}
          >
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const on = active === i;
              return (
                <button
                  key={t.en}
                  type="button"
                  aria-current={on ? "page" : undefined}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex flex-col items-center gap-1 py-3 transition-colors",
                    on ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="relative">
                    <Icon
                      className={cn(
                        "size-5 transition-transform duration-200",
                        on && "scale-110"
                      )}
                    />
                    {t.badge && (
                      <span className="absolute -right-2 -top-1.5 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                        {t.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-[11px]">{en ? t.en : t.ja}</span>
                </button>
              );
            })}
          </div>
          <span
            className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-transform duration-300 ease-out"
            style={{
              width: `calc(100% / ${TABS.length} - 1.5rem)`,
              left: "0.75rem",
              transform: `translateX(calc(${active} * (100% + 1.5rem)))`,
            }}
          />
        </nav>
        <div className="grid min-h-32 place-items-center p-6 text-sm text-muted-foreground">
          {en
            ? `“${TABS[active].en}” tab content`
            : `「${TABS[active].ja}」タブのコンテンツ`}
        </div>
      </div>
    </div>
  );
}
