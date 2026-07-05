import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "星座（線で繋ぐ点）",
  category: "背景アニメ",
  description: "漂う点が近づくと線で結ばれ、マウスにも反応する星座ネットワーク背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "constellation", "network"],
};

export default function Constellation() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
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
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
      const count = Math.min(80, Math.floor(w / 16));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        if (Math.sqrt(dxm * dxm + dym * dym) < 140) {
          p.x += dxm * 0.012;
          p.y += dym * 0.012;
        }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(125,211,252,${0.5 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(186,230,253,0.9)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#040814] py-28 text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#040814_85%)]" />
      <div className="pointer-events-none relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1 text-xs font-medium tracking-wide text-sky-200/80">
          Constellation
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A constellation network, linked by lines"
            : "線で繋がる、星座ネットワーク"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-sky-50/70">
          {en
            ? "Nearby points connect with lines and shift their shape in response to the cursor."
            : "近づいた点同士が線で結ばれ、カーソルに反応して形を変えていきます。"}
        </p>
      </div>
    </section>
  );
}
