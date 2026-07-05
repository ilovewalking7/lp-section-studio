import { useState } from "react";
import { Hexagon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・ナビバー",
  category: "グラスモーフィズム",
  description: "鮮やかな背景の上に浮かぶ、フロステッドなピル型フローティングナビ。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "nav"],
};

const links = [
  { id: "home", ja: "ホーム", en: "Home" },
  { id: "features", ja: "機能", en: "Features" },
  { id: "pricing", ja: "料金", en: "Pricing" },
  { id: "cases", ja: "事例", en: "Cases" },
  { id: "contact", ja: "お問合せ", en: "Contact" },
];

export default function GlassNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState("home");

  return (
    <section className="relative isolate flex w-full items-start justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 size-80 rounded-full bg-pink-400/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-96 rounded-full bg-teal-300/40 blur-3xl"
      />

      <nav className="relative flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 pl-2 text-white">
          <Hexagon className="size-5" />
          <span className="text-sm font-semibold tracking-tight">Prism</span>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => setActive(link.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                  active === link.id
                    ? "bg-white/25 text-white shadow-inner"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                {en ? link.en : link.ja}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow transition hover:bg-white/90 sm:inline-flex">
            {en ? "Start for free" : "無料で始める"}
          </button>
          <button
            aria-label={en ? "Menu" : "メニュー"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </section>
  );
}
