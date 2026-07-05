import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3Dパーティクル・フィールド",
  category: "3Dアニメ",
  description:
    "奥行きを持つ粒子群を回転・パララックスさせ、近い粒子を細線で結ぶプレクサス。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "canvas", "materials", "animation"],
};

export default function ParticleField3D() {
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
    const mouse = { x: 0, y: 0, active: false };

    type P = { x: number; y: number; z: number };
    let pts: P[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = canvas.width = parent?.clientWidth || 800;
      h = canvas.height = parent?.clientHeight || 400;
      const count = Math.max(40, Math.min(120, Math.floor(w / 9)));
      pts = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 2, // -1..1
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
      }));
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / (r.width || 1) - 0.5; // -0.5..0.5
      mouse.y = (e.clientY - r.top) / (r.height || 1) - 0.5;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    let angleY = 0;
    let angleX = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const R = Math.min(w, h) * 0.46;
      const f = 3;

      // 自動回転 + マウスパララックス
      if (!reduce) angleY += 0.0025;
      const targetX = mouse.active ? mouse.y * 0.6 : 0;
      const targetY = mouse.active ? mouse.x * 0.6 : 0;
      angleX += (targetX - angleX) * 0.04;
      const yaw = angleY + (targetY - 0) * 0.04;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      type PP = { sx: number; sy: number; scale: number; depth: number };
      const proj: PP[] = [];
      for (const p of pts) {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y;
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;
        const scale = f / (f + z); // 透視除算
        proj.push({
          sx: cx + x * R * scale,
          sy: cy + y * R * scale,
          scale,
          depth: z,
        });
      }

      // プレクサス（近い粒子を結ぶ）
      const LINK = Math.min(w, h) * 0.22;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            const front =
              1 - (proj[i].depth + proj[j].depth + 2) / 4; // 1=手前
            const a = (1 - dist / LINK) * (0.05 + front * 0.28);
            ctx.strokeStyle = `rgba(148,163,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      // 粒子（奥行き → 大きさ・不透明度）
      for (const p of proj) {
        const front = 1 - (p.depth + 1) / 2; // 1=手前 0=奥
        const r = (0.6 + front * 2.4) * p.scale;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.4, r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,210,254,${0.18 + front * 0.75})`;
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
    <section className="relative w-full overflow-hidden bg-[#05060f] py-24 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,#05060f_90%)]" />
      <div className="pointer-events-none relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-indigo-400/20 bg-indigo-400/5 px-4 py-1 text-xs font-medium tracking-[0.2em] text-indigo-200/80">
          {en ? "PARTICLE FIELD" : "パーティクル・フィールド"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Depth you can feel." : "奥行きを、感じる。"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-indigo-50/60">
          {en
            ? "A 3D particle cloud — depth drives size and opacity; the cursor adds parallax."
            : "奥行きが大きさと不透明度を決め、カーソルがパララックスを加える3D粒子雲です。"}
        </p>
      </div>
    </section>
  );
}
