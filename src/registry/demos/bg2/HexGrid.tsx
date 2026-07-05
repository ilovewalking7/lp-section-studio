import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヘックスグリッド",
  category: "背景アニメ",
  description: "六角形のハニカム模様が脈打つように明滅する、シアン調のテック背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "hex"],
};

export default function HexGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#02100f] py-28 text-white">
      <style>{`
        @keyframes bg2-hex-pan {
          0% { background-position: 0 0; }
          100% { background-position: 56px 96px; }
        }
        @keyframes bg2-hex-pulse {
          0%,100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-hex { animation: none !important; }
        }
      `}</style>
      <div
        className="bg2-hex pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "transparent",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.0) 0, rgba(34,211,238,0.0) 100%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='96' viewBox='0 0 56 96'%3E%3Cg fill='none' stroke='%2322d3ee' stroke-opacity='0.35' stroke-width='1.5'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z'/%3E%3Cpath d='M28 48 L56 64 L56 96 L28 112 L0 96 L0 64 Z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "56px 96px",
          animation:
            "bg2-hex-pan 22s linear infinite, bg2-hex-pulse 5s ease-in-out infinite",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#02100f_80%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1 text-xs font-medium tracking-wide text-cyan-200/80">
          Hex Grid
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A pulsing honeycomb structure" : "脈打つ、ハニカムの構造"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cyan-50/70">
          {en
            ? "A hexagonal grid drifts slowly and flickers, building tech-flavored depth."
            : "六角形のグリッドがゆっくり流れ、明滅しながらテック感のある奥行きを作ります。"}
        </p>
      </div>
    </section>
  );
}
