import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "波線2",
  category: "背景アニメ",
  description: "正弦波の線が位相をずらして流れる、rAF駆動のライム調背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "lines"],
};

export default function WavyLines2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
    };
    resize();

    const lines = 14;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let l = 0; l < lines; l++) {
        const yBase = (h / (lines + 1)) * (l + 1);
        const hue = 80 + l * 6;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y =
            yBase +
            Math.sin(x * 0.008 + t + l * 0.5) * 26 +
            Math.sin(x * 0.02 + t * 0.6) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue}, 85%, 60%, 0.4)`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      if (!reduce) t += 0.02;
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f04] py-28 text-white">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0f04]/60 via-transparent to-[#0a0f04]/60" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-1 text-xs font-medium tracking-wide text-lime-200/80">
          Wavy Lines
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Flowing sine-wave lines" : "流れる、正弦波のライン"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-lime-50/70">
          {en
            ? "Phase-shifted waves overlap, weaving an ever-changing mesh of light."
            : "位相をずらした波線が重なり合い、絶えず形を変える光の編み目を描きます。"}
        </p>
      </div>
    </section>
  );
}
