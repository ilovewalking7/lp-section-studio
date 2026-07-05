import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ミニマル・ナビ",
  category: "ミニマル",
  description: "ワードマークと疎なリンクだけの、極めて静かなナビ。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "nav"],
  principle: "要素を絞り均等配置することで、ブランドと導線を際立たせる。",
};

const links = ["Work", "Studio", "Journal", "Contact"];

export default function MinimalNav() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-white font-sans text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="text-sm font-medium uppercase tracking-[0.3em]"
          >
            Atelier<span className="text-[#e5341a]">.</span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] tracking-wide text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#"
              className="text-[11px] uppercase tracking-[0.2em] text-neutral-900 underline-offset-4 hover:underline"
            >
              {en ? "Get started" : "はじめる"}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={
              open
                ? en
                  ? "Close menu"
                  : "メニューを閉じる"
                : en
                  ? "Open menu"
                  : "メニューを開く"
            }
            className="md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <nav
          className={cn(
            "overflow-hidden border-t border-neutral-200 md:hidden",
            open ? "max-h-80" : "max-h-0 border-t-0"
          )}
        >
          <div className="mx-auto flex max-w-6xl flex-col px-6">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="border-b border-neutral-100 py-4 text-sm tracking-wide text-neutral-700"
              >
                {l}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
}
