import { Zap, Heart, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ステッカーカード",
  category: "プレイフル",
  description: "ステッカーやバッジ装飾を貼ったポップなカード。",
  align: "center",
  isNew: true,
  tags: ["playful", "rounded", "sticker"],
};

function StarSticker({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M20 2l5.5 11.1 12.3 1.8-8.9 8.7 2.1 12.2L20 39.8 8.9 45.6 11 33.4 2.1 24.7 14.4 22.9z"
        transform="scale(0.85) translate(3 -1)"
        fill={color}
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StickerCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="font-rounded relative w-full max-w-sm">
      {/* stickers */}
      <StarSticker color="#ffd166" className="absolute -left-5 -top-5 size-16 rotate-[-12deg] drop-shadow" />
      <span
        className="absolute -right-4 top-6 z-10 inline-flex rotate-12 items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-md"
        style={{ backgroundColor: "#06d6a0" }}
      >
        <Zap className="size-3.5" /> NEW
      </span>

      <div className="relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-7 shadow-[0_12px_0_#eef1f4]">
        <div
          className="absolute -right-10 -bottom-10 size-32 rounded-full opacity-20"
          style={{ backgroundColor: "#b388ff" }}
        />
        <div
          className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl text-white shadow-md"
          style={{ backgroundColor: "#ff8fab" }}
        >
          <Heart className="size-7" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800">{en ? "Starter Kit" : "スターターキット"}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {en
            ? "Every cute part packed in. Stick them on, line them up, and you're done."
            : "かわいいパーツをぜんぶ詰め込みました。貼って、ならべて、すぐ完成。"}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { t: "丸い", en: "Rounded", c: "#4cc9f0" },
            { t: "ポップ", en: "Poppy", c: "#ffd166" },
            { t: "たのしい", en: "Fun", c: "#06d6a0" },
          ].map((chip) => (
            <span
              key={chip.en}
              className="rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: chip.c }}
            >
              {en ? chip.en : chip.t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
            <span className="ml-1 text-xs font-bold text-slate-400">4.9</span>
          </div>
          <button
            className="rounded-full px-5 py-2 text-sm font-extrabold text-white transition-all hover:brightness-105 active:translate-y-0.5"
            style={{ backgroundColor: "#ff8fab", boxShadow: "0 5px 0 #e26d8c" }}
          >
            {en ? "Get it" : "ゲット"}
          </button>
        </div>
      </div>
    </div>
  );
}
