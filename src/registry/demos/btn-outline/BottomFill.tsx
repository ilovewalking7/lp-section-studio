import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "下から塗り",
  category: "ボタン",
  description: "ホバーで塗りが下から上へせり上がるアウトラインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function BottomFill() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0e0c0f] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-pink-400/70 px-7 py-3.5 text-sm font-semibold text-pink-300 transition-colors duration-300 hover:text-[#0e0c0f] focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 translate-y-full bg-pink-400 transition-transform duration-300 ease-out group-hover:translate-y-0" />
        <span className="relative">{en ? "Fill up" : "下から塗り"}</span>
      </button>
    </div>
  );
}
