import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラス",
  category: "ボタン",
  description: "半透明のガラス越しに光が透ける、王道のグラスモーフィズム・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Glass() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/20 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.7)] active:scale-[0.98]"
      >
        {en ? "Glass button" : "ガラスボタン"}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
