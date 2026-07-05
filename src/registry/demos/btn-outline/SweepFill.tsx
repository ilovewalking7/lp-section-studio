import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "斜めスイープ塗り",
  category: "ボタン",
  description: "ホバーで斜めの帯が走り抜けて塗りつぶすスイープボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function SweepFill() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0c14] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-violet-400/70 px-7 py-3.5 text-sm font-semibold text-violet-300 transition-colors duration-300 hover:text-white focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] -skew-x-12 bg-violet-500 transition-transform duration-500 ease-out group-hover:translate-x-0" />
        <span className="relative">{en ? "Sweep" : "スイープ"}</span>
      </button>
    </div>
  );
}
