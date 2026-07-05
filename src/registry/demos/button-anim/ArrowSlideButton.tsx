import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アロースライドボタン",
  category: "ボタン演出",
  description: "ホバーで矢印がスライドし、ラベルがずれて動くCTA。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "arrow", "cta"],
};

export default function ArrowSlideButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex flex-col items-center gap-5">
      {/* 矢印が右へ滑る */}
      <button className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-900 shadow transition-transform duration-200 hover:scale-[1.03] active:scale-95">
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {en ? "Read more" : "続きを読む"}
        </span>
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </button>

      {/* 矢印が外から入ってくる */}
      <button className="group relative inline-flex items-center overflow-hidden rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
        <span className="transition-transform duration-300 group-hover:-translate-x-3">
          {en ? "Learn more" : "詳しく見る"}
        </span>
        <ArrowRight className="absolute right-4 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </button>
    </div>
  );
}
