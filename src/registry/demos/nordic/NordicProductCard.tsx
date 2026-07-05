import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧プロダクトカード",
  category: "北欧",
  description: "家具・暮らしの道具のためのくすんだ色の商品カード。",
  align: "center",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "ライン画の商品像と控えめな価格表示で、静かな所有欲を喚起する。",
};

const swatches = [
  { id: "oak", ja: "オーク", en: "Oak", color: "#c9a36b" },
  { id: "sage", ja: "セージ", en: "Sage", color: "#8a9a7b" },
  { id: "charcoal", ja: "チャコール", en: "Charcoal", color: "#3a3a38" },
];

export default function NordicProductCard() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#faf8f3] font-sans text-[#3a3a38] shadow-[0_30px_70px_-44px_rgba(58,58,56,0.4)]">
      <div className="relative flex aspect-square items-center justify-center bg-[#f4f1ea] p-10">
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label={en ? "Favorite" : "お気に入り"}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f3]/80 text-[#c08457] backdrop-blur transition-colors hover:bg-[#faf8f3]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={liked ? "#c08457" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-4.35-9.5-8.5C.8 9.6 2.3 6 5.5 6 7.4 6 9 7.2 12 10c3-2.8 4.6-4 6.5-4 3.2 0 4.7 3.6 3 6.5C19 16.65 12 21 12 21z" strokeLinejoin="round" />
          </svg>
        </button>

        {/* line-art chair */}
        <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
          <path
            d="M60 50 L60 110 M140 50 L140 110 M60 50 Q100 38 140 50"
            stroke={swatches[active].color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55 110 L145 110 L135 165 M55 110 L65 165 M65 165 L135 165"
            stroke={swatches[active].color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M70 110 L70 60 M130 110 L130 60" stroke={swatches[active].color} strokeWidth="2" opacity="0.5" />
        </svg>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#3a3a38]/45">
              Lounge Chair
            </p>
            <h3 className="mt-1 text-lg font-medium">
              {en ? "Fjord Chair" : "フィヨルド・チェア"}
            </h3>
          </div>
          <span className="text-lg font-light tabular-nums text-[#3a3a38]/80">¥38,000</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#3a3a38]/60">
          {en
            ? "Solid wood with linen upholstery — a quietly poised chair to live with for years."
            : "無垢材とリネンの張地。長く寄り添う、静かな佇まいの一脚。"}
        </p>

        <div className="mt-5 flex items-center gap-3">
          {swatches.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              aria-label={en ? s.en : s.ja}
              className={
                "h-7 w-7 rounded-full ring-offset-2 ring-offset-[#faf8f3] transition " +
                (active === i ? "ring-2 ring-[#3a3a38]/40" : "ring-1 ring-[#3a3a38]/10")
              }
              style={{ backgroundColor: s.color }}
            />
          ))}
          <span className="ml-auto text-xs text-[#3a3a38]/55">
            {en ? swatches[active].en : swatches[active].ja}
          </span>
        </div>

        <button className="mt-6 w-full rounded-full bg-[#3a3a38] py-3 text-sm font-medium text-[#f4f1ea] transition-colors hover:bg-[#3a3a38]/90">
          {en ? "Add to cart" : "カートに入れる"}
        </button>
      </div>
    </div>
  );
}
