import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "矢印スライド",
  category: "ボタン",
  description: "ホバーで右矢印が滑り出し、ラベルが詰まる方向付けボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function IconRightSlide() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 active:scale-[0.97]"
      >
        {en ? "Read more" : "続けて読む"}
        <span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
          <ArrowRight className="absolute size-4 transition-transform duration-300 group-hover:translate-x-6" />
          <ArrowRight className="absolute size-4 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      </button>
    </div>
  );
}
