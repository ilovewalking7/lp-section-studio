import type { DemoMeta } from "@/registry";
import { ArrowRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "ピル",
  category: "ボタン",
  description: "完全な角丸のピル型。ホバーで矢印がすっと伸びる、軽快なピル・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Pill() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-emerald-50 p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 py-3.5 pl-7 pr-6 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(5,150,105,0.6)] transition-all duration-200 hover:bg-emerald-500 hover:pr-7 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        {en ? "Continue" : "次へ進む"}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
