import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "流れ星",
  category: "背景アニメ",
  description: "瞬く星々を斜めに切り裂く流星が走る、深い藍色の夜空背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "stars"],
};

export default function ShootingStars() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    top: `${(i * 37) % 100}%`,
    delay: `${(i % 7) * 0.6}s`,
    size: (i % 3) + 1,
  }));
  const shoot = [
    { top: "12%", left: "-10%", delay: "0s", dur: "3.2s" },
    { top: "30%", left: "-10%", delay: "1.6s", dur: "4s" },
    { top: "55%", left: "-10%", delay: "2.8s", dur: "3.6s" },
    { top: "72%", left: "-10%", delay: "4.2s", dur: "4.4s" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#060818] py-28 text-white">
      <style>{`
        @keyframes bg2-twinkle {
          0%,100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
        @keyframes bg2-shoot {
          0% { transform: translate(0,0); opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(120vw, 60vh); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-star, .bg2-shoot { animation: none !important; }
          .bg2-shoot { display: none; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="bg2-star absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `bg2-twinkle ${2 + (i % 4)}s ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
        {shoot.map((s, i) => (
          <span
            key={`sh-${i}`}
            className="bg2-shoot absolute h-px w-24 bg-gradient-to-r from-transparent via-sky-200 to-white"
            style={{
              top: s.top,
              left: s.left,
              rotate: "20deg",
              animation: `bg2-shoot ${s.dur} linear ${s.delay} infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1 text-xs font-medium tracking-wide text-sky-200/80">
          Shooting Stars
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Shooting stars across the night" : "夜空を駆ける、流れ星"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-sky-50/70">
          {en
            ? "Amid countless twinkling stars, meteors streak diagonally across the night."
            : "無数の星が瞬く中、斜めに尾を引く流星が時おり夜を横切ります。"}
        </p>
      </div>
    </section>
  );
}
