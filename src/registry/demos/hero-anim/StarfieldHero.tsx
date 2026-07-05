import { useMemo } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スターフィールド・ヒーロー",
  category: "ヒーロー・LP",
  description: "きらめく星々がゆっくり漂う、ローンチ向けの宇宙的ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation", "starfield", "launch"],
};

export default function StarfieldHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 49297 + 233) % 233280) / 233280;
        return {
          id: i,
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: 0.8 + r * 1.8,
          delay: `${(r2 * 4).toFixed(2)}s`,
          dur: `${(2.2 + r * 3).toFixed(2)}s`,
          opacity: 0.3 + r2 * 0.6,
        };
      }),
    []
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#03040c] py-32 text-white">
      <style>{`
        @keyframes star-twinkle { 0%,100%{opacity:.2;transform:scale(0.7)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes star-drift { from{transform:translateY(0)} to{transform:translateY(-26px)} }
        @media (prefers-reduced-motion: reduce){ .sf-star,.sf-layer{animation:none !important} }
      `}</style>

      <div
        className="sf-layer pointer-events-none absolute inset-0"
        style={{ animation: "star-drift 22s linear infinite alternate" }}
      >
        {stars.map((s) => (
          <span
            key={s.id}
            className="sf-star absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              boxShadow: "0 0 6px rgba(255,255,255,0.8)",
              animation: `star-twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 120%, rgba(99,102,241,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          <Rocket className="size-3.5 text-indigo-300" />
          {en ? "Launching soon" : "まもなく打ち上げ"}
        </span>
        <h1 className="mt-7 bg-gradient-to-b from-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {en ? (
            <>
              Launch your product
              <br />
              beyond the stars
            </>
          ) : (
            <>
              星の彼方へ、
              <br />
              プロダクトを打ち上げる
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
          {en
            ? "Under a quietly twinkling sky — make your next launch a night to remember."
            : "静かに瞬く星空の下で。あなたの次のローンチを、最高の一夜に。"}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            {en ? "Join the waitlist" : "ウェイトリストに参加"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Roadmap" : "ロードマップ"}
          </Button>
        </div>
      </div>
    </section>
  );
}
