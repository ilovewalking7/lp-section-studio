import { Hexagon, Github, Twitter, MessageCircle } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デベロッパー・フッター",
  category: "ダークテック",
  description: "ドキュメントリンクをグループ化したダーク開発者フッター（ステータスピル付き）。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Link = { ja: string; en: string };
const GROUPS: { id: string; titleJa: string; titleEn: string; links: Link[] }[] = [
  {
    id: "product",
    titleJa: "製品",
    titleEn: "Product",
    links: [
      { ja: "概要", en: "Overview" },
      { ja: "ランタイム", en: "Runtime" },
      { ja: "CLI", en: "CLI" },
      { ja: "価格", en: "Pricing" },
    ],
  },
  {
    id: "developers",
    titleJa: "開発者",
    titleEn: "Developers",
    links: [
      { ja: "ドキュメント", en: "Docs" },
      { ja: "API リファレンス", en: "API reference" },
      { ja: "SDK", en: "SDK" },
      { ja: "変更履歴", en: "Changelog" },
    ],
  },
  {
    id: "resources",
    titleJa: "リソース",
    titleEn: "Resources",
    links: [
      { ja: "ブログ", en: "Blog" },
      { ja: "ガイド", en: "Guides" },
      { ja: "サンプル", en: "Examples" },
      { ja: "コミュニティ", en: "Community" },
    ],
  },
  {
    id: "company",
    titleJa: "会社",
    titleEn: "Company",
    links: [
      { ja: "採用情報", en: "Careers" },
      { ja: "お問い合わせ", en: "Contact" },
      { ja: "プライバシー", en: "Privacy" },
      { ja: "利用規約", en: "Terms" },
    ],
  },
];

export default function DevFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0f] px-6 py-14 text-zinc-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2 text-white">
              <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 text-emerald-950">
                <Hexagon className="size-4" strokeWidth={2.5} />
              </span>
              <span className="font-mono text-sm font-semibold">forge</span>
            </a>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-zinc-500">
              {en
                ? "An edge-native platform built to help developers ship faster."
                : "開発者がより速く出荷するためのエッジネイティブなプラットフォーム。"}
            </p>
            <div className="mt-5 flex gap-2">
              {[Github, Twitter, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-100"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {GROUPS.map((g) => (
            <div key={g.id}>
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                {en ? g.titleEn : g.titleJa}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.en}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                      {en ? l.en : l.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-zinc-600">
            © 2026 Forge Inc. All rights reserved.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-xs text-emerald-300 transition-colors hover:bg-emerald-400/10"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {en ? "All systems operational" : "全システム稼働中"}
          </a>
        </div>
      </div>
    </footer>
  );
}
