import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバーフィルボタン",
  category: "ボタン演出",
  description: "ホバーで背景が片側からワイプして塗りつぶされるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "hover", "fill"],
};

export default function HoverFillButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-5">
      {/* 左から塗りつぶし */}
      <button className="group relative overflow-hidden rounded-md border border-indigo-400 px-7 py-2.5 text-sm font-semibold text-indigo-300 transition-colors duration-300 hover:text-neutral-950">
        <span className="absolute inset-0 -translate-x-full bg-indigo-400 transition-transform duration-300 ease-out group-hover:translate-x-0" />
        <span className="relative z-10">{en ? "Fill from left" : "左から塗る"}</span>
      </button>

      {/* 下から塗りつぶし */}
      <button className="group relative overflow-hidden rounded-md border border-emerald-400 px-7 py-2.5 text-sm font-semibold text-emerald-300 transition-colors duration-300 hover:text-neutral-950">
        <span className="absolute inset-0 translate-y-full bg-emerald-400 transition-transform duration-300 ease-out group-hover:translate-y-0" />
        <span className="relative z-10">{en ? "Fill from bottom" : "下から塗る"}</span>
      </button>

      {/* 中央から塗りつぶし */}
      <button className="group relative overflow-hidden rounded-md border border-rose-400 px-7 py-2.5 text-sm font-semibold text-rose-300 transition-colors duration-300 hover:text-neutral-950">
        <span className="absolute inset-0 scale-x-0 bg-rose-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        <span className="relative z-10">{en ? "Fill from center" : "中央から塗る"}</span>
      </button>
    </div>
  );
}
