import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プラズマ",
  category: "背景アニメ",
  description: "うねるプラズマ模様が脈動する、マゼンタ×ブルーのレトロデモ背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "plasma"],
};

export default function Plasma() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const RES = 64;
    let raf = 0;
    let t = 0;
    canvas.width = RES;
    canvas.height = RES;
    const img = ctx.createImageData(RES, RES);

    const render = () => {
      const d = img.data;
      for (let y = 0; y < RES; y++) {
        for (let x = 0; x < RES; x++) {
          const v =
            Math.sin(x * 0.12 + t) +
            Math.sin(y * 0.14 + t * 1.1) +
            Math.sin((x + y) * 0.08 + t * 0.7) +
            Math.sin(Math.sqrt(x * x + y * y) * 0.12 - t);
          const idx = (y * RES + x) * 4;
          d[idx] = 130 + Math.sin(v * Math.PI) * 110;
          d[idx + 1] = 30 + Math.sin(v * Math.PI + 2) * 60;
          d[idx + 2] = 150 + Math.cos(v * Math.PI) * 100;
          d[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      if (!reduce) t += 0.05;
      raf = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(raf);
  }, []);

  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0414] py-28 text-white">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45 blur-[2px] [image-rendering:auto]"
        style={{ filter: "saturate(1.2)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0a0414]/40" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 px-4 py-1 text-xs font-medium tracking-wide text-fuchsia-200/80">
          Plasma
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A pulsing plasma field" : "脈動する、プラズマフィールド"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-fuchsia-50/70">
          {en
            ? "Organic patterns from layered sine waves shimmer in true demoscene style."
            : "正弦波の重ね合わせが生む有機的な模様が、デモシーン風に揺らめきます。"}
        </p>
      </div>
    </section>
  );
}
