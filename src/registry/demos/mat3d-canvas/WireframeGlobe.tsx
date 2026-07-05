import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ワイヤーフレーム地球儀",
  category: "3Dアニメ",
  description:
    "緯度・経度の点を3D回転し、透視投影で2Dに描く自動回転のワイヤー球体。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "canvas", "materials", "animation"],
};

export default function WireframeGlobe() {
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

    // --- 球面上の格子点（緯度×経度）を生成 ---
    const LAT = 18; // 緯線の本数
    const LON = 28; // 経線の本数
    type V = { x: number; y: number; z: number };
    const grid: V[][] = [];
    for (let i = 0; i <= LAT; i++) {
      const theta = (i / LAT) * Math.PI; // 0..π（極から極）
      const row: V[] = [];
      for (let j = 0; j <= LON; j++) {
        const phi = (j / LON) * Math.PI * 2; // 0..2π
        row.push({
          x: Math.sin(theta) * Math.cos(phi),
          y: Math.cos(theta),
          z: Math.sin(theta) * Math.sin(phi),
        });
      }
      grid.push(row);
    }

    let angleY = 0;
    const angleX = -0.42; // わずかに傾ける

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const R = Math.min(w, h) * 0.34; // 球の半径（px）
      const f = 3.2; // 焦点距離（透視の強さ）

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 投影済み座標とスケールをキャッシュ
      type PP = { sx: number; sy: number; depth: number; scale: number };
      const proj: PP[][] = [];
      for (let i = 0; i < grid.length; i++) {
        const prow: PP[] = [];
        for (let j = 0; j < grid[i].length; j++) {
          const p = grid[i][j];
          // Y回転
          let x = p.x * cosY - p.z * sinY;
          let z = p.x * sinY + p.z * cosY;
          let y = p.y;
          // X回転
          const y2 = y * cosX - z * sinX;
          const z2 = y * sinX + z * cosX;
          y = y2;
          z = z2;
          const scale = f / (f + z); // 透視除算
          prow.push({
            sx: cx + x * R * scale,
            sy: cy + y * R * scale,
            scale,
            depth: z, // -1(手前) .. 1(奥)
          });
        }
        proj.push(prow);
      }

      const edge = (a: PP, b: PP) => {
        const d = (a.depth + b.depth) * 0.5;
        const front = 1 - (d + 1) / 2; // 1=手前 0=奥
        const alpha = 0.08 + front * 0.5;
        ctx.strokeStyle = `rgba(125,211,252,${alpha})`;
        ctx.lineWidth = 0.6 + front * 0.9;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      };

      // 緯線
      for (let i = 1; i < proj.length - 1; i++) {
        for (let j = 0; j < proj[i].length - 1; j++) {
          edge(proj[i][j], proj[i][j + 1]);
        }
      }
      // 経線
      for (let j = 0; j < proj[0].length - 1; j++) {
        for (let i = 0; i < proj.length - 1; i++) {
          edge(proj[i][j], proj[i + 1][j]);
        }
      }

      // 交点（手前ほど明るく大きく）
      for (let i = 1; i < proj.length - 1; i++) {
        for (let j = 0; j < proj[i].length - 1; j++) {
          const p = proj[i][j];
          const front = 1 - (p.depth + 1) / 2;
          if (front < 0.42) continue;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 0.6 + front * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186,230,253,${0.25 + front * 0.7})`;
          ctx.fill();
        }
      }

      // 中心グロー
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      g.addColorStop(0, "rgba(56,189,248,0.16)");
      g.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();

      if (!reduce) angleY += 0.0045;
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
    <section className="relative w-full overflow-hidden bg-[#03060f] py-24 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#03060f_92%)]" />
      <div className="pointer-events-none relative mx-auto flex max-w-5xl flex-col items-start gap-4 px-6">
        <span className="inline-block rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1 text-xs font-medium tracking-[0.2em] text-sky-200/80">
          {en ? "GLOBAL NETWORK" : "グローバル・ネットワーク"}
        </span>
        <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          {en ? "Span every meridian." : "あらゆる経線をつなぐ。"}
        </h1>
        <p className="max-w-sm text-base text-sky-50/60">
          {en
            ? "A wireframe sphere built from latitude and longitude, rotated in 3D and projected by hand."
            : "緯度・経度から組んだワイヤー球を、自前の透視投影で3D回転させています。"}
        </p>
      </div>
    </section>
  );
}
