import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "ミニマルライン",
  category: "ボタン",
  description: "細い一本線の枠と広い字間で構成された、最小限の上品ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function MinimalLine() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0f0f10] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-3 rounded-none border border-zinc-600 px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-zinc-300 transition-colors duration-300 hover:border-zinc-200 hover:text-white focus-visible:outline-none"
      >
        Explore
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </button>
    </div>
  );
}
