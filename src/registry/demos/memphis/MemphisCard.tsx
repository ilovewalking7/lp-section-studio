import type { DemoMeta } from "@/registry";
import { ArrowUpRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・カード",
  category: "メンフィス",
  description: "シェイプアクセント付きのコンテンツカード。",
  align: "center",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

export default function MemphisCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full px-6">
      {/* 装飾が箱の外に出る設計なので、はみ出すぶんの余白を外側に確保する */}
      <div className="relative w-full max-w-sm">
      {/* 外側に飛び出す装飾シェイプ */}
      <div className="pointer-events-none absolute -left-4 -top-4 z-10 h-12 w-12 rotate-12 rounded-[30%] border-[4px] border-black bg-[#ffd23f]" />
      <div className="pointer-events-none absolute -right-5 top-1/3 z-10 h-9 w-9 rounded-full border-[4px] border-black bg-[#1fb6c1]" />
      <div
        className="pointer-events-none absolute -bottom-4 left-10 z-10 h-10 w-10 border-[4px] border-black bg-[#ff5c8a]"
        style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative overflow-hidden rounded-2xl border-[3px] border-black bg-white shadow-[7px_7px_0_0_#000]">
        {/* 上部のパターンバンド */}
        <div className="relative h-28 overflow-hidden border-b-[3px] border-black bg-[#7b5cff]">
          <svg viewBox="0 0 120 30" className="absolute left-4 top-6 w-28" fill="none" aria-hidden>
            <path d="M2 24L22 6l20 18L62 6l20 18L102 6l16 14" stroke="#ffd23f" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="absolute right-5 top-4 h-10 w-10 rounded-full border-[3px] border-black bg-[#ff8c42]" />
          <div className="absolute bottom-3 right-16 h-6 w-6 rotate-12 border-[3px] border-black bg-[#ff5c8a]" />
        </div>

        <div className="p-6">
          <span className="inline-block -rotate-2 rounded-md border-2 border-black bg-[#ffd23f] px-2.5 py-0.5 text-xs font-black uppercase tracking-wide">
            {en ? "New" : "新着"}
          </span>
          <h3 className="mt-3 text-2xl font-black leading-tight text-black">
            {en ? "Geometric Studio" : "ジオメトリック・スタジオ"}
          </h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-black/65">
            {en
              ? "Bold shapes and primary colors for postmodern visuals that grab every eye."
              : "大胆なシェイプとプライマリーカラーで、見る人の目を引きつけるポストモダンなビジュアルを。"}
          </p>
          <button className="group mt-5 inline-flex items-center gap-1.5 rounded-xl border-[3px] border-black bg-[#ff5c8a] px-5 py-2.5 text-sm font-extrabold text-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
            {en ? "Learn more" : "詳しく見る"}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
