import type { DemoMeta } from "@/registry";
import { Gem } from "lucide-react";

export const meta: DemoMeta = {
  name: "シャイン・スイープ",
  category: "ボタン",
  description: "斜めの光沢がスッと横切る上質なシャインボタン。ホバーで反射が走る。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function ShineSweep() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes ss-sweep { 0%{transform:translateX(-160%) skewX(-20deg)} 100%{transform:translateX(260%) skewX(-20deg)} }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(251,146,60,0.7)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-md opacity-0 group-hover:opacity-100"
          style={{ animation: "ss-sweep 0.9s ease forwards" }}
        />
        <Gem className="size-4" />
        {en ? "Premium" : "プレミアム"}
      </button>
    </div>
  );
}
