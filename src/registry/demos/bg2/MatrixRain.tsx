import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マトリックス・レイン",
  category: "背景アニメ",
  description: "落下する文字列が滝のように流れる、グリーンのデジタルレイン背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "matrix"],
};

export default function MatrixRain() {
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
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 16;
    const chars = "0123456789ABCDEFｱｲｳｴｵｶｷｸｹｺ<>=*+-".split("");

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
      cols = Math.floor(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -20);
    };
    resize();

    let last = 0;
    const draw = (ts: number) => {
      if (ts - last > 55) {
        last = ts;
        ctx.fillStyle = "rgba(2,10,6,0.18)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < cols; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = "rgba(190,255,210,0.95)";
          ctx.fillText(ch, x, y);
          ctx.fillStyle = "rgba(34,197,94,0.7)";
          ctx.fillText(ch, x, y - fontSize);
          if (y > h && Math.random() > 0.975) drops[i] = 0;
          drops[i] += reduce ? 0 : 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

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
    <section className="relative w-full overflow-hidden bg-[#020a06] py-28 text-white">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020a06_85%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-green-400/20 bg-green-400/5 px-4 py-1 text-xs font-medium tracking-wide text-green-200/80">
          Matrix Rain
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Falling digital rain" : "滴り落ちる、デジタルの雨"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-green-50/70">
          {en
            ? "Countless characters cascade down in green, evoking a hacker-movie world."
            : "無数の文字列が緑の滝となって流れ落ち、ハッカー映画の世界を描きます。"}
        </p>
      </div>
    </section>
  );
}
