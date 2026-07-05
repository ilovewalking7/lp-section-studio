import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラデオーブ",
  category: "背景アニメ",
  description: "発光する球体が呼吸しながら漂う、サンゴ×シアンの淡いオーブ背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "orbs"],
};

export default function GradientOrbs() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const orbs = [
    { x: "20%", y: "30%", s: "32vw", c1: "#fb7185", c2: "#f43f5e", dur: "12s", d: "0s" },
    { x: "74%", y: "26%", s: "28vw", c1: "#22d3ee", c2: "#0ea5e9", dur: "15s", d: "1s" },
    { x: "60%", y: "74%", s: "34vw", c1: "#fbbf24", c2: "#f97316", dur: "17s", d: "2s" },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0710] py-28 text-white">
      <style>{`
        @keyframes bg2-orb-breathe {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.55; }
          50% { transform: translate(-50%,-50%) scale(1.25); opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-orb { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        {orbs.map((o, i) => (
          <div
            key={i}
            className="bg2-orb absolute rounded-full blur-[70px]"
            style={{
              left: o.x,
              top: o.y,
              width: o.s,
              height: o.s,
              background: `radial-gradient(circle at 35% 35%, ${o.c1}, ${o.c2})`,
              transform: "translate(-50%,-50%)",
              animation: `bg2-orb-breathe ${o.dur} ease-in-out ${o.d} infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-rose-400/20 bg-rose-400/5 px-4 py-1 text-xs font-medium tracking-wide text-rose-200/80">
          Gradient Orbs
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Glowing orbs that breathe" : "呼吸する、発光オーブ"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-rose-50/70">
          {en
            ? "Soft orbs of light swell and shrink, drifting in dreamlike gradients."
            : "柔らかな光の球が膨らんではしぼみ、幻想的なグラデーションを漂わせます。"}
        </p>
      </div>
    </section>
  );
}
