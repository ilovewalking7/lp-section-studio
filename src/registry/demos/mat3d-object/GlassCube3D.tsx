import { useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ガラスキューブ 3D",
  category: "3Dアニメ",
  description:
    "6面のネオン・ガラスキューブ。自動回転し、ドラッグで自由にスピンできる。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "object", "materials", "animation"],
};

type Face = {
  transform: string;
  from: string;
  to: string;
  edge: string;
};

const SIZE = 168;
const HALF = SIZE / 2;

const FACES: Face[] = [
  {
    transform: `translateZ(${HALF}px)`,
    from: "rgba(56,189,248,0.18)",
    to: "rgba(14,165,233,0.05)",
    edge: "56,189,248",
  },
  {
    transform: `rotateY(180deg) translateZ(${HALF}px)`,
    from: "rgba(167,139,250,0.18)",
    to: "rgba(139,92,246,0.05)",
    edge: "167,139,250",
  },
  {
    transform: `rotateY(90deg) translateZ(${HALF}px)`,
    from: "rgba(244,114,182,0.18)",
    to: "rgba(236,72,153,0.05)",
    edge: "244,114,182",
  },
  {
    transform: `rotateY(-90deg) translateZ(${HALF}px)`,
    from: "rgba(45,212,191,0.18)",
    to: "rgba(20,184,166,0.05)",
    edge: "45,212,191",
  },
  {
    transform: `rotateX(90deg) translateZ(${HALF}px)`,
    from: "rgba(125,211,252,0.2)",
    to: "rgba(56,189,248,0.04)",
    edge: "125,211,252",
  },
  {
    transform: `rotateX(-90deg) translateZ(${HALF}px)`,
    from: "rgba(196,181,253,0.2)",
    to: "rgba(167,139,250,0.04)",
    edge: "196,181,253",
  },
];

export default function GlassCube3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const rot = useRef({ x: -22, y: -28 });
  const drag = useRef<{ active: boolean; px: number; py: number }>({
    active: false,
    px: 0,
    py: 0,
  });
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!drag.current.active && !reduce) {
        rot.current.y += dt * 0.018;
        rot.current.x += dt * 0.007;
      }
      const el = cubeRef.current;
      if (el) {
        el.style.transform = `translateZ(-60px) rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, px: e.clientX, py: e.clientY };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.px;
    const dy = e.clientY - drag.current.py;
    drag.current.px = e.clientX;
    drag.current.py = e.clientY;
    rot.current.y += dx * 0.5;
    rot.current.x -= dy * 0.5;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#0b1220_0%,#05070d_70%)] py-12">
      <div
        className="relative cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ perspective: "900px", width: 280, height: 260 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="img"
        aria-label={en ? "Interactive glass cube" : "操作できるガラスキューブ"}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: SIZE,
            height: SIZE,
            marginLeft: -HALF,
            marginTop: -HALF,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={cubeRef}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {FACES.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-[14px]"
                style={{
                  transform: f.transform,
                  background: `linear-gradient(135deg, ${f.from}, ${f.to})`,
                  boxShadow: `inset 0 0 0 1px rgba(${f.edge},0.55), inset 0 0 28px rgba(${f.edge},0.22), 0 0 26px rgba(${f.edge},0.14)`,
                  backdropFilter: "blur(2px)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-[14px] opacity-70"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 42%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs font-medium tracking-wide text-slate-400">
        {dragging
          ? en
            ? "Spinning…"
            : "回転中…"
          : en
            ? "Drag to spin"
            : "ドラッグで回転"}
      </p>
    </div>
  );
}
