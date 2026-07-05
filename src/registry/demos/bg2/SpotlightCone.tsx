import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライト・コーン",
  category: "背景アニメ",
  description: "上空から差す光のコーンが左右に揺れる、ステージ調のブルー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "spotlight"],
};

export default function SpotlightCone() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#05070f] py-28 text-white">
      <style>{`
        @keyframes bg2-cone-sway {
          0%,100% { transform: rotate(-14deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes bg2-cone-sway-2 {
          0%,100% { transform: rotate(12deg); }
          50% { transform: rotate(-10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-cone { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg2-cone absolute -top-[30%] left-[28%] h-[160%] w-[36%] origin-top blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(96,165,250,0.45), rgba(96,165,250,0.05) 55%, transparent)",
            clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
            animation: "bg2-cone-sway 9s ease-in-out infinite",
          }}
        />
        <div
          className="bg2-cone absolute -top-[30%] left-[52%] h-[160%] w-[30%] origin-top blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(129,140,248,0.4), rgba(129,140,248,0.05) 55%, transparent)",
            clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
            animation: "bg2-cone-sway-2 11s ease-in-out infinite",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-1 text-xs font-medium tracking-wide text-blue-200/80">
          Spotlight
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Swaying cones light the stage" : "舞台を照らす、揺れるコーン"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-blue-50/70">
          {en
            ? "Two spotlights from above sway side to side, conjuring a live-stage presence."
            : "上空から差す二条のスポットが左右に振れ、ステージのような臨場感を演出。"}
        </p>
      </div>
    </section>
  );
}
