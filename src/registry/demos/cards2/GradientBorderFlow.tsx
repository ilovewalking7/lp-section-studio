import { Layers } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデボーダーフロー",
  category: "カード演出",
  description: "縁を流れる回転グラデーションが常に巡るカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function GradientBorderFlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes cards2-gbf-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="relative overflow-hidden rounded-2xl p-px shadow-2xl shadow-black/40">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #ec4899, #22d3ee, #6366f1)",
            animation: "cards2-gbf-spin 5s linear infinite",
          }}
        />
        <div className="relative rounded-2xl bg-[#0b0d17] p-7">
          <div className="flex size-12 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300">
            <Layers className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Gradient Flow" : "グラデーションフロー"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "A rainbow gradient circles the card's edge nonstop, giving it a lively, energetic feel."
              : "カードの縁を虹色のグラデーションが絶え間なく巡り、生き生きとした印象を与えます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
