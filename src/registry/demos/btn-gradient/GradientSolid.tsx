import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "グラデーション・ソリッド",
  category: "ボタン",
  description: "鮮やかな単方向グラデーションのソリッドボタン。ホバーで持ち上がる定番の主役ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function GradientSolid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl px-7 py-3.5",
          "text-sm font-semibold text-white",
          "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600",
          "shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)]",
          "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(168,85,247,0.7)]",
          "active:translate-y-0 active:scale-[0.98]"
        )}
      >
        {en ? "Get started" : "今すぐ始める"}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
