import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クリスタル ジェムファセット",
  category: "3Dアニメ",
  description:
    "CSSのperspectiveとpreserve-3dで組んだ多面カット宝石が回転。星形グリントと縁の虹色分散できらめく。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "gloss", "materials", "animation"],
  principle:
    "多面体のきらめきと虹の分散は希少な宝石の合図。眩しさのピーク＝価値のピークと脳が結びつける。",
};

/**
 * 真の立体ジェム（ブリリアントカット）。
 * 縦軸まわりに N 個のファセットを放射状に並べる（rotateY(i*360/N) translateZ(R)）ので、
 * どの回転角でもシルエットが宝石のまま＝細い板に潰れない。
 *  - テーブル（頂上の平らな多角形）
 *  - クラウン（上部リング：外へ開く台形ファセット）
 *  - ガードル（中央のくびれ）
 *  - パビリオン（下部リング：底のキューレットへ収束する三角ファセット）
 */

const N = 10; // ファセット数
const R = 56; // 軸からファセットまでの半径(px)
const CROWN_H = 40; // クラウン（上半身）の高さ
const PAV_H = 78; // パビリオン（下半身）の高さ
const FACET_W = (2 * Math.PI * R) / N + 6; // リングを隙間なく埋める弦幅 + のりしろ

// ファセットごとに明るさ・色相を少し変えて、回転で「光を拾う面」が変わって見えるようにする
const FACETS = Array.from({ length: N }, (_, i) => {
  const angle = (i * 360) / N;
  // 0..1 の波で明暗を作る（隣り合う面が交互に明るい）
  const wave = (Math.sin((i / N) * Math.PI * 2) + 1) / 2;
  const crownBright = 0.55 + wave * 0.45;
  const pavBright = 0.4 + (1 - wave) * 0.4;
  return { i, angle, crownBright, pavBright };
});

function crownGradient(b: number): string {
  // 上が明るく下（ガードル側）がやや濃い、氷青〜クリア〜淡い菫
  const top = `rgba(${Math.round(196 * b + 40)}, ${Math.round(
    222 * b + 30
  )}, 255, ${0.42 + b * 0.3})`;
  const mid = `rgba(${Math.round(150 * b + 30)}, ${Math.round(
    180 * b + 24
  )}, ${Math.round(236 * b + 19)}, ${0.34 + b * 0.26})`;
  const bot = `rgba(${Math.round(120 * b + 24)}, ${Math.round(
    138 * b + 20
  )}, ${Math.round(214 * b + 30)}, ${0.3 + b * 0.22})`;
  return `linear-gradient(180deg, ${top} 0%, ${mid} 52%, ${bot} 100%)`;
}

function pavilionGradient(b: number): string {
  // ガードル側が明るく、キューレット（先端）へ向け深い藍に沈む
  const top = `rgba(${Math.round(130 * b + 30)}, ${Math.round(
    160 * b + 26
  )}, ${Math.round(236 * b + 19)}, ${0.4 + b * 0.28})`;
  const tip = `rgba(${Math.round(60 * b + 14)}, ${Math.round(
    84 * b + 16
  )}, ${Math.round(168 * b + 28)}, ${0.5 + b * 0.28})`;
  return `linear-gradient(180deg, ${top} 0%, ${tip} 100%)`;
}

// テーブル（多角形）の clip-path：N 角形
const TABLE_CLIP =
  "polygon(" +
  Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(a) * 50;
    const y = 50 + Math.sin(a) * 50;
    return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
  }).join(", ") +
  ")";

// 漂う虹グリント（虹色分散）。面の上できらめく小さな閃光。
const GLINTS = [
  { x: 30, y: 30, s: 16, dur: 4.2, delay: 0, hue: 0 },
  { x: 66, y: 42, s: 12, dur: 5.1, delay: 1.4, hue: 140 },
  { x: 46, y: 60, s: 14, dur: 4.6, delay: 2.6, hue: 260 },
  { x: 58, y: 24, s: 10, dur: 5.6, delay: 3.4, hue: 60 },
];

