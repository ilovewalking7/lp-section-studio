import type { DemoMeta } from "@/registry";
import { Moon } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラス・ダーク",
  category: "ボタン",
  description: "暗い背景に映える、エッジが光る黒系グラスモーフィズム・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function GlassDark() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#05070d] p-10">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
      >
        <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Moon className="size-4 text-indigo-300" />
        {en ? "Dark glass" : "ダークガラス"}
      </button>
    </div>
  );
}
