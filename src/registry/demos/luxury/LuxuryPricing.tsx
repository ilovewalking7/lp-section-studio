import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・プライシング",
  category: "ラグジュアリー",
  description: "金で強調された推奨プランを持つ、黒地の上質な料金テーブル。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "pricing"],
  principle: "中央の金枠だけを際立たせ、他を抑えることで『選ぶべき一つ』へ誘導する。",
};

type Tier = {
  name: string;
  price: string;
  priceEn?: string;
  note: string;
  noteEn: string;
  perks: { ja: string; en: string }[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Signature",
    price: "¥80,000",
    note: "/ 年",
    noteEn: "/ year",
    perks: [
      { ja: "限定コレクションの先行案内", en: "Early access to limited collections" },
      { ja: "専用ラウンジの利用", en: "Private lounge access" },
      { ja: "年2回のメンテナンス", en: "Maintenance twice a year" },
    ],
  },
  {
    name: "Privé",
    price: "¥240,000",
    note: "/ 年",
    noteEn: "/ year",
    perks: [
      { ja: "専属コンシェルジュ", en: "Dedicated concierge" },
      { ja: "全コレクションの優先購入", en: "Priority purchase across all collections" },
      { ja: "プライベート展示会へのご招待", en: "Invitations to private showcases" },
      { ja: "無償の生涯メンテナンス", en: "Complimentary lifetime maintenance" },
    ],
    featured: true,
  },
  {
    name: "Héritage",
    price: "応相談",
    priceEn: "On request",
    note: "",
    noteEn: "",
    perks: [
      { ja: "完全オーダーメイド", en: "Fully bespoke creations" },
      { ja: "アトリエ訪問", en: "Atelier visits" },
      { ja: "後世への継承サポート", en: "Support for passing on to future generations" },
    ],
  },
];

export default function LuxuryPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-24 text-stone-100">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">
          Membership
        </p>
        <h2 className="mt-5 font-display text-4xl font-light tracking-tight sm:text-5xl">
          {en ? "Membership Program" : "会員プログラム"}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "group relative flex flex-col border p-8 transition-colors",
              t.featured
                ? "border-amber-400/50 bg-[#121008]"
                : "border-stone-800 bg-[#101010] hover:border-amber-400/30"
            )}
          >
            {t.featured && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,179,90,0.10),transparent_70%)]" />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 border border-amber-400/50 bg-[#0a0a0a] px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-amber-200">
                  Recommended
                </span>
              </>
            )}

            <div className="relative">
              <h3
                className={cn(
                  "font-display text-2xl tracking-tight",
                  t.featured
                    ? "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                    : "text-stone-200"
                )}
              >
                {t.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-stone-100">
                  {en && t.priceEn ? t.priceEn : t.price}
                </span>
                <span className="text-xs text-stone-500">
                  {en ? t.noteEn : t.note}
                </span>
              </div>

              <div className="my-7 h-px w-full bg-stone-800" />

              <ul className="space-y-3.5">
                {t.perks.map((p) => (
                  <li key={p.en} className="flex items-start gap-3 text-sm text-stone-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span>{en ? p.en : p.ja}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#"
              className={cn(
                "relative mt-9 inline-flex items-center justify-center border py-3 text-[11px] uppercase tracking-[0.3em] transition-colors",
                t.featured
                  ? "border-amber-400/50 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-[#0a0a0a] hover:opacity-90"
                  : "border-stone-700 text-stone-300 hover:border-amber-400/40 hover:text-amber-200"
              )}
            >
              {en ? "Join" : "入会する"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
