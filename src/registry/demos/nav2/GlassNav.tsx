import { useState } from "react";
import { Bell, Gem, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ガラスナビ",
  category: "ナビゲーション",
  description:
    "鮮やかな背景の上に重なる半透明ガラスのナビバー。ホバーで光沢ハイライトが走る。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const LINKS = [
  { ja: "探索", en: "Explore" },
  { ja: "コレクション", en: "Collections" },
  { ja: "アーティスト", en: "Artists" },
  { ja: "About", en: "About" },
];

export default function GlassNav() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="relative w-full overflow-hidden p-4 sm:p-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#a855f7,transparent_45%),radial-gradient(circle_at_80%_30%,#ec4899,transparent_45%),radial-gradient(circle_at_50%_90%,#3b82f6,transparent_45%)] opacity-90" />
      <div className="mx-auto max-w-4xl">
        <nav className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/15 px-4 py-3 shadow-xl backdrop-blur-2xl">
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <div className="relative flex items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-2 font-semibold drop-shadow">
              <Gem className="size-5" />
              Prism
            </div>
            <ul className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => (
                <li key={l.en}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    {en ? l.en : l.ja}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={en ? "Notifications" : "通知"}
                className="grid size-9 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              >
                <Bell className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={en ? "Menu" : "メニュー"}
                aria-expanded={open}
                className="grid size-9 place-items-center rounded-full bg-white/20 text-white md:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
          <div
            className={cn(
              "relative grid overflow-hidden text-white transition-all duration-300 md:hidden",
              open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <ul className="min-h-0 space-y-1">
              {LINKS.map((l) => (
                <li key={l.en}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-white/15"
                  >
                    {en ? l.en : l.ja}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
