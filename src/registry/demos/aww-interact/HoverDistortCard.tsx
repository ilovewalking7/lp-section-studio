import { useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバー歪みカード",
  category: "Awwwards",
  description: "カーソル速度に応じて skew で歪む、有機的なホバー歪みカード。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

function DistortCard({ index, title }: { index: number; title: string }) {
  const ref = useRef<HTMLElement>(null);
  const last = useRef(0);

  function move(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const now = e.clientX;
    const delta = Math.max(-22, Math.min(22, (now - last.current) * 1.4));
    last.current = now;
    el.style.transform = `skewX(${delta}deg) scale(1.02)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "skewX(0deg) scale(1)";
  }

  return (
    <article
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="group relative flex aspect-[3/4] cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 transition-transform duration-300 ease-out will-change-transform"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
        0{index}
      </span>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-50">
        {title}
      </h3>
    </article>
  );
}

export default function HoverDistortCard() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const cards = [
    { ja: "流体", en: "Fluid" },
    { ja: "残響", en: "Echo" },
    { ja: "余白", en: "Space" },
    { ja: "速度", en: "Velocity" },
  ];
  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-5 sm:grid-cols-4">
        {cards.map((c, i) => (
          <DistortCard key={c.en} index={i + 1} title={en ? c.en : c.ja} />
        ))}
      </div>
    </section>
  );
}
