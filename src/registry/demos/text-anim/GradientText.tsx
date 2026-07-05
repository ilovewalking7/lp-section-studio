import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・グラデ見出し",
  category: "テキストアニメ",
  description: "大きな見出し文字をグラデーションが横方向に流れ続ける。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "gradient"],
};

export default function GradientText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-neutral-950 px-8 py-14 text-center">
      <h2 className="bg-[linear-gradient(110deg,#ec4899,#8b5cf6,#3b82f6,#06b6d4,#8b5cf6,#ec4899)] bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent [animation:gt-flow_4s_linear_infinite] sm:text-6xl">
        {en ? "Infinite gradient" : "無限のグラデーション"}
      </h2>
      <p className="bg-[linear-gradient(110deg,#fbbf24,#f472b6,#a78bfa,#fbbf24)] bg-[length:200%_auto] bg-clip-text text-lg font-semibold text-transparent [animation:gt-flow_6s_linear_infinite]">
        Endless gradient motion.
      </p>
      <style>{`
        @keyframes gt-flow {
          to { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}
