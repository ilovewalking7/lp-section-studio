import { Award } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シャインカード",
  category: "カード演出",
  description: "ホバーで斜めの光沢が一閃して表面を走るカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function ShineCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-600/90 to-orange-700 p-7 shadow-2xl shadow-orange-900/40">
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          }}
        />
        <div className="relative text-white">
          <Award className="size-8" />
          <h3 className="mt-5 text-lg font-semibold">
            {en ? "Premium Certified" : "プレミアム認定"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/85">
            {en
              ? "On hover, a streak of light sweeps diagonally across the surface, evoking a polished metallic finish."
              : "ホバーすると一筋の光が表面を斜めに横切り、磨かれた金属のような質感を演出します。"}
          </p>
        </div>
      </div>
    </div>
  );
}
