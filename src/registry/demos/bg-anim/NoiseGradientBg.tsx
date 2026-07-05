import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ノイズグラデ背景",
  category: "背景アニメ",
  description: "柔らかく動くグラデーションに細かいグレインを重ねたヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "noise", "gradient"],
};

const NOISE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

export default function NoiseGradientBg() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#070611] py-28 text-white">
      <style>{`
        @keyframes ng-shift {
          0%, 100% { transform: translate3d(0,0,0) scale(1.1); }
          33% { transform: translate3d(6%, -4%, 0) scale(1.2); }
          66% { transform: translate3d(-5%, 5%, 0) scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ng-blob { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="ng-blob absolute left-[15%] top-[10%] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.6), transparent 70%)",
            animation: "ng-shift 16s ease-in-out infinite",
          }}
        />
        <div
          className="ng-blob absolute right-[10%] top-[20%] h-[55vh] w-[55vh] rounded-full opacity-60 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.6), transparent 70%)",
            animation: "ng-shift 20s ease-in-out infinite reverse",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
          backgroundSize: "160px 160px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Noise Gradient
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "Soft light with a touch of grain"
            : "グレインがのった、柔らかな光"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          {en
            ? "Delicate noise layered over a moving gradient creates a premium texture."
            : "動くグラデーションに繊細なノイズを重ね、上質な質感を演出します。"}
        </p>
      </div>
    </section>
  );
}
