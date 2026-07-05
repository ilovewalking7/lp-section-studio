import { useEffect, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "波紋グリッド2",
  category: "背景アニメ",
  description: "マウスを追って格子のドットが波紋状に拡大する、琥珀色の背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "ripple"],
};

export default function RippleGrid2() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#16100a] py-28 text-white"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      <style>{`
        @keyframes bg2-ripple-pulse {
          0%,100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-ripple-dots { animation: none !important; }
        }
      `}</style>
      <div
        className="bg2-ripple-dots pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(251,191,36,0.6) 1.4px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.15) 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.15) 55%, transparent 80%)",
          animation: "bg2-ripple-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(180,120,40,0.25) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-1 text-xs font-medium tracking-wide text-amber-200/80">
          Ripple Grid
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Amber ripples that follow your touch" : "指先で広がる琥珀の波紋"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-amber-50/70">
          {en
            ? "The grid surfaces only around the cursor, tracing ripples that follow along."
            : "カーソルの周囲だけ格子が浮かび上がり、追従する波紋を描きます。"}
        </p>
      </div>
    </section>
  );
}
