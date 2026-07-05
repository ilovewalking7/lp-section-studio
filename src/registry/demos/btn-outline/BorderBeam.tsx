import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "ボーダービーム",
  category: "ボタン",
  description: "光の点が縁をぐるりと走り続ける、ボーダービーム・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function BorderBeam() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#08090f] p-8">
      <style>{`
        @keyframes bb-spin { to { transform: rotate(360deg); } }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0f1018] px-7 py-3.5 text-sm font-semibold text-zinc-100 focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-0 rounded-xl">
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0 300deg, #a78bfa 330deg, #f0abfc 360deg)",
              animation: "bb-spin 3s linear infinite",
            }}
          />
        </span>
        <span className="pointer-events-none absolute inset-px rounded-[11px] bg-[#0f1018]" />
        <Sparkles className="relative size-4 text-fuchsia-300" />
        <span className="relative">{en ? "Running light" : "縁を走る光"}</span>
      </button>
    </div>
  );
}
