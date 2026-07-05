import { ArrowRight, Play, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオン・ヒーロー",
  category: "レトロ・Y2K",
  description:
    "夕焼けパースペクティブグリッドと発光する見出しを組み合わせたシンセウェイヴ・ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "neon", "synthwave"],
};

export default function NeonHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0221] px-6 py-28 sm:py-36">
      {/* sun */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2"
      >
        <svg width="320" height="320" viewBox="0 0 320 320" className="opacity-90">
          <defs>
            <linearGradient id="nh-sun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="45%" stopColor="#ff2e97" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <clipPath id="nh-clip">
              <circle cx="160" cy="160" r="150" />
            </clipPath>
          </defs>
          <circle cx="160" cy="160" r="150" fill="url(#nh-sun)" />
          <g clipPath="url(#nh-clip)" stroke="#0d0221" strokeWidth="8">
            {[200, 224, 252, 284].map((y) => (
              <line key={y} x1="0" y1={y} x2="320" y2={y} />
            ))}
          </g>
        </svg>
      </div>

      {/* glow halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,46,151,0.35),transparent_60%)] blur-2xl"
      />

      {/* perspective grid floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
        style={{ perspective: "300px" }}
      >
        <div
          className="absolute inset-0 origin-bottom"
          style={{
            transform: "rotateX(72deg)",
            backgroundImage:
              "linear-gradient(rgba(5,217,232,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(5,217,232,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#05d9e8]/50 bg-[#05d9e8]/10 px-4 py-1 font-mono text-xs uppercase tracking-[0.3em] text-[#05d9e8] shadow-[0_0_20px_rgba(5,217,232,0.4)]">
          <Sparkles className="size-3.5" />
          insert coin
        </span>

        <h1
          className="mt-8 text-balance text-5xl font-black uppercase italic tracking-tight text-white sm:text-7xl"
          style={{
            textShadow:
              "0 0 12px rgba(255,46,151,0.9), 0 0 36px rgba(255,46,151,0.6), 4px 4px 0 #05d9e8",
          }}
        >
          {en ? (
            <>
              The future
              <br />
              glows in neon
            </>
          ) : (
            <>
              未来は、
              <br />
              ネオンに輝く
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-pretty text-lg text-[#d8b4fe]">
          {en
            ? "An '80s dream burned into pixels — a new digital experience where every edge lights up."
            : "80年代の夢をピクセルに焼き付けた、新しいデジタル体験。境界線は、すべて発光する。"}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group inline-flex items-center gap-2 rounded-md bg-[#ff2e97] px-7 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,46,151,0.7)] transition-all hover:shadow-[0_0_40px_rgba(255,46,151,0.95)]">
            {en ? "Start" : "スタート"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-[#05d9e8] bg-transparent px-7 py-3 font-mono text-sm font-bold uppercase tracking-wider text-[#05d9e8] shadow-[0_0_15px_rgba(5,217,232,0.4)] transition-all hover:bg-[#05d9e8]/10">
            <Play className="size-4" />
            {en ? "Watch demo" : "デモを見る"}
          </button>
        </div>
      </div>
    </section>
  );
}
