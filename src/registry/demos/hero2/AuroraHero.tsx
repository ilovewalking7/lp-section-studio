import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "オーロラ・ヒーロー",
  category: "ヒーロー・LP",
  description: "ゆらめく極光グラデーションが背景を流れる幻想的なヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function AuroraHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#06060a] py-32 text-white">
      <style>{`
        @keyframes au-drift{0%{transform:translate3d(-10%,-6%,0) rotate(-8deg)}50%{transform:translate3d(10%,6%,0) rotate(8deg)}100%{transform:translate3d(-10%,-6%,0) rotate(-8deg)}}
        @keyframes au-hue{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){.au-band{animation:none!important}}
      `}</style>
      <div className="absolute inset-0" style={{ animation: "au-hue 24s linear infinite" }}>
        <div
          className="au-band absolute left-1/2 top-[-30%] h-[90vh] w-[120vw] -translate-x-1/2 opacity-70 blur-[80px]"
          style={{
            background:
              "conic-gradient(from 120deg at 50% 50%, #00e5ff, #7c4dff, #00e5ff, #18ffb1, #7c4dff)",
            animation: "au-drift 16s ease-in-out infinite",
            maskImage: "radial-gradient(60% 60% at 50% 40%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, #000 30%, transparent 80%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[#06060a]/40" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          {en ? "✨ The next-gen creative foundation" : "✨ 次世代のクリエイティブ基盤"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Turn imagination into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                real light
              </span>
              .
            </>
          ) : (
            <>
              想像を、
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                現実の光
              </span>
              に。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Ideas take shape the moment they appear. A workflow that flows."
            : "アイデアが浮かんだ瞬間に形になる。流れるように進むワークフロー。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Get started" : "はじめる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "See case studies" : "事例を見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
