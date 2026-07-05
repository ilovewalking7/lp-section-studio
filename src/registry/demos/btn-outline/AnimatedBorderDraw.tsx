import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "枠線ドロー",
  category: "ボタン",
  description: "ホバーすると上下2本の線が伸びて枠が描き上がるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function AnimatedBorderDraw() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0a0e1a] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-cyan-200 transition-colors duration-300 hover:text-white focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
        <span className="pointer-events-none absolute right-0 top-0 h-0 w-px bg-cyan-400 transition-all delay-150 duration-300 group-hover:h-full" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-cyan-400 transition-all delay-300 duration-300 group-hover:w-full" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-0 w-px bg-cyan-400 transition-all delay-[450ms] duration-300 group-hover:h-full" />
        {en ? "Draw border" : "枠線を描く"}
      </button>
    </div>
  );
}
