import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "オーロラ2",
  category: "背景アニメ",
  description: "うねる光のカーテンが上空で揺らめく、グリーン×ヴァイオレットの極光。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "aurora"],
};

export default function Aurora2() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#020611] py-28 text-white">
      <style>{`
        @keyframes bg2-aurora-1 {
          0%,100% { transform: translateX(-8%) skewX(-12deg); opacity: 0.55; }
          50% { transform: translateX(10%) skewX(8deg); opacity: 0.85; }
        }
        @keyframes bg2-aurora-2 {
          0%,100% { transform: translateX(6%) skewX(10deg); opacity: 0.5; }
          50% { transform: translateX(-9%) skewX(-9deg); opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-aurora { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%]">
        <div
          className="bg2-aurora absolute inset-0 blur-3xl"
          style={{
            background:
              "linear-gradient(100deg, transparent 10%, rgba(52,211,153,0.5) 30%, rgba(34,197,94,0.45) 45%, transparent 70%)",
            animation: "bg2-aurora-1 14s ease-in-out infinite",
          }}
        />
        <div
          className="bg2-aurora absolute inset-0 blur-3xl"
          style={{
            background:
              "linear-gradient(80deg, transparent 20%, rgba(167,139,250,0.45) 45%, rgba(99,102,241,0.4) 60%, transparent 85%)",
            animation: "bg2-aurora-2 18s ease-in-out infinite",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#020611]/30 to-[#020611]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1 text-xs font-medium tracking-wide text-emerald-200/80">
          Aurora
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A curtain of aurora across the night sky"
            : "夜空に揺らめく、極光のカーテン"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/70">
          {en
            ? "Two bands of light slowly ripple, evoking the aurora of the northern sky."
            : "二枚の光の帯がゆっくりとうねり、北の空のオーロラを思わせます。"}
        </p>
      </div>
    </section>
  );
}
