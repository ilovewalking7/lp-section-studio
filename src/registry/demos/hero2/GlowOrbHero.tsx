import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グローオーブ・ヒーロー",
  category: "ヒーロー・LP",
  description: "脈動する発光オーブが背後で呼吸するように光る幻想的なヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function GlowOrbHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#04060a] py-36 text-white">
      <style>{`
        @keyframes go-breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.7}50%{transform:translate(-50%,-50%) scale(1.18);opacity:1}}
        @keyframes go-ring{0%{transform:translate(-50%,-50%) scale(.8);opacity:.6}100%{transform:translate(-50%,-50%) scale(2.4);opacity:0}}
        @media (prefers-reduced-motion: reduce){.go-orb,.go-ring{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-1/2">
        <div
          className="go-orb absolute left-0 top-0 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,.9), rgba(56,189,248,.4) 50%, transparent 70%)",
            filter: "blur(40px)",
            animation: "go-breathe 6s ease-in-out infinite",
          }}
        />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="go-ring absolute left-0 top-0 h-72 w-72 rounded-full border border-indigo-400/40"
            style={{ animation: `go-ring 5s ease-out infinite ${i * 1.6}s` }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          ● {en ? "Always pulsing" : "常に、鼓動している"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              From the center,
              <br />
              everything expands.
            </>
          ) : (
            <>
              中心から、
              <br />
              すべてが広がる。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/55">
          {en
            ? "One unified platform where every feature pulses in sync from a single core."
            : "ひとつのコアから、あらゆる機能が脈打つように連動する統合プラットフォーム。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Touch the core" : "コアに触れる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {en ? "See how it works" : "仕組みを見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
