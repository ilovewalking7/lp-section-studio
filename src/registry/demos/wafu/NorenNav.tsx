import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "暖簾ナビ",
  category: "和風",
  description: "暖簾(のれん)を模したトップナビ。屋号を中央に、朱の差し色でCTAを置く。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "navigation", "noren"],
  principle: "暖簾の垂れ布で店内へ誘う比喩。屋号を中心に据え視線を集約し、朱で行動を促す。",
};

const links = [
  { id: "cuisine", ja: "お料理", en: "Cuisine" },
  { id: "rooms", ja: "客室", en: "Rooms" },
  { id: "onsen", ja: "温泉", en: "Hot Spring" },
  { id: "facilities", ja: "館内", en: "Facilities" },
  { id: "access", ja: "交通", en: "Access" },
];

export default function NorenNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <header className="w-full bg-[#f5f1e8] text-stone-800">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <ul className="hidden items-center gap-7 font-mincho text-sm tracking-wider text-stone-700 md:flex">
          {links.slice(0, 3).map((l) => (
            <li key={l.id}>
              <a href="#" className="transition-colors hover:text-[#b7410e]">
                {en ? l.en : l.ja}
              </a>
            </li>
          ))}
        </ul>

        {/* 暖簾の屋号 */}
        <div className="relative">
          <div className="flex justify-center gap-px">
            {["奥", "山", "亭"].map((ch) => (
              <div
                key={ch}
                className="relative bg-[#1f3a5f] px-3 pb-4 pt-3 shadow-sm"
              >
                <span className="font-mincho text-xl tracking-widest text-[#f5f1e8]">
                  {ch}
                </span>
                {/* 暖簾の裾 */}
                <span className="absolute inset-x-1 bottom-0 h-2 bg-[#162a45]" />
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-center text-[10px] tracking-[0.3em] text-stone-500">
            OKUYAMA TEI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-7 font-mincho text-sm tracking-wider text-stone-700 lg:flex">
            {links.slice(3).map((l) => (
              <li key={l.id}>
                <a href="#" className="transition-colors hover:text-[#b7410e]">
                  {en ? l.en : l.ja}
                </a>
              </li>
            ))}
          </ul>
          <Button className="hidden rounded-sm bg-[#b7410e] px-5 font-mincho tracking-wider text-[#f5f1e8] shadow-none hover:bg-[#9c360b] sm:inline-flex">
            {en ? "Reserve" : "ご予約"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-stone-700 md:hidden"
            aria-label={en ? "Menu" : "メニュー"}
          >
            <Menu />
          </Button>
        </div>
      </nav>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-400/50 to-transparent" />
    </header>
  );
}
