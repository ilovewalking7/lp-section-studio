import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "松竹梅プラン",
  category: "和風",
  description: "松・竹・梅の三段プラン料金表。中央の竹を推奨として朱で強調。",
  align: "full",
  isNew: true,
  tags: ["和風", "japanese", "pricing", "matsu-take-ume"],
  principle: "松竹梅の三択は古来の意思決定の型。中央(竹)を推奨に置くと選好が集まる(おとり効果)。",
};

type Plan = {
  id: string;
  rank: string;
  reading: string;
  rankEn: string;
  readingEn: string;
  price: string;
  desc: string;
  descEn: string;
  perks: string[];
  perksEn: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "ume",
    rank: "梅",
    reading: "うめ",
    rankEn: "Ume",
    readingEn: "plum",
    price: "18,000",
    desc: "気軽に湯と食を愉しむ",
    descEn: "Bath and cuisine, simply enjoyed",
    perks: ["和室 一泊二食", "大浴場 利用", "夕食 季節の小会席"],
    perksEn: [
      "Tatami room, one night with two meals",
      "Access to the grand bath",
      "Dinner: a small seasonal kaiseki",
    ],
  },
  {
    id: "take",
    rank: "竹",
    reading: "たけ",
    rankEn: "Take",
    readingEn: "bamboo",
    price: "26,000",
    desc: "もっとも選ばれる定番",
    descEn: "Our most chosen classic",
    perks: [
      "広縁付 和室",
      "貸切露天 30分",
      "夕食 旬彩会席",
      "利き酒 三種",
    ],
    perksEn: [
      "Tatami room with a wide veranda",
      "Private open-air bath, 30 min",
      "Dinner: seasonal kaiseki",
      "Three-sake tasting",
    ],
    featured: true,
  },
  {
    id: "matsu",
    rank: "松",
    reading: "まつ",
    rankEn: "Matsu",
    readingEn: "pine",
    price: "42,000",
    desc: "離れで過ごす特別な一夜",
    descEn: "A special night in a private cottage",
    perks: [
      "露天風呂付 離れ",
      "貸切露天 終日",
      "夕食 特撰会席",
      "個室にて お食事",
    ],
    perksEn: [
      "Cottage with its own open-air bath",
      "Private open-air bath, all day",
      "Dinner: premium kaiseki",
      "Dining in a private room",
    ],
  },
];

export default function MatsuTakeUmePricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#f5f1e8] px-6 py-20 text-stone-800">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-mincho text-sm tracking-[0.4em] text-[#6b7a3a]">
            {en ? "STAY PLANS" : "ご宿泊プラン"}
          </p>
          <h2 className="mt-3 font-mincho text-3xl font-medium tracking-[0.2em] text-stone-900">
            {en ? "Pine · Bamboo · Plum" : "松 ・ 竹 ・ 梅"}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-sm border bg-white/60 p-7",
                p.featured
                  ? "border-[#b7410e] shadow-[0_8px_30px_rgba(183,65,14,0.12)] md:-translate-y-3"
                  : "border-stone-300"
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-[#b7410e] px-4 py-1 font-mincho text-xs tracking-widest text-[#f5f1e8]">
                  {en ? "RECOMMENDED" : "おすすめ"}
                </span>
              )}

              <div className="flex items-baseline gap-3">
                <span
                  className={cn(
                    "font-mincho text-4xl",
                    p.featured ? "text-[#b7410e]" : "text-stone-900"
                  )}
                >
                  {en ? p.rankEn : p.rank}
                </span>
                <span className="font-mincho text-sm text-stone-400">
                  {en ? p.readingEn : p.reading}
                </span>
              </div>
              <p className="mt-2 font-mincho text-sm text-stone-600">
                {en ? p.descEn : p.desc}
              </p>

              <div className="mt-5 border-y border-dashed border-stone-300 py-4">
                <span className="font-mincho text-3xl text-stone-900">
                  ￥{p.price}
                </span>
                <span className="ml-1 text-xs text-stone-500">
                  {en ? " / person · tax incl." : "／名・税込"}
                </span>
              </div>

              <ul className="mt-5 flex-1 space-y-3">
                {(en ? p.perksEn : p.perks).map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 font-mincho text-sm text-stone-700"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        p.featured ? "text-[#b7410e]" : "text-[#6b7a3a]"
                      )}
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-7 rounded-sm font-mincho tracking-wider shadow-none",
                  p.featured
                    ? "bg-[#b7410e] text-[#f5f1e8] hover:bg-[#9c360b]"
                    : "border border-stone-400 bg-transparent text-stone-800 hover:bg-stone-100"
                )}
              >
                {en ? "Book this plan" : "このプランで予約"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
