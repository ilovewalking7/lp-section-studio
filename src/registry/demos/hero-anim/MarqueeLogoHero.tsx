import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴマーキー・ヒーロー",
  category: "ヒーロー・LP",
  description: "ヒーローの下に無限スクロールするロゴ（ワードマーク）の帯。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "marquee", "logos"],
};

const LOGOS = [
  "Northwind",
  "Vertex",
  "Lumina",
  "Quanta",
  "Atlas",
  "Nimbus",
  "Forge",
  "Caspian",
  "Helix",
  "Orbit",
];

export default function MarqueeLogoHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const row = [...LOGOS, ...LOGOS];

  return (
    <section className="relative w-full overflow-hidden bg-[#070708] py-28 text-white">
      <style>{`
        @keyframes mq-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @media (prefers-reduced-motion: reduce){ .mq-track{animation:none !important} }
      `}</style>

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[42vh] w-[55vw] -translate-x-1/2 rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Star className="size-3.5 text-amber-300" />
          {en ? "5,000+ companies onboard" : "5,000社以上が導入"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Chosen by teams
              <br />
              around the world
            </>
          ) : (
            <>
              世界中のチームに
              <br />
              選ばれています
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "From startups to enterprises — a foundation for teams of every size."
            : "スタートアップからエンタープライズまで。あらゆる規模のチームの土台に。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Talk to us" : "導入を相談する"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Case studies" : "導入事例"}
          </Button>
        </div>
      </div>

      <div className="relative mt-14">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-white/35">
          Trusted by industry leaders
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div
            className="mq-track flex w-max items-center gap-14"
            style={{ animation: "mq-scroll 28s linear infinite" }}
          >
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="select-none whitespace-nowrap text-xl font-semibold tracking-tight text-white/40 transition-colors hover:text-white/80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
