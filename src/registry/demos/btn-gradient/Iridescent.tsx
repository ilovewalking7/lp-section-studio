import type { DemoMeta } from "@/registry";
import { Droplets } from "lucide-react";

export const meta: DemoMeta = {
  name: "イリデッセント",
  category: "ボタン",
  description: "シャボン玉のような真珠光沢が漂う玉虫色ボタン。柔らかく色相が巡る。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Iridescent() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes iri-hue { to { filter: hue-rotate(360deg) } }
        @keyframes iri-pan { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white/95 shadow-[0_8px_28px_-8px_rgba(192,132,252,0.6)] transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(100deg,#c4b5fd,#a5f3fc,#fbcfe8,#bbf7d0,#c4b5fd)",
          backgroundSize: "200% 100%",
          animation: "iri-pan 5s linear infinite, iri-hue 9s linear infinite",
        }}
      >
        <Droplets className="size-4" />
        {en ? "Iridescent" : "玉虫色"}
      </button>
    </div>
  );
}
