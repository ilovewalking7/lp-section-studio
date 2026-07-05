import { useMemo } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メテオ背景",
  category: "背景アニメ",
  description: "斜めに尾を引いて流れ落ちる流星のヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "meteors"],
};

export default function Meteors() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const meteors = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 40) - 20,
        delay: (Math.random() * 6).toFixed(2),
        duration: (3 + Math.random() * 4).toFixed(2),
      })),
    []
  );
  return (
    <section className="relative w-full overflow-hidden bg-[#04050c] py-28 text-white">
      <style>{`
        @keyframes meteor-fall {
          0% { transform: rotate(215deg) translateX(0); opacity: 0; }
          5% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-900px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .meteor-item { animation: none !important; opacity: 0.4; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {meteors.map((m) => (
          <span
            key={m.id}
            className="meteor-item absolute h-0.5 w-0.5 rounded-full bg-slate-200"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              boxShadow: "0 0 6px 1px rgba(226,232,240,0.6)",
              animation: `meteor-fall ${m.duration}s linear ${m.delay}s infinite`,
            }}
          >
            <span
              className="absolute right-0 top-1/2 h-px w-[120px] -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, rgba(148,163,184,0.7), transparent)",
              }}
            />
          </span>
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Meteors
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A quiet night sky with falling stars"
            : "流れ星が降る、静かな夜空"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Countless meteors streak diagonally, trailing tails of light."
            : "無数のメテオが尾を引きながら斜めに流れ落ちます。"}
        </p>
      </div>
    </section>
  );
}
