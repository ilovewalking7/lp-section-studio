import type { DemoMeta } from "@/registry";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "メンフィス・ヒーロー",
  category: "メンフィス",
  description: "幾何学シェイプを散りばめた大胆なヒーローとチャンキーなCTA。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

/** 絶対配置のシェイプ装飾（背景レイヤー） */
function Squiggle({ className, color = "#7b5cff" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={cn("absolute", className)} fill="none" aria-hidden>
      <path
        d="M2 20c10-22 24 22 34 0s24-22 34 0 24 22 34 0"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Zigzag({ className, color = "#1fb6c1" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={cn("absolute", className)} fill="none" aria-hidden>
      <path d="M2 24L22 6l20 18L62 6l20 18L102 6l16 14" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DottedGrid({ className, color = "#000" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={cn("absolute", className)} aria-hidden>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <circle key={`${r}-${c}`} cx={9 + c * 18} cy={9 + r * 18} r={3.5} fill={color} />
        ))
      )}
    </svg>
  );
}

export default function MemphisHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#fdf6e3] px-6 py-20 sm:py-28">
      {/* 背景シェイプ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[14%] h-16 w-16 rotate-12 rounded-[28%] border-[5px] border-black bg-[#ffd23f]" />
        <div className="absolute right-[10%] top-[18%] h-0 w-0 border-x-[28px] border-b-[48px] border-x-transparent border-b-[#ff5c8a] rotate-[18deg]" />
        <div className="absolute bottom-[12%] left-[12%] h-20 w-20 rounded-full border-[5px] border-black bg-[#1fb6c1]" />
        <div
          className="absolute bottom-[20%] right-[8%] h-14 w-14 bg-[#7b5cff] border-[5px] border-black"
          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />
        <Squiggle className="left-[40%] top-[8%] w-32" color="#ff8c42" />
        <Zigzag className="bottom-[8%] right-[26%] w-32" color="#7b5cff" />
        <DottedGrid className="right-[20%] top-[40%] h-24 w-24 opacity-70" />
        <div className="absolute left-[2%] top-[55%] h-12 w-24 rounded-t-full border-[5px] border-black border-b-0 bg-[#ff5c8a]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide shadow-[3px_3px_0_0_#000]">
          <Sparkles className="size-4 text-[#ff5c8a]" />
          {en ? "80s postmodern" : "80s ポストモダン"}
        </span>
        <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-black sm:text-7xl">
          {en ? (
            <>
              Design that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#ff5c8a]">plays</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 bg-[#ffd23f]" />
              </span>
              <br />
              boldly.
            </>
          ) : (
            <>
              大胆に、
              <span className="relative inline-block">
                <span className="relative z-10 text-[#ff5c8a]">遊ぶ</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 bg-[#ffd23f]" />
              </span>
              <br />
              デザイン。
            </>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg font-semibold text-black/70">
          {en
            ? "Memphis-style components bursting with geometry and primary colors — bring play and personality to your product."
            : "幾何学とプライマリーカラーが弾ける、メンフィス・スタイルのコンポーネントで、プロダクトに遊び心と個性を。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group inline-flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#7b5cff] px-7 py-3.5 text-base font-extrabold text-white shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000]">
            {en ? "Get started" : "はじめる"}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border-[3px] border-black bg-white px-7 py-3.5 text-base font-extrabold text-black shadow-[5px_5px_0_0_#ff5c8a] transition-transform hover:-translate-y-0.5 active:translate-y-0.5">
            {en ? "See demo" : "デモを見る"}
          </button>
        </div>
      </div>
    </section>
  );
}
