import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーションメッシュ・ヒーロー",
  category: "ヒーロー・LP",
  description: "複数のブロブが溶け合うように動くメッシュグラデーション背景。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function GradientMeshHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0612] py-32 text-white">
      <style>{`
        @keyframes gm-a{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(12%,8%) scale(1.15)}66%{transform:translate(-8%,-6%) scale(.9)}}
        @keyframes gm-b{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-14%,10%) scale(1.2)}}
        @keyframes gm-c{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(10%,-12%) scale(1.1)}}
        @media (prefers-reduced-motion: reduce){.gm-blob{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute inset-0 blur-[90px]">
        <div className="gm-blob absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-fuchsia-600/60" style={{ animation: "gm-a 14s ease-in-out infinite" }} />
        <div className="gm-blob absolute right-[12%] top-[20%] h-80 w-80 rounded-full bg-indigo-600/60" style={{ animation: "gm-b 18s ease-in-out infinite" }} />
        <div className="gm-blob absolute bottom-[5%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/50" style={{ animation: "gm-c 16s ease-in-out infinite" }} />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          🎨 {en ? "A new standard for designers" : "デザイナーのための新基準"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Color begins
              <br />
              to tell a story.
            </>
          ) : (
            <>
              色が、
              <br />
              物語を語りはじめる。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "A single gradient sets the mood — a tool to bring your brand to life."
            : "グラデーションひとつで世界観が決まる。あなたのブランドを彩るツール。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Try it" : "試してみる"}
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
