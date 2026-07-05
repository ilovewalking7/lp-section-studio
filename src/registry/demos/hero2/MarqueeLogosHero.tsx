import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴマーキー・ヒーロー",
  category: "ヒーロー・LP",
  description: "導入企業ロゴが無限に流れる信頼感重視のヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

const logos = ["Northwind", "Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne", "Hooli"];

export default function MarqueeLogosHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const row = [...logos, ...logos];
  return (
    <section className="relative w-full overflow-hidden bg-[#08080c] py-28 text-white">
      <style>{`
        @keyframes mq-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){.mq-track{animation:none!important}}
      `}</style>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Chosen by teams
              <br />
              around the world.
            </>
          ) : (
            <>
              世界中のチームに、
              <br />
              選ばれています。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "From startups to enterprises, over 12,000 companies use our platform every day."
            : "スタートアップから大企業まで、12,000社以上が日々利用しているプラットフォーム。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group bg-white text-black hover:bg-white/90">
            {en ? "Talk to sales" : "導入を相談する"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {en ? "Case studies" : "導入事例"}
          </Button>
        </div>
      </div>
      <div
        className="relative mt-16 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="mq-track flex w-max gap-12" style={{ animation: "mq-scroll 28s linear infinite" }}>
          {row.map((name, i) => (
            <span key={i} className="text-2xl font-semibold tracking-tight text-white/35 transition-colors hover:text-white/70">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
