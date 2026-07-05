import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レトロ地平線2",
  category: "背景アニメ",
  description: "奥へ流れる遠近グリッドが地平線へ消える、シアン×マゼンタの背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "retro", "grid"],
};

export default function RetroGrid2() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0418] py-28 text-white">
      <style>{`
        @keyframes bg2-retro-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-retro-grid { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] [perspective:340px]">
        <div
          className="bg2-retro-grid absolute inset-0 [transform:rotateX(62deg)] [transform-origin:center_top]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.45) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "bg2-retro-scroll 1.6s linear infinite",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[40%] h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0a0418] via-[#0a0418]/70 to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1 text-xs font-medium tracking-wide text-cyan-200/80">
          Retro Grid
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "A neon grid racing to the horizon" : "地平線へ流れるネオン格子"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cyan-50/70">
          {en
            ? "A grid in perspective flows toward you, recreating an '80s sci-fi night."
            : "遠近のかかったグリッドが手前へ流れ、80年代SFの夜を再現します。"}
        </p>
      </div>
    </section>
  );
}
