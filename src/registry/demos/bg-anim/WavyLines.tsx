import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェーブライン背景",
  category: "背景アニメ",
  description: "うねるSVGの等高線が流れる有機的なヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "waves", "svg"],
};

export default function WavyLines() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const lines = Array.from({ length: 7 }, (_, i) => i);
  return (
    <section className="relative w-full overflow-hidden bg-[#05060f] py-28 text-white">
      <style>{`
        @keyframes wl-flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-160px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wl-line { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wl-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="50%" stopColor="rgba(129,140,248,0.7)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
          </defs>
          {lines.map((i) => {
            const y = 90 + i * 60;
            return (
              <path
                key={i}
                className="wl-line"
                d={`M -160 ${y} C 200 ${y - 50}, 360 ${y + 50}, 720 ${y} S 1240 ${
                  y - 50
                }, 1600 ${y}`}
                fill="none"
                stroke="url(#wl-grad)"
                strokeWidth={1.5}
                style={{
                  opacity: 0.3 + i * 0.07,
                  animation: `wl-flow ${6 + i}s linear infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Wavy Lines
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Quiet waves drawn by flowing contour lines" : "流れる等高線が描く、静かな波"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Undulating SVG lines drift sideways, creating an organic rhythm."
            : "SVGのうねるラインが横へ流れ、有機的なリズムを生みます。"}
        </p>
      </div>
    </section>
  );
}
