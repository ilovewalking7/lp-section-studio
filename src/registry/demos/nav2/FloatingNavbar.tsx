import { useState } from "react";
import { Compass, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フローティングナビ",
  category: "ナビゲーション",
  description:
    "コンテンツから浮き上がるピル型フローティングナビ。モバイルでは折りたたみメニューに切り替わる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const LINKS = [
  { ja: "製品", en: "Product" },
  { ja: "機能", en: "Features" },
  { ja: "料金", en: "Pricing" },
  { ja: "ブログ", en: "Blog" },
  { ja: "サポート", en: "Support" },
];

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Product");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-muted/40 to-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <nav className="rounded-2xl border bg-background/70 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl transition-shadow hover:shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="size-4" />
              </span>
              <span className="text-sm">Aero</span>
            </div>

            <ul className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => (
                <li key={l.en}>
                  <button
                    type="button"
                    onClick={() => setActive(l.en)}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      active === l.en
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active === l.en && (
                      <span className="absolute inset-0 -z-0 rounded-full bg-accent" />
                    )}
                    <span className="relative z-10">{en ? l.en : l.ja}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
              >
                <Sparkles className="size-3.5" />
                {en ? "Get started" : "始める"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={en ? "Toggle menu" : "メニューを開閉"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300 md:hidden",
              open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <ul className="min-h-0 space-y-1">
              {LINKS.map((l) => (
                <li key={l.en}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(l.en);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      active === l.en ? "bg-accent" : "hover:bg-accent/50"
                    )}
                  >
                    {en ? l.en : l.ja}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
