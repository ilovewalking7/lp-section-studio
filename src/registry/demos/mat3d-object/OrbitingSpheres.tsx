import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "オービット スフィア",
  category: "3Dアニメ",
  description:
    "光るコアを、傾いた3Dリング上の小さな球体が異なる速度で周回するオービット。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "object", "materials", "animation"],
  principle:
    "鏡面ハイライト・リムライト・遠近のボケ＆減光（ペインターズ法）という実物の光学手掛かりを重ねると、平面の円が一気に「ライティングされた球」として知覚される。深宇宙の暗背景がコントラストを最大化し、中心のブルームが視線を引き込む。",
};

/** ステージの中心（px）と全体サイズ。 */
const STAGE = 320;
const CX = STAGE / 2;
const CY = STAGE / 2;

type SphereDef = {
  /** 周回半径（px）。 */
  radius: number;
  /** 軌道傾斜（X軸まわり, deg）。 */
  inclination: number;
  /** 昇交点経度のような全体回し（Y軸まわり, deg）。 */
  swivel: number;
  /** 角速度（rad/s）。符号で公転方向。 */
  speed: number;
  /** 開始位相（rad）。 */
  phase: number;
  /** 基準直径（px, 最前面時）。 */
  size: number;
  /** 球のベースカラー（明→暗のHSL3段）。 */
  hi: string;
  mid: string;
  lo: string;
  /** グロー色（rgb）。 */
  glow: string;
  /** 高速球に薄い残像を付けるか。 */
  trail?: boolean;
};

type Ring = {
  radius: number;
  inclination: number;
  swivel: number;
  glow: string;
  spheres: SphereDef[];
};

/** 上品なパレットの軌道リング群。各リングに複数の球を載せる。 */
const RINGS: Ring[] = [
  {
    radius: 58,
    inclination: 74,
    swivel: 12,
    glow: "253,224,71",
    spheres: [
      {
        radius: 58, inclination: 74, swivel: 12, speed: 1.05, phase: 0, size: 22,
        hi: "#fffdf2", mid: "#fbbf24", lo: "#92400e", glow: "251,191,36", trail: true,
      },
      {
        radius: 58, inclination: 74, swivel: 12, speed: 1.05, phase: Math.PI, size: 14,
        hi: "#fff7ed", mid: "#fb923c", lo: "#7c2d12", glow: "251,146,60",
      },
    ],
  },
  {
    radius: 92,
    inclination: 62,
    swivel: -46,
    glow: "34,211,238",
    spheres: [
      {
        radius: 92, inclination: 62, swivel: -46, speed: -0.66, phase: 0.6, size: 18,
        hi: "#f0fdff", mid: "#22d3ee", lo: "#155e75", glow: "34,211,238", trail: true,
      },
      {
        radius: 92, inclination: 62, swivel: -46, speed: -0.66, phase: 2.4, size: 11,
        hi: "#eef2ff", mid: "#818cf8", lo: "#3730a3", glow: "129,140,248",
      },
      {
        radius: 92, inclination: 62, swivel: -46, speed: -0.66, phase: 4.3, size: 13,
        hi: "#ecfeff", mid: "#2dd4bf", lo: "#115e59", glow: "45,212,191",
      },
    ],
  },
  {
    radius: 132,
    inclination: 70,
    swivel: 54,
    glow: "236,72,153",
    spheres: [
      {
        radius: 132, inclination: 70, swivel: 54, speed: 0.42, phase: 1.1, size: 16,
        hi: "#fff1f7", mid: "#f472b6", lo: "#9d174d", glow: "236,72,153", trail: true,
      },
      {
        radius: 132, inclination: 70, swivel: 54, speed: 0.42, phase: 3.0, size: 10,
        hi: "#faf5ff", mid: "#c084fc", lo: "#6b21a8", glow: "192,132,252",
      },
      {
        radius: 132, inclination: 70, swivel: 54, speed: 0.42, phase: 5.0, size: 12,
        hi: "#fdf2f8", mid: "#fb7185", lo: "#9f1239", glow: "251,113,133",
      },
    ],
  },
];

const ALL_SPHERES: SphereDef[] = RINGS.flatMap((r) => r.spheres);

/** 背景の小さな星（決定的に配置してノイズを抑える）。 */
const STARS = Array.from({ length: 34 }, (_, i) => {
  const a = i * 2.399963; // 黄金角でばらける
  const r = 12 + ((i * 53) % 130);
  return {
    x: CX + Math.cos(a) * r + ((i * 37) % 40) - 20,
    y: CY + Math.sin(a) * r * 0.92 + ((i * 19) % 36) - 18,
    s: 0.7 + ((i * 7) % 13) / 10,
    o: 0.18 + ((i * 11) % 50) / 130,
  };
});

