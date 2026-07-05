import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーションシフト・ヒーロー",
  category: "ヒーロー・LP",
  description: "背景全体のグラデーションが滑らかに循環し、中央コピーを際立たせる。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "gradient"],
};

export default function GradientShiftHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden py-32 text-white">
      <style>{`
        @keyframes grad-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @media (prefers-reduced-motion: reduce){ .grad-shift-bg{animation:none !important} }
      `}</style>

      <div
        className="grad-shift-bg absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #4f1d8f, #1e3a8a, #0f766e, #9d174d, #4f1d8f)",
          backgroundSize: "300% 300%",
          animation: "grad-shift 16s ease infinite",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
          <Flame className="size-3.5 text-amber-200" />
          {en ? "The most talked-about product right now" : "いま、最も話題のプロダクト"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight drop-shadow-sm sm:text-6xl">
          {en ? (
            <>
              Colors in motion,
              <br />
              a vivid brand experience
            </>
          ) : (
            <>
              色が巡る、
              <br />
              鮮やかなブランド体験
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          {en
            ? "Against a cycling gradient, bring your message crisply to the front."
            : "循環するグラデーションを背に、伝えたいメッセージをくっきりと前面に。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Get started" : "はじめる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            {en ? "Learn more" : "もっと見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
