import type { DemoMeta } from "@/registry";
import { Play } from "lucide-react";

export const meta: DemoMeta = {
  name: "ニューモーフィズム（凸）",
  category: "ボタン",
  description: "背景から柔らかく押し出されたように浮き上がる、凸型ニューモーフィズム。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function NeumorphicRaised() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#e6e9ef] p-10">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-2xl bg-[#e6e9ef] px-8 py-4 text-sm font-semibold text-slate-600 shadow-[8px_8px_16px_#c3c6cc,-8px_-8px_16px_#ffffff] transition-all duration-200 hover:text-slate-800 active:shadow-[inset_6px_6px_12px_#c3c6cc,inset_-6px_-6px_12px_#ffffff]"
      >
        <Play className="size-4" />
        {en ? "Play" : "再生する"}
      </button>
    </div>
  );
}
