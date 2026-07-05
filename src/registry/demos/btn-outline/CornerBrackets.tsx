import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コーナーブラケット",
  category: "ボタン",
  description: "四隅のL字ブラケットがホバーで外側へ広がる、照準風ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function CornerBrackets() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0a0f0d] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center justify-center px-9 py-4 text-sm font-semibold tracking-wide text-emerald-200 transition-colors duration-300 hover:text-emerald-100 focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute left-0 top-0 size-3 border-l-2 border-t-2 border-emerald-400 transition-all duration-300 group-hover:-left-1 group-hover:-top-1" />
        <span className="pointer-events-none absolute right-0 top-0 size-3 border-r-2 border-t-2 border-emerald-400 transition-all duration-300 group-hover:-right-1 group-hover:-top-1" />
        <span className="pointer-events-none absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-emerald-400 transition-all duration-300 group-hover:-bottom-1 group-hover:-left-1" />
        <span className="pointer-events-none absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-emerald-400 transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1" />
        {en ? "Select target" : "ターゲット選択"}
      </button>
    </div>
  );
}
