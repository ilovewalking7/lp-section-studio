import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "左から塗り",
  category: "ボタン",
  description: "ホバーで塗りが左端から右へ流れ込むアウトラインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function HoverFillLeft() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0c0e10] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-teal-400/70 px-7 py-3.5 text-sm font-semibold text-teal-300 transition-colors duration-300 hover:text-[#0c0e10] focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-teal-400 transition-transform duration-300 ease-out group-hover:translate-x-0" />
        <span className="relative">{en ? "Fill from left" : "左から塗りつぶし"}</span>
      </button>
    </div>
  );
}
