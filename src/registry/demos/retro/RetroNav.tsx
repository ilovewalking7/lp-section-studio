import { useState } from "react";
import { Menu, Power, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオン・ナビ",
  category: "レトロ・Y2K",
  description: "発光する下線とグロー文字を備えた、レトロフューチャーなナビバー。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "neon", "nav"],
};

const links = ["HOME", "GAMES", "ARCADE", "CONTACT"];

export default function RetroNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("HOME");
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-[#0d0221] p-6">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between rounded-xl border border-[#ff2e97]/40 bg-[#1a0b2e]/80 px-5 py-3 backdrop-blur"
        style={{ boxShadow: "0 0 24px rgba(255,46,151,0.25)" }}
      >
        <a
          href="#"
          className="font-mono text-lg font-black uppercase italic tracking-wider text-white"
          style={{ textShadow: "0 0 12px rgba(5,217,232,0.9), 2px 2px 0 #ff2e97" }}
        >
          NEON//OS
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActive(link)}
                className={cn(
                  "relative font-mono text-xs font-bold uppercase tracking-widest transition-colors",
                  active === link
                    ? "text-[#05d9e8]"
                    : "text-[#d8b4fe] hover:text-white"
                )}
                style={
                  active === link
                    ? { textShadow: "0 0 12px rgba(5,217,232,0.9)" }
                    : undefined
                }
              >
                {link}
                {active === link && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-[#05d9e8] shadow-[0_0_8px_rgba(5,217,232,0.9)]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button className="hidden items-center gap-2 rounded-md bg-[#ff2e97] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_18px_rgba(255,46,151,0.6)] transition-all hover:shadow-[0_0_28px_rgba(255,46,151,0.9)] md:inline-flex">
          <Power className="size-3.5" />
          LOGIN
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[#05d9e8] md:hidden"
          aria-label={en ? "Menu" : "メニュー"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <ul className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-xl border border-[#05d9e8]/40 bg-[#1a0b2e]/90 p-3 md:hidden">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => {
                  setActive(link);
                  setOpen(false);
                }}
                className="block w-full rounded-md px-3 py-2 text-left font-mono text-xs font-bold uppercase tracking-widest text-[#d8b4fe] hover:bg-[#05d9e8]/10 hover:text-[#05d9e8]"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
