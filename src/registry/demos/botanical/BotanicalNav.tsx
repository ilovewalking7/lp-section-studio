import * as React from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・ナビ",
  category: "ボタニカル",
  description: "葉のマークを添えたナチュラルなナビゲーションバー。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

const links = [
  { ja: "コレクション", en: "Collection" },
  { ja: "成分", en: "Ingredients" },
  { ja: "私たちの物語", en: "Our story" },
  { ja: "ジャーナル", en: "Journal" },
];

function LeafMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
      <path
        d="M16 28 C16 20 16 12 16 4"
        stroke="#3f4a35"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 10 C9 6 4 8 4 8 C4 8 6 16 16 16Z"
        fill="#86a06d"
      />
      <path
        d="M16 16 C23 12 28 14 28 14 C28 14 26 22 16 22Z"
        fill="#5e6b4f"
      />
    </svg>
  );
}

export default function BotanicalNav() {
  const [open, setOpen] = React.useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <header className="w-full border-b border-[#5e6b4f]/15 bg-[#f3f1e7]/90 text-[#3f4a35] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <LeafMark />
          <span className="font-serif text-lg font-medium tracking-wide">
            Verdé
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.en}>
              <a
                href="#"
                className="text-sm tracking-wide text-[#5e6b4f] transition-colors hover:text-[#3f4a35]"
              >
                {en ? l.en : l.ja}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#5e6b4f] hover:bg-[#5e6b4f]/10"
          >
            <ShoppingBag className="size-5" />
          </Button>
          <Button className="h-10 rounded-full bg-[#5e6b4f] px-5 text-sm text-[#f3f1e7] hover:bg-[#4b563f]">
            {en ? "Log in" : "ログイン"}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full text-[#5e6b4f] md:hidden"
          aria-label={en ? "Menu" : "メニュー"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-[#5e6b4f]/10 transition-all md:hidden",
          open ? "max-h-72" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-3">
          {links.map((l) => (
            <li key={l.en}>
              <a
                href="#"
                className="block rounded-lg px-2 py-2.5 text-sm text-[#5e6b4f] hover:bg-[#5e6b4f]/10"
              >
                {en ? l.en : l.ja}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button className="h-10 w-full rounded-full bg-[#5e6b4f] text-sm text-[#f3f1e7] hover:bg-[#4b563f]">
              {en ? "Log in" : "ログイン"}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