export default function CrystalGemFacet() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div
      className="flex w-full flex-col items-center gap-8 rounded-3xl py-16"
      style={{
        background:
          "radial-gradient(120% 110% at 50% 8%, #11142a 0%, #080a18 60%, #03040a 100%)",
      }}
    >
      <style>{`
        @keyframes cg-spin   { to { transform: rotateY(360deg); } }
        @keyframes cg-bob    { 0%,100% { transform: translateY(-7px); } 50% { transform: translateY(7px); } }
        @keyframes cg-bloom  { 0%,100% { opacity: 0.35; transform: translate(-50%,-50%) scale(0.92) rotate(0deg); }
                               50%     { opacity: 0.7;  transform: translate(-50%,-50%) scale(1.06) rotate(180deg); } }
        @keyframes cg-glint  {
          0%, 70%, 100% { opacity: 0; transform: translate(-50%,-50%) scale(0.4) rotate(0deg); }
          82%, 90%      { opacity: 1; transform: translate(-50%,-50%) scale(1)   rotate(45deg); }
        }
        @keyframes cg-drift  { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @media (prefers-reduced-motion: reduce) {
          .cg-gem    { animation: none !important; transform: rotateX(14deg) rotateY(26deg) !important; }
          .cg-bob    { animation: none !important; }
          .cg-bloom  { animation: none !important; opacity: 0.55 !important; transform: translate(-50%,-50%) scale(1) !important; }
          .cg-glint  { animation: none !important; opacity: 0.85 !important; transform: translate(-50%,-50%) scale(1) rotate(45deg) !important; }
          .cg-band   { animation: none !important; }
        }
      `}</style>

      {/* シーン：perspective を与えて立体回転させる */}
      <div
        className="cg-bob relative"
        style={{
          width: 220,
          height: 260,
          perspective: "720px",
          animation: "cg-bob 4.4s ease-in-out infinite",
        }}
      >
        {/* 背後の虹ブルーム（細い帯にならない円形） */}
        <div
          className="cg-bloom pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #ff5d8f, #ffd45d, #5dff9e, #5dd8ff, #9a5dff, #ff5dd0, #ff5d8f)",
            filter: "blur(30px)",
            animation: "cg-bloom 7s ease-in-out infinite",
          }}
        />

        {/* 回転する宝石本体 */}
        <div
          className="cg-gem absolute left-1/2 top-1/2"
          style={{
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: "rotateX(14deg)",
            animation: "cg-spin 9s linear infinite",
            willChange: "transform",
          }}
        >
          {/* 内側のコア：奥のファセットが透けたとき、空洞ではなく結晶の芯が見えるように */}
          <div
            className="absolute rounded-full"
            style={{
              width: 96,
              height: 96,
              left: -48,
              top: -54,
              background:
                "radial-gradient(circle at 42% 36%, rgba(190,220,255,0.5), rgba(90,120,210,0.28) 55%, rgba(30,40,90,0.12) 100%)",
              transform: "translateZ(0)",
              filter: "blur(2px)",
            }}
          />

          {/* テーブル（頂上の平らな多角形） */}
          <div
            className="absolute"
            style={{
              width: R * 1.7,
              height: R * 1.7,
              left: -(R * 1.7) / 2,
              top: -(R * 1.7) / 2,
              transform: `translateY(-${CROWN_H + 4}px) rotateX(90deg)`,
              clipPath: TABLE_CLIP,
              background:
                "radial-gradient(circle at 40% 34%, rgba(232,244,255,0.92) 0%, rgba(176,206,255,0.7) 46%, rgba(120,150,230,0.6) 100%)",
              boxShadow: "inset 0 0 18px rgba(255,255,255,0.55)",
            }}
          >
            {/* テーブル上の漂う虹（ドリフトする線形虹で、潰れない面光沢） */}
            <div
              className="cg-band absolute inset-0"
              style={{
                clipPath: TABLE_CLIP,
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,93,143,0.5), rgba(255,212,93,0.5), rgba(93,255,158,0.5), rgba(93,216,255,0.5), rgba(154,93,255,0.5), transparent 70%)",
                backgroundSize: "200% 100%",
                mixBlendMode: "screen",
                animation: "cg-drift 6s linear infinite",
                opacity: 0.7,
              }}
            />
          </div>

          {/* クラウン：上部リングのファセット（外へ開く台形） */}
          {FACETS.map(({ i, angle, crownBright }) => (
            <div
              key={`crown-${i}`}
              className="absolute origin-top"
              style={{
                width: FACET_W,
                height: CROWN_H,
                left: -FACET_W / 2,
                top: -CROWN_H,
                transform: `rotateY(${angle}deg) translateZ(${R * 0.62}px) rotateX(34deg)`,
                background: crownGradient(crownBright),
                // 内側にテーパー：上(テーブル側)を狭く、下(ガードル側)を広く見せる台形
                clipPath: "polygon(26% 0%, 74% 0%, 100% 100%, 0% 100%)",
                borderTop: "1px solid rgba(255,255,255,0.7)",
                boxShadow: `inset 0 6px 10px -6px rgba(255,255,255,${
                  0.5 * crownBright
                })`,
                backfaceVisibility: "visible",
              }}
            />
          ))}

          {/* クラウンの間を埋める三角ファセット（半オフセットの放射で多面感を強める） */}
          {FACETS.map(({ i, angle, crownBright }) => (
            <div
              key={`crown-x-${i}`}
              className="absolute origin-top"
              style={{
                width: FACET_W,
                height: CROWN_H * 0.92,
                left: -FACET_W / 2,
                top: -CROWN_H,
                transform: `rotateY(${angle + 360 / N / 2}deg) translateZ(${
                  R * 0.6
                }px) rotateX(40deg)`,
                background: crownGradient(0.4 + (1 - crownBright) * 0.5),
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                opacity: 0.85,
                backfaceVisibility: "visible",
              }}
            />
          ))}

          {/* パビリオン：下部リングのファセット（底のキューレットへ収束する三角） */}
          {FACETS.map(({ i, angle, pavBright }) => (
            <div
              key={`pav-${i}`}
              className="absolute origin-top"
              style={{
                width: FACET_W,
                height: PAV_H,
                left: -FACET_W / 2,
                top: 0,
                transform: `rotateY(${angle}deg) translateZ(${R * 0.62}px) rotateX(-52deg)`,
                background: pavilionGradient(pavBright),
                // 上(ガードル)が広く、下が尖るキューレット三角
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                boxShadow: `inset 0 -8px 14px -8px rgba(120,150,255,${
                  0.4 * pavBright
                })`,
                borderLeft: "1px solid rgba(180,205,255,0.35)",
                borderRight: "1px solid rgba(180,205,255,0.35)",
                backfaceVisibility: "visible",
              }}
            />
          ))}

          {/* ガードル：中央のくびれを示す光沢リング */}
          {FACETS.map(({ i, angle, crownBright }) => (
            <div
              key={`girdle-${i}`}
              className="absolute"
              style={{
                width: FACET_W,
                height: 7,
                left: -FACET_W / 2,
                top: -3,
                transform: `rotateY(${angle}deg) translateZ(${R * 0.66}px)`,
                background: `linear-gradient(180deg, rgba(255,255,255,${
                  0.6 * crownBright
                }), rgba(150,180,255,0.2))`,
                backfaceVisibility: "visible",
              }}
            />
          ))}

          {/* 漂う虹グリント（面の上できらめく小さな閃光・虹色分散） */}
          {GLINTS.map((g, i) => (
            <span
              key={`glint-${i}`}
              className="cg-glint absolute"
              style={{
                left: `${g.x - 50}px`,
                top: `${g.y - 60}px`,
                width: g.s,
                height: g.s,
                transform: "translate(-50%,-50%)",
                background: `radial-gradient(circle, hsla(${g.hue},100%,80%,0.95) 0%, rgba(255,255,255,0.6) 40%, transparent 68%)`,
                animation: `cg-glint ${g.dur}s ease-in-out ${g.delay}s infinite`,
              }}
            >
              <span
                className="absolute left-1/2 top-1/2"
                style={{
                  width: g.s * 2.6,
                  height: 2,
                  transform: "translate(-50%,-50%)",
                  background:
                    "linear-gradient(90deg, transparent, #fff, transparent)",
                }}
              />
              <span
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 2,
                  height: g.s * 2.6,
                  transform: "translate(-50%,-50%)",
                  background:
                    "linear-gradient(180deg, transparent, #fff, transparent)",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.32em] text-indigo-200/65">
        {en ? "Brilliant cut · 1.2 ct" : "ブリリアントカット · 1.2 カラット"}
      </p>
    </div>
  );
}
