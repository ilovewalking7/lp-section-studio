import { ArrowRight, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グリッドビーム・ヒーロー",
  category: "ヒーロー・LP",
  description: "アニメーションするグリッドの上を光のビームが走るヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "grid", "beam"],
};

const beams = [
  { left: "18%", delay: "0s", dur: "3.4s", color: "rgba(56,189,248,0.9)" },
  { left: "38%", delay: "1.1s", dur: "4.2s", color: "rgba(168,85,247,0.9)" },
  { left: "58%", delay: "0.6s", dur: "3.8s", color: "rgba(52,211,153,0.9)" },
  { left: "78%", delay: "1.8s", dur: "4.6s", color: "rgba(244,114,182,0.9)" },
];

export default function GridBeamHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#04050a] py-28 text-white">
      <style>{`
        @keyframes grid-beam-fall { 0%{transform:translateY(-120%);opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{transform:translateY(640%);opacity:0} }
        @keyframes grid-pan { from{background-position:0 0} to{background-position:0 52px} }
        @media (prefers-reduced-motion: reduce){ .gb-beam,.gb-grid{animation:none !important} }
      `}</style>

      <div
        className="gb-grid pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,160,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,255,0.4) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          animation: "grid-pan 4s linear infinite",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 45%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 45%, #000 35%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {beams.map((b, i) => (
          <span
            key={i}
            className="gb-beam absolute top-0 h-24 w-px"
            style={{
              left: b.left,
              background: `linear-gradient(to bottom, transparent, ${b.color})`,
              boxShadow: `0 0 12px ${b.color}`,
              animation: `grid-beam-fall ${b.dur} linear ${b.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Boxes className="size-3.5 text-sky-300" />
          {en ? "Reinventing infrastructure" : "インフラを再発明する"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Beams in motion,
              <br />
              deploys that never stop
            </>
          ) : (
            <>
              走るビーム、
              <br />
              止まらないデプロイ
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "Ship your code to the global edge in an instant — on an observable foundation that never breaks."
            : "グローバルエッジにあなたのコードを瞬時に。観測可能で、壊れない基盤を。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Start deploying" : "デプロイを始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "View pricing" : "料金を見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
