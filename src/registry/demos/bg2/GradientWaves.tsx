import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデーション波",
  category: "背景アニメ",
  description: "重なるSVG波が緩やかにうねる、ティール×ブルーの海面背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "waves"],
};

export default function GradientWaves() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#031620] py-28 text-white">
      <style>{`
        @keyframes bg2-wave-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-wave { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]">
        {[
          { c: "rgba(20,184,166,0.30)", dur: "12s", top: "10%" },
          { c: "rgba(56,189,248,0.25)", dur: "18s", top: "28%" },
          { c: "rgba(14,165,233,0.20)", dur: "24s", top: "46%" },
        ].map((w, i) => (
          <div
            key={i}
            className="bg2-wave absolute left-0 w-[200%]"
            style={{
              top: w.top,
              animation: `bg2-wave-x ${w.dur} linear infinite`,
            }}
          >
            <svg
              viewBox="0 0 1440 160"
              preserveAspectRatio="none"
              className="h-32 w-full"
              aria-hidden="true"
            >
              <path
                d="M0 80 C 240 20 480 140 720 80 C 960 20 1200 140 1440 80 L1440 160 L0 160 Z M1440 80 C 1680 20 1920 140 2160 80 C 2400 20 2640 140 2880 80"
                fill={w.c}
              />
            </svg>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031620] via-transparent to-[#031620]/40" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-teal-400/20 bg-teal-400/5 px-4 py-1 text-xs font-medium tracking-wide text-teal-200/80">
          Gradient Waves
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A quiet sea that keeps undulating" : "うねり続ける、静かな海面"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-teal-50/70">
          {en
            ? "Three layers of waves at differing speeds overlap, tracing an endless tide."
            : "速度の異なる三層の波が重なり、終わらない潮の流れを描きます。"}
        </p>
      </div>
    </section>
  );
}
