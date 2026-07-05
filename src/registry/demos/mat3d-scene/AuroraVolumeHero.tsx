import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "オーロラ・ボリュームヒーロー",
  category: "3Dアニメ",
  description:
    "奥行きでスケールと不透明度が変わる巨大なぼかしブロブが漂う、体積感のある暗色ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "hero", "materials", "animation"],
  principle:
    "焦点の合わない大きな色面と前後のパララックスが、画面に物理的な奥行きと高級感を生む。",
};

type Blob = {
  x: number;
  y: number;
  z: number;
  r: number;
  hue: number;
  drift: number;
  phase: number;
};

const PALETTE = [266, 198, 320, 168, 232];

export default function AuroraVolumeHero() {
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

    let w = 0;
    let h = 0;
    const dpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      2
    );

    const blobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.25 + Math.random() * 0.75,
      r: 0.32 + Math.random() * 0.3,
      hue: PALETTE[i % PALETTE.length],
      drift: 0.12 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      w = Math.max(parent?.clientWidth || 0, 1);
      h = Math.max(parent?.clientHeight || 0, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#05060c";
      ctx.fillRect(0, 0, w, h);

      const sorted = [...blobs].sort((a, b) => a.z - b.z);
      ctx.globalCompositeOperation = "lighter";
      for (const b of sorted) {
        const ox = Math.cos(t * b.drift + b.phase) * 0.08;
        const oy = Math.sin(t * b.drift * 0.8 + b.phase) * 0.07;
        const cx = (b.x + ox) * w;
        const cy = (b.y + oy) * h;
        const radius = b.r * Math.min(w, h) * (0.6 + b.z * 0.9);
        const alpha = 0.1 + b.z * 0.32;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `hsla(${b.hue}, 90%, 62%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 85%, 48%, ${alpha * 0.5})`);
        grad.addColorStop(1, "hsla(0, 0%, 0%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // gentle grain-free vignette for depth
      const vg = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.3,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.8
      );
      vg.addColorStop(0, "rgba(5,6,12,0)");
      vg.addColorStop(1, "rgba(2,2,6,0.7)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    };

    let raf = 0;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      draw(2.4);
    } else {
      raf = requestAnimationFrame(loop);
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-[#05060c] text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060c] via-transparent to-[#05060c]/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 border-white/20 bg-white/5 text-white/80 backdrop-blur-sm"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Volumetric · Materials" : "ボリューメトリック・Materials"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Light that has
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
                volume
              </span>
            </>
          ) : (
            <>
              体積を持つ、
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
                光のヒーロー
              </span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          {en
            ? "Drifting color fields layered in depth — a calm, premium atmosphere rendered entirely on canvas."
            : "奥行きに重なる色の面がゆっくり漂う。すべてキャンバスだけで描く、静かでプレミアムな空気感。"}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            {en ? "Start free" : "無料で始める"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {en ? "Watch film" : "ムービーを見る"}
          </Button>
        </div>
      </div>
    </section>
  );
}
