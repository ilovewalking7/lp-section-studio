import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "アイコン出現",
  category: "ボタン",
  description: "ホバーで隠れていたアイコンがふわっと現れ、横幅が広がるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function IconReveal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-violet-50 p-8">
      <button
        type="button"
        className="group inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-all duration-300 hover:bg-violet-700 active:scale-[0.97]"
      >
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 group-hover:grid-cols-[1fr]">
          <span className="overflow-hidden">
            <Sparkles className="mr-1.5 size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        </span>
        {en ? "Cast magic" : "魔法をかける"}
      </button>
    </div>
  );
}
