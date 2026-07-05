import type { DemoMeta } from "@/registry";
import { Sparkles, Star } from "lucide-react";

export const meta: DemoMeta = {
  name: "スパークル",
  category: "ボタン",
  description: "ホバーで周囲に小さな星がきらめく、魔法のようなスパークル・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Sparkle() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#1e1b4b] p-8">
      <style>{`@keyframes btnfun-twinkle{0%,100%{opacity:0;transform:scale(.4) rotate(0)}50%{opacity:1;transform:scale(1) rotate(45deg)}}.group:hover .btnfun-spark{animation:btnfun-twinkle 1.2s ease-in-out infinite}`}</style>
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-6px_rgba(139,92,246,0.7)] transition-all duration-200 hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
      >
        <Star className="btnfun-spark pointer-events-none absolute -left-2 -top-2 size-3 fill-yellow-300 text-yellow-300 [animation-delay:0s]" />
        <Star className="btnfun-spark pointer-events-none absolute -right-1 top-1 size-2.5 fill-pink-300 text-pink-300 [animation-delay:.3s]" />
        <Star className="btnfun-spark pointer-events-none absolute -bottom-2 right-6 size-3 fill-cyan-300 text-cyan-300 [animation-delay:.6s]" />
        <Sparkles className="size-4" />
        {en ? "Sparkle" : "きらめき"}
      </button>
    </div>
  );
}
