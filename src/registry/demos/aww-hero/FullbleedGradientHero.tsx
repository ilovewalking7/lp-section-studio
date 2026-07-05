import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "全幅グラデーションヒーロー",
  category: "Awwwards",
  description:
    "画面全体を覆うアニメーションするグラデーション背景に、特大タイポを乗せたフルブリードヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function FullbleedGradientHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-fg relative w-full overflow-hidden px-5 py-28 text-white sm:px-10 sm:py-40">
      <style>{`
        @keyframes aww-fg-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes aww-fg-up {
          from { opacity:0; transform: translateY(34px); }
          to { opacity:1; transform: translateY(0); }
        }
        .aww-fg-bg {
          background: linear-gradient(120deg,#4f46e5,#9333ea,#db2777,#f59e0b,#4f46e5);
          background-size: 300% 300%;
          animation: aww-fg-flow 16s ease infinite;
        }
        .aww-fg-up { animation: aww-fg-up 1s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aww-fg-bg { animation: none; }
          .aww-fg-up { animation: none !important; }
        }
      `}</style>

      <div className="aww-fg-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent,rgba(0,0,0,0.55))]" />

      <div className="relative mx-auto max-w-[1400px] text-center">
        <p className="aww-fg-up mb-8 text-[11px] font-semibold uppercase tracking-[0.6em] text-white/70">
          Spectrum — Infinite Edition
        </p>
        <h1
          className="aww-fg-up font-black leading-[0.86] tracking-[-0.04em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          style={{ fontSize: "clamp(3rem,12vw,11rem)", animationDelay: ".08s" }}
        >
          COLOR
          <br />
          IN MOTION
        </h1>
        <p
          className="aww-fg-up mx-auto mt-9 max-w-xl text-base leading-relaxed text-white/80"
          style={{ animationDelay: ".18s" }}
        >
          {en
            ? "A borderless gradient drifts slowly across the whole screen — a full-bleed canvas for making color itself your brand."
            : "境界のないグラデーションが画面全体をゆっくりと巡る。色そのものをブランドにするための、全幅キャンバス。"}
        </p>
        <div
          className="aww-fg-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: ".26s" }}
        >
          <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
            {en ? "Get started" : "はじめる"}
          </button>
          <button className="rounded-full border border-white/50 px-8 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/10">
            {en ? "View palette" : "パレットを見る"}
          </button>
        </div>
      </div>
    </section>
  );
}
