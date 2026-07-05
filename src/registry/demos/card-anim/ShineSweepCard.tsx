import { Gem } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シャインスイープカード",
  category: "カード演出",
  description: "ホバーで斜めの光沢がカード全体を一閃するように走る。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "shine"],
};

export default function ShineSweepCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1c2e] to-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/40">
      {/* diagonal shine */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Gem className="size-5 text-amber-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">
          {en ? "Shine Sweep" : "シャイン・スイープ"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "On hover, a diagonal highlight races across the surface for a luxurious reflective effect."
            : "ホバーすると斜めのハイライトが表面を一気に駆け抜け、高級感のある反射を演出します。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">premium</span>
          <span className="text-sm font-medium text-amber-300">
            {en ? "Buy →" : "購入 →"}
          </span>
        </div>
      </div>
    </div>
  );
}
