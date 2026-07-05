import { useMemo, type CSSProperties } from "react";
import { ArrowRight, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パーティクル・ヒーロー",
  category: "ヒーロー・LP",
  description: "ふわふわと浮遊する粒子が背後を漂う、ネットワーク感のあるヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "particle"],
};

export default function ParticleHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const r = ((i * 9301 + 49297) % 233280) / 233280;
        const r2 = ((i * 49297 + 7919) % 233280) / 233280;
        return {
          id: i,
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: 3 + r * 5,
          dur: `${(7 + r2 * 9).toFixed(2)}s`,
          delay: `${(r * 6).toFixed(2)}s`,
          drift: `${(r2 * 60 - 30).toFixed(0)}px`,
          hue: i % 3,
        };
      }),
    []
  );

  const colors = [
    "rgba(56,189,248,0.9)",
    "rgba(168,85,247,0.9)",
    "rgba(52,211,153,0.9)",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#05060e] py-32 text-white">
      <style>{`
        @keyframes pt-float { 0%{transform:translate(0,0);opacity:.2} 25%{opacity:.9} 50%{transform:translate(var(--pt-x), -34px);opacity:.6} 75%{opacity:.9} 100%{transform:translate(0,0);opacity:.2} }
        @media (prefers-reduced-motion: reduce){ .pt-dot{animation:none !important} }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="pt-dot absolute rounded-full"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: colors[p.hue],
                boxShadow: `0 0 10px ${colors[p.hue]}`,
                "--pt-x": p.drift,
                animation: `pt-float ${p.dur} ease-in-out ${p.delay} infinite`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44vh] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Atom className="size-3.5 text-sky-300" />
          {en ? "Every data point, connected" : "つながる、すべてのデータ"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Connected with ease,
              <br />
              like drifting particles
            </>
          ) : (
            <>
              漂う粒子のように、
              <br />
              軽やかにつながる
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "Dots connect, insights emerge. Turn your workflow into a single map."
            : "点と点が結ばれ、洞察が生まれる。あなたのワークフローを一枚の地図に。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Get started" : "始めてみる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "See how it works" : "仕組みを見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
