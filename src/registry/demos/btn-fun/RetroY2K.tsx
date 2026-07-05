import type { DemoMeta } from "@/registry";
import { Disc3 } from "lucide-react";

export const meta: DemoMeta = {
  name: "レトロY2K ゲル",
  category: "ボタン",
  description: "Aqua風の光沢ゲル。上部ハイライトと半透明グロスでつるんと光るY2Kボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function RetroY2K() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-200 to-indigo-300 p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-sky-400 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.7),inset_0_-3px_6px_rgba(0,0,0,0.25)] ring-1 ring-white/40 transition-all duration-200 hover:saturate-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="pointer-events-none absolute inset-x-2 top-1 h-1/2 rounded-full bg-gradient-to-b from-white/80 to-transparent" />
        <Disc3 className="relative size-4 drop-shadow" />
        <span className="relative drop-shadow">ENTER</span>
      </button>
    </div>
  );
}
