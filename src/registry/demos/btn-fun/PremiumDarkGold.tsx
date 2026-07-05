import type { DemoMeta } from "@/registry";
import { Crown } from "lucide-react";

export const meta: DemoMeta = {
  name: "プレミアム黒×金",
  category: "ボタン",
  description: "漆黒の地に金のグラデ縁と文字。ホバーで金の光が走るプレミアム・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function PremiumDarkGold() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-black p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-amber-400/40 bg-gradient-to-b from-neutral-900 to-black px-8 py-3.5 text-sm font-semibold tracking-wide text-amber-200 shadow-[0_0_24px_-6px_rgba(251,191,36,0.45),inset_0_1px_0_rgba(251,191,36,0.25)] transition-all duration-300 hover:text-amber-100 hover:shadow-[0_0_32px_-4px_rgba(251,191,36,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <Crown className="relative size-4" />
        <span className="relative bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent">
          MEMBERSHIP
        </span>
      </button>
    </div>
  );
}
