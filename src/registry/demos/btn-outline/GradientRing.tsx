import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーションリング",
  category: "ボタン",
  description: "グラデーションの細い枠だけを纏った、軽やかなリングボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function GradientRing() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0a0b12] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center rounded-full p-px transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none"
        style={{
          backgroundImage:
            "linear-gradient(120deg,#6366f1,#ec4899,#f59e0b)",
        }}
      >
        <span className="rounded-full bg-[#11121b] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#171826]">
          {en ? "Ring button" : "リングボタン"}
        </span>
      </button>
    </div>
  );
}
