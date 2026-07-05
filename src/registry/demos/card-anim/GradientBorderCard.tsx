import { Rocket } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転グラデーション枠カード",
  category: "カード演出",
  description: "円錐グラデーションのビームが縁を回り続ける発光ボーダー。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "border", "gradient"],
};

export default function GradientBorderCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl p-[2px] shadow-2xl shadow-black/40">
      <style>{`
        @keyframes gbc-spin { to { transform: rotate(1turn); } }
      `}</style>
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #6366f1 60deg, #ec4899 120deg, transparent 180deg, transparent 360deg)",
          animation: "gbc-spin 4s linear infinite",
        }}
      />
      <div className="relative z-10 rounded-[15px] bg-[#0b0d17] p-7 text-slate-200">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Rocket className="size-5 text-pink-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          {en ? "Rotating gradient border" : "回転グラデーション枠"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "A beam orbits the edge endlessly. On hover it glows brighter for a premium feel."
            : "縁をビームが絶えず周回します。ホバーで光量が増し、プレミアムな印象を強めます。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">animated</span>
          <span className="text-sm font-medium text-pink-300">
            {en ? "Upgrade →" : "アップグレード →"}
          </span>
        </div>
      </div>
    </div>
  );
}
