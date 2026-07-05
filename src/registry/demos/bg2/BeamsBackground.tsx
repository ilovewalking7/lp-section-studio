import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ビーム背景",
  category: "背景アニメ",
  description: "斜めに走る光のビームが流れ続ける、エメラルド調のヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "beams"],
};

export default function BeamsBackground() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const beams = [
    { left: "8%", w: 2, delay: "0s", dur: "7s", c: "rgba(52,211,153,0.55)" },
    { left: "20%", w: 1, delay: "2s", dur: "9s", c: "rgba(45,212,191,0.4)" },
    { left: "34%", w: 3, delay: "1s", dur: "6s", c: "rgba(94,234,212,0.5)" },
    { left: "48%", w: 1, delay: "3s", dur: "10s", c: "rgba(34,197,94,0.35)" },
    { left: "61%", w: 2, delay: "0.5s", dur: "8s", c: "rgba(52,211,153,0.5)" },
    { left: "74%", w: 1, delay: "2.5s", dur: "7.5s", c: "rgba(45,212,191,0.45)" },
    { left: "88%", w: 2, delay: "1.5s", dur: "9.5s", c: "rgba(94,234,212,0.4)" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#04130d] py-28 text-white">
      <style>{`
        @keyframes bg2-beam-fall {
          0% { transform: translateY(-120%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-beam { animation: none !important; opacity: 0.4 !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        {beams.map((b, i) => (
          <span
            key={i}
            className="bg2-beam absolute top-0 h-[40%] rounded-full blur-[1px]"
            style={{
              left: b.left,
              width: `${b.w}px`,
              background: `linear-gradient(to bottom, transparent, ${b.c}, transparent)`,
              animation: `bg2-beam-fall ${b.dur} linear ${b.delay} infinite`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04130d]/20 to-[#04130d]/70" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1 text-xs font-medium tracking-wide text-emerald-200/80">
          Beams
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Beams of cascading light" : "降りそそぐ光のビーム"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/70">
          {en
            ? "Streaks of light falling vertically lend depth and momentum to the quiet green dark."
            : "縦に流れ落ちる光条が、静かな緑の闇に奥行きと速度感を与えます。"}
        </p>
      </div>
    </section>
  );
}
