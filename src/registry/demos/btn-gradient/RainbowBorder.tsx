import type { DemoMeta } from "@/registry";
import { Star } from "lucide-react";

export const meta: DemoMeta = {
  name: "レインボー・ボーダー",
  category: "ボタン",
  description: "回転する円錐(conic)グラデーションの虹色枠が縁を周回するボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function RainbowBorder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes rb-spin { to { transform: rotate(1turn) } }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center overflow-hidden rounded-xl p-[2px] text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute -inset-[60%]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg,#f43f5e,#f59e0b,#84cc16,#22d3ee,#6366f1,#d946ef,#f43f5e)",
            animation: "rb-spin 4s linear infinite",
          }}
        />
        <span className="relative inline-flex items-center gap-2 rounded-[10px] bg-[#0b0b12] px-7 py-3 text-white">
          <Star className="size-4" />
          {en ? "Rainbow border" : "虹色ボーダー"}
        </span>
      </button>
    </div>
  );
}
