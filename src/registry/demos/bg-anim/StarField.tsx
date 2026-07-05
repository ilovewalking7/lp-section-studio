import { useMemo } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スターフィールド背景",
  category: "背景アニメ",
  description: "瞬く星々と流れ星のヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "stars"],
};

export default function StarField() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: (Math.random() * 100).toFixed(2),
        top: (Math.random() * 100).toFixed(2),
        size: (Math.random() * 1.8 + 0.5).toFixed(2),
        delay: (Math.random() * 4).toFixed(2),
        duration: (1.8 + Math.random() * 2.6).toFixed(2),
      })),
    []
  );
  const shooting = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: (Math.random() * 50).toFixed(2),
        left: (Math.random() * 60).toFixed(2),
        delay: (i * 4 + Math.random() * 3).toFixed(2),
      })),
    []
  );
  return (
    <section className="relative w-full overflow-hidden bg-[#03040a] py-28 text-white">
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes star-shoot {
          0% { transform: translate(0,0) rotate(35deg); opacity: 0; }
          8% { opacity: 1; }
          40% { opacity: 1; }
          100% { transform: translate(420px, 300px) rotate(35deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-star, .sf-shoot { animation: none !important; }
          .sf-shoot { opacity: 0; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s) => (
          <span
            key={s.id}
            className="sf-star absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {shooting.map((s) => (
          <span
            key={`shoot-${s.id}`}
            className="sf-shoot absolute h-px w-[90px]"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              background:
                "linear-gradient(90deg, #fff, rgba(255,255,255,0))",
              boxShadow: "0 0 6px rgba(255,255,255,0.7)",
              animation: `star-shoot 6s ease-in ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Star Field
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A sky full of stars and a single shooting star" : "満天の星と、ひとすじの流星"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Among the twinkling stars, a shooting star streaks past now and then."
            : "瞬く星々の間を、ときおり流れ星が横切ります。"}
        </p>
      </div>
    </section>
  );
}
