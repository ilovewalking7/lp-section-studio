import { useState } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・ナビ",
  category: "ラグジュアリー",
  description: "金の下線でアクティブを示す、洗練された黒のナビゲーションバー。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "nav"],
  principle: "細い金の下線と広い字間が、控えめながら確かな高級感とブランドの品位を伝える。",
};

const links = [
  { ja: "コレクション", en: "Collections" },
  { ja: "ハイジュエリー", en: "High Jewelry" },
  { ja: "メゾン", en: "Maison" },
  { ja: "ブティック", en: "Boutiques" },
];

export default function LuxuryNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-[#0a0a0a] text-stone-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button className="text-stone-400 transition-colors hover:text-amber-200 md:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {links.slice(0, 2).map((l, i) => (
            <NavLink
              key={l.en}
              label={en ? l.en : l.ja}
              active={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </nav>

        <a
          href="#"
          className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-2xl tracking-[0.25em] text-transparent"
        >
          AURÉL
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.slice(2).map((l, i) => (
            <NavLink
              key={l.en}
              label={en ? l.en : l.ja}
              active={active === i + 2}
              onClick={() => setActive(i + 2)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-5 text-stone-400">
          <button className="transition-colors hover:text-amber-200" aria-label={en ? "Search" : "検索"}>
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button className="hidden transition-colors hover:text-amber-200 sm:block" aria-label={en ? "Account" : "アカウント"}>
            <User className="h-[18px] w-[18px]" />
          </button>
          <button className="transition-colors hover:text-amber-200" aria-label={en ? "Bag" : "バッグ"}>
            <ShoppingBag className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
    </div>
  );
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative text-[11px] uppercase tracking-[0.25em] transition-colors",
        active ? "text-amber-200" : "text-stone-400 hover:text-stone-100"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-amber-200 to-amber-500 transition-all duration-300",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </button>
  );
}
