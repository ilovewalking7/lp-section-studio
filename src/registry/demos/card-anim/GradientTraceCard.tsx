import { Workflow } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーショントレースカード",
  category: "カード演出",
  description: "アニメーションするグラデーション線がカードの輪郭を常時なぞる。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "border", "trace"],
};

export default function GradientTraceCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative w-full max-w-sm rounded-2xl bg-[#0b0d17] p-[1.5px] shadow-2xl shadow-black/40">
      <style>{`
        @keyframes gtc-trace {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .gtc-outline {
          background: linear-gradient(90deg, transparent, #22d3ee, #6366f1, #a855f7, transparent);
          background-size: 200% 100%;
          animation: gtc-trace 3s linear infinite;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1.5px;
        }
      `}</style>
      <span className="gtc-outline pointer-events-none absolute inset-0 rounded-2xl" />
      <div className="relative rounded-[15px] border border-white/5 bg-[#0b0d17] p-7 text-slate-200">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Workflow className="size-5 text-cyan-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          {en ? "Gradient Trace" : "グラデーション・トレース"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "A flowing gradient line continuously traces the card's outline, giving it a living feel."
            : "色が流れるグラデーション線がカードの輪郭を絶えずなぞり、生きているような印象を与えます。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">running</span>
          <span className="text-sm font-medium text-cyan-300">
            {en ? "Workflow →" : "ワークフロー →"}
          </span>
        </div>
      </div>
    </div>
  );
}
