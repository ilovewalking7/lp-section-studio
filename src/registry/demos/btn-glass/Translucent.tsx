import type { DemoMeta } from "@/registry";
import { Eye } from "lucide-react";

export const meta: DemoMeta = {
  name: "トランスルーセント",
  category: "ボタン",
  description: "背景の色を淡く透かす、軽やかな半透明トランスルーセント・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Translucent() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-500 p-10">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl bg-emerald-950/20 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-950/30 hover:ring-white/50 active:scale-[0.98]"
      >
        <Eye className="size-4 transition-transform duration-300 group-hover:scale-110" />
        {en ? "Translucent" : "透けるボタン"}
      </button>
    </div>
  );
}
