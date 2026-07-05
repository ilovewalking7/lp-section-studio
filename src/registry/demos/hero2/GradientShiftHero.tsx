import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーションシフト",
  category: "ヒーロー・LP",
  description: "巨大な多色グラデが滑らかに位置をずらし続けるカラフルなヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function GradientShiftHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden py-32 text-white">
      <style>{`
        @keyframes gs-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes gs-text{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @media (prefers-reduced-motion: reduce){.gs-bg,.gs-h{animation:none!important}}
      `}</style>
      <div
        className="gs-bg absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #1e1b4b, #4c1d95, #831843, #1e3a8a, #1e1b4b)",
          backgroundSize: "300% 300%",
          animation: "gs-shift 18s ease infinite",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
          🌈 {en ? "A vivid first impression" : "鮮やかな第一印象"}
        </span>
        <h1
          className="gs-h mt-7 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
          style={{
            backgroundImage: "linear-gradient(90deg, #fff, #c4b5fd, #f9a8d4, #fff)",
            backgroundSize: "200% auto",
            animation: "gs-text 5s linear infinite",
          }}
        >
          {en ? "Impressions form in an instant." : "印象は、一瞬で決まる。"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          {en
            ? "Build landing pages that win visitors over — without writing code."
            : "訪れた人の心を掴むランディングページを、コードを書かずに。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Start building" : "作ってみる"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
            {en ? "Templates" : "テンプレート"}
          </Button>
        </div>
      </div>
    </section>
  );
}
