import type { DemoMeta } from "@/registry";
import { Heart } from "lucide-react";

export const meta: DemoMeta = {
  name: "ソフトシャドウ",
  category: "ボタン",
  description: "柔らかく拡散した影で上品に浮かぶ、洗練ソフトシャドウ・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function SoftShadow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-10">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(15,23,42,0.28)] active:translate-y-0 active:shadow-[0_6px_16px_-6px_rgba(15,23,42,0.2)]"
      >
        <Heart className="size-4 text-rose-500 transition-transform duration-300 group-hover:scale-110" />
        {en ? "Favorite" : "お気に入り"}
      </button>
    </div>
  );
}
