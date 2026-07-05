import { useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "視差ホバーカード",
  category: "Awwwards",
  description: "カーソルに応じて層ごとに視差移動する、奥行きのあるパララックスカード。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

function ParallaxCard({ title, sub }: { title: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="plx-card relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800 to-neutral-950"
      style={{ "--px": 0, "--py": 0 } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-amber-400/25 blur-2xl"
        style={{ transform: "translate(calc(var(--px)*60px), calc(var(--py)*60px))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute h-24 w-24 rounded-full border border-neutral-600"
        style={{ transform: "translate(calc(var(--px)*30px), calc(var(--py)*30px))" }}
      />
      <div
        className="relative text-center"
        style={{ transform: "translate(calc(var(--px)*-18px), calc(var(--py)*-18px))" }}
      >
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-50">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-400">{sub}</p>
      </div>
      <style>{`.plx-card > * { transition: transform .25s ease-out; }
        @media (prefers-reduced-motion: reduce){ .plx-card > * { transition: none; } }`}</style>
    </div>
  );
}

export default function ParallaxHoverCards() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const data = [
    { ja: "深度", en: "Depth", sub: "depth" },
    { ja: "層", en: "Layer", sub: "layer" },
    { ja: "視差", en: "Parallax", sub: "parallax" },
  ];
  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
        {data.map((d) => (
          <ParallaxCard key={d.sub} title={en ? d.en : d.ja} sub={d.sub} />
        ))}
      </div>
    </section>
  );
}
