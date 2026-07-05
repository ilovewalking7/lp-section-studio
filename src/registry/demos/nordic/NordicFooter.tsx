import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧フッター",
  category: "北欧",
  description: "ぬくもりのあるミニマルなフッター。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "整理された列と淡い区切りで、情報量があっても圧迫感を与えない。",
};

const groups: {
  id: string;
  titleJa: string;
  titleEn: string;
  links: { ja: string; en: string }[];
}[] = [
  {
    id: "collection",
    titleJa: "コレクション",
    titleEn: "Collection",
    links: [
      { ja: "椅子と座", en: "Chairs & seating" },
      { ja: "灯り", en: "Lighting" },
      { ja: "テキスタイル", en: "Textiles" },
      { ja: "器", en: "Tableware" },
    ],
  },
  {
    id: "brand",
    titleJa: "ブランド",
    titleEn: "Brand",
    links: [
      { ja: "わたしたちの物語", en: "Our story" },
      { ja: "工房を訪ねる", en: "Visit the workshop" },
      { ja: "持続可能性", en: "Sustainability" },
      { ja: "採用", en: "Careers" },
    ],
  },
  {
    id: "support",
    titleJa: "サポート",
    titleEn: "Support",
    links: [
      { ja: "配送と返品", en: "Shipping & returns" },
      { ja: "お手入れ方法", en: "Care guide" },
      { ja: "よくある質問", en: "FAQ" },
      { ja: "お問い合わせ", en: "Contact" },
    ],
  },
];

export default function NordicFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-[#3a3a38] font-sans text-[#f4f1ea]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
                <path d="M16 5 L26 27 L6 27 Z" stroke="#8a9a7b" strokeWidth="2" strokeLinejoin="round" />
                <path d="M16 14 L21 27 L11 27 Z" stroke="#c08457" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span className="text-lg font-medium">Bjørk</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#f4f1ea]/55">
              {en
                ? "Quiet comfort at the center of daily life — tools born of Nordic wisdom."
                : "静かな心地よさを、暮らしのまんなかに。北欧の知恵から生まれた道具たち。"}
            </p>
            <div className="mt-6 flex gap-3">
              {["instagram", "pin", "mail"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f1ea]/10 text-[#f4f1ea]/70 transition-colors hover:bg-[#f4f1ea]/20 hover:text-[#f4f1ea]"
                >
                  <Social name={s} />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.id}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f4f1ea]/50">
                {en ? g.titleEn : g.titleJa}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      className="text-sm text-[#f4f1ea]/70 underline-offset-4 transition-colors hover:text-[#f4f1ea] hover:underline"
                    >
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#f4f1ea]/10 pt-6 text-xs text-[#f4f1ea]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {en
              ? "© 2026 Bjørk. Gentle, in every season."
              : "© 2026 Bjørk. すべての季節に、やさしく。"}
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-[#f4f1ea]/80">
              {en ? "Privacy" : "プライバシー"}
            </a>
            <a href="#" className="transition-colors hover:text-[#f4f1ea]/80">
              {en ? "Terms" : "利用規約"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ name }: { name: string }) {
  const p = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  if (name === "mail")
    return (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  if (name === "pin")
    return (
      <svg {...p}>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </svg>
  );
}
