import type { DemoMeta } from "@/registry";
import { Heart, Star, Zap, Plus } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・ボタン集",
  category: "メンフィス",
  description: "アウトラインのプレイフルなボタンとシェイプバッジ。",
  align: "center",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

export default function MemphisButtonSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex w-full justify-center px-5">
      {/* 角の装飾と影が箱の外に出るので、そのぶんの余白を外側に確保する */}
      <div className="relative w-full max-w-md rounded-2xl border-[3px] border-black bg-[#fdf6e3] p-8 shadow-[7px_7px_0_0_#000]">
      <div className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 rotate-12 rounded-[30%] border-[3px] border-black bg-[#ffd23f]" />

      {/* ソリッドボタン */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl border-[3px] border-black bg-[#ff5c8a] px-5 py-2.5 text-sm font-extrabold text-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
          {en ? "Primary" : "プライマリ"}
        </button>
        <button className="rounded-xl border-[3px] border-black bg-[#7b5cff] px-5 py-2.5 text-sm font-extrabold text-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
          {en ? "Secondary" : "セカンダリ"}
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-xl border-[3px] border-black bg-[#1fb6c1] px-5 py-2.5 text-sm font-extrabold text-white shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
          <Zap className="size-4" strokeWidth={3} />
          {en ? "Action" : "アクション"}
        </button>
      </div>

      {/* アウトラインボタン */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-xl border-[3px] border-black bg-white px-5 py-2.5 text-sm font-extrabold text-black shadow-[4px_4px_0_0_#ff5c8a] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
          {en ? "Outline" : "アウトライン"}
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-black bg-white px-5 py-2.5 text-sm font-extrabold text-black shadow-[4px_4px_0_0_#7b5cff] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
          <Plus className="size-4" strokeWidth={3} />
          {en ? "Add" : "追加"}
        </button>
        <button
          className="flex size-11 items-center justify-center rounded-xl border-[3px] border-black bg-[#ffd23f] shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
          aria-label={en ? "Favorite" : "お気に入り"}
        >
          <Heart className="size-5 text-black" strokeWidth={2.5} />
        </button>
      </div>

      {/* シェイプバッジ */}
      <div className="mt-6 border-t-[3px] border-dashed border-black/30 pt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1 -rotate-2 rounded-md border-2 border-black bg-[#ff8c42] px-2.5 py-1 text-xs font-black uppercase text-white">
            <Star className="size-3" strokeWidth={3} />
            {en ? "Popular" : "人気"}
          </span>
          <span className="rounded-full border-2 border-black bg-[#1fb6c1] px-3 py-1 text-xs font-black uppercase text-white">
            {en ? "New" : "新着"}
          </span>
          <span className="rotate-2 rounded-md border-2 border-black bg-[#ffd23f] px-2.5 py-1 text-xs font-black uppercase">
            {en ? "Sale" : "セール"}
          </span>
          <span
            className="flex h-6 w-6 items-center justify-center border-2 border-black bg-[#ff5c8a]"
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
        </div>
        </div>
      </div>
    </div>
  );
}
