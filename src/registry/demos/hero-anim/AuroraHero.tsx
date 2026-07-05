import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "オーロラ・ヒーロー",
  category: "ヒーロー・LP",
  description: "中央のヒーローの背後でオーロラ状のグラデーションがゆっくり漂う。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "aurora", "gradient"],
};

export default function AuroraHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#05060f] py-28 text-white">
      <style>{`
        @keyframes aurora-h-1 { 0%,100%{transform:translate3d(-12%,-8%,0) rotate(0deg) scale(1.1)} 50%{transform:translate3d(14%,10%,0) rotate(22deg) scale(1.35)} }
        @keyframes aurora-h-2 { 0%,100%{transform:translate3d(12%,6%,0) rotate(0deg) scale(1.2)} 50%{transform:translate3d(-16%,-10%,0) rotate(-18deg) scale(1)} }
        @keyframes aurora-h-3 { 0%,100%{transform:translate3d(0,0,0) scale(1);opacity:.55} 50%{transform:translate3d(-8%,12%,0) scale(1.25);opacity:.85} }
        @keyframes aurora-fade { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @media (prefers-reduced-motion: reduce){ .aurora-h-blob,.aurora-h-rise{animation:none !important} }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-h-blob absolute left-[8%] top-[-20%] h-[60vh] w-[60vh] rounded-full opacity-70 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.75), transparent 70%)",
            animation: "aurora-h-1 15s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-h-blob absolute right-[4%] top-[-5%] h-[55vh] w-[55vh] rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.75), transparent 70%)",
            animation: "aurora-h-2 19s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-h-blob absolute left-[28%] top-[15%] h-[50vh] w-[70vh] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.6), transparent 70%)",
            animation: "aurora-h-3 17s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span
          className="aurora-h-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/75 backdrop-blur"
          style={{ animation: "aurora-fade .7s ease-out both" }}
        >
          <Sparkles className="size-3.5 text-sky-300" />
          {en ? "v2.0 released" : "v2.0 リリース"}
        </span>
        <h1
          className="aurora-h-rise mt-7 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
          style={{ animation: "aurora-fade .7s ease-out .08s both" }}
        >
          {en ? (
            <>
              Where light shimmers,
              <br />
              a next-gen product experience
            </>
          ) : (
            <>
              光がゆらめく、
              <br />
              次世代のプロダクト体験
            </>
          )}
        </h1>
        <p
          className="aurora-h-rise mx-auto mt-5 max-w-xl text-lg text-white/60"
          style={{ animation: "aurora-fade .7s ease-out .16s both" }}
        >
          {en
            ? "Behind drifting aurora-like gradients, bring your team's work into one place."
            : "オーロラのように漂うグラデーションの背後で、チームの仕事を一つの場所に。"}
        </p>
        <div
          className="aurora-h-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animation: "aurora-fade .7s ease-out .24s both" }}
        >
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Start for free" : "無料で始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Watch demo" : "デモを見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
