import { useState } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "動画フレーム風ヒーロー",
  category: "ヒーロー・LP",
  description: "CSSのみで動く擬似動画プレイヤー枠（再生バー・波形）付きヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function VideoFrameStyleHero() {
  const [playing, setPlaying] = useState(true);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#070710] py-24 text-white">
      <style>{`
        @keyframes vf-prog{from{width:0%}to{width:100%}}
        @keyframes vf-orb{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(8%,-6%) scale(1.2)}}
        @keyframes vf-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
        @media (prefers-reduced-motion: reduce){.vf-prog,.vf-orb,.vf-eq{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60vw] -translate-x-1/2 rounded-full bg-rose-600/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          🎬 {en ? "Your story, on video" : "ストーリーを動画で"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {en ? "Watch it, and you'll get it." : "観れば、伝わる。"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
          {en
            ? "A 90-second product tour that shows you everything."
            : "90秒のプロダクトツアーで、すべてが理解できる。"}
        </p>
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <div className="relative aspect-video overflow-hidden">
            <div
              className="vf-orb absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 opacity-60 blur-2xl"
              style={{ animation: playing ? "vf-orb 8s ease-in-out infinite" : "none" }}
            />
            <div
              className="vf-orb absolute right-1/4 bottom-1/4 h-44 w-44 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-60 blur-2xl"
              style={{ animation: playing ? "vf-orb 10s ease-in-out infinite 1s" : "none" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"}
                className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform hover:scale-110"
              >
                {playing ? <Pause className="size-7" /> : <Play className="size-7 translate-x-0.5" />}
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-1 px-6 pb-12 opacity-50">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="vf-eq h-8 flex-1 origin-bottom rounded-sm bg-white/40"
                  style={{ animation: playing ? `vf-eq ${0.8 + (i % 5) * 0.2}s ease-in-out infinite ${(i % 7) * 0.1}s` : "none" }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-3">
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"} className="text-white/70 hover:text-white">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <span className="text-xs text-white/40">0:42 / 1:30</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="vf-prog h-full rounded-full bg-rose-400"
                style={{ animation: playing ? "vf-prog 12s linear infinite" : "none", width: playing ? undefined : "47%" }}
              />
            </div>
          </div>
        </div>
        <Button size="lg" className="group mt-9 bg-white text-black hover:bg-white/90">
          {en ? "Get started now" : "今すぐ始める"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
