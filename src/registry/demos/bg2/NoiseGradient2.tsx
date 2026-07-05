import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ノイズグラデ2",
  category: "背景アニメ",
  description: "SVGフラクタルノイズ越しに動くグラデーションの、フィルム調背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "noise", "gradient"],
};

export default function NoiseGradient2() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0f0c] py-28 text-white">
      <style>{`
        @keyframes bg2-noise-grad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-noise-grad { animation: none !important; }
        }
      `}</style>
      <div
        className="bg2-noise-grad absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #052e26, #064e3b, #134e4a, #1f2937, #052e26)",
          backgroundSize: "320% 320%",
          animation: "bg2-noise-grad 20s ease infinite",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="bg2-noise-f">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg2-noise-f)" />
      </svg>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1 text-xs font-medium tracking-wide text-emerald-200/80">
          Noise Gradient
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A grainy deep-green gradient" : "粒状感のある、深緑のグラデ"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/70">
          {en
            ? "Film grain layered over shifting color planes lends a refined analog feel."
            : "移ろう色面にフィルムグレインを重ね、上質なアナログ感を演出します。"}
        </p>
      </div>
    </section>
  );
}
