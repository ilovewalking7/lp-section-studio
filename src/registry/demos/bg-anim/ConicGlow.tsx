import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コニックグロー背景",
  category: "背景アニメ",
  description: "回転するコニックグラデーションの光輪が中央カードを照らす背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "conic", "glow"],
};

export default function ConicGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#05060f] py-32 text-white">
      <style>{`
        @keyframes cg-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cg-halo { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="cg-halo h-[80vh] w-[80vh] rounded-full opacity-50 blur-[60px]"
          style={{
            background:
              "conic-gradient(from 0deg, #38bdf8, #a855f7, #ec4899, #f59e0b, #34d399, #38bdf8)",
            animation: "cg-spin 12s linear infinite",
          }}
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#05060f] blur-2xl" />
      <div className="relative mx-auto max-w-md px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
            Conic Glow
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {en
              ? "A card wrapped in a spinning halo of light"
              : "回る光輪に包まれるカード"}
          </h1>
          <p className="mt-4 text-base text-white/60">
            {en
              ? "A conic gradient rotates, softly illuminating the card at the center."
              : "コニックグラデーションが回転し、中央のカードを柔らかく照らします。"}
          </p>
        </div>
      </div>
    </section>
  );
}
