import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト・ヒーロー",
  category: "ヒーロー・LP",
  description: "カーソル追従の動的スポットライトと薄いグリッドのダークヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function SpotlightHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative w-full overflow-hidden bg-[#050507] py-32 text-white"
    >
      <style>{`
        @keyframes sl-pulse{0%,100%{opacity:.45}50%{opacity:.85}}
        @media (prefers-reduced-motion: reduce){.sl-cone{animation:none!important}}
      `}</style>
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 90%)",
        }}
      />
      <div
        className="sl-cone pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(120,160,255,.18), transparent 60%)`,
          animation: "sl-pulse 6s ease-in-out infinite",
          transition: "background 0.2s ease-out",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Sparkles className="size-3.5 text-indigo-300" />
          {en ? "v2.0 released" : "v2.0 リリース"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Where the light falls,
              <br />
              you find the answer.
            </>
          ) : (
            <>
              光の当たる場所に、
              <br />
              答えがある。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "A product that strips away the excess and focuses only on what you truly need."
            : "余計なものを削ぎ落とし、本当に必要な機能だけに集中したプロダクト。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
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
