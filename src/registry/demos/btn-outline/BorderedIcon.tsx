import type { DemoMeta } from "@/registry";
import { Download } from "lucide-react";

export const meta: DemoMeta = {
  name: "枠付きアイコン",
  category: "ボタン",
  description: "アイコン部分だけ枠で仕切られた、二分割アウトラインボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function BorderedIcon() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0d12] p-8">
      <button
        type="button"
        className="group inline-flex items-stretch overflow-hidden rounded-xl border border-cyan-400/70 text-sm font-semibold text-cyan-200 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
      >
        <span className="flex items-center border-r border-cyan-400/70 px-4 transition-colors duration-300 group-hover:bg-cyan-400/15">
          <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>
        <span className="px-6 py-3.5">{en ? "Download" : "ダウンロード"}</span>
      </button>
    </div>
  );
}
