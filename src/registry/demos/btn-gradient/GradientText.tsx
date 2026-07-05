import type { DemoMeta } from "@/registry";
import { Type } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラデーション・テキスト",
  category: "ボタン",
  description: "文字自体がグラデーションで彩られる、暗いガラス地のミニマルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function GradientText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes gt-pan { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-bold backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
      >
        <Type className="size-4 text-fuchsia-400" />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee,#f472b6)",
            backgroundSize: "200% 100%",
            animation: "gt-pan 4s linear infinite",
          }}
        >
          {en ? "Gradient text" : "グラデーション文字"}
        </span>
      </button>
    </div>
  );
}
