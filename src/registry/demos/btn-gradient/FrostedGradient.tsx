import type { DemoMeta } from "@/registry";
import { Wind } from "lucide-react";

export const meta: DemoMeta = {
  name: "フロスト・グラデーション",
  category: "ボタン",
  description: "すりガラス越しに滲むグラデーション。グラスモーフィズムなフロストボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function FrostedGradient() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#0b0b12] p-8">
      <span className="pointer-events-none absolute -left-6 top-2 size-28 rounded-full bg-fuchsia-500/40 blur-2xl" />
      <span className="pointer-events-none absolute -right-6 bottom-0 size-28 rounded-full bg-cyan-500/40 blur-2xl" />
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_24px_-8px_rgba(255,255,255,0.2)]"
      >
        <Wind className="size-4" />
        {en ? "Frosted" : "フロステッド"}
      </button>
    </div>
  );
}
