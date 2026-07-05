import { Check, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボタニカル・プライシング",
  category: "ボタニカル",
  description: "ウェルネス会員プランの料金プラン3種。自然な配色で。",
  align: "full",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

type Tier = {
  id: string;
  nameJa: string;
  nameEn: string;
  price: string;
  periodJa: string;
  periodEn: string;
  descJa: string;
  descEn: string;
  featuresJa: string[];
  featuresEn: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    id: "seed",
    nameJa: "シード",
    nameEn: "Seed",
    price: "¥0",
    periodJa: "/ 月",
    periodEn: "/ mo",
    descJa: "はじめての方に。基本のケアを無料で。",
    descEn: "For newcomers — essential care, free.",
    featuresJa: ["月1回のお手入れガイド", "コミュニティ参加", "季節のレシピ配信"],
    featuresEn: ["Monthly care guide", "Community access", "Seasonal recipes"],
  },
  {
    id: "bloom",
    nameJa: "ブルーム",
    nameEn: "Bloom",
    price: "¥1,980",
    periodJa: "/ 月",
    periodEn: "/ mo",
    descJa: "毎日のウェルネスを習慣に。",
    descEn: "Make daily wellness a habit.",
    featuresJa: [
      "シードの全特典",
      "月替わりボタニカルボックス",
      "オンライン瞑想クラス",
      "会員限定15%オフ",
    ],
    featuresEn: [
      "Everything in Seed",
      "Monthly botanical box",
      "Online meditation classes",
      "Member-only 15% off",
    ],
    featured: true,
  },
  {
    id: "forest",
    nameJa: "フォレスト",
    nameEn: "Forest",
    price: "¥4,800",
    periodJa: "/ 月",
    periodEn: "/ mo",
    descJa: "本格的なセルフケアを求める方へ。",
    descEn: "For those seeking serious self-care.",
    featuresJa: [
      "ブルームの全特典",
      "個別カウンセリング",
      "スパ施術 月1回無料",
      "新商品の先行アクセス",
    ],
    featuresEn: [
      "Everything in Bloom",
      "One-on-one consultations",
      "One free spa treatment a month",
      "Early access to new products",
    ],
  },
];

export default function BotanicalPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f3f1e7] px-6 py-20 text-[#3f4a35]">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5e6b4f]/30 px-3 py-1 text-xs tracking-[0.2em] text-[#5e6b4f]">
            <Leaf className="size-3.5" /> MEMBERSHIP
          </span>
          <h2 className="mt-5 font-serif text-4xl font-medium tracking-tight">
            {en ? "A plan that grows at your pace" : "あなたのペースで育つプラン"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b4f]">
            {en
              ? "Change or cancel anytime. Wellness that lasts, naturally — like a plant."
              : "いつでも変更・解約可能。植物のように、無理なく続くウェルネスを。"}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 transition-shadow",
                t.featured
                  ? "border-[#5e6b4f] bg-[#5e6b4f] text-[#f3f1e7] shadow-[0_20px_50px_-20px_rgba(63,74,53,0.7)]"
                  : "border-[#5e6b4f]/20 bg-white/50 hover:shadow-md"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#b3753f] px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
                  {en ? "Popular" : "人気"}
                </span>
              )}
              <h3
                className={cn(
                  "font-serif text-xl font-medium",
                  t.featured ? "text-[#f3f1e7]" : "text-[#3f4a35]"
                )}
              >
                {en ? t.nameEn : t.nameJa}
              </h3>
              <p
                className={cn(
                  "mt-1 text-xs leading-relaxed",
                  t.featured ? "text-[#f3f1e7]/80" : "text-[#5e6b4f]"
                )}
              >
                {en ? t.descEn : t.descJa}
              </p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-serif text-4xl font-medium">{t.price}</span>
                <span
                  className={cn(
                    "pb-1 text-sm",
                    t.featured ? "text-[#f3f1e7]/70" : "text-[#5e6b4f]/70"
                  )}
                >
                  {en ? t.periodEn : t.periodJa}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {(en ? t.featuresEn : t.featuresJa).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        t.featured ? "text-[#cdd4b6]" : "text-[#86a06d]"
                      )}
                    />
                    <span className={t.featured ? "text-[#f3f1e7]/90" : ""}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "mt-7 h-11 rounded-full text-sm tracking-wide",
                  t.featured
                    ? "bg-[#f3f1e7] text-[#3f4a35] hover:bg-white"
                    : "bg-[#5e6b4f] text-[#f3f1e7] hover:bg-[#4b563f]"
                )}
              >
                {en ? "Choose plan" : "プランを選ぶ"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
