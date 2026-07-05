import { Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スパークルボタン",
  category: "ボタン演出",
  description: "ボタンの周りにキラキラの星がポップして瞬くボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "sparkle"],
};

const SPARKLES = [
  { top: "-10%", left: "8%", delay: "0s", size: 10 },
  { top: "20%", left: "-6%", delay: "0.4s", size: 7 },
  { top: "75%", left: "4%", delay: "0.9s", size: 9 },
  { top: "-12%", left: "70%", delay: "0.6s", size: 8 },
  { top: "60%", left: "92%", delay: "0.2s", size: 11 },
  { top: "30%", left: "100%", delay: "1.1s", size: 7 },
];

export default function SparkleButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="py-6">
      <style>{`
        @keyframes ba-sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
      `}</style>

      <div className="relative inline-block">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="pointer-events-none absolute block text-amber-300"
            style={{
              top: s.top,
              left: s.left,
              animation: `ba-sparkle 1.8s ease-in-out ${s.delay} infinite`,
            }}
          >
            <Sparkles style={{ width: s.size, height: s.size }} fill="currentColor" />
          </span>
        ))}

        <button className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-amber-500 px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95">
          <Sparkles className="h-4 w-4" />
          {en ? "Cast magic" : "魔法をかける"}
        </button>
      </div>
    </div>
  );
}
