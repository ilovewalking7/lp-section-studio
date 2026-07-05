import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レトログリッド・ヒーロー",
  category: "ヒーロー・LP",
  description: "地平線に向かって流れる80年代風パースペクティブグリッドのヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function RetroGridHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0418] py-32 text-white">
      <style>{`
        @keyframes rg-move{0%{transform:translateY(0)}100%{transform:translateY(40px)}}
        @media (prefers-reduced-motion: reduce){.rg-grid{animation:none!important}}
      `}</style>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden"
        style={{ perspective: "300px" }}
      >
        <div
          className="rg-grid absolute inset-x-[-50%] bottom-0 h-[200%]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(236,72,153,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.5) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "rotateX(70deg)",
            transformOrigin: "bottom",
            animation: "rg-move 1.4s linear infinite",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[20%] flex justify-center">
        <div className="h-56 w-56 rounded-full bg-gradient-to-b from-fuchsia-500 to-orange-400 opacity-30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-fuchsia-200 backdrop-blur">
          {en ? "▲ The future is near" : "▲ 未来は、すぐそこ"}
        </span>
        <h1
          className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl"
          style={{
            backgroundImage: "linear-gradient(180deg, #fff 30%, #f0abfc 70%, #fb923c)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 30px rgba(236,72,153,.3)",
          }}
        >
          {en ? (
            <>
              Beyond the neon,
              <br />
              accelerate.
            </>
          ) : (
            <>
              ネオンの先へ、
              <br />
              加速する。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Leave a vivid impression on your brand with a retro-futuristic aesthetic."
            : "レトロフューチャーな世界観で、あなたのブランドに鮮烈な印象を。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white hover:opacity-90">
            {en ? "Full throttle" : "アクセル全開"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-fuchsia-400/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {en ? "Learn more" : "詳しく見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
