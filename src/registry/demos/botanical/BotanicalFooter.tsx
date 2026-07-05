import { Instagram, Leaf, Send, Twitter, Youtube } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・フッター",
  category: "ボタニカル",
  description: "枝のディバイダーを添えたナチュラルなフッター。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

function BranchDivider() {
  return (
    <svg
      viewBox="0 0 600 24"
      className="h-6 w-full text-[#86a06d]"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path d="M0 12 H280" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M320 12 H600" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <g fill="currentColor">
        <path d="M300 12 C300 8 300 5 300 2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M300 8 C294 5 290 6 289 8 C294 10 298 9 300 8Z" />
        <path d="M300 6 C306 3 310 4 311 6 C306 8 302 7 300 6Z" />
      </g>
    </svg>
  );
}

const columns = [
  {
    id: "shop",
    titleJa: "ショップ",
    titleEn: "Shop",
    links: [
      { ja: "スキンケア", en: "Skincare" },
      { ja: "ヘアケア", en: "Haircare" },
      { ja: "アロマ", en: "Aromatherapy" },
      { ja: "ギフト", en: "Gifts" },
    ],
  },
  {
    id: "brand",
    titleJa: "ブランド",
    titleEn: "Brand",
    links: [
      { ja: "私たちの物語", en: "Our story" },
      { ja: "成分へのこだわり", en: "Our ingredients" },
      { ja: "サステナビリティ", en: "Sustainability" },
    ],
  },
  {
    id: "support",
    titleJa: "サポート",
    titleEn: "Support",
    links: [
      { ja: "お問い合わせ", en: "Contact" },
      { ja: "配送と返品", en: "Shipping & returns" },
      { ja: "よくある質問", en: "FAQ" },
    ],
  },
];

export default function BotanicalFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-[#f3f1e7] px-6 pt-12 text-[#3f4a35]">
      <div className="mx-auto max-w-6xl">
        <BranchDivider />

        <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="size-6 text-[#5e6b4f]" />
              <span className="font-serif text-xl font-medium tracking-wide">
                Verdé
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5e6b4f]">
              {en
                ? "Balance skin and spirit with the power of plants — wellness in tune with nature, for your every day."
                : "植物の力で、肌と心を整える。自然と共にあるウェルネスを、あなたの毎日へ。"}
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-[#5e6b4f]/25 text-[#5e6b4f] transition-colors hover:bg-[#5e6b4f] hover:text-[#f3f1e7]"
                  aria-label={en ? "Social link" : "ソーシャルリンク"}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.id}>
              <h4 className="font-serif text-sm font-medium tracking-wide">
                {en ? col.titleEn : col.titleJa}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      className="text-sm text-[#5e6b4f] transition-colors hover:text-[#3f4a35]"
                    >
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#5e6b4f]/15 py-6 text-xs text-[#5e6b4f]/70 sm:flex-row">
          <p>© 2026 Verdé Botanicals. All rights reserved.</p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#3f4a35]"
          >
            <Send className="size-3.5" />{" "}
            {en ? "Subscribe to the journal" : "ジャーナルを購読する"}
          </a>
        </div>
      </div>
    </footer>
  );
}
