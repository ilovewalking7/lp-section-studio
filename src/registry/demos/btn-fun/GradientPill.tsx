import type { DemoMeta } from "@/registry";
import { Flame } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラデピル",
  category: "ボタン",
  description: "鮮やかなマルチグラデが流れるピル型。ホバーで色がゆっくり巡る。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function GradientPill() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <style>{`@keyframes btnfun-flow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.btnfun-grad{background-size:200% 200%;animation:btnfun-flow 5s ease infinite}.btnfun-grad:hover{animation-duration:2s}`}</style>
      <button
        type="button"
        className="btnfun-grad inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_-6px_rgba(244,114,182,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
      >
        <Flame className="size-4" />
        {en ? "Trending" : "トレンド"}
      </button>
    </div>
  );
}
