import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転グラデ枠",
  category: "ボタン",
  description: "コニックグラデーションが回転し続ける、虹色の回転枠ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function RotatingGradientBorder() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b14] p-8">
      <style>{`
        @keyframes rgb-spin { to { transform: rotate(360deg); } }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-px focus-visible:outline-none"
      >
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, #f43f5e, #f59e0b, #22d3ee, #a855f7, #f43f5e)",
            animation: "rgb-spin 4s linear infinite",
          }}
        />
        <span className="relative rounded-[11px] bg-[#11111c] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#191926]">
          {en ? "Rotating gradient" : "回転グラデーション"}
        </span>
      </button>
    </div>
  );
}
