import type { DemoMeta } from "@/registry";
import { Wand2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "ウォブル",
  category: "ボタン",
  description: "ホバーすると左右に小気味よく揺れる、いたずらっぽいウォブル・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Wobble() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-amber-100 p-8">
      <style>{`@keyframes btnfun-wobble{0%,100%{transform:rotate(0)}20%{transform:rotate(-4deg)}40%{transform:rotate(3deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(1deg)}}.btnfun-wobble:hover{animation:btnfun-wobble .5s ease both}`}</style>
      <button
        type="button"
        className="btnfun-wobble inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_-6px_rgba(245,158,11,0.8)] transition-colors duration-200 hover:bg-amber-400 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
      >
        <Wand2 className="size-4" />
        {en ? "Wobble" : "ゆらゆら"}
      </button>
    </div>
  );
}
