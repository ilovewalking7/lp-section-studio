import type { DemoMeta } from "@/registry";
import { ChevronRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "左ボーダースライド",
  category: "ボタン",
  description: "ホバーで左の縦ラインが太く伸び、文字が右へ寄るリスト風ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function LeftBorderSlide() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0d0f14] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-r-lg border-l-2 border-sky-400/40 py-3 pl-5 pr-7 text-sm font-semibold text-zinc-200 transition-colors duration-300 hover:text-white focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute left-0 top-0 h-full w-0.5 bg-sky-400 transition-all duration-300 group-hover:w-1.5" />
        <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
          <ChevronRight className="size-4 text-sky-400" />
          {en ? "Open project" : "プロジェクトを開く"}
        </span>
      </button>
    </div>
  );
}
