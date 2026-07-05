import type { DemoMeta } from "@/registry";
import { Plus } from "lucide-react";

export const meta: DemoMeta = {
  name: "ピル・グラス",
  category: "ボタン",
  description: "完全な丸みのピル形状に透明感をまとった、グラス・ピルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function PillGlass() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 p-10">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 py-3 pl-5 pr-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md transition-all duration-300 hover:bg-white/25 active:scale-[0.98]"
      >
        <span className="grid size-6 place-items-center rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-white/40">
          <Plus className="size-3.5" />
        </span>
        {en ? "Add new" : "新規追加"}
      </button>
    </div>
  );
}
