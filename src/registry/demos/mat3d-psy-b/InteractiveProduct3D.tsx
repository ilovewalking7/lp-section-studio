import { useEffect, useRef, useState } from "react";
import { Hand, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "インタラクティブ・プロダクト 3D",
  category: "3Dアニメ",
  description:
    "ドラッグで自由に3D回転でき、スウォッチで色を切り替えられるCSS製ボトル。外部画像なし。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "保有効果 — 自分の手で触れて操作すると「自分のもの」感が芽生え、手放したくなくなる。",
};

type Variant = {
  id: string;
  name: string;
  nameEn: string;
  /** main liquid color (drives all 6 faces via CSS var) */
  liquid: string;
  /** deeper shade for the bottom / side cores */
  deep: string;
  /** cap color */
  cap: string;
  /** swatch + glow dot */
  dot: string;
};

const VARIANTS: Variant[] = [
  {
    id: "aurora",
    name: "オーロラ",
    nameEn: "Aurora",
    liquid: "#5b54e8",
    deep: "#1e1b4b",
    cap: "#312e81",
    dot: "#6366f1",
  },
  {
    id: "ember",
    name: "エンバー",
    nameEn: "Ember",
    liquid: "#f43f5e",
    deep: "#5b1118",
    cap: "#7f1d1d",
    dot: "#f43f5e",
  },
  {
    id: "mint",
    name: "ミント",
    nameEn: "Mint",
    liquid: "#14b8a6",
    deep: "#0a3a35",
    cap: "#134e4a",
    dot: "#14b8a6",
  },
  {
    id: "noir",
    name: "ノワール",
    nameEn: "Noir",
    liquid: "#475569",
    deep: "#020617",
    cap: "#0f172a",
    dot: "#334155",
  },
];

// ── bottle dimensions ──────────────────────────────────────────────
const W = 150; // width
const H = 240; // height (body)
const D = 70; // depth (real thickness — the key fix)

// neck/cap mini-box
const NW = 56; // neck width
const NH = 38; // neck height
const ND = 40; // neck depth

