import { useLayoutEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "下線スライドタブ",
  category: "ナビゲーション",
  description:
    "選択タブの位置と幅に合わせて下線がスライドするタブナビ。要素計測で正確に追従する。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const TABS = [
  { ja: "概要", en: "Overview" },
  { ja: "アクティビティ", en: "Activity" },
  { ja: "設定", en: "Settings" },
  { ja: "メンバー", en: "Members" },
  { ja: "課金", en: "Billing" },
];

export default function SlideTabNav() {
  const [active, setActive] = useState(0);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [bar, setBar] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = refs.current[active];
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto max-w-2xl">
        <nav className="relative border-b">
          <ul className="flex gap-1 overflow-x-auto">
            {TABS.map((t, i) => (
              <li key={t.en}>
                <button
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  aria-current={active === i ? "page" : undefined}
                  onClick={() => setActive(i)}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-sm transition-colors",
                    active === i
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {en ? t.en : t.ja}
                </button>
              </li>
            ))}
          </ul>
          <span
            className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ left: bar.left, width: bar.width }}
          />
        </nav>
        <div className="rounded-b-xl border border-t-0 bg-background p-6 text-sm text-muted-foreground">
          {en
            ? `“${TABS[active].en}” content appears here.`
            : `「${TABS[active].ja}」の内容がここに表示されます。`}
        </div>
      </div>
    </div>
  );
}
