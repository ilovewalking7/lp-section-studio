import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リキッドクローム 見出し",
  category: "3Dアニメ",
  description:
    "立体的に押し出した巨大見出し。流れるクローム/液体金属グラデと横切るミラー帯で動く。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "gloss", "materials", "animation"],
  principle:
    "重く磨かれた金属の艶は“高性能・プレミアム”の連想を起こし、キネティックな反射が視線を掴む。",
};

export default function LiquidChromeHeadline() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const word = en ? "CHROME" : "クローム";
  const sub = en
    ? "Liquid metal, kinetic shine"
    : "液体金属の、動くきらめき";

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[28px] px-6 py-24"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #1b1f29 0%, #0d0f15 60%, #050609 100%)",
      }}
    >
      <style>{`
        @keyframes lc-flow {
          0%   { background-position:   0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes lc-mirror {
          0%   { transform: translateX(-140%) skewX(-18deg); }
          100% { transform: translateX(260%)  skewX(-18deg); }
        }
        .lc-fill {
          background-image: linear-gradient(
            100deg,
            #6b7280 0%, #e8edf5 14%, #9aa6b8 26%, #ffffff 38%,
            #7b8696 52%, #cdd6e3 64%, #5a6472 78%, #eef2f8 90%, #8b96a6 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: lc-flow 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lc-fill   { animation: none !important; background-position: 40% 50% !important; }
          .lc-mirror { animation: none !important; transform: translateX(70%) skewX(-18deg) !important; }
        }
      `}</style>

      <div className="relative" style={{ perspective: "700px" }}>
        {/* extruded depth copies (behind) */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {EXTRUDE.map((z, i) => (
            <span
              key={`ext-${i}`}
              className="absolute inset-0 select-none whitespace-nowrap text-center text-6xl font-black tracking-tight sm:text-8xl"
              style={{
                transform: `translate(${z}px, ${z}px)`,
                color: `rgba(15,18,24,${1 - i * 0.07})`,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* chrome flowing face */}
        <h2
          className="lc-fill relative select-none whitespace-nowrap text-center text-6xl font-black tracking-tight sm:text-8xl"
          style={{
            filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.55))",
          }}
        >
          {word}
        </h2>

        {/* moving mirror band over the text */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(180deg, #000 0%, #000 48%, transparent 100%)",
            maskImage:
              "linear-gradient(180deg, #000 0%, #000 48%, transparent 100%)",
          }}
        >
          <div
            className="lc-mirror absolute inset-y-0 left-0 w-1/4"
            style={{
              background:
                "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
              mixBlendMode: "overlay",
              animation: "lc-mirror 3.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-300/55">
        {sub}
      </p>
    </section>
  );
}

const EXTRUDE = [2, 4, 6, 8, 10, 12, 14];
