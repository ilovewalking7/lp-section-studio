import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト・ヒーロー",
  category: "ヒーロー・LP",
  description: "上部から差すスポットライトの光芒と薄いグリッド（Vercel風）。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "spotlight", "grid"],
};

export default function SpotlightHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#060606] py-32 text-white">
      <style>{`
        @keyframes spot-sweep { 0%,100%{transform:translateX(-8%) rotate(-3deg);opacity:.7} 50%{transform:translateX(8%) rotate(3deg);opacity:1} }
        @keyframes spot-glow { 0%,100%{opacity:.55} 50%{opacity:1} }
        @media (prefers-reduced-motion: reduce){ .spot-cone,.spot-head{animation:none !important} }
      `}</style>

      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 90%)",
        }}
      />

      <div
        className="spot-cone pointer-events-none absolute left-1/2 top-[-30%] h-[120vh] w-[80vw] -translate-x-1/2"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 42%, rgba(120,180,255,0.22) 50%, transparent 58%)",
          filter: "blur(28px)",
          animation: "spot-sweep 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[40vh] w-[40vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(140,190,255,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Zap className="size-3.5 text-blue-300" />
          {en ? "Fast, lightweight, secure" : "高速・軽量・安全"}
        </span>
        <h1
          className="spot-head mt-7 text-4xl font-bold tracking-tight sm:text-6xl"
          style={{
            backgroundImage:
              "radial-gradient(60% 120% at 50% 0%, #ffffff 30%, rgba(255,255,255,0.55) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 40px rgba(140,190,255,0.25)",
          }}
        >
          スポットライトが照らす、
          <br />
          あなたの次の一手
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          ノイズを削ぎ落とし、本当に必要なものだけに光を当てるプロダクト。
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            今すぐ試す
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            ドキュメント
          </Button>
        </div>
      </div>
    </section>
  );
}
