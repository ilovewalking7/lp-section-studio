import { useEffect, useRef } from "react";
import { Rocket, ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "スターフィールド・ワープヒーロー",
  category: "3Dアニメ",
  description:
    "星が手前へ飛び、速いほど線状に伸びるキャンバスのワープ航行。酔わない穏やかな速度のヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "hero", "materials", "animation"],
  principle:
    "視界中心から放射する流れは前進と加速の感覚を直感的に与え、行動喚起の高揚感を後押しする。",
};

type Star = { x: number; y: number; z: number; pz: number };

export default function StarfieldWarpHero() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      2
    );
    let w = 0;
    let h = 0;
    const DEPTH = 1000;
    const COUNT = 320;
    const speed = reduce ? 1.6 : 6;

    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const z = Math.random() * DEPTH;
      return {
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z,
        pz: z,
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      w = Math.max(parent?.clientWidth || 0, 1);
      h = Math.max(parent?.clientHeight || 0, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      const cx = w / 2;
      const cy = h / 2;
      // motion trail backdrop
      ctx.fillStyle = "rgba(4,5,12,0.4)";
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 1) {
          s.z = DEPTH;
          s.pz = DEPTH;
          s.x = (Math.random() - 0.5) * 2000;
          s.y = (Math.random() - 0.5) * 2000;
        }
        const k = 280;
        const sx = cx + (s.x / s.z) * k;
        const sy = cy + (s.y / s.z) * k;
        const px = cx + (s.x / s.pz) * k;
        const py = cy + (s.y / s.pz) * k;

        if (sx < 0 || sx > w || sy < 0 || sy > h) continue;

        const depth = 1 - s.z / DEPTH; // 0 far .. 1 near
        const size = depth * 2.2 + 0.3;
        const alpha = 0.25 + depth * 0.75;

        ctx.strokeStyle = `rgba(${200 + depth * 55}, ${210 + depth * 45}, 255, ${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    // paint solid base once so trails read correctly
    ctx.fillStyle = "#04050c";
    ctx.fillRect(0, 0, w, h);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => {
        resize();
        ctx.fillStyle = "#04050c";
        ctx.fillRect(0, 0, w, h);
      });
      ro.observe(canvas.parentElement);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-[#04050c] text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {/* center focus + edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(4,5,12,0.85)_85%)]" />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 border-sky-400/30 bg-sky-500/10 text-sky-100 backdrop-blur-sm"
        >
          <Rocket className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Warp speed" : "ワープ速度"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Go faster than
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-indigo-200 to-white bg-clip-text text-transparent">
                light
              </span>
            </>
          ) : (
            <>
              光より速く、
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-indigo-200 to-white bg-clip-text text-transparent">
                駆け抜ける
              </span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          {en
            ? "A canvas starfield streaking toward you at a calm, never-nauseating pace."
            : "キャンバスの星々が穏やかな速度で手前へ流れる、酔わないワープ航行。"}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            {en ? "Engage" : "出発する"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "See pricing" : "料金を見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
