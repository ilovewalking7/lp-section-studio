import { useRef, useState } from "react";
import { ArrowUpRight, Layers } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "パララックス・デプスヒーロー",
  category: "3Dアニメ",
  description:
    "マウスで複数レイヤーが奥行き係数ごとにX/Y/Zへ動く、微傾斜つきの抽象パララックスヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "hero", "materials", "animation"],
  principle:
    "視差は脳が距離を測る最古の手がかり。動きに応じた層分けで本物の立体感を一瞬で作る。",
};

type Pt = { x: number; y: number };

export default function ParallaxDepthHero() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState<Pt>({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setP({ x: nx, y: ny });
  };

  const layer = (depth: number, z = 0) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, ${z}px)`,
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      className="relative h-[560px] w-full overflow-hidden bg-[#0a0a12] text-white [perspective:1200px]"
    >
      <style>{`
        @keyframes m3dpd-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @media (prefers-reduced-motion: reduce){ .m3dpd-anim{animation:none!important} }
      `}</style>

      {/* base radial wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(236,72,153,0.18),transparent_50%)]" />

      <div
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${-p.y * 6}deg) rotateY(${p.x * 6}deg)`,
        }}
      >
        {/* deep grid */}
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            ...layer(-18, -160),
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(circle at 50% 45%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 45%, black, transparent 70%)",
          }}
        />

        {/* far blobs */}
        <div
          className="m3dpd-anim absolute left-[12%] top-[22%] h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl transition-transform duration-200 ease-out"
          style={{ ...layer(14, -80), animation: "m3dpd-float 9s ease-in-out infinite" }}
        />
        <div
          className="m3dpd-anim absolute right-[14%] bottom-[20%] h-52 w-52 rounded-full bg-fuchsia-500/25 blur-3xl transition-transform duration-200 ease-out"
          style={{ ...layer(20, -40), animation: "m3dpd-float 11s ease-in-out infinite reverse" }}
        />

        {/* mid panels */}
        <div
          className="absolute left-[18%] top-[30%] h-28 w-44 rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-transform duration-200 ease-out"
          style={{ ...layer(34, 30) }}
        />
        <div
          className="absolute right-[16%] top-[26%] h-36 w-36 rotate-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-2xl backdrop-blur-md transition-transform duration-200 ease-out"
          style={{ ...layer(46, 60) }}
        />
        <div
          className="absolute bottom-[22%] left-[40%] h-24 w-24 -rotate-6 rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-transform duration-200 ease-out"
          style={{ ...layer(58, 90) }}
        />
      </div>

      {/* foreground copy (closest layer) */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-start justify-center px-8 transition-transform duration-200 ease-out"
        style={layer(8, 0)}
      >
        <Badge
          variant="outline"
          className="mb-7 border-white/20 bg-white/5 text-white/80 backdrop-blur-sm"
        >
          <Layers className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Parallax depth" : "パララックス・デプス"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Move the
              <br />
              mouse,
              <br />
              <span className="text-white/40">feel the depth.</span>
            </>
          ) : (
            <>
              動かすほどに、
              <br />
              <span className="text-white/40">奥行きが立ち上がる。</span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-md text-pretty text-base text-white/55 sm:text-lg">
          {en
            ? "Layered planes respond to your pointer at different depths — pure CSS 3D, no libraries."
            : "ポインタに応じて各レイヤーが別々の深度で反応する。ライブラリなしの純粋なCSS 3D。"}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            {en ? "Explore" : "体験する"}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Docs" : "ドキュメント"}
          </Button>
        </div>
      </div>
    </section>
  );
}
