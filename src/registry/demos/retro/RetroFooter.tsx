import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シンセウェイヴ・フッター",
  category: "レトロ・Y2K",
  description: "グリッドの地平線と沈む太陽を背景にした、シンセウェイヴ・フッター。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "synthwave", "footer"],
};

const columns = [
  {
    title: "PRODUCT",
    links: ["機能", "料金", "変更履歴", "ロードマップ"],
    linksEn: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "COMPANY",
    links: ["会社概要", "ブログ", "採用情報", "お問い合わせ"],
    linksEn: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "LEGAL",
    links: ["利用規約", "プライバシー", "ライセンス"],
    linksEn: ["Terms", "Privacy", "License"],
  },
];

const socials = [Twitter, Instagram, Youtube, Github];

export default function RetroFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="relative w-full overflow-hidden bg-[#0d0221] pt-16 text-white">
      {/* sun + horizon */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64">
        <div
          className="absolute left-1/2 bottom-0 size-52 -translate-x-1/2 translate-y-1/3 rounded-full"
          style={{
            background: "linear-gradient(180deg, #fde047, #ff2e97, #7c3aed)",
            boxShadow: "0 0 80px rgba(255,46,151,0.6)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom"
          style={{
            perspective: "200px",
          }}
        >
          <div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: "rotateX(70deg)",
              backgroundImage:
                "linear-gradient(rgba(5,217,232,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(5,217,232,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to top, black, transparent)",
              WebkitMaskImage: "linear-gradient(to top, black, transparent)",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p
              className="font-mono text-xl font-black uppercase italic tracking-wider"
              style={{ textShadow: "0 0 12px rgba(5,217,232,0.9), 2px 2px 0 #ff2e97" }}
            >
              NEON//OS
            </p>
            <p className="mt-3 text-sm text-[#d8b4fe]">
              {en
                ? "'80s dreams, rendered in today's pixels."
                : "80年代の夢を、現代のピクセルへ。"}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-md border border-[#05d9e8]/40 text-[#05d9e8] transition-all hover:bg-[#05d9e8]/10 hover:shadow-[0_0_14px_rgba(5,217,232,0.6)]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ff2e97]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {(en ? col.linksEn : col.links).map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#e9d5ff]/80 transition-colors hover:text-[#05d9e8]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mt-14 border-t border-[#7c3aed]/30 py-6 text-center font-mono text-xs uppercase tracking-widest text-[#d8b4fe]">
          © 2026 NEON//OS — all rights reserved
        </div>
      </div>
    </footer>
  );
}
