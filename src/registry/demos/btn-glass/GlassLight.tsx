import type { DemoMeta } from "@/registry";
import { Sun } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラス・ライト",
  category: "ボタン",
  description: "明るいパステル背景に溶け込む、白基調のクリーンなグラス・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function GlassLight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100 p-10">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/50 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-[0_12px_30px_-8px_rgba(99,102,241,0.5),inset_0_1px_0_rgba(255,255,255,1)] active:scale-[0.98]"
      >
        <Sun className="size-4 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
        {en ? "Light glass" : "ライトガラス"}
      </button>
    </div>
  );
}
