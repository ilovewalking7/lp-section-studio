import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メッシュ・ヒーロー",
  category: "ヒーロー・LP",
  description: "ぼかしたグラデーションのブロブがゆっくり変形・移動するメッシュ背景。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "mesh", "gradient"],
};

export default function AnimatedMeshHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0612] py-28 text-white">
      <style>{`
        @keyframes mesh-a { 0%,100%{transform:translate(-10%,-6%) scale(1)} 33%{transform:translate(20%,12%) scale(1.25)} 66%{transform:translate(8%,-14%) scale(0.95)} }
        @keyframes mesh-b { 0%,100%{transform:translate(12%,8%) scale(1.15)} 50%{transform:translate(-18%,-12%) scale(1)} }
        @keyframes mesh-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(14%,-10%) scale(1.3)} }
        @keyframes mesh-d { 0%,100%{transform:translate(-14%,10%) scale(1.1)} 50%{transform:translate(16%,6%) scale(0.9)} }
        @media (prefers-reduced-motion: reduce){ .mesh-blob{animation:none !important} }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="mesh-blob absolute left-[6%] top-[-10%] h-[55vh] w-[55vh] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(217,70,239,0.7), transparent 70%)",
            animation: "mesh-a 16s ease-in-out infinite",
          }}
        />
        <div
          className="mesh-blob absolute right-[2%] top-[5%] h-[50vh] w-[50vh] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.7), transparent 70%)",
            animation: "mesh-b 20s ease-in-out infinite",
          }}
        />
        <div
          className="mesh-blob absolute left-[34%] top-[28%] h-[48vh] w-[60vh] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45,212,191,0.6), transparent 70%)",
            animation: "mesh-c 18s ease-in-out infinite",
          }}
        />
        <div
          className="mesh-blob absolute right-[26%] bottom-[-10%] h-[45vh] w-[45vh] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,146,60,0.55), transparent 70%)",
            animation: "mesh-d 22s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[#0a0612]/40" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/75 backdrop-blur">
          <Wand2 className="size-3.5 text-fuchsia-300" />
          {en ? "AI-native design" : "AIネイティブ・デザイン"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Where colors blend,
              <br />
              a canvas for creation
            </>
          ) : (
            <>
              色が溶け合う、
              <br />
              創造のためのキャンバス
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
          {en
            ? "A smoothly morphing gradient mesh — giving your ideas room to breathe."
            : "滑らかに変形するグラデーションメッシュ。あなたのアイデアに、空気のような余白を。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Start creating" : "作りはじめる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Gallery" : "ギャラリー"}
          </Button>
        </div>
      </div>
    </section>
  );
}
