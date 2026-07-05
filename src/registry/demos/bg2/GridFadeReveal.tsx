import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グリッド明滅",
  category: "背景アニメ",
  description: "格子のセルがランダムに明滅して浮かび上がる、ティール調の背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "grid"],
};

export default function GridFadeReveal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const cells = Array.from({ length: 96 }, (_, i) => i);
  return (
    <section className="relative w-full overflow-hidden bg-[#04110f] py-28 text-white">
      <style>{`
        @keyframes bg2-cell-glow {
          0%,100% { opacity: 0; }
          50% { opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-cell { animation: none !important; }
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "1fr",
        }}
      >
        {cells.map((i) => (
          <div key={i} className="relative border border-teal-400/10">
            <div
              className="bg2-cell absolute inset-[2px] rounded-sm bg-teal-400"
              style={{
                animation: `bg2-cell-glow ${4 + (i % 6)}s ease-in-out ${(i % 9) * 0.4}s infinite`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#04110f_80%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-teal-400/20 bg-teal-400/5 px-4 py-1 text-xs font-medium tracking-wide text-teal-200/80">
          Grid Reveal
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A grid that breathes in light" : "明滅する、格子のリズム"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-teal-50/70">
          {en
            ? "Cells flicker on and off at random, drawing a lattice that feels alive."
            : "セルがばらばらに灯っては消え、生きているような格子模様を描きます。"}
        </p>
      </div>
    </section>
  );
}
