import { Instagram, Twitter, Youtube } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "和紙フッター",
  category: "和風",
  description: "和紙地のフッター。屋号・リンク列・季節の挨拶・SNSを落ち着いて配置。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "footer", "washi"],
  principle: "和紙の質感と縦書き屋号で締めくくりに余韻を残し、季節の挨拶で人の温もりを添える。",
};

type Item = { id: string; ja: string; en: string };
const columns: { id: string; title: string; titleEn: string; items: Item[] }[] =
  [
    {
      id: "info",
      title: "ご案内",
      titleEn: "Information",
      items: [
        { id: "cuisine", ja: "お料理", en: "Cuisine" },
        { id: "rooms", ja: "客室", en: "Rooms" },
        { id: "onsen", ja: "温泉", en: "Hot Spring" },
        { id: "facilities", ja: "館内のご案内", en: "Facilities Guide" },
      ],
    },
    {
      id: "reserve",
      title: "ご予約",
      titleEn: "Reservations",
      items: [
        { id: "calendar", ja: "空室カレンダー", en: "Availability Calendar" },
        { id: "plans", ja: "プラン一覧", en: "All Plans" },
        { id: "faq", ja: "よくある質問", en: "FAQ" },
      ],
    },
    {
      id: "access",
      title: "アクセス",
      titleEn: "Access",
      items: [
        { id: "directions", ja: "交通のご案内", en: "Directions" },
        { id: "shuttle", ja: "送迎について", en: "Shuttle Service" },
        { id: "sights", ja: "周辺の見どころ", en: "Nearby Sights" },
      ],
    },
  ];

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "X" },
  { Icon: Youtube, label: "YouTube" },
];

export default function WashiFooter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <footer className="w-full bg-[#efe9da] text-stone-700">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b7410e]/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_2fr]">
        {/* 屋号 */}
        <div className="flex items-start gap-5">
          {en ? (
            <h2 className="font-mincho text-2xl font-medium tracking-[0.2em] text-stone-900">
              Okuyama-tei
            </h2>
          ) : (
            <h2 className="font-mincho text-2xl font-medium tracking-[0.3em] text-stone-900 [writing-mode:vertical-rl]">
              奥山亭
            </h2>
          )}
          <div className="space-y-2 pt-1">
            <p className="font-mincho text-sm text-stone-600">
              {en
                ? "A twelve-room inn nestled in the mountains."
                : "山あいに佇む、十二室の宿。"}
            </p>
            <p className="text-xs leading-relaxed text-stone-500">
              {en ? (
                <>
                  399-XXXX
                  <br />
                  1-2-3 Onsen, Okuyama, Okuyama District, Nagano
                  <br />
                  TEL 0265-XX-XXXX
                </>
              ) : (
                <>
                  〒399-XXXX
                  <br />
                  長野県奥山郡奥山町温泉 1-2-3
                  <br />
                  TEL 0265-XX-XXXX
                </>
              )}
            </p>
            <p className="pt-2 font-mincho text-sm text-[#b7410e]">
              {en
                ? "— Early summer, carried on a breeze of fresh leaves —"
                : "― 水無月の候、青葉の風にのせて ―"}
            </p>
          </div>
        </div>

        {/* リンク列 */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.id}>
              <h3 className="font-mincho text-sm tracking-widest text-stone-900">
                {en ? col.titleEn : col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.id}>
                    <a
                      href="#"
                      className="text-xs text-stone-500 transition-colors hover:text-[#b7410e]"
                    >
                      {en ? it.en : it.ja}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-300/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between">
          <p className="text-[11px] tracking-wider text-stone-500">
            © {new Date().getFullYear()} {en ? "Okuyama-tei" : "奥山亭"} ・ All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-stone-500 transition-colors hover:text-[#b7410e]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
