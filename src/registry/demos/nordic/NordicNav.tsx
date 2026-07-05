import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧ナビ",
  category: "北欧",
  description: "余白を生かしたミニマルなナビゲーション。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "軽いウェイトと広い余白で、上質さと落ち着きを第一印象に与える。",
};

const links = [
  { ja: "コレクション", en: "Collection" },
  { ja: "アトリエ", en: "Atelier" },
  { ja: "物語", en: "Story" },
  { ja: "店舗", en: "Stores" },
];

export default function NordicNav() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-[#f4f1ea] font-sans text-[#3a3a38]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
            <path d="M16 5 L26 27 L6 27 Z" stroke="#8a9a7b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M16 14 L21 27 L11 27 Z" stroke="#c08457" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-medium tracking-tight">Bjørk</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.en}
              href="#"
              className="text-sm text-[#3a3a38]/70 underline-offset-8 transition-colors hover:text-[#3a3a38] hover:underline"
            >
              {en ? l.en : l.ja}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm text-[#3a3a38]/70 transition-colors hover:text-[#3a3a38]">
            {en ? "Log in" : "ログイン"}
          </button>
          <button className="rounded-full bg-[#3a3a38] px-5 py-2 text-sm font-medium text-[#f4f1ea] transition-colors hover:bg-[#3a3a38]/90">
            {en ? "Get started" : "はじめる"}
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={en ? "Menu" : "メニュー"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#3a3a38] transition-colors hover:bg-[#3a3a38]/[0.06] md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </header>

      {open && (
        <div className="border-t border-[#3a3a38]/10 px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <a
                key={l.en}
                href="#"
                className="rounded-xl px-3 py-3 text-sm text-[#3a3a38]/80 transition-colors hover:bg-[#3a3a38]/[0.05]"
              >
                {en ? l.en : l.ja}
              </a>
            ))}
            <button className="mt-3 rounded-full bg-[#3a3a38] py-3 text-sm font-medium text-[#f4f1ea]">
              {en ? "Get started" : "はじめる"}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
