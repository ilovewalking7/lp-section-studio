import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リップルグリッド背景",
  category: "背景アニメ",
  description: "同心円のリングが外側へ脈打つように広がる背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "ripple"],
};

export default function RippleGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const rings = [0, 1, 2, 3, 4];
  return (
    <section className="relative w-full overflow-hidden bg-[#05060f] py-28 text-white">
      <style>{`
        @keyframes rg-ripple {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rg-ring { animation: none !important; opacity: 0.15; }
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, #000 30%, transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        {rings.map((r) => (
          <span
            key={r}
            className="rg-ring absolute left-1/2 top-1/2 h-[40vh] w-[40vh] rounded-full border border-cyan-400/40"
            style={{
              boxShadow: "0 0 30px rgba(34,211,238,0.25) inset",
              animation: `rg-ripple 5s ease-out ${r}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Ripple Grid
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A rhythm of ripples, pulsing from the center"
            : "中心から脈打つ、波紋のリズム"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Concentric rings spread outward in succession, repeating like a heartbeat."
            : "同心円のリングが連続して外へ広がり、鼓動のように繰り返します。"}
        </p>
      </div>
    </section>
  );
}
