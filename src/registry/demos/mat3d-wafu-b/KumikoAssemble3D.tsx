import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "組子アセンブル",
  category: "3Dアニメ",
  description:
    "麻の葉文様の組子細工。木の細い桟がpreserve-3dで回り組み上がる。温かな木目と影の奥行き。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "materials", "animation"],
  principle:
    "釘を使わず組む木の精緻さは職人技そのもので、唯一無二の静かな高級感を放つ。",
};

// asa-no-ha (hemp leaf) inside a hexagon: spokes + triangular subdivisions.
const HEX_R = 96;
const hexPts = Array.from({ length: 6 }).map((_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 6;
  return [Math.cos(a) * HEX_R, Math.sin(a) * HEX_R] as const;
});

type Slat = { x1: number; y1: number; x2: number; y2: number; delay: number };

const SLATS: Slat[] = (() => {
  const out: Slat[] = [];
  // outer hexagon edges
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = hexPts[i];
    const [x2, y2] = hexPts[(i + 1) % 6];
    out.push({ x1, y1, x2, y2, delay: i * 0.06 });
  }
  // spokes to center
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = hexPts[i];
    out.push({ x1, y1, x2: 0, y2: 0, delay: 0.4 + i * 0.06 });
  }
  // asa-no-ha midpoint stars: connect edge midpoints to center-ish nodes
  for (let i = 0; i < 6; i++) {
    const [ax, ay] = hexPts[i];
    const [bx, by] = hexPts[(i + 1) % 6];
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    // half-spoke from midpoint toward center
    out.push({ x1: mx, y1: my, x2: mx * 0.5, y2: my * 0.5, delay: 0.8 + i * 0.05 });
    // chord between adjacent half-points
    const [cx, cy] = hexPts[(i + 2) % 6];
    const nmx = (bx + cx) / 2;
    const nmy = (by + cy) / 2;
    out.push({ x1: mx * 0.5, y1: my * 0.5, x2: nmx * 0.5, y2: nmy * 0.5, delay: 1.0 + i * 0.05 });
  }
  return out;
})();

function slatStyle(s: Slat): React.CSSProperties {
  const dx = s.x2 - s.x1;
  const dy = s.y2 - s.y1;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return {
    position: "absolute",
    left: 120 + s.x1,
    top: 120 + s.y1,
    width: len,
    height: 6,
    marginTop: -3,
    transformOrigin: "0 50%",
    transform: `rotate(${ang}deg)`,
    borderRadius: 2,
    background:
      "linear-gradient(180deg, #e7c489 0%, #c99a5a 42%, #9c6e34 78%, #6f4a1f 100%)",
    boxShadow:
      "0 2px 4px rgba(40,22,6,0.45), inset 0 1px 0 rgba(255,240,210,0.5)",
    animationDelay: `${s.delay}s`,
  };
}

export default function KumikoAssemble3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_12%,#241a10_0%,#0e0905_72%)] py-16">
      <style>{`
        @keyframes kma-spin { to { transform: rotateX(58deg) rotateZ(360deg); } }
        @keyframes kma-build {
          0%   { opacity: 0; transform: rotate(var(--kma-r)) scaleX(0); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: rotate(var(--kma-r)) scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kma-stage { animation: none !important; transform: rotateX(52deg) rotateZ(18deg) !important; }
          .kma-slat  { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "900px", width: 300, height: 300 }}
        role="img"
        aria-label={en ? "Assembling kumiko lattice" : "組み上がる組子細工"}
      >
        {/* warm wood glow */}
        <div
          className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(160,110,50,0.28)" }}
        />

        <div
          className="kma-stage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 240,
            height: 240,
            transformStyle: "preserve-3d",
            transform: "rotateX(58deg) rotateZ(0deg)",
            animation: "kma-spin 22s linear infinite",
            willChange: "transform",
          }}
        >
          {SLATS.map((s, i) => {
            const dx = s.x2 - s.x1;
            const dy = s.y2 - s.y1;
            const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
            return (
              <div
                key={i}
                className="kma-slat"
                style={
                  {
                    ...slatStyle(s),
                    ["--kma-r"]: `${ang}deg`,
                    animation: `kma-build 1.1s cubic-bezier(0.22,1,0.36,1) ${s.delay}s both`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>

        {/* soft floor shadow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 24,
            width: 200,
            height: 40,
            borderRadius: "50%",
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(80,50,18,0.5) 0%, rgba(0,0,0,0) 72%)",
            filter: "blur(6px)",
            transform: "scaleY(0.5)",
          }}
        />
      </div>

      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.34em] text-amber-200/75">
          {en ? "Kumiko · Asa-no-ha" : "組子 · 麻の葉文様"}
        </p>
        <p className="mt-2 text-[11px] tracking-[0.2em] text-amber-100/40">
          {en ? "Joinery without nails" : "釘を使わぬ木組み"}
        </p>
      </div>
    </div>
  );
}
