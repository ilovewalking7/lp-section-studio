import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "中央ロゴナビ",
  category: "ナビゲーション",
  description:
    "ロゴを中央に据え、左右にリンクを振り分けたエディトリアル風ナビ。リンクは下線が伸びる。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

const LEFT = [
  { ja: "新着", en: "New" },
  { ja: "レディース", en: "Women" },
  { ja: "メンズ", en: "Men" },
];
const RIGHT = [
  { ja: "コレクション", en: "Collections" },
  { ja: "ジャーナル", en: "Journal" },
  { ja: "店舗", en: "Stores" },
];

function NavLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group relative py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function CenteredLogoNav() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <nav className="border-y py-4">
          <div className="grid grid-cols-3 items-center">
            <ul className="hidden items-center gap-6 md:flex">
              {LEFT.map((l) => (
                <li key={l.en}>
                  <NavLink label={en ? l.en : l.ja} />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={en ? "Menu" : "メニュー"}
              aria-expanded={open}
              className="justify-self-start md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <div className="text-center text-xl font-semibold tracking-[0.3em]">
              MAISON
            </div>

            <div className="flex items-center justify-end gap-6">
              <ul className="hidden items-center gap-6 md:flex">
                {RIGHT.map((l) => (
                  <li key={l.en}>
                    <NavLink label={en ? l.en : l.ja} />
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 text-muted-foreground">
                <button type="button" aria-label={en ? "Account" : "アカウント"} className="hover:text-foreground">
                  <User className="size-5" />
                </button>
                <button type="button" aria-label={en ? "Cart" : "カート"} className="hover:text-foreground">
                  <ShoppingBag className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300 md:hidden",
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <ul className="min-h-0 space-y-1">
              {[...LEFT, ...RIGHT].map((l) => (
                <li key={l.en}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-accent"
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
