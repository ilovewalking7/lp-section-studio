import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スポットライトヒーロー背景",
  category: "背景アニメ",
  description: "上方からのスポットライトと薄いグリッドのVercel風ヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "spotlight", "grid"],
};

export default function SpotlightHeroBg() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#04060d] py-32 text-white">
      <style>{`
        @keyframes sh-sweep {
          0%, 100% { transform: translateX(-50%) rotate(-18deg); opacity: 0.55; }
          50% { transform: translateX(-50%) rotate(-8deg); opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sh-cone { animation: none !important; }
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="sh-cone absolute left-1/2 top-[-30%] h-[120vh] w-[60vh] origin-top"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 70deg, rgba(125,211,252,0.18) 90deg, rgba(125,211,252,0.05) 110deg, transparent 130deg)",
            filter: "blur(8px)",
            animation: "sh-sweep 9s ease-in-out infinite",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] h-[40vh] w-[60vh] -translate-x-1/2 rounded-full bg-sky-400/15 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Spotlight Hero
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A single spotlight from above" : "上から差し込む、一筋のスポットライト"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "A cone of light falls over a faint grid for a Vercel / Linear feel."
            : "薄いグリッドの上に光のコーンが落ち、Vercel/Linear風の佇まいに。"}
        </p>
      </div>
    </section>
  );
}
