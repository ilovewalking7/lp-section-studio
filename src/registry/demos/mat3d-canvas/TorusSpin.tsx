import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転トーラス（ドット）",
  category: "3Dアニメ",
  description:
    "パラメトリックなトーラスの点群を3D回転・透視投影し、奥行きで陰影づけする発光リング。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "canvas", "materials", "animation"],
};

export default function TorusSpin() {
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

    // パラメトリックなトーラス点群
    const RMAJOR = 1.0; // 主半径
    const RMINOR = 0.4; // 管半径
    const U = 70; // 主周方向
    const V = 22; // 管周方向
    type V3 = { x: number; y: number; z: number };
    const pts: V3[] = [];
    for (let i = 0; i < U; i++) {
      const u = (i / U) * Math.PI * 2;
      for (let j = 0; j < V; j++) {
        const v = (j / V) * Math.PI * 2;
        const cu = Math.cos(u);
        const su = Math.sin(u);
        const cv = Math.cos(v);
        const sv = Math.sin(v);
        pts.push({
          x: (RMAJOR + RMINOR * cv) * cu,
          y: RMINOR * sv,
          z: (RMAJOR + RMINOR * cv) * su,
        });
      }
    }

    let ay = 0;
    let ax = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#06040d";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const R = Math.min(w, h) * 0.3;
      const f = 4;

      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      type PP = { sx: number; sy: number; scale: number; depth: number };
      const proj: PP[] = [];
      for (const p of pts) {
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
        proj.push({
          sx: cx + x * R * scale,
          sy: cy + y * R * scale,
          scale,
          depth: z,
        });
      }

      // 奥のドットから先に描く（ペインターズ・アルゴリズム）
      proj.sort((a, b) => b.depth - a.depth);

      for (const p of proj) {
        const front = 1 - (p.depth + 1.4) / 2.8; // 1=手前 0=奥（おおよそ）
        const ff = Math.max(0, Math.min(1, front));
        const r = (0.7 + ff * 2.6) * p.scale;
        // 奥=紫, 手前=ピンク〜白
        const red = Math.round(120 + ff * 135);
        const grn = Math.round(70 + ff * 90);
        const blu = Math.round(200 + ff * 55);
        // 発光
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red},${grn},${blu},${0.15 + ff * 0.8})`;
        ctx.shadowColor = `rgba(${red},${grn},${blu},0.6)`;
        ctx.shadowBlur = ff * 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 中心グロー
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      g.addColorStop(0, "rgba(168,85,247,0.12)");
      g.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fill();

      if (!reduce) {
        ay += 0.01;
        ax = 0.5 + Math.sin(ay * 0.5) * 0.25; // 軸を少し揺らす
      } else {
        ax = 0.5;
      }
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
    <section className="relative w-full overflow-hidden bg-[#06040d] py-24 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#06040d_92%)]" />
      <div className="pointer-events-none relative mx-auto flex max-w-5xl flex-col items-end gap-4 px-6 text-right">
        <span className="inline-block rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 px-4 py-1 text-xs font-medium tracking-[0.2em] text-fuchsia-200/80">
          {en ? "TORUS" : "トーラス"}
        </span>
        <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          {en ? "A ring in orbit." : "周回する、リング。"}
        </h1>
        <p className="max-w-sm text-base text-fuchsia-50/60">
          {en
            ? "A donut of dots — parametric torus points rotated in 3D and depth-scaled into a glowing ring."
            : "パラメトリックなトーラスの点群を3D回転させ、奥行きでスケールした発光リングです。"}
        </p>
      </div>
    </section>
  );
}
