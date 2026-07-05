import { useRef, useState, type MouseEvent } from "react";
import { Gem } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チルトカード",
  category: "インタラクション",
  description: "ポインタ位置で3D傾斜する立体的なカード。",
  align: "center",
  isNew: true,
  tags: ["animation", "micro-interaction", "3d"],
  principle:
    "perspective による傾きと光沢で奥行きが生まれ、触れたくなる質感を演出。離すと滑らかに戻り破綻しない。",
};

const MAX_TILT = 12;

export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 2 * MAX_TILT,
      ry: (px - 0.5) * 2 * MAX_TILT,
    });
    setGlare({ x: px * 100, y: py * 100 });
  };

  const reset = () => {
    setHover(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        className="relative h-56 w-80 select-none overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/80 via-primary to-primary/60 p-6 text-primary-foreground shadow-xl transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hover ? 1.04 : 1})`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: hover ? 1 : 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45), transparent 55%)`,
          }}
        />
        <div
          className="relative flex h-full flex-col justify-between"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center justify-between">
            <Gem className="size-7" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-80">
              Platinum
            </span>
          </div>
          <div>
            <div className="font-mono text-lg tracking-[0.2em]">
              4242 •••• •••• 9001
            </div>
            <div className="mt-2 text-sm font-medium opacity-90">
              CLAUDE MEMBER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
