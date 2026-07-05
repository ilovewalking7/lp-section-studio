import { Instagram, Twitter, Youtube } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・フッター",
  category: "ラグジュアリー",
  description: "金のヘアラインとリンク列を備えた、黒い上質なフッター。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "footer"],
  principle: "整然としたリンク列と細い金の罫が、最後まで途切れないブランドの一貫性を示す。",
};

const columns = [
  {
    title: "Collections",
    links: [
      { ja: "ハイジュエリー", en: "High Jewelry" },
      { ja: "ウォッチ", en: "Watches" },
      { ja: "レザー", en: "Leather" },
      { ja: "フレグランス", en: "Fragrance" },
    ],
  },
  {
    title: "Maison",
    links: [
      { ja: "私たちの物語", en: "Our Story" },
      { ja: "職人", en: "Artisans" },
      { ja: "サステナビリティ", en: "Sustainability" },
      { ja: "採用情報", en: "Careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { ja: "コンシェルジュ", en: "Concierge" },
      { ja: "リペア", en: "Repairs" },
      { ja: "ギフト", en: "Gifting" },
      { ja: "ブティック検索", en: "Find a Boutique" },
    ],
  },
];

const socials = [Instagram, Twitter, Youtube];

export default function LuxuryFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-[#0a0a0a] text-stone-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-3xl tracking-[0.25em] text-transparent">
              AURÉL
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-500">
              {en
                ? "A maison crafting timeless beauty since 1924."
                : "1924年より、時を超える美を仕立てるメゾン。"}
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="flex h-9 w-9 items-center justify-center border border-stone-800 text-stone-400 transition-colors hover:border-amber-400/40 hover:text-amber-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">
                {col.title}
              </p>
              <div className="mt-5 h-px w-8 bg-amber-400/20" />
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      className="text-sm text-stone-400 transition-colors hover:text-amber-200"
                    >
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-stone-600 sm:flex-row">
          <p>© 2026 Aurél Maison. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-amber-200">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-amber-200">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
