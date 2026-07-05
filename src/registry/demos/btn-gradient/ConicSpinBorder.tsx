import type { DemoMeta } from "@/registry";
import { Loader } from "lucide-react";

export const meta: DemoMeta = {
  name: "コニック・スピン・ボーダー",
  category: "ボタン",
  description: "一筋の光が縁をぐるりと回り続ける、ローディング感のある2色コニック枠ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function ConicSpinBorder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes csb-spin { to { transform: rotate(1turn) } }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center overflow-hidden rounded-full p-[2px] text-sm font-semibold transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute -inset-[60%]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg,transparent 0deg,transparent 270deg,#a78bfa 320deg,#22d3ee 360deg)",
            animation: "csb-spin 2.2s linear infinite",
          }}
        />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-[#11121b] px-7 py-3 text-white">
          <Loader className="size-4 text-cyan-300" />
          {en ? "Spin border" : "スピンボーダー"}
        </span>
      </button>
    </div>
  );
}
