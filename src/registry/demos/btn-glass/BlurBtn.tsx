import type { DemoMeta } from "@/registry";
import { Wind } from "lucide-react";

export const meta: DemoMeta = {
  name: "ブラー",
  category: "ボタン",
  description: "背後の彩光をブラーで取り込み、ホバーで透明感が増すブラー・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function BlurBtn() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#120a1f] p-10">
      <div className="pointer-events-none absolute left-8 top-6 size-24 rounded-full bg-pink-500/70 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-4 size-24 rounded-full bg-indigo-500/70 blur-3xl" />
      <button
        type="button"
        className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-2xl active:scale-[0.98]"
      >
        <Wind className="size-4" />
        {en ? "Blur button" : "ブラーボタン"}
      </button>
    </div>
  );
}
