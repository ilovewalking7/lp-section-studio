import type { DemoMeta } from "@/registry";
import { Menu, Shapes } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・ナビ",
  category: "メンフィス",
  description: "シェイプモチーフで彩るプレイフルなナビバー。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

const links: { ja: string; en: string }[] = [
  { ja: "プロダクト", en: "Product" },
  { ja: "シェイプ", en: "Shapes" },
  { ja: "料金", en: "Pricing" },
  { ja: "ブログ", en: "Blog" },
];

export default function MemphisNav() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative w-full overflow-hidden bg-[#fdf6e3] px-4 py-8">
      {/* 背景の小シェイプ */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[3%] top-[60%] h-8 w-8 rotate-12 border-[3px] border-black bg-[#ffd23f]" />
        <div className="absolute right-[4%] top-[20%] h-7 w-7 rounded-full border-[3px] border-black bg-[#1fb6c1]" />
      </div>

      <nav className="relative mx-auto flex max-w-5xl items-center justify-between rounded-2xl border-[3px] border-black bg-white px-5 py-3.5 shadow-[6px_6px_0_0_#000]">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl border-[3px] border-black bg-[#7b5cff] shadow-[2px_2px_0_0_#000]">
            <Shapes className="size-5 text-white" />
          </span>
          <span className="text-lg font-black tracking-tight text-black">Memphis</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => {
            const colors = ["#ff5c8a", "#1fb6c1", "#ff8c42", "#7b5cff"];
            return (
              <li key={l.en}>
                <a
                  href="#"
                  className="group relative rounded-lg px-3.5 py-2 text-sm font-extrabold text-black transition-colors"
                >
                  {en ? l.en : l.ja}
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-1 origin-left scale-x-0 rounded-full transition-transform group-hover:scale-x-100"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-xl border-[3px] border-black bg-[#ffd23f] px-5 py-2 text-sm font-extrabold text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 sm:inline-block">
            {en ? "Sign up" : "登録"}
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-xl border-[3px] border-black bg-white shadow-[3px_3px_0_0_#000] md:hidden"
            aria-label={en ? "Open menu" : "メニューを開く"}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
