import { useState } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "屏風フォールド",
  category: "3Dアニメ",
  description:
    "preserve-3dの複数パネルが交互に折れ、金箔の山水を見せる屏風。穏やかな自動フォールドと操作。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "materials", "animation"],
  principle:
    "金屏風の折りと光の階調は奥行きと格式を生み、空間に唯一無二の品格を与える。",
};

const PANELS = 6;

export default function ByobuFold3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const [folded, setFolded] = useState(false);

  return (
    <section className="w-full overflow-hidden rounded-[28px] bg-[radial-gradient(120%_120%_at_50%_0%,#15100a_0%,#080503_72%)] px-6 py-16 sm:px-12">
      <style>{`
        @keyframes byb-breathe {
          0%,100% { transform: rotateY(var(--byb-min)); }
          50%     { transform: rotateY(var(--byb-max)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .byb-panel { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-amber-200/75">
              {en ? "Gold-leaf Folding Screen" : "金屏風 六曲一隻"}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-amber-50">
              {en ? "Landscape in gold" : "金地の山水"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setFolded((v) => !v)}
            className="rounded-full px-5 py-2 text-xs font-bold text-[#1a0d06] transition-transform hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, #fff3c4 0%, #e8b84b 50%, #c8902a 100%)",
              boxShadow: "0 8px 22px rgba(200,144,42,0.35)",
            }}
          >
            {folded
              ? en
                ? "Unfold"
                : "屏風をひらく"
              : en
                ? "Fold"
                : "屏風をたたむ"}
          </button>
        </div>

        <div
          className="mx-auto flex justify-center"
          style={{ perspective: "1600px" }}
          role="img"
          aria-label={en ? "Folding gold screen" : "折りたたむ金屏風"}
        >
          <div
            className="flex h-64 sm:h-72"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: PANELS }).map((_, i) => {
              const even = i % 2 === 0;
              // folded angle vs open breathing range
              const min = even ? -22 : 22;
              const max = even ? -52 : 52;
              const foldedAngle = even ? -64 : 64;
              return (
                <div
                  key={i}
                  className="byb-panel relative h-full w-12 origin-left overflow-hidden border-r border-amber-900/40 sm:w-16"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: folded
                      ? `rotateY(${foldedAngle}deg)`
                      : undefined,
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                    ...(folded
                      ? {}
                      : ({
                          ["--byb-min"]: `${min}deg`,
                          ["--byb-max"]: `${max}deg`,
                          animation: `byb-breathe ${7 + (i % 3)}s ease-in-out ${i * 0.12}s infinite`,
                        } as React.CSSProperties)),
                    background:
                      "linear-gradient(180deg, #f3d68a 0%, #e7be58 38%, #cf9c34 72%, #a97a1e 100%)",
                    boxShadow:
                      "inset -8px 0 18px rgba(80,48,8,0.35), inset 8px 0 14px rgba(255,250,220,0.4)",
                  }}
                >
                  {/* gold-leaf seam texture */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0) 2px, rgba(120,80,16,0.1) 4px)",
                    }}
                  />
                  {/* landscape: mountains + sun, painted across panels via SVG slice */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox={`${i * 60} 0 60 240`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="byb-ink" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5b3d12" />
                        <stop offset="100%" stopColor="#2e1c06" />
                      </linearGradient>
                    </defs>
                    {/* sun */}
                    <circle
                      cx="300"
                      cy="70"
                      r="34"
                      fill="#b5400f"
                      opacity="0.85"
                    />
                    {/* far mountains */}
                    <path
                      d="M0 150 L60 120 L120 158 L200 110 L280 160 L360 118 L440 150 L440 240 L0 240 Z"
                      fill="url(#byb-ink)"
                      opacity="0.55"
                    />
                    {/* near hills */}
                    <path
                      d="M0 200 L80 172 L170 206 L260 168 L360 208 L440 178 L440 240 L0 240 Z"
                      fill="#241405"
                      opacity="0.75"
                    />
                    {/* pine accents */}
                    {[40, 150, 250, 350].map((x) => (
                      <g key={x} stroke="#1c1003" strokeWidth="2" fill="none">
                        <line x1={x} y1="190" x2={x} y2="210" />
                        <path d={`M${x - 10} 192 L${x} 184 L${x + 10} 192`} />
                      </g>
                    ))}
                  </svg>
                  {/* directional sheen on each fold face */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      even ? "opacity-60" : "opacity-25",
                    )}
                    style={{
                      background:
                        "linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 70%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] tracking-[0.2em] text-amber-100/45">
          {en
            ? "Six panels · gold ground · ink landscape"
            : "六曲 · 金地 · 水墨の山水"}
        </p>
      </div>
    </section>
  );
}
