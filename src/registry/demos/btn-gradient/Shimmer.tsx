import type { DemoMeta } from "@/registry";
import { Wand2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "シマー",
  category: "ボタン",
  description: "表面を絶えず微かな光が流れる、上品なシマー・ボタン（Vercel風）。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Shimmer() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes shimmer-spin { to { transform: translate(-50%,-50%) rotate(1turn) } }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex h-12 items-center overflow-hidden rounded-full px-[2px] text-sm font-medium transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%]"
          style={{
            backgroundImage:
              "conic-gradient(from 90deg at 50% 50%,#0b0b12 0%,#94a3b8 50%,#0b0b12 100%)",
            animation: "shimmer-spin 2.5s linear infinite",
          }}
        />
        <span className="relative inline-flex h-full items-center gap-2 rounded-full bg-[#0b0b12] px-7 text-slate-200 backdrop-blur-3xl">
          <Wand2 className="size-4" />
          {en ? "Shimmer" : "シマー"}
        </span>
      </button>
    </div>
  );
}
