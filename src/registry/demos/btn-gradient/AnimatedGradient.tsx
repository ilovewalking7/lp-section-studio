import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "アニメ・グラデーション",
  category: "ボタン",
  description: "背景位置が滑らかに流れ続ける、生きているようなグラデーションボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function AnimatedGradient() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes ag-flow { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_-6px_rgba(236,72,153,0.55)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(90deg,#7c3aed,#db2777,#f59e0b,#db2777,#7c3aed)",
          backgroundSize: "300% 100%",
          animation: "ag-flow 6s ease infinite",
        }}
      >
        <Sparkles className="size-4" />
        {en ? "Live gradient" : "ライブグラデーション"}
      </button>
    </div>
  );
}
