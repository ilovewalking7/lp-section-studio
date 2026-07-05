import { Box, Github, Twitter, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・フッター",
  category: "ブルータリスト",
  description: "リンクブロックを極太ボーダーで区切ったフッター。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "footer"],
};

const columns: {
  title: string;
  titleEn: string;
  links: { ja: string; en: string }[];
}[] = [
  {
    title: "製品",
    titleEn: "Product",
    links: [
      { ja: "機能", en: "Features" },
      { ja: "価格", en: "Pricing" },
      { ja: "変更履歴", en: "Changelog" },
      { ja: "ロードマップ", en: "Roadmap" },
    ],
  },
  {
    title: "会社",
    titleEn: "Company",
    links: [
      { ja: "概要", en: "About" },
      { ja: "ブログ", en: "Blog" },
      { ja: "採用", en: "Careers" },
      { ja: "お問い合わせ", en: "Contact" },
    ],
  },
  {
    title: "資料",
    titleEn: "Resources",
    links: [
      { ja: "ドキュメント", en: "Docs" },
      { ja: "API", en: "API" },
      { ja: "サポート", en: "Support" },
      { ja: "ステータス", en: "Status" },
    ],
  },
];

const socials: LucideIcon[] = [Github, Twitter, Youtube];

export default function BrutalFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-cyan-300 px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
        <div className="grid gap-0 border-b-4 border-black md:grid-cols-4">
          <div className="border-black p-6 md:border-r-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-3 py-1.5 font-black uppercase shadow-[3px_3px_0_0_#000]"
            >
              <Box className="h-5 w-5" strokeWidth={3} />
              BRUT
            </a>
            <p className="mt-4 font-bold leading-relaxed">
              {en ? "A raw, unapologetic UI kit." : "生のままの、容赦ないUIキット。"}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-lime-300 shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]"
                >
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col, idx) => (
            <div
              key={col.title}
              className={
                "border-black p-6 " +
                (idx < columns.length - 1 ? "md:border-r-4" : "")
              }
            >
              <div className="mb-3 font-mono text-xs font-black uppercase">
                {en ? col.titleEn : col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      className="font-bold underline-offset-4 hover:bg-fuchsia-400 hover:underline"
                    >
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 p-5 font-mono text-xs font-bold sm:flex-row sm:items-center">
          <span>© 2026 BRUT. {en ? "Reposting welcome." : "無断転載歓迎。"}</span>
          <span className="border-2 border-black bg-yellow-300 px-2 py-0.5 uppercase">
            Made raw
          </span>
        </div>
      </div>
    </footer>
  );
}
