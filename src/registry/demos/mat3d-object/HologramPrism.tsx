import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホログラム プリズム",
  category: "3Dアニメ",
  description:
    "3面の三角プリズムが回転し、各面が玉虫色のグラデで光るホログラフィック。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "object", "materials", "animation"],
};

const FACE_W = 150;
const FACE_H = 200;
// 正三角プリズム: 面の中心を軸から離す距離 = (W/2) / tan(30deg)
const APOTHEM = FACE_W / 2 / Math.tan(Math.PI / 6); // ≈ 129.9

const FACES = [
  {
    rotateY: 0,
    bg: "conic-gradient(from 200deg at 30% 30%, #f472b6, #818cf8, #22d3ee, #34d399, #f472b6)",
  },
  {
    rotateY: 120,
    bg: "conic-gradient(from 60deg at 70% 40%, #22d3ee, #a78bfa, #f472b6, #fbbf24, #22d3ee)",
  },
  {
    rotateY: 240,
    bg: "conic-gradient(from 320deg at 50% 70%, #a78bfa, #34d399, #f472b6, #60a5fa, #a78bfa)",
  },
];

export default function HologramPrism() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_15%,#0c0a1a_0%,#050410_72%)] py-14">
      <style>{`
        @keyframes hp-spin { to { transform: rotateX(-12deg) rotateY(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .hp-prism { animation: none !important; transform: rotateX(-12deg) rotateY(24deg); }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "950px", width: 280, height: 260 }}
        role="img"
        aria-label={en ? "Iridescent rotating prism" : "玉虫色の回転プリズム"}
      >
        {/* bloom */}
        <div
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(129,140,248,0.4)" }}
        />

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: FACE_W,
            height: FACE_H,
            marginLeft: -FACE_W / 2,
            marginTop: -FACE_H / 2,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="hp-prism relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              animation: "hp-spin 9s linear infinite",
              willChange: "transform",
            }}
          >
            {FACES.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden rounded-[10px]"
                style={{
                  transform: `rotateY(${f.rotateY}deg) translateZ(${APOTHEM}px)`,
                  background: f.bg,
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 0 30px rgba(255,255,255,0.18)",
                  opacity: 0.92,
                }}
              >
                {/* specular streak */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.25) 100%)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.32em] text-violet-200/70">
        {en ? "Iridescent Spectrum" : "玉虫色スペクトラム"}
      </p>
    </div>
  );
}
