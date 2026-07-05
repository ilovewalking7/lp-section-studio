import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メタボール・ブロブ",
  category: "3Dアニメ",
  description:
    "放射グラデを screen 合成で重ね、液体金属のように流れ続ける虹色のブロブ。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "canvas", "materials", "animation"],
};

export default function MetaballBlob() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      w = canvas.width = parent?.clientWidth || 800;
      h = canvas.height = parent?.clientHeight || 400;
    };
    resize();

    // 各メタボール: 中心の軌道パラメータ + 色
    type Ball = {
      ax: number; // 振幅
      ay: number;
      sx: number; // 速度
      sy: number;
      px: number; // 位相
      py: number;
      r: number; // 半径係数
      color: [number, number, number];
    };
    const balls: Ball[] = [
      { ax: 0.18, ay: 0.16, sx: 0.7, sy: 0.5, px: 0, py: 1.2, r: 0.5, color: [99, 102, 241] },
      { ax: 0.22, ay: 0.2, sx: 0.5, sy: 0.8, px: 2.1, py: 0.4, r: 0.42, color: [56, 189, 248] },
      { ax: 0.16, ay: 0.22, sx: 0.9, sy: 0.6, px: 4.0, py: 3.1, r: 0.46, color: [236, 72, 153] },
      { ax: 0.2, ay: 0.14, sx: 0.6, sy: 1.0, px: 1.0, py: 5.0, r: 0.38, color: [16, 185, 129] },
      { ax: 0.13, ay: 0.18, sx: 1.1, sy: 0.45, px: 3.4, py: 2.0, r: 0.34, color: [250, 204, 21] },
    ];

    let t = 0;

    const draw = () => {
      // 暗い下地
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#04050d";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const base = Math.min(w, h);

      // メタボールを screen 合成で重ねる → 滲んで融合する液体感
      ctx.globalCompositeOperation = "screen";
      for (const b of balls) {
        const bx = cx + Math.sin(t * b.sx + b.px) * b.ax * base;
        const by = cy + Math.cos(t * b.sy + b.py) * b.ay * base;
        const rr = base * (b.r + Math.sin(t * 0.6 + b.px) * 0.06);
        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, rr);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.9)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${bl},0.35)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      // 中心のスペキュラ・ハイライト（金属の艶）
      ctx.globalCompositeOperation = "screen";
      const hx = cx - base * 0.08;
      const hy = cy - base * 0.1;
      const spec = ctx.createRadialGradient(hx, hy, 0, hx, hy, base * 0.18);
      spec.addColorStop(0, "rgba(255,255,255,0.5)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(hx, hy, base * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // 縁を締めるビネット
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(
        cx,
        cy,
        base * 0.3,
        cx,
        cy,
        base * 0.75
      );
      vig.addColorStop(0, "rgba(4,5,13,0)");
      vig.addColorStop(1, "rgba(4,5,13,0.9)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (!reduce) t += 0.01;
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#04050d] py-24 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-[0.2em] text-white/70 backdrop-blur-sm">
          {en ? "LIQUID METAL" : "リキッド・メタル"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Forever in motion." : "絶えず、流れる。"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-white/55">
          {en
            ? "Iridescent metaballs blended with screen compositing — flowing liquid metal, slowly morphing."
            : "screen 合成で溶け合う虹色のメタボール。ゆっくり姿を変える液体金属です。"}
        </p>
      </div>
    </section>
  );
}
