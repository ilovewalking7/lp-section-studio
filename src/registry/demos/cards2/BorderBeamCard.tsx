import { ShieldCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボーダービーム",
  category: "カード演出",
  description: "光の弧が縁を周回するボーダービームのカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function BorderBeamCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <style>{`
        @keyframes cards2-beam-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="relative overflow-hidden rounded-2xl p-px shadow-2xl shadow-black/40">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #38bdf8 350deg, #a5f3fc 360deg)",
            animation: "cards2-beam-spin 4s linear infinite",
          }}
        />
        <div className="relative rounded-2xl bg-[#0b0d17] p-7">
          <div className="flex size-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
            <ShieldCheck className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Border Beam" : "ボーダービーム"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "A single arc of light endlessly circles the card's edge, adding a futuristic accent."
              : "一筋の光の弧がカードの縁を絶えず周回し、近未来的なアクセントを加えます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
