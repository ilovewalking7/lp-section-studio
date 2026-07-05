import type { DemoMeta } from "@/registry";
import { Shapes, Twitter, Github, Instagram } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・フッター",
  category: "メンフィス",
  description: "パターンストリップ付きのプレイフルなフッター。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

type Link = { ja: string; en: string };
const columns: { title: string; titleEn: string; links: Link[] }[] = [
  {
    title: "プロダクト",
    titleEn: "Product",
    links: [
      { ja: "特徴", en: "Features" },
      { ja: "料金", en: "Pricing" },
      { ja: "シェイプ集", en: "Shapes" },
      { ja: "更新情報", en: "Changelog" },
    ],
  },
  {
    title: "リソース",
    titleEn: "Resources",
    links: [
      { ja: "ドキュメント", en: "Docs" },
      { ja: "ガイド", en: "Guides" },
      { ja: "ブログ", en: "Blog" },
      { ja: "サポート", en: "Support" },
    ],
  },
  {
    title: "会社",
    titleEn: "Company",
    links: [
      { ja: "私たちについて", en: "About" },
      { ja: "採用", en: "Careers" },
      { ja: "プレス", en: "Press" },
      { ja: "問い合わせ", en: "Contact" },
    ],
  },
];

const palette = ["#ff5c8a", "#ffd23f", "#1fb6c1", "#7b5cff", "#ff8c42"];

export default function MemphisFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-[#fdf6e3]">
      {/* パターンストリップ */}
      <div className="flex h-4 w-full border-y-[3px] border-black">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: palette[i % palette.length] }} />
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl border-[3px] border-black bg-[#7b5cff] shadow-[2px_2px_0_0_#000]">
                <Shapes className="size-5 text-white" />
              </span>
              <span className="text-lg font-black tracking-tight text-black">Memphis</span>
            </a>
            <p className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-black/60">
              {en
                ? "80s postmodern playfulness for modern products. Color the world with geometry."
                : "80sポストモダンの遊び心を、現代のプロダクトに。幾何学で世界を彩る。"}
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-xl border-[3px] border-black bg-white shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: palette[i] }}
                  aria-label={en ? "Social link" : "ソーシャルリンク"}
                >
                  <Icon className="size-4 text-black" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.titleEn}>
              <h3 className="text-sm font-black uppercase tracking-wide text-black">{en ? col.titleEn : col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.en}>
                    <a href="#" className="text-sm font-semibold text-black/60 transition-colors hover:text-[#ff5c8a]">
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t-[3px] border-dashed border-black/25 pt-6 sm:flex-row">
          <p className="text-xs font-bold text-black/55">© 2026 Memphis Studio. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            {palette.map((c) => (
              <span key={c} className="size-3 rounded-full border-2 border-black" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
