import { useEffect, useRef, useState } from "react";
import { ArrowRight, Boxes } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "フローティング・グラスパネル3D",
  category: "3Dアニメ",
  description:
    "preserve-3dの舞台で異なるtranslateZに浮くガラスパネルが自動オービット＋マウス傾斜するヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "hero", "materials", "animation"],
  principle:
    "半透明パネルの層と鏡面ハイライトは素材の質感を想起させ、製品の「高級な実在感」を伝える。",
};

type Panel = {
  z: number;
  x: number;
  y: number;
  rot: number;
  w: number;
  h: number;
  hue: number;
};

const PANELS: Panel[] = [
  { z: 120, x: -150, y: -40, rot: -9, w: 150, h: 200, hue: 265 },
  { z: 60, x: 140, y: 30, rot: 8, w: 170, h: 150, hue: 200 },
  { z: -40, x: -40, y: 70, rot: 4, w: 130, h: 130, hue: 320 },
  { z: -130, x: 90, y: -90, rot: -6, w: 200, h: 130, hue: 175 },
];

export default function FloatingPanels3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const stageRef = useRef<HTMLDivElement>(null);
  const [spin, setSpin] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      setSpin((((now - start) / 1000) * 7) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: nx, y: ny });
  };

  return (
    <section
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative h-[560px] w-full overflow-hidden bg-[#070710] text-white"
      style={{ perspective: "1100px" }}
    >
      {/* ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,90,255,0.2),transparent_55%),radial-gradient(circle_at_25%_75%,rgba(45,212,191,0.16),transparent_50%)]" />

      {/* 3D stage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transformStyle: "preserve-3d", perspective: "1100px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate(-50%,-50%) rotateX(${-tilt.y * 14}deg) rotateY(${spin + tilt.x * 18}deg)`,
          }}
        >
          {PANELS.map((p, i) => (
            <div
              key={`panel-${i}`}
              className="absolute rounded-2xl border border-white/15 shadow-2xl"
              style={{
                width: p.w,
                height: p.h,
                marginLeft: -p.w / 2,
                marginTop: -p.h / 2,
                transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateZ(${p.rot}deg)`,
                background: `linear-gradient(135deg, hsla(${p.hue},85%,70%,0.22), hsla(${p.hue},85%,55%,0.06))`,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 30px 60px -20px hsla(${p.hue},85%,40%,0.5)`,
              }}
            >
              {/* specular highlight */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 40%)",
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* copy in front */}
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <Badge
          variant="outline"
          className="mb-7 border-white/20 bg-white/5 text-white/80 backdrop-blur-sm"
        >
          <Boxes className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Material panels" : "マテリアル・パネル"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Surfaces that
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                float in space
              </span>
            </>
          ) : (
            <>
              空間に浮かぶ、
              <br />
              <span className="bg-gradient-to-r from-teal-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                ガラスの素材
              </span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          {en
            ? "Translucent panels orbit slowly and tilt to your cursor — real 3D layers with specular glass."
            : "半透明パネルがゆっくり旋回し、カーソルに傾く。鏡面ガラスをまとった本物の3Dレイヤー。"}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            {en ? "Get started" : "はじめる"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "View gallery" : "ギャラリー"}
          </Button>
        </div>
      </div>
    </section>
  );
}