/** 軌道傾斜＋全体スイベルで 3D 座標→画面投影。z>0 が手前。 */
function project(
  angle: number,
  radius: number,
  inclination: number,
  swivel: number
) {
  // リング平面上の点
  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * radius;
  let z = 0;
  // X軸まわりに傾ける（inclination）
  const ix = (inclination * Math.PI) / 180;
  const y1 = y * Math.cos(ix) - z * Math.sin(ix);
  const z1 = y * Math.sin(ix) + z * Math.cos(ix);
  y = y1;
  z = z1;
  // Y軸まわりにスイベル
  const sy = (swivel * Math.PI) / 180;
  const x2 = x * Math.cos(sy) + z * Math.sin(sy);
  const z2 = -x * Math.sin(sy) + z * Math.cos(sy);
  x = x2;
  z = z2;
  return { x, y, z };
}

type Frame = {
  /** 各球の計算済み描画パラメータ。 */
  spheres: {
    x: number;
    y: number;
    z: number;
    depth: number; // 0(奥)〜1(手前)
    scale: number;
    opacity: number;
    blur: number;
    zi: number;
  }[];
  /** コアの脈動（0..1）。 */
  pulse: number;
};

export default function OrbitingSpheres() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const reduce =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 初期フレーム（位相0基準）— マウント時のレイアウト読みを避け、純粋計算のみ。
  const [frame, setFrame] = useState<Frame>(() => buildFrame(0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      // 動きを止めても 3D に見える静止フレームを一枚だけ置く。
      setFrame(buildFrame(0.8));
      return;
    }
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      setFrame(buildFrame(elapsed));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const corePulse = frame.pulse; // 0..1
  const coreScale = 1 + corePulse * 0.1;
  const coreGlow = 0.55 + corePulse * 0.35;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-3xl bg-[radial-gradient(130%_120%_at_50%_36%,#0b1226_0%,#070a17_55%,#03040a_100%)] py-12">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: STAGE, height: STAGE }}
        role="img"
        aria-label={
          en ? "Spheres orbiting a glowing core" : "光るコアを周回する球体"
        }
      >
        {/* 深宇宙＋ネビュラのほのかな発光 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 32% 30%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 60%)," +
              "radial-gradient(55% 45% at 72% 70%, rgba(236,72,153,0.14) 0%, rgba(236,72,153,0) 62%)," +
              "radial-gradient(45% 40% at 60% 24%, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0) 60%)",
          }}
        />
        {/* 小さな星 */}
        <div className="pointer-events-none absolute inset-0">
          {STARS.map((st, i) => (
            <span
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: st.x,
                top: st.y,
                width: st.s,
                height: st.s,
                opacity: st.o,
                boxShadow: `0 0 ${st.s * 2}px rgba(255,255,255,${st.o})`,
              }}
            />
          ))}
        </div>

        {/* 軌道ガイドライン（傾斜を反映した楕円） */}
        <svg
          className="pointer-events-none absolute inset-0"
          width={STAGE}
          height={STAGE}
          aria-hidden="true"
        >
          <defs>
            {RINGS.map((r, i) => (
              <linearGradient
                key={`rg-${i}`}
                id={`os-ring-grad-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={`rgba(${r.glow},0)`} />
                <stop offset="50%" stopColor={`rgba(${r.glow},0.45)`} />
                <stop offset="100%" stopColor={`rgba(${r.glow},0)`} />
              </linearGradient>
            ))}
          </defs>
          {RINGS.map((r, i) => {
            const ry = r.radius * Math.cos((r.inclination * Math.PI) / 180);
            return (
              <ellipse
                key={`ring-${i}`}
                cx={CX}
                cy={CY}
                rx={r.radius}
                ry={Math.max(2, ry)}
                fill="none"
                stroke={`url(#os-ring-grad-${i})`}
                strokeWidth={1}
                transform={`rotate(${r.swivel} ${CX} ${CY})`}
                opacity={0.7}
              />
            );
          })}
        </svg>

        {/* 中心の光るコア：ブルーム＋コロナ＋脈動 */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: CX,
            top: CY,
            width: 0,
            height: 0,
            zIndex: 50,
          }}
        >
          {/* 外側ブルーム */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 170,
              height: 170,
              background:
                "radial-gradient(circle, rgba(129,140,248,0.4) 0%, rgba(99,102,241,0.16) 36%, rgba(99,102,241,0) 70%)",
              opacity: coreGlow,
              filter: "blur(2px)",
            }}
          />
          {/* コロナ */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 78,
              height: 78,
              background:
                "radial-gradient(circle, rgba(199,210,254,0.55) 0%, rgba(129,140,248,0.25) 45%, rgba(99,102,241,0) 72%)",
              transform: `translate(-50%,-50%) scale(${coreScale})`,
            }}
          />
          {/* コア本体（鏡面ハイライト付き） */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 46,
              height: 46,
              transform: `translate(-50%,-50%) scale(${coreScale})`,
              background:
                "radial-gradient(circle at 38% 32%, #ffffff 0%, #e0e7ff 16%, #a5b4fc 42%, #6366f1 70%, #312e81 100%)",
              boxShadow:
                `0 0 22px rgba(165,180,252,${coreGlow}), 0 0 56px rgba(99,102,241,${coreGlow * 0.7}), inset -6px -7px 12px rgba(49,46,129,0.7), inset 5px 5px 10px rgba(255,255,255,0.5)`,
            }}
          />
        </div>

        {/* 周回する球体（ペインターズ法で z 順描画） */}
        {frame.spheres.map((s, i) => {
          const def = ALL_SPHERES[i];
          const size = def.size * s.scale;
          const left = CX + s.x;
          const top = CY + s.y;
          // 光源は左上(コア寄り中央上)を想定 → 鏡面を左上にオフセット
          return (
            <div key={`sph-${i}`}>
              {def.trail && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left,
                    top,
                    width: size * 1.7,
                    height: size * 1.7,
                    background: `radial-gradient(circle, rgba(${def.glow},${0.18 * s.opacity}) 0%, rgba(${def.glow},0) 68%)`,
                    zIndex: s.zi - 1,
                    filter: `blur(${s.blur + 1.5}px)`,
                  }}
                />
              )}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left,
                  top,
                  width: size,
                  height: size,
                  zIndex: s.zi,
                  opacity: s.opacity,
                  filter: s.blur > 0.15 ? `blur(${s.blur}px)` : undefined,
                  background:
                    `radial-gradient(circle at 34% 30%, ${def.hi} 0%, ${def.mid} 38%, ${def.lo} 78%, ${def.lo} 100%)`,
                  boxShadow:
                    // 内側：左上の鏡面ハイライト＋右下のターミネーター陰
                    `inset ${size * 0.16}px ${size * 0.16}px ${size * 0.3}px rgba(255,255,255,0.55),` +
                    `inset -${size * 0.22}px -${size * 0.22}px ${size * 0.38}px rgba(0,0,0,0.55),` +
                    // 影側のリムライト（うっすら縁が光る）
                    `inset 0 0 ${size * 0.5}px rgba(${def.glow},0.35),` +
                    // 外側のグロー（手前ほど強い）
                    `0 0 ${size * 0.55}px rgba(${def.glow},${0.6 * s.opacity}),` +
                    `0 ${size * 0.18}px ${size * 0.4}px rgba(0,0,0,0.5)`,
                }}
              >
                {/* 小さな鋭い鏡面スペキュラ点 */}
                <span
                  className="absolute rounded-full"
                  style={{
                    left: "26%",
                    top: "22%",
                    width: Math.max(2, size * 0.2),
                    height: Math.max(2, size * 0.2),
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
                    filter: "blur(0.4px)",
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* ステージ手前の微かなビネット */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: "inset 0 0 70px rgba(3,4,10,0.85)",
          }}
        />
      </div>

      <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-indigo-200/70">
        {en ? "Orbital System" : "オービタル・システム"}
      </p>
    </div>
  );
}

/** 経過時間 t（秒）から全球の描画パラメータを計算（純粋関数）。 */
function buildFrame(t: number): Frame {
  const spheres = ALL_SPHERES.map((def) => {
    const angle = def.phase + def.speed * t;
    const { x, y, z } = project(
      angle,
      def.radius,
      def.inclination,
      def.swivel
    );
    // 手前(z 最大)で depth=1、奥で 0。半径で正規化。
    const depth = clamp01((z / def.radius + 1) / 2);
    const scale = 0.62 + depth * 0.62; // 0.62〜1.24
    const opacity = 0.42 + depth * 0.58; // 0.42〜1.0
    const blur = (1 - depth) * 3.2; // 奥ほどボケる
    // z 値そのものを z-index に（手前ほど大）。コア(50)を跨がないよう調整。
    const zi = Math.round(20 + depth * 28);
    return { x, y, z, depth, scale, opacity, blur, zi };
  });
  // コアの脈動（穏やか）。
  const pulse = (Math.sin(t * 1.9) + 1) / 2;
  return { spheres, pulse };
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
