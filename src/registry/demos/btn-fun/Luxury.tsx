import type { DemoMeta } from "@/registry";
import { Gem } from "lucide-react";

export const meta: DemoMeta = {
  name: "ラグジュアリー",
  category: "ボタン",
  description: "シャンパンゴールドの上品なグラデと細い罫線。控えめな光沢の高級ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Luxury() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0e0e10] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#caa24a] via-[#f4e2a1] to-[#caa24a] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#3a2c08] shadow-[0_10px_30px_-8px_rgba(202,162,74,0.6)] transition-all duration-300 hover:tracking-[0.28em] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        <Gem className="size-4" />
        Reserve
      </button>
    </div>
  );
}
