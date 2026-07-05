import { useRef, useState } from "react";
import { Fish } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "錦鯉の池3D",
  category: "3Dアニメ",
  description:
    "波紋が広がる水面の上を錦鯉が曲線を描いて泳ぐ、わずかに3D傾斜した俯瞰の池。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "animation"],
  principle:
    "ゆらぎと余白、生きものの緩やかな動きが、落ち着きと上質さの体感を生む。",
};

type Koi = {
  id: string;
  color: string;
  spot: string;
  dur: number;
  delay: number;
  scale: number;
  path: string;
};

const KOI: Koi[] = [
  {
    id: "k1",
    color: "#ef5a3c",
    spot: "#fbe7d8",
    dur: 26,
    delay: 0,
    scale: 1,
    path: "uwk-orbit-a",
  },
  {
    id: "k2",
    color: "#f3ead7",
    spot: "#e08a3c",
    dur: 32,
    delay: -8,
    scale: 0.82,
    path: "uwk-orbit-b",
  },
  {
    id: "k3",
    color: "#1f1c1a",
    spot: "#ef5a3c",
    dur: 38,
    delay: -16,
    scale: 0.92,
    path: "uwk-orbit-c",
  },
];

function KoiSprite({ koi }: { koi: Koi }) {
  return (
    <div
      className="uwk-anim absolute left-1/2 top-1/2 h-0 w-0"
      style={{
        animation: `${koi.path} ${koi.dur}s linear infinite`,
        animationDelay: `${koi.delay}s`,
      }}
    >
      <div
        className="uwk-anim relative"
        style={{
          transform: `scale(${koi.scale})`,
          animation: "uwk-bob 4s ease-in-out infinite",
        }}
      >
        <svg width="84" height="40" viewBox="0 0 84 40" style={{ marginLeft: -42, marginTop: -20 }}>
          {/* body */}
          <path
            d="M6 20 C 18 8 44 8 58 16 C 70 22 74 18 80 20 C 74 22 70 18 58 24 C 44 32 18 32 6 20 Z"
            fill={koi.color}
          />
          {/* tail */}
          <path d="M58 16 C 70 10 80 12 82 20 C 80 28 70 30 58 24 Z" fill={koi.color} opacity="0.85" />
          {/* spots */}
          <ellipse cx="30" cy="17" rx="7" ry="5" fill={koi.spot} opacity="0.9" />
          <ellipse cx="46" cy="22" rx="5" ry="3.5" fill={koi.spot} opacity="0.8" />
          {/* eye */}
          <circle cx="14" cy="19" r="2" fill="#1a1413" />
        </svg>
      </div>
    </div>
  );
}

export default function KoiPond3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <div className="w-full bg-transparent p-6">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1000px]"
      >
        <style>{`
          @keyframes uwk-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          @keyframes uwk-ripple { 0%{transform:scale(0.2);opacity:0.55} 100%{transform:scale(1);opacity:0} }
          @keyframes uwk-orbit-a {
            0%{transform:rotate(0deg) translateX(150px) rotate(90deg)}
            100%{transform:rotate(360deg) translateX(150px) rotate(450deg)}
          }
          @keyframes uwk-orbit-b {
            0%{transform:rotate(120deg) translateX(95px) rotate(-90deg)}
            100%{transform:rotate(-240deg) translateX(95px) rotate(-450deg)}
          }
          @keyframes uwk-orbit-c {
            0%{transform:rotate(220deg) translateX(190px) rotate(90deg)}
            100%{transform:rotate(580deg) translateX(190px) rotate(450deg)}
          }
          @media (prefers-reduced-motion: reduce){ .uwk-anim{animation:none!important} }
        `}</style>

        <div
          className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${52 + tilt.y * 8}deg) rotateZ(${tilt.x * 10}deg)`,
          }}
        >
          {/* pond basin */}
          <div className="absolute inset-0 overflow-hidden rounded-full border-[10px] border-[#2a3b30] bg-[radial-gradient(circle_at_42%_36%,#3f7d74_0%,#1f5750_45%,#123a38_100%)] shadow-[0_40px_60px_-20px_rgba(0,0,0,0.5)]">
            {/* ripples */}
            {[
              { l: "30%", t: "34%", s: 180, d: "0s" },
              { l: "62%", t: "55%", s: 150, d: "1.4s" },
              { l: "48%", t: "70%", s: 120, d: "2.8s" },
              { l: "70%", t: "30%", s: 100, d: "3.6s" },
            ].map((r, i) => (
              <div
                key={`rp${i}`}
                className="uwk-anim absolute rounded-full border border-[#bfeae0]/40"
                style={{
                  left: r.l,
                  top: r.t,
                  width: r.s,
                  height: r.s,
                  marginLeft: -r.s / 2,
                  marginTop: -r.s / 2,
                  animation: `uwk-ripple 6s ease-out infinite`,
                  animationDelay: r.d,
                }}
              />
            ))}

            {/* surface sheen */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_35%_25%,rgba(255,255,255,0.18),transparent_60%)]" />

            {/* lily pads */}
            <div className="absolute left-[18%] top-[60%] h-12 w-14 rounded-full bg-[#2f6b4f]" style={{ clipPath: "polygon(0 0,100% 0,100% 100%,55% 100%,50% 50%,45% 100%,0 100%)" }} />
            <div className="absolute right-[16%] top-[22%] h-10 w-12 rounded-full bg-[#357a59]" style={{ clipPath: "polygon(0 0,100% 0,100% 100%,55% 100%,50% 50%,45% 100%,0 100%)" }} />

            {/* koi */}
            {KOI.map((k) => (
              <KoiSprite key={k.id} koi={k} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[520px] text-center">
        <Badge
          variant="outline"
          className="mb-4 border-[#1f5750]/30 bg-[#3f7d74]/10 text-[#1f5750]"
        >
          <Fish className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Koi Pond" : "錦鯉の池"}
        </Badge>
        <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {en ? "Stillness that breathes." : "息づく、静けさ。"}
        </h3>
        <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">
          {en
            ? "Koi trace slow arcs over a rippling surface — tilt the pond with your pointer. CSS and SVG only."
            : "波紋の水面を錦鯉が緩やかに巡る。ポインタで池を傾けて。CSSとSVGだけ。"}
        </p>
      </div>
    </div>
  );
}
