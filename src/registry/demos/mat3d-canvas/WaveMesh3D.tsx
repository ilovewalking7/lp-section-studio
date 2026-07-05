import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "サイン波メッシュ地形",
  category: "3Dアニメ",
  description:
    "サイン波で起伏する格子点を透視投影し、高さと奥行きで陰影をつけた地形メッシュ。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "canvas", "materials", "animation"],
};

export default function WaveMesh3D() {
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

    const COLS = 36;
    const ROWS = 28;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#04060f";
      ctx.fillRect(0, 0, w, h);

      const f = 3.4; // 焦点距離
      const camDrift = reduce ? 0 : Math.sin(t * 0.3) * 0.15; // 緩やかなカメラ揺れ
      const tilt = 0.62; // 見下ろし角

      const project = (
        gx: number,
        gz: number,
        gy: number
      ): { sx: number; sy: number; depth: number } => {
        // ローカル座標（中心原点） + カメラドリフト（X方向）
        let x = gx + camDrift;
        let y = gy;
        let z = gz;
        // X軸回転（見下ろし）
        const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
        const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
        y = y2;
        z = z2 + 2.6; // カメラを後退させて全体を奥へ
        const scale = f / (f + z); // 透視除算（z>0 を保証）
        return {
          sx: w * 0.5 + x * Math.min(w, h) * 0.5 * scale,
          sy: h * 0.52 + y * Math.min(w, h) * 0.5 * scale,
          depth: z,
        };
      };

      // 高さフィールド
      const heightAt = (i: number, j: number) => {
        const gx = (i / (COLS - 1) - 0.5) * 2; // -1..1
        const gz = (j / (ROWS - 1) - 0.5) * 2;
        return (
          Math.sin(gx * 3 + t) * 0.16 +
          Math.cos(gz * 2.5 - t * 0.8) * 0.16 +
          Math.sin((gx + gz) * 2 + t * 0.5) * 0.1
        );
      };

      type Node = { sx: number; sy: number; depth: number; hgt: number };
      const nodes: Node[][] = [];
      for (let j = 0; j < ROWS; j++) {
        const row: Node[] = [];
        for (let i = 0; i < COLS; i++) {
          const gx = (i / (COLS - 1) - 0.5) * 2;
          const gz = (j / (ROWS - 1) - 0.5) * 2;
          const hgt = heightAt(i, j);
          const p = project(gx, gz, -hgt); // 上が +y になるよう反転
          row.push({ sx: p.sx, sy: p.sy, depth: p.depth, hgt });
        }
        nodes.push(row);
      }

      const lineStyle = (a: Node, b: Node) => {
        const hgt = (a.hgt + b.hgt) * 0.5;
        const t01 = (hgt + 0.42) / 0.84; // 0..1（おおよそ）
        const depth = (a.depth + b.depth) * 0.5;
        const fade = Math.max(0, Math.min(1, 1 - (depth - 1.6) / 3)); // 奥ほど薄く
        // 低=青, 高=シアン〜白
        const r = Math.round(40 + t01 * 140);
        const g = Math.round(120 + t01 * 120);
        const bl = Math.round(200 + t01 * 55);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${(0.12 + t01 * 0.45) * fade})`;
        ctx.lineWidth = 0.7;
      };

      // 横線
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS - 1; i++) {
          lineStyle(nodes[j][i], nodes[j][i + 1]);
          ctx.beginPath();
          ctx.moveTo(nodes[j][i].sx, nodes[j][i].sy);
          ctx.lineTo(nodes[j][i + 1].sx, nodes[j][i + 1].sy);
          ctx.stroke();
        }
      }
      // 縦線
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS - 1; j++) {
          lineStyle(nodes[j][i], nodes[j + 1][i]);
          ctx.beginPath();
          ctx.moveTo(nodes[j][i].sx, nodes[j][i].sy);
          ctx.lineTo(nodes[j + 1][i].sx, nodes[j + 1][i].sy);
          ctx.stroke();
        }
      }

      // 上部フェード
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(4,6,15,0.9)");
      grad.addColorStop(0.35, "rgba(4,6,15,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      if (!reduce) t += 0.016;
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
    <section className="relative w-full overflow-hidden bg-[#04060f] py-24 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1 text-xs font-medium tracking-[0.2em] text-cyan-200/80">
          {en ? "WAVE TERRAIN" : "ウェーブ地形"}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A landscape that breathes." : "呼吸する、地形。"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-cyan-50/60">
          {en
            ? "A grid displaced by sine waves, projected in perspective and shaded by height and depth."
            : "サイン波で起伏する格子を透視投影し、高さと奥行きで陰影をつけています。"}
        </p>
      </div>
    </section>
  );
}
