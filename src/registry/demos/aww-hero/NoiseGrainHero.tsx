import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "粒状ノイズヒーロー",
  category: "Awwwards",
  description:
    "SVGフィルタの粒状ノイズを重ねた、フィルム調のザラついた質感を持つヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function NoiseGrainHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ng relative w-full overflow-hidden bg-[#1a140f] px-5 py-24 text-[#f5ede1] sm:px-10 sm:py-36">
      <style>{`
        @keyframes aww-ng-shift {
          0% { transform: translate(0,0); }
          25% { transform: translate(-2%,1%); }
          50% { transform: translate(1%,-2%); }
          75% { transform: translate(-1%,2%); }
          100% { transform: translate(0,0); }
        }
        @keyframes aww-ng-up {
          from { opacity:0; transform: translateY(24px); filter: blur(6px); }
          to { opacity:1; transform: translateY(0); filter: blur(0); }
        }
        .aww-ng-grain { animation: aww-ng-shift 1.2s steps(4) infinite; }
        .aww-ng-up { animation: aww-ng-up 1s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aww-ng-grain, .aww-ng-up { animation: none !important; }
        }
      `}</style>

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden="true">
        <filter id="aww-ng-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect className="aww-ng-grain" width="120%" height="120%" filter="url(#aww-ng-noise)" />
      </svg>

      <div
        className="absolute -right-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-60 blur-[60px]"
        style={{ background: "radial-gradient(circle,#d97706,#7c2d12 60%,transparent)" }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <p className="aww-ng-up mb-8 text-[11px] font-semibold uppercase tracking-[0.5em] text-[#d9a066]">
          Analog Studio — Grain 35mm
        </p>
        <h1
          className="aww-ng-up font-black leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.8rem,9vw,8rem)", animationDelay: ".1s" }}
        >
          {en ? (
            <>
              Grainy light,
              <br />
              <span className="text-[#f59e0b]">particles of memory.</span>
            </>
          ) : (
            <>
              ざらつく光、
              <br />
              <span className="text-[#f59e0b]">記憶の粒子。</span>
            </>
          )}
        </h1>
        <div
          className="aww-ng-up mt-10 flex max-w-2xl flex-wrap items-center gap-x-10 gap-y-4 text-sm text-[#c9b8a4]"
          style={{ animationDelay: ".2s" }}
        >
          <span>
            {en
              ? "Film texture recreated with pure CSS / SVG noise only."
              : "純CSS / SVGノイズのみで再現したフィルムの質感。"}
          </span>
          <span className="rounded-full border border-[#d9a066]/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#d9a066]">
            No Images
          </span>
        </div>
      </div>
    </section>
  );
}
