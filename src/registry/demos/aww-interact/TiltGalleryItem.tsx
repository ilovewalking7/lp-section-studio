import { useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チルト・ギャラリー",
  category: "Awwwards",
  description: "カーソル位置で3D傾斜し、光沢が走る立体的なチルトギャラリー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const items = [
  { ja: "螺旋", en: "Spiral", g: "from-indigo-500 to-purple-700" },
  { ja: "波紋", en: "Ripple", g: "from-teal-400 to-cyan-700" },
  { ja: "結晶", en: "Crystal", g: "from-rose-400 to-amber-600" },
];

function TiltItem({ t, g }: { t: string; g: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(800px) rotateY(${(px - 0.5) * 16}deg) rotateX(${(0.5 - py) * 16}deg) scale(1.04)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.35), transparent 55%)`;
    }
  }

  function reset() {
    if (ref.current)
      ref.current.style.transform =
        "perspective(800px) rotateY(0) rotateX(0) scale(1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`relative flex aspect-square items-end overflow-hidden rounded-2xl bg-gradient-to-br ${g} p-6 transition-transform duration-200 ease-out will-change-transform`}
    >
      <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />
      <h3 className="relative text-2xl font-semibold tracking-tight text-white drop-shadow">
        {t}
      </h3>
    </div>
  );
}

export default function TiltGalleryItem() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
        {items.map((it) => (
          <TiltItem key={it.en} t={en ? it.en : it.ja} g={it.g} />
        ))}
      </div>
    </section>
  );
}
