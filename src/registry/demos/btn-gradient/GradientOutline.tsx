import type { DemoMeta } from "@/registry";
import { Zap } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラデーション・アウトライン",
  category: "ボタン",
  description: "枠線だけがグラデーションで光る、中身は暗いゴーストボタン。ホバーで塗りつぶし。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function GradientOutline() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-xl p-[1.5px] text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundImage: "linear-gradient(120deg,#22d3ee,#a78bfa,#f472b6)",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-[10px] bg-[#0b0b12] px-7 py-3 text-white transition-colors duration-300 group-hover:bg-transparent">
          <Zap className="size-4" />
          {en ? "Outline" : "アウトライン"}
        </span>
      </button>
    </div>
  );
}
