import type { DemoMeta } from "@/registry";
import { Plus } from "lucide-react";

export const meta: DemoMeta = {
  name: "ダッシュ枠",
  category: "ボタン",
  description: "破線の枠が特徴の、追加アクション向けダッシュボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function Dashed() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#101216] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-zinc-500 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
      >
        <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
        {en ? "Add item" : "項目を追加"}
      </button>
    </div>
  );
}
