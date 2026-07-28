import { Smile, Twitter, Github, Instagram, Heart } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ・フッター",
  category: "プレイフル",
  description: "丸くてカラフルなフッター。",
  align: "full",
  isNew: true,
  tags: ["playful", "rounded", "footer"],
};

const columns = [
  {
    title: "プロダクト",
    titleEn: "Product",
    links: [
      { ja: "機能", en: "Features" },
      { ja: "料金", en: "Pricing" },
      { ja: "テンプレ", en: "Templates" },
      { ja: "新着", en: "What's new" },
    ],
  },
  {
    title: "会社",
    titleEn: "Company",
    links: [
      { ja: "わたしたち", en: "About us" },
      { ja: "ブログ", en: "Blog" },
      { ja: "採用", en: "Careers" },
      { ja: "お問い合わせ", en: "Contact" },
    ],
  },
  {
    title: "サポート",
    titleEn: "Support",
    links: [
      { ja: "ヘルプ", en: "Help" },
      { ja: "コミュニティ", en: "Community" },
      { ja: "ステータス", en: "Status" },
      { ja: "規約", en: "Terms" },
    ],
  },
];

/** アイコンだけのリンクは名前を持たないので、読み上げ用のラベルを添える */
const socials = [
  { icon: Twitter, color: "#4cc9f0", label: "X (Twitter)" },
  { icon: Github, color: "#b388ff", label: "GitHub" },
  { icon: Instagram, color: "#ff8fab", label: "Instagram" },
];

export default function PlayfulFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="font-rounded w-full overflow-hidden rounded-3xl bg-[#fdf6ff] px-6 py-12 sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold text-slate-800">
            <span
              className="inline-flex size-10 items-center justify-center rounded-2xl text-white"
              style={{ backgroundColor: "#b388ff" }}
            >
              <Smile className="size-6" />
            </span>
            {en ? "Pop" : "ぽっぷ"}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            {en
              ? "Making creating more fun. A friendly builder for everyone."
              : "つくるをもっとたのしく。みんなのためのフレンドリーなビルダー。"}
          </p>
          <div className="mt-4 flex gap-2.5">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: s.color }}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.titleEn}>
            <h4 className="mb-3 text-sm font-extrabold text-slate-800">{en ? col.titleEn : col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.en}>
                  <a
                    href="#"
                    className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#ff8fab]"
                  >
                    {en ? l.en : l.ja}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-3 border-t-2 border-dashed border-slate-200 pt-6 text-sm font-semibold text-slate-400 sm:flex-row">
        <span>© 2026 {en ? "Pop" : "ぽっぷ"} Inc.</span>
        <span className="inline-flex items-center gap-1.5">
          {en ? (
            <>
              Made with <Heart className="size-4 fill-current" style={{ color: "#ff8fab" }} /> for makers
            </>
          ) : (
            <>
              つくる人へ <Heart className="size-4 fill-current" style={{ color: "#ff8fab" }} /> をこめて
            </>
          )}
        </span>
      </div>
    </footer>
  );
}
