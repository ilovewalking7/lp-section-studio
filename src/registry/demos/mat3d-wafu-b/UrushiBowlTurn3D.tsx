import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "漆器ターンテーブル",
  category: "3Dアニメ",
  description:
    "朱と漆黒の漆器がろくろの上でゆっくり回転。金蒔絵と移動するスペキュラが濡れた艶を描く。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "materials", "animation"],
  principle:
    "鏡面の艶と金蒔絵の輝きは“手間をかけた本物＝唯一無二の高級感”を一瞬で伝える。",
};

// Single gold maki-e sakura motif (CSS/SVG only, no images).
function Sakura({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <radialGradient id="ubt-petal" cx="50%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff6d2" />
          <stop offset="46%" stopColor="#ecc257" />
          <stop offset="100%" stopColor="#9d6e15" />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-6.4"
          rx="3.1"
          ry="6.2"
          fill="url(#ubt-petal)"
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx="0" cy="0" r="2" fill="#fff4c2" />
    </svg>
  );
}

export default function UrushiBowlTurn3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  // Maki-e motifs orbiting on a preserve-3d ring around the (fixed) cup body.
  const ringRadius = 96;
  const motifs = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_10%,#1c0f0a_0%,#0a0504_70%)] py-16">
      <style>{`
        @keyframes ubt-ring { to { transform: translate(-50%,-50%) rotateY(360deg); } }
        @keyframes ubt-fleck { to { transform: translate(-50%,-50%) rotateY(-360deg); } }
        @keyframes ubt-spec {
          0%   { transform: translateX(-60%) skewX(-10deg); opacity: 0; }
          16%  { opacity: 0.9; }
          50%  { opacity: 0.9; }
          84%  { opacity: 0; }
          100% { transform: translateX(170%) skewX(-10deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ubt-ring  { animation: none !important; }
          .ubt-fleck { animation: none !important; }
          .ubt-spec  { animation: none !important; opacity: 0.7 !important; transform: translateX(36%) skewX(-10deg) !important; }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "900px", width: 300, height: 300 }}
        role="img"
        aria-label={en ? "Rotating lacquerware cup" : "回転する漆器の椀"}
      >
        {/* warm bloom */}
        <div
          className="absolute left-1/2 top-[42%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(150,40,24,0.30)" }}
          aria-hidden="true"
        />

        {/* ===== FIXED CUP SILHOUETTE (never rotates → always reads as a cup) ===== */}
        <div
          className="absolute left-1/2"
          style={{ top: 52, width: 168, marginLeft: -84 }}
        >
          {/* body: tapered toward base, vertical cylindrical shading */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 168,
              height: 150,
              margin: "0 auto",
              clipPath:
                "polygon(2% 8%, 98% 8%, 86% 100%, 14% 100%)",
              borderRadius: "0 0 36% 36% / 0 0 26% 26%",
              background:
                "linear-gradient(90deg, #0a0302 0%, #2a0c07 16%, #6e2114 36%, #8a3320 47%, #5a190f 60%, #270a06 82%, #080201 100%)",
              boxShadow: "inset 0 -20px 36px rgba(0,0,0,0.78)",
            }}
          >
            {/* vertical sheen band (rounded-3D read) */}
            <div
              className="pointer-events-none absolute inset-y-0"
              style={{
                left: "38%",
                width: "16%",
                background:
                  "linear-gradient(90deg, rgba(255,224,196,0) 0%, rgba(255,235,214,0.55) 50%, rgba(255,224,196,0) 100%)",
                filter: "blur(2px)",
                mixBlendMode: "screen",
              }}
            />

            {/* moving specular highlight = wet polished lacquer */}
            <div
              className="ubt-spec pointer-events-none absolute -inset-y-2 left-0 w-1/2"
              style={{
                background:
                  "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,236,210,0.16) 38%, rgba(255,255,255,0.82) 50%, rgba(255,236,210,0.16) 62%, rgba(255,255,255,0) 100%)",
                mixBlendMode: "screen",
                filter: "blur(1.5px)",
                animation: "ubt-spec 6.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* rim ellipse (mouth) — sits on top of body */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: 164,
              height: 40,
              marginTop: -12,
              borderRadius: "50%",
              background:
                "radial-gradient(58% 92% at 50% 34%, #0a0302 0%, #1f0705 50%, #58170d 88%, #7a2314 100%)",
              boxShadow:
                "inset 0 5px 12px rgba(0,0,0,0.9), inset 0 -3px 6px rgba(255,170,130,0.28), 0 0 0 1.6px rgba(232,184,75,0.5)",
            }}
            aria-hidden="true"
          >
            {/* bright lacquer edge highlight on the rim front */}
            <div
              className="absolute inset-x-3 top-[3px] h-[5px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,210,170,0) 0%, rgba(255,228,196,0.7) 50%, rgba(255,210,170,0) 100%)",
                filter: "blur(0.6px)",
              }}
            />
          </div>
        </div>

        {/* ===== ORBITING MAKI-E RING (only the decoration spins) ===== */}
        <div
          className="ubt-ring absolute left-1/2"
          style={{
            top: 128,
            transformStyle: "preserve-3d",
            transform: "translate(-50%,-50%)",
            animation: "ubt-ring 13s linear infinite",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          {motifs.map((angle) => {
            // depth read: front (sinθ≈1) bright/large, back dim/small.
            const rad = (angle * Math.PI) / 180;
            const front = (Math.sin(rad) + 1) / 2; // 0 back .. 1 front
            const opacity = 0.28 + front * 0.72;
            const scale = 0.72 + front * 0.42;
            return (
              <div
                key={angle}
                className="absolute left-0 top-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${ringRadius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    transform: `translate(-50%,-50%) scale(${scale})`,
                    opacity,
                    filter: `drop-shadow(0 0 4px rgba(236,194,87,${(
                      front * 0.55
                    ).toFixed(2)}))`,
                  }}
                >
                  <Sakura size={22} />
                </div>
              </div>
            );
          })}
        </div>

        {/* gold fleck ring (counter-orbit, finer sparkle) */}
        <div
          className="ubt-fleck absolute left-1/2"
          style={{
            top: 178,
            transformStyle: "preserve-3d",
            transform: "translate(-50%,-50%)",
            animation: "ubt-fleck 17s linear infinite",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const front = (Math.sin(rad) + 1) / 2;
            return (
              <div
                key={angle}
                className="absolute left-0 top-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(70px)`,
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    transform: "translate(-50%,-50%)",
                    background:
                      "radial-gradient(circle at 40% 35%, #fff4c4, #d9a431 70%, #8a6210)",
                    opacity: 0.3 + front * 0.65,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* soft floor reflection (flipped, faded) */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: 214,
            width: 150,
            height: 50,
            borderRadius: "50%",
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(150,46,28,0.42) 0%, rgba(60,16,8,0.2) 46%, rgba(0,0,0,0) 76%)",
            filter: "blur(7px)",
            transform: "scaleY(0.55)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.34em] text-amber-200/75">
          {en ? "Echizen Lacquer" : "越前 漆器"}
        </p>
        <p className="mt-2 text-[11px] tracking-[0.2em] text-amber-100/40">
          {en ? "Maki-e · burnished by hand" : "蒔絵 · 手磨きの艶"}
        </p>
      </div>
    </div>
  );
}
