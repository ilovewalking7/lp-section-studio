import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シマーボタン",
  category: "ボタン演出",
  description: "暗いボタン上を光沢（シーン）が周期的に横切るシマー演出。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "shimmer"],
};

export default function ShimmerButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-6">
      <style>{`
        @keyframes ba-shimmer-sweep {
          0% { transform: translateX(-130%) skewX(-20deg); }
          60%, 100% { transform: translateX(230%) skewX(-20deg); }
        }
      `}</style>

      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-neutral-900 px-7 py-3 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(255,255,255,0.25)] transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ animation: "ba-shimmer-sweep 2.6s ease-in-out infinite" }}
        />
        <span className="relative z-10">{en ? "Start now" : "今すぐ始める"}</span>
      </button>

      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-indigo-500 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{ animation: "ba-shimmer-sweep 2s linear infinite" }}
        />
        <span className="relative z-10">{en ? "Upgrade" : "アップグレード"}</span>
      </button>
    </div>
  );
}
