import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "アウトライン",
  category: "ボタン",
  description: "ホバーで枠と文字色が反転する、王道のアウトラインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function Outline() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0c0d12] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-indigo-400/70 px-7 py-3.5 text-sm font-semibold text-indigo-300 transition-colors duration-300 hover:bg-indigo-400 hover:text-[#0c0d12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
      >
        {en ? "Learn more" : "詳しく見る"}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
