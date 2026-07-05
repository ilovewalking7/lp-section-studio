import type { DemoMeta } from "@/registry";
import { Droplets } from "lucide-react";

export const meta: DemoMeta = {
  name: "ジェリー",
  category: "ボタン",
  description: "クリックでぷるんと潰れて戻る、ゼリーのように柔らかいボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Jelly() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-violet-100 p-8">
      <style>{`@keyframes btnfun-jelly{0%{transform:scale(1,1)}25%{transform:scale(1.12,.82)}45%{transform:scale(.9,1.12)}65%{transform:scale(1.04,.96)}100%{transform:scale(1,1)}}.btnfun-jelly:active{animation:btnfun-jelly .5s ease}`}</style>
      <button
        type="button"
        className="btnfun-jelly inline-flex items-center gap-2 rounded-[28px] bg-gradient-to-b from-fuchsia-400 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-[0_12px_24px_-8px_rgba(147,51,234,0.7)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300"
      >
        <Droplets className="size-4" />
        {en ? "Squish" : "ぷるんっ"}
      </button>
    </div>
  );
}
