import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデボーダーボタン",
  category: "ボタン演出",
  description: "回転するグラデーションの縁取りが流れ続けるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "gradient", "border"],
};

export default function GradientBorderButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-6">
      <style>{`
        @keyframes ba-gb-spin {
          to { transform: rotate(1turn); }
        }
      `}</style>

      <button className="group relative overflow-hidden rounded-xl p-[2px] transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="absolute inset-[-100%]"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #ec4899, #f59e0b, #6366f1)",
            animation: "ba-gb-spin 3s linear infinite",
          }}
        />
        <span className="relative z-10 flex items-center justify-center rounded-[10px] bg-neutral-950 px-7 py-3 text-sm font-medium text-white">
          {en ? "Try free" : "無料で試す"}
        </span>
      </button>

      <button className="group relative overflow-hidden rounded-full p-[1.5px] transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span
          className="absolute inset-[-100%]"
          style={{
            background:
              "conic-gradient(from 0deg, #22d3ee, #818cf8, #22d3ee)",
            animation: "ba-gb-spin 4s linear infinite reverse",
          }}
        />
        <span className="relative z-10 flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-cyan-100">
          {en ? "Learn more" : "詳しく見る"}
        </span>
      </button>
    </div>
  );
}
