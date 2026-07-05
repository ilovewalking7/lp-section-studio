import type { DemoMeta } from "@/registry";
import { Plus } from "lucide-react";

export const meta: DemoMeta = {
  name: "ラベル展開",
  category: "ボタン",
  description: "通常はアイコンのみ、ホバーで文字が横に展開するピル型ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function ExpandLabel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        className="group inline-flex items-center rounded-full bg-emerald-600 py-3 pl-3 pr-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 active:scale-[0.97]"
      >
        <Plus className="size-4 shrink-0" />
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 group-hover:grid-cols-[1fr]">
          <span className="overflow-hidden whitespace-nowrap">
            <span className="pl-1.5">{en ? "Create new" : "新規作成"}</span>
          </span>
        </span>
      </button>
    </div>
  );
}
