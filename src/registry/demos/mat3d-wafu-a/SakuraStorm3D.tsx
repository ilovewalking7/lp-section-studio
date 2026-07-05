import { useEffect, useRef } from "react";
import { Flower2 } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "桜吹雪3D",
  category: "3Dアニメ",
  description:
    "奥行き(z)で大きさ・速度・不透明度が変わる桜の花びらが、夕暮れの空に舞い散るキャンバス全幅ヒーロー。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "wafu", "japanese", "animation"],
  principle:
    "散りゆく桜の儚さと余白の静けさが、上質で記憶に残る情緒を生む。",
};

type Petal = {
  x: number;
  y: number;
  z: number;
  rot: number;
  vr: number;
  sway: number;
  phase: number;
  hue: number;
};

export default function SakuraStorm3D() {
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

    const HUES = [344, 350, 338, 355];
    const petals: Petal[] = Array.from({ length: 70 }, () => {
      const z = 0.2 + Math.random() * 0.8;
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        sway: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      w = Math.max(parent?.clientWidth || 800, 1);
      h = Math.max(parent?.clientHeight || 600, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const drawPetal = (
      cx: number,
      cy: number,
      size: number,
      rot: number,
      hue: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(1, 0.62);
      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, `hsla(${hue}, 80%, 88%, ${alpha})`);
      grad.addColorStop(1, `hsla(${hue}, 72%, 74%, ${alpha})`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.9, -size * 0.6, size * 0.7, size * 0.7, 0, size);
      ctx.bezierCurveTo(-size * 0.7, size * 0.7, -size * 0.9, -size * 0.6, 0, -size);
      ctx.fill();
      // notch
      ctx.fillStyle = `hsla(${hue}, 70%, 96%, ${alpha * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(0, size * 0.55, size * 0.18, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = (t: number) => {
      // dusk sky
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#2a2342");
      sky.addColorStop(0.5, "#5b3b59");
      sky.addColorStop(1, "#b76a6a");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const sorted = [...petals].sort((a, b) => a.z - b.z);
      for (const pe of sorted) {
        const fall = (pe.y + t * (0.04 + pe.z * 0.1)) % 1.15;
        const cy = (fall - 0.075) * h;
        const swayX = Math.sin(t * pe.sway + pe.phase) * 0.06 * pe.z;
        const cx = ((pe.x + swayX + 1) % 1) * w;
        const size = 5 + pe.z * 16;
        const alpha = 0.35 + pe.z * 0.55;
        drawPetal(cx, cy, size, pe.rot + t * pe.vr * 8, pe.hue, alpha);
      }

      // soft foreground haze
      const haze = ctx.createLinearGradient(0, h * 0.6, 0, h);
      haze.addColorStop(0, "rgba(183,106,106,0)");
      haze.addColorStop(1, "rgba(120,60,72,0.45)");
      ctx.fillStyle = haze;
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
      draw(3.2);
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
    <section className="relative h-[600px] w-full overflow-hidden bg-[#2a2342] text-[#fbeef0]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_40%,transparent,rgba(42,35,66,0.35))]" />
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 border-[#fbeef0]/25 bg-[#2a2342]/40 text-[#fbeef0]/85 backdrop-blur-sm"
        >
          <Flower2 className="mr-1.5 h-3.5 w-3.5" />
          {en ? "Cherry Blossom Storm" : "桜吹雪"}
        </Badge>
        <h1 className="text-balance text-5xl font-semibold leading-[1.06] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Petals fall,
              <br />
              <span className="text-[#f6c0c8]">depth and all.</span>
            </>
          ) : (
            <>
              花は散り、
              <br />
              <span className="text-[#f6c0c8]">奥行きを舞う。</span>
            </>
          )}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-[#fbeef0]/70 sm:text-lg">
          {en
            ? "Each petal carries a depth — near ones large and slow, far ones faint and quick. Calm, on canvas."
            : "花びらごとに奥行きがある。手前は大きくゆっくり、奥は淡く速く。静かにキャンバスで。"}
        </p>
      </div>
    </section>
  );
}
