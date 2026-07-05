import type { DemoMeta } from "@/registry";
import { Pencil } from "lucide-react";

export const meta: DemoMeta = {
  name: "手描き枠",
  category: "ボタン",
  description: "ラフな手描き風の枠線。ホバーで線がゆらいで生き生きするボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function HandDrawn() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#fffdf5] p-8">
      <style>{`@keyframes btnfun-sketch{0%,100%{border-radius:255px 15px 225px 15px/15px 225px 15px 255px}50%{border-radius:15px 225px 15px 255px/255px 15px 225px 15px}}.btnfun-hand:hover{animation:btnfun-sketch 1.4s ease-in-out infinite}`}</style>
      <button
        type="button"
        className="btnfun-hand inline-flex items-center gap-2 border-[3px] border-[#1f2937] bg-[#fffdf5] px-7 py-3.5 text-sm font-bold text-[#1f2937] [border-radius:255px_15px_225px_15px/15px_225px_15px_255px] transition-colors duration-200 hover:bg-yellow-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2937]"
      >
        <Pencil className="size-4" />
        {en ? "Sketch" : "スケッチ"}
      </button>
    </div>
  );
}
