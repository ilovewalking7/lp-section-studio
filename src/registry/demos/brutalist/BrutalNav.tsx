import { useState } from "react";
import { Box, Menu, X } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・ナビ",
  category: "ブルータリスト",
  description: "極太ボーダーでブロック化したチャンキーなナビバー。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "nav"],
};

const links = [
  { ja: "製品", en: "Product" },
  { ja: "価格", en: "Pricing" },
  { ja: "ドキュメント", en: "Docs" },
  { ja: "ブログ", en: "Blog" },
];

export default function BrutalNav() {
  const [open, setOpen] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full bg-cyan-300 p-5 font-sans text-black sm:p-8">
      <nav className="mx-auto max-w-5xl border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <div className="flex items-center justify-between p-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-3 py-1.5 font-black uppercase shadow-[3px_3px_0_0_#000]"
          >
            <Box className="h-5 w-5" strokeWidth={3} />
            BRUT
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.en}>
                <a
                  href="#"
                  className="block border-2 border-transparent px-3 py-1.5 font-bold uppercase transition-all hover:border-black hover:bg-lime-300 hover:shadow-[3px_3px_0_0_#000]"
                >
                  {en ? l.en : l.ja}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button className="hidden border-2 border-black bg-fuchsia-400 px-4 py-1.5 font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] md:block">
              {en ? "Log in" : "ログイン"}
            </button>
            <button
              aria-label={en ? "Menu" : "メニュー"}
              onClick={() => setOpen((v) => !v)}
              className="border-2 border-black bg-orange-400 p-2 shadow-[3px_3px_0_0_#000] md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={3} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>

        {open && (
          <ul className="space-y-2 border-t-4 border-black p-3 md:hidden">
            {links.map((l) => (
              <li key={l.en}>
                <a
                  href="#"
                  className="block border-2 border-black bg-lime-300 px-3 py-2 font-bold uppercase shadow-[3px_3px_0_0_#000]"
                >
                  {en ? l.en : l.ja}
                </a>
              </li>
            ))}
            <li>
              <button className="w-full border-2 border-black bg-fuchsia-400 px-3 py-2 font-black uppercase shadow-[3px_3px_0_0_#000]">
                {en ? "Log in" : "ログイン"}
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