export default function InteractiveProduct3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  // resting pose: slightly turned so depth is obvious AT REST
  const [angle, setAngle] = useState({ x: 6, y: -22 });
  const [variant, setVariant] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; ax: number; ay: number } | null>(
    null
  );

  // keep latest angle for the idle baseline without retriggering the effect
  const angleRef = useRef(angle);
  angleRef.current = angle;

  // gentle idle drift (rAF), paused while dragging + on reduced-motion
  const idleRef = useRef<number | null>(null);
  useEffect(() => {
    if (dragging) return;
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const start = performance.now();
    const baseY = angleRef.current.y;
    const baseX = angleRef.current.x;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setAngle({
        x: baseX + Math.sin(t * 0.7) * 2.5,
        y: baseY + Math.sin(t * 0.5) * 7,
      });
      idleRef.current = requestAnimationFrame(tick);
    };
    idleRef.current = requestAnimationFrame(tick);
    return () => {
      if (idleRef.current != null) cancelAnimationFrame(idleRef.current);
      idleRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ax: angle.x, ay: angle.y };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    const nextX = Math.max(-28, Math.min(28, d.ax - dy * 0.35));
    setAngle({ x: nextX, y: d.ay + dx * 0.6 });
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const v = VARIANTS[variant];

  // CSS var lets every face recolor live from a single source
  const colorVars = {
    "--liquid": v.liquid,
    "--deep": v.deep,
    "--cap": v.cap,
  } as React.CSSProperties;

  // shared face background: lighter top → deeper bottom (glass/gel look)
  const faceBg =
    "linear-gradient(170deg, color-mix(in srgb, var(--liquid) 78%, white) 0%, var(--liquid) 42%, var(--deep) 100%)";
  const sideBg =
    "linear-gradient(170deg, color-mix(in srgb, var(--liquid) 55%, white) 0%, color-mix(in srgb, var(--liquid) 70%, black 30%) 45%, var(--deep) 100%)";
  const capBg =
    "linear-gradient(170deg, color-mix(in srgb, var(--liquid) 60%, white) 0%, var(--deep) 100%)";

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-7 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#0f1118_0%,#06070d_72%)] py-14 text-white"
      style={colorVars}
    >
      <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.32em] text-indigo-200/70">
        <Hand className="h-3.5 w-3.5" />
        {en ? "Drag to rotate" : "ドラッグで回せる"}
      </p>

      <div
        className="relative touch-none select-none"
        style={{
          perspective: "1100px",
          width: 320,
          height: 360,
          cursor: dragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        role="img"
        aria-label={en ? "Rotatable 3D product" : "回転できる3D製品"}
      >
        {/* ambient glow behind the bottle */}
        <div
          className="absolute left-1/2 top-[120px] h-28 w-44 -translate-x-1/2 rounded-[50%] blur-3xl"
          style={{ background: `${v.dot}55` }}
          aria-hidden="true"
        />

        {/* soft elliptical floor shadow (not a thin streak) */}
        <div
          className="absolute left-1/2 top-[300px] -translate-x-1/2 rounded-[50%] blur-md"
          style={{
            width: 200,
            height: 34,
            background:
              "radial-gradient(50% 50%, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)",
          }}
          aria-hidden="true"
        />

        {/* faint floor reflection */}
        <div
          className="absolute left-1/2 top-[280px] -translate-x-1/2 rounded-[50%] blur-lg"
          style={{
            width: 150,
            height: 60,
            background: `radial-gradient(50% 50%, ${v.dot}33, rgba(0,0,0,0) 72%)`,
            opacity: 0.5,
          }}
          aria-hidden="true"
        />

        {/* rotation stage */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            transition: dragging ? "none" : "transform 0.35s ease-out",
            transform: `translate(-50%,-50%) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
          }}
        >
          {/* ── BODY: a real 6-face rounded prism ───────────────── */}
          <Box
            w={W}
            h={H}
            d={D}
            radius={30}
            faceBg={faceBg}
            sideBg={sideBg}
            capBg={capBg}
            offsetY={ND}
            front={
              // label is a CHILD of the front face → turns away past ~90°
              <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-xl bg-white/90 px-3 py-4 text-center shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                <span className="block text-[11px] font-bold uppercase tracking-[0.28em] text-slate-700">
                  {en ? "Essence" : "エッセンス"}
                </span>
                <span className="mt-1 block text-[8px] font-medium tracking-wide text-slate-400">
                  50ml · No.7
                </span>
              </div>
            }
          />

          {/* ── NECK / CAP: a mini 6-face box on top ─────────────── */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) translateY(${
                ND - H / 2 - NH / 2
              }px)`,
            }}
            aria-hidden="true"
          >
            <Box
              w={NW}
              h={NH}
              d={ND}
              radius={8}
              faceBg="linear-gradient(170deg, color-mix(in srgb, var(--cap) 70%, white) 0%, var(--cap) 60%, var(--deep) 100%)"
              sideBg="linear-gradient(170deg, color-mix(in srgb, var(--cap) 55%, white) 0%, var(--cap) 55%, var(--deep) 100%)"
              capBg="linear-gradient(170deg, color-mix(in srgb, var(--cap) 65%, white) 0%, var(--deep) 100%)"
            />
          </div>
        </div>
      </div>

      {/* swatches */}
      <div className="flex items-center gap-3">
        {VARIANTS.map((sw, i) => (
          <button
            key={sw.id}
            type="button"
            onClick={() => setVariant(i)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition"
            style={{
              background: sw.dot,
              boxShadow:
                i === variant
                  ? `0 0 0 2px #06070d, 0 0 0 4px ${sw.dot}, 0 6px 16px -4px ${sw.dot}`
                  : "0 2px 8px -3px rgba(0,0,0,0.6)",
            }}
            aria-pressed={i === variant}
            aria-label={en ? sw.nameEn : sw.name}
          >
            {i === variant && (
              <Check className="h-4 w-4 text-white drop-shadow" strokeWidth={3} />
            )}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium text-white/60">
        {en ? v.nameEn : v.name}
        <span className="mx-2 text-white/25">/</span>
        {en ? "Make it yours" : "あなた色に"}
      </p>
    </div>
  );
}

/**
 * A true 3D rounded box: six faces in a `preserve-3d` space.
 * front/back carry the main face gradient; left/right are darker glossy
 * sides (the real thickness); top/bottom are caps. Every face uses the
 * shared CSS vars, so recoloring updates the whole solid at once.
 */
function Box({
  w,
  h,
  d,
  radius,
  faceBg,
  sideBg,
  capBg,
  front,
  offsetY = 0,
}: {
  w: number;
  h: number;
  d: number;
  radius: number;
  faceBg: string;
  sideBg: string;
  capBg: string;
  front?: React.ReactNode;
  /** push the whole box down a bit so neck can sit on top */
  offsetY?: number;
}) {
  // vertical specular highlight reused per visible face
  const specular = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-2 left-[14%] w-[12%] rounded-full"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.04))",
        filter: "blur(2px)",
      }}
    />
  );

  const faceBase: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    overflow: "hidden",
  };

  const ringShadow =
    "inset 0 0 0 1px rgba(255,255,255,0.16), inset 0 2px 6px rgba(255,255,255,0.18), inset 0 -10px 24px rgba(0,0,0,0.35)";

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transformStyle: "preserve-3d",
        transform: `translate(-50%,-50%) translateY(${offsetY}px)`,
      }}
    >
      {/* FRONT */}
      <div
        style={{
          ...faceBase,
          width: w,
          height: h,
          marginLeft: -w / 2,
          marginTop: -h / 2,
          borderRadius: radius,
          background: faceBg,
          boxShadow: ringShadow,
          transform: `translateZ(${d / 2}px)`,
        }}
      >
        {specular}
        {front}
      </div>

      {/* BACK */}
      <div
        style={{
          ...faceBase,
          width: w,
          height: h,
          marginLeft: -w / 2,
          marginTop: -h / 2,
          borderRadius: radius,
          background: faceBg,
          filter: "brightness(0.78)",
          boxShadow: ringShadow,
          transform: `translateZ(${-d / 2}px) rotateY(180deg)`,
        }}
        aria-hidden="true"
      >
        {specular}
      </div>

      {/* LEFT side — tall strip depth × height (the key thickness) */}
      <div
        style={{
          ...faceBase,
          width: d,
          height: h,
          marginLeft: -d / 2,
          marginTop: -h / 2,
          borderRadius: Math.min(radius, d / 2),
          background: sideBg,
          boxShadow: ringShadow,
          transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
        }}
        aria-hidden="true"
      >
        {specular}
      </div>

      {/* RIGHT side */}
      <div
        style={{
          ...faceBase,
          width: d,
          height: h,
          marginLeft: -d / 2,
          marginTop: -h / 2,
          borderRadius: Math.min(radius, d / 2),
          background: sideBg,
          boxShadow: ringShadow,
          transform: `rotateY(90deg) translateZ(${w / 2}px)`,
        }}
        aria-hidden="true"
      >
        {specular}
      </div>

      {/* TOP cap — width × depth */}
      <div
        style={{
          ...faceBase,
          width: w,
          height: d,
          marginLeft: -w / 2,
          marginTop: -d / 2,
          borderRadius: Math.min(radius, d / 2),
          background: capBg,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
          transform: `rotateX(90deg) translateZ(${h / 2}px)`,
        }}
        aria-hidden="true"
      />

      {/* BOTTOM cap */}
      <div
        style={{
          ...faceBase,
          width: w,
          height: d,
          marginLeft: -w / 2,
          marginTop: -d / 2,
          borderRadius: Math.min(radius, d / 2),
          background: capBg,
          filter: "brightness(0.6)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)",
          transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
