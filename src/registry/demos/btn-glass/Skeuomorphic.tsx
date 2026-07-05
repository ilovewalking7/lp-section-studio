import type { DemoMeta } from "@/registry";
import { Download } from "lucide-react";

export const meta: DemoMeta = {
  name: "スキューモーフィック",
  category: "ボタン",
  description: "光沢グラデと内側ハイライトで本物のボタンを模した、スキューモーフィック。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Skeuomorphic() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#cdd3dd] p-10">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-sky-700/60 bg-gradient-to-b from-sky-400 to-sky-600 px-7 py-3 text-sm font-bold text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.35)] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-150 hover:from-sky-300 hover:to-sky-500 active:from-sky-500 active:to-sky-600 active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]"
      >
        <Download className="size-4" />
        {en ? "Download" : "ダウンロード"}
      </button>
    </div>
  );
}
