import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グリッドビーム背景",
  category: "背景アニメ",
  description: "グリッド上を光のビームが横切るテック系ヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "grid", "beams"],
};

export default function GridBeams() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const beams = [
    { top: "20%", delay: "0s", duration: "6s", color: "rgba(56,189,248,0.9)" },
    { top: "45%", delay: "2s", duration: "8s", color: "rgba(168,85,247,0.9)" },
    { top: "70%", delay: "4s", duration: "7s", color: "rgba(52,211,153,0.9)" },
    { top: "88%", delay: "1.5s", duration: "9s", color: "rgba(244,114,182,0.9)" },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[#04060d] py-28 text-white">
      <style>{`
        @keyframes gb-sweep {
          0% { transform: translateX(-120%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gb-beam { animation: none !important; opacity: 0.3; }
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 50%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {beams.map((b) => (
          <div
            key={b.top}
            className="gb-beam absolute h-px w-[40%]"
            style={{
              top: b.top,
              background: `linear-gradient(90deg, transparent, ${b.color}, transparent)`,
              boxShadow: `0 0 12px ${b.color}`,
              animation: `gb-sweep ${b.duration} linear ${b.delay} infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Grid Beams
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "Beams of light racing across the grid"
            : "グリッドを駆け抜ける光のビーム"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Glowing beams sweep across the grid at a steady rhythm."
            : "発光するビームがグリッド上を一定リズムで横切ります。"}
        </p>
      </div>
    </section>
  );
}
