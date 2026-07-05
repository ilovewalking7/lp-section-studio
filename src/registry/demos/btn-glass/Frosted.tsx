import type { DemoMeta } from "@/registry";
import { Snowflake } from "lucide-react";

export const meta: DemoMeta = {
  name: "フロスト",
  category: "ボタン",
  description: "強いブラーで背景を曇らせる、すりガラス（フロスト）のボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Frosted() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#0b1020] p-8">
      <div className="pointer-events-none absolute -left-6 top-2 size-28 rounded-full bg-cyan-400/60 blur-2xl" />
      <div className="pointer-events-none absolute -right-4 bottom-0 size-24 rounded-full bg-fuchsia-500/50 blur-2xl" />
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl transition-all duration-300 hover:border-white/40 hover:bg-white/15 active:scale-[0.98]"
      >
        <Snowflake className="size-4 text-cyan-200" />
        {en ? "Frosted glass" : "フロストガラス"}
      </button>
    </div>
  );
}
