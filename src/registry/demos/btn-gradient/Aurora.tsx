import type { DemoMeta } from "@/registry";
import { Snowflake } from "lucide-react";

export const meta: DemoMeta = {
  name: "オーロラ",
  category: "ボタン",
  description: "北極の夜空のようにゆらめくオーロラ・グラデーションボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Aurora() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#06070d] p-8">
      <style>{`
        @keyframes aurora-move { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(45,212,191,0.55)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(120deg,#0ea5e9,#22d3ee,#34d399,#a855f7,#0ea5e9)",
          backgroundSize: "260% 100%",
          animation: "aurora-move 7s ease infinite",
        }}
      >
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <Snowflake className="relative size-4" />
        <span className="relative">{en ? "Aurora" : "オーロラ"}</span>
      </button>
    </div>
  );
}
