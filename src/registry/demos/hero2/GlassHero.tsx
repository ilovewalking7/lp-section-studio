import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・ヒーロー",
  category: "ヒーロー・LP",
  description: "浮遊するカラーブロブの上に半透明ガラスパネルを重ねたヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function GlassHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0b14] py-28 text-white">
      <style>{`
        @keyframes gl-f1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-30px)}}
        @keyframes gl-f2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,30px)}}
        @media (prefers-reduced-motion: reduce){.gl-b{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute inset-0 blur-[60px]">
        <div className="gl-b absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-pink-500/40" style={{ animation: "gl-f1 12s ease-in-out infinite" }} />
        <div className="gl-b absolute right-[12%] bottom-[10%] h-72 w-72 rounded-full bg-sky-500/40" style={{ animation: "gl-f2 14s ease-in-out infinite" }} />
      </div>
      <div className="relative mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-10 text-center shadow-2xl backdrop-blur-2xl sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80">
            🪟 {en ? "A translucent experience" : "透明感のある体験"}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {en ? (
              <>
                Light, beautiful,
                <br />
                effortlessly smooth.
              </>
            ) : (
              <>
                軽やかに、美しく、
                <br />
                なめらかに。
              </>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/65">
            {en
              ? "A crystal-clear interface that makes everyday work feel effortless."
              : "ガラスのように澄んだインターフェースで、毎日の作業を心地よく。"}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="group bg-white text-black hover:bg-white/90">
              {en ? "Try for free" : "無料で試す"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Play className="size-4" />
              {en ? "Watch intro" : "紹介動画"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
