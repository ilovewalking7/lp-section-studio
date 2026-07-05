import { useState } from "react";
import { Hexagon, Search, Github, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デベロッパー・ナビ",
  category: "ダークテック",
  description: "ドキュメントリンクと⌘Kヒント付きのダークナビゲーションバー。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

const LINKS = [
  { id: "docs", ja: "ドキュメント", en: "Docs" },
  { id: "api", ja: "API", en: "API" },
  { id: "pricing", ja: "料金", en: "Pricing" },
  { id: "blog", ja: "ブログ", en: "Blog" },
];

export default function DevNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#0a0a0f] p-6">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-xl border border-white/10 bg-[#0d1117]/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-[#0d1117]/60">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-white">
            <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 text-emerald-950">
              <Hexagon className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight">
              forge
            </span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href="#"
                  className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                >
                  {en ? l.en : l.ja}
                  {l.id === "api" && <ChevronDown className="size-3.5 opacity-60" />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm text-zinc-500 transition-colors hover:border-white/20 hover:text-zinc-300 sm:flex"
          >
            <Search className="size-3.5" />
            <span>{en ? "Search" : "検索"}</span>
            <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              ⌘K
            </kbd>
          </button>
          <a
            href="#"
            className="grid size-9 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <button
            type="button"
            className="hidden rounded-lg bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-900 transition-transform hover:scale-[1.03] sm:block"
          >
            {en ? "Sign in" : "サインイン"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/5 md:hidden"
            aria-label={en ? "Menu" : "メニュー"}
          >
            <Menu className="size-4" />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "mx-auto mt-2 max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] transition-all md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <ul className="p-2">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              >
                {en ? l.en : l.ja}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
