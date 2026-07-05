import type { DemoMeta } from "@/registry";
import { Heart } from "lucide-react";

export const meta: DemoMeta = {
  name: "ステッカー",
  category: "ボタン",
  description: "白フチと斜め傾きのシール風。ホバーで水平に戻りぴょこっと跳ねる。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Sticker() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-teal-100 p-8">
      <button
        type="button"
        className="inline-flex -rotate-6 items-center gap-2 rounded-2xl border-4 border-white bg-teal-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(20,184,166,0.7),0_0_0_1px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
      >
        <Heart className="size-4 fill-white" />
        {en ? "Favorite" : "お気に入り"}
      </button>
    </div>
  );
}
