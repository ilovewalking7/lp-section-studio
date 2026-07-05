import { ArrowRight, Radio } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "パースペクティブ・グリッドヒーロー",
  category: "3Dアニメ",
  description:
    "シンセウェーブ調の床グリッドが手前へ流れ、地平線の発光する太陽が沈む暗色ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "hero", "materials", "animation"],
  principle:
    "消失点へ収束する床と地平線の光は、ノスタルジーと前進感を同時に喚起し没入を高める。",
};

export default function PerspectiveGridHero() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-[#0b0418] text-white">
      <style>{`
        @keyframes m3dpg-scroll { from { background-position: 0 0; } to { background-position: 0 56px; } }
        @keyframes m3dpg-pulse { 0%,100%{opacity:.85;filter:blur(0)} 50%{opacity:1;filter:blur(1px)} }
        @media (prefers-reduced-motion: reduce){
          .m3dpg-floor{animation:none!important}
          .m3dpg-sun{animation:none!important}
        }
      `}</style>

      {/* sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0633] via-[#2a0a3f] to-[#0b0418]" />

      {/* horizon glow */}
      <div className="absolute left-1/2 top-[52%] h-40 w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,90,160,0.45),transparent_60%)] blur-2xl" />

      {/* glowing sun on horizon, clipped by floor */}
      <div className="absolute left-1/2 top-[52%] h-64 w-64 -translate-x-1/2 -translate-y-[88%] overflow-hidden">
        <div
          className="m3dpg-sun mx-auto h-64 w-64 rounded-full"
          style={{
            background:
              "linear-gradient(180deg,#ffd86b 0%,#ff7eb3 45%,#ff4d8d 100%)",
            boxShadow: "0 0 90px 30px rgba(255,77,141,0.5)",
            animation: "m3dpg-pulse 4s ease-in-out infinite",
            maskImage:
              "repeating-linear-gradient(180deg, black 0 14px, transparent 14px 20px)",
            WebkitMaskImage:
              "repeating-linear-gradient(180deg, black 0 14px, transparent 14px 20px)",
          }}
        />
      </div>

      {/* perspective floor */}
      <div
        className="absolute inset-x-0 top-[52%] bottom-0 overflow-hidden"
        style={{ perspective: "320px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          className="m3dpg-floor absolute inset-0 origin-top"
          style={{
            transform: "rotateX(74deg)",
            backgroundImage:
              "linear-gradient(rgba(255,77,141,0.55) 2px, transparent 2px), linear-gradient(90deg, rgba(120,90,255,0.45) 2px, transparent 2px)",
            backgroundSize: "56px 56px",
            animation: "m3dpg-scroll 1.6s linear infinite",
          }}
        />
        {/* floor fade to horizon */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0418] via-transparent to-[#0b0418]/80" />
      </div>

      {/* copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <Badge
          variant="outline"
          className="mb-7 border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100 backdrop-blur-sm"
        >
          <Radio className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Infinite runway" : "無限の滑走路"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight drop-shadow-[0_2px_20px_rgba(255,77,141,0.35)] sm:text-7xl">
          {en ? (
            <>
              Ship into the
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                horizon
              </span>
            </>
          ) : (
            <>
              地平線の向こうへ、
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                出荷する
              </span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-base text-white/65 sm:text-lg">
          {en
            ? "A synthwave runway scrolling toward you, drawn with nothing but CSS perspective and a glowing sun."
            : "CSSのパースと発光する太陽だけで描いた、手前へ流れるシンセウェーブの滑走路。"}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white hover:opacity-90"
          >
            {en ? "Launch now" : "今すぐ起動"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Learn more" : "詳しく見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
