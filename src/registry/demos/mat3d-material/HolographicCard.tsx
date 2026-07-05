import { useRef, useState } from "react";
import { Sparkles, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "ホログラフィックカード",
  category: "3Dアニメ",
  description:
    "ポインターで揺れるコニックグラデのホロ反射と3Dチルト、追従するグレアハイライトを持つカード。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "material", "card", "animation"],
  principle:
    "視点で色が変わる虹色の干渉光は『本物の素材』のサインで、希少性と価値の知覚を高める。",
};

type Tilt = { rx: number; ry: number; px: number; py: number; active: boolean };

const REST: Tilt = { rx: 0, ry: 0, px: 50, py: 50, active: false };

export default function HolographicCard() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<Tilt>(REST);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - y) * 16,
      ry: (x - 0.5) * 18,
      px: x * 100,
      py: y * 100,
      active: true,
    });
  };

  const onPointerLeave = () => setTilt(REST);

  return (
    <div
      className="flex w-full items-center justify-center px-4 py-10"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative h-[380px] w-[300px] select-none rounded-3xl"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            tilt.active ? 1.02 : 1
          })`,
          transition: tilt.active
            ? "transform 80ms ease-out"
            : "transform 600ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* base metallic body */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[#0b0c14] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
          {/* holographic conic sheen following pointer */}
          <div
            className="absolute inset-0 opacity-70 mix-blend-color-dodge"
            style={{
              background: `conic-gradient(from ${
                tilt.px * 3.6
              }deg at ${tilt.px}% ${tilt.py}%, #ff2d8b, #ffd23f, #2dffb3, #2d9bff, #b32dff, #ff2d8b)`,
              filter: "saturate(1.4) blur(2px)",
            }}
            aria-hidden="true"
          />
          {/* fine diffraction lines */}
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 5px)",
              transform: "translateZ(1px)",
            }}
            aria-hidden="true"
          />
          {/* moving glare highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 38%)`,
              opacity: tilt.active ? 0.9 : 0.35,
              transition: "opacity 300ms ease",
            }}
            aria-hidden="true"
          />
          {/* dark vignette to keep text legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>

        {/* content lifted in 3D */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6"
          style={{ transform: "translateZ(48px)" }}
        >
          <div className="flex items-center justify-between">
            <Badge className="border-white/20 bg-white/10 text-white backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" />
              {en ? "Holo Edition" : "ホロ・エディション"}
            </Badge>
            <Star className="h-5 w-5 text-white/80" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              {en ? "Member Card" : "メンバーカード"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white drop-shadow">
              {en ? "Founders Pass" : "ファウンダーズ・パス"}
            </h3>
            <p className="mt-3 font-mono text-sm tracking-widest text-white/70">
              0042 · 0815 · 2099
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
