import { ArrowRight, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グリッドビーム・ヒーロー",
  category: "ヒーロー・LP",
  description: "グリッド上を走る光のビームが交差するテック系ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function GridBeamsHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#040407] py-32 text-white">
      <style>{`
        @keyframes gb-h{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes gb-v{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}
        @media (prefers-reduced-motion: reduce){.gb-beam{animation:none!important;opacity:.3}}
      `}</style>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(120,140,255,.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="gb-beam absolute left-0 top-[28%] h-px w-1/3"
          style={{ background: "linear-gradient(90deg,transparent,#5b8cff,transparent)", animation: "gb-h 4s linear infinite" }}
        />
        <div
          className="gb-beam absolute left-0 top-[62%] h-px w-1/4"
          style={{ background: "linear-gradient(90deg,transparent,#a78bfa,transparent)", animation: "gb-h 5.5s linear infinite 1s" }}
        />
        <div
          className="gb-beam absolute left-[35%] top-0 h-1/3 w-px"
          style={{ background: "linear-gradient(180deg,transparent,#22d3ee,transparent)", animation: "gb-v 6s linear infinite .5s" }}
        />
        <div
          className="gb-beam absolute left-[72%] top-0 h-1/4 w-px"
          style={{ background: "linear-gradient(180deg,transparent,#5b8cff,transparent)", animation: "gb-v 4.8s linear infinite 1.6s" }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Boxes className="size-3.5 text-cyan-300" />
          {en ? "Real-time infrastructure" : "リアルタイム・インフラ"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Data keeps flowing,
              <br />
              at unstoppable speed.
            </>
          ) : (
            <>
              データが流れる、
              <br />
              止まらない速度で。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "Millisecond responses delivered to users worldwide from the global edge."
            : "グローバルエッジで、ミリ秒単位の応答を世界中のユーザーへ。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Start building" : "構築を始める"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Architecture" : "アーキテクチャ"}
          </Button>
        </div>
      </div>
    </section>
  );
}
