import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "中央から塗り",
  category: "ボタン",
  description: "ホバーで塗りが中央から上下に広がるアウトラインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function CenterFill() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0a0e0c] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-lime-400/70 px-7 py-3.5 text-sm font-semibold text-lime-300 transition-colors duration-300 hover:text-[#0a0e0c] focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 origin-center scale-y-0 bg-lime-400 transition-transform duration-300 ease-out group-hover:scale-y-100" />
        <span className="relative">{en ? "Fill from center" : "中央から塗り"}</span>
      </button>
    </div>
  );
}
