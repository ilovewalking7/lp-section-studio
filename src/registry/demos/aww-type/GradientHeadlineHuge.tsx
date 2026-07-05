import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "特大グラデ見出し",
  category: "Awwwards",
  description: "発光するグラデーション背景の上に置いた超特大グラデ見出しのヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function GradientHeadlineHuge() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ghh relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#070713] px-6 py-28 text-center">
      <div className="aww-ghh-glow pointer-events-none absolute -top-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full blur-3xl" />
      <p className="relative mb-8 text-xs uppercase tracking-[0.5em] text-indigo-300/70">
        Next Generation
      </p>
      <h1
        className="aww-ghh-text relative bg-clip-text font-black uppercase leading-[0.85] tracking-[-0.04em] text-transparent"
        style={{ fontSize: "clamp(3rem, 15vw, 13rem)" }}
      >
        FUTURE
        <br />
        FORWARD
      </h1>
      <p className="relative mt-10 max-w-md text-base leading-relaxed text-indigo-200/60">
        {en
          ? "Particles of light become words, and words become a brand. Forward."
          : "光の粒が言葉になり、言葉がブランドになる。前へ。"}
      </p>
      <style>{`
        .aww-ghh-glow {
          background: radial-gradient(circle at 50% 40%, rgba(99,102,241,0.45), rgba(217,70,239,0.25) 35%, transparent 70%);
          animation: aww-ghh-pulse 6s ease-in-out infinite;
        }
        .aww-ghh-text {
          background-image: linear-gradient(120deg,#818cf8,#e879f9,#22d3ee,#818cf8);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          animation: aww-ghh-flow 7s linear infinite;
        }
        @keyframes aww-ghh-flow { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        @keyframes aww-ghh-pulse { 0%,100% { opacity: 0.7; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.08); } }
        @media (prefers-reduced-motion: reduce) {
          .aww-ghh-text, .aww-ghh-glow { animation: none; }
        }
      `}</style>
    </section>
  );
}
