import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "成功チェック",
  category: "ローダー・マイクロ",
  description: "SVGストロークを描画する成功チェックマーク。リプレイ可能。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "success"],
};

const styles = `
@keyframes ldr-circle-draw { to { stroke-dashoffset: 0; } }
@keyframes ldr-check-draw { to { stroke-dashoffset: 0; } }
@keyframes ldr-check-pop {
  0% { transform: scale(0.85); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
@keyframes ldr-check-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
`;

export default function SuccessCheck() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{styles}</style>

      <div
        key={key}
        className="flex h-28 w-28 items-center justify-center"
        style={{ animation: "ldr-check-pop 0.5s ease-out" }}
      >
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-emerald-500"
            strokeDasharray="226"
            strokeDashoffset="226"
            style={{ animation: "ldr-circle-draw 0.6s ease-out forwards" }}
          />
          <path
            d="M24 41 L36 53 L57 29"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-emerald-500"
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{ animation: "ldr-check-draw 0.4s 0.5s ease-out forwards" }}
          />
        </svg>
      </div>

      <p
        key={`label-${key}`}
        className="text-sm font-medium text-foreground"
        style={{ animation: "ldr-check-fade 0.4s 0.8s both" }}
      >
        {en ? "Completed" : "完了しました"}
      </p>

      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="rounded-md border border-border bg-card px-4 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
      >
        {en ? "Replay" : "リプレイ"}
      </button>
    </div>
  );
}
