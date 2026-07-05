import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デュオトーンヒーロー",
  category: "Awwwards",
  description:
    "2色のデュオトーンで統一した、雑誌のようなコントラストの強いフルブリードヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function DuotoneHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-dt relative w-full overflow-hidden bg-[#10101a] px-5 py-20 text-[#e9f7ff] sm:px-10 sm:py-28">
      <style>{`
        @keyframes aww-dt-pan {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes aww-dt-in {
          from { opacity: 0; clip-path: inset(0 100% 0 0); }
          to { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        .aww-dt-portrait { animation: aww-dt-pan 18s ease-in-out infinite; }
        .aww-dt-in { animation: aww-dt-in 1s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aww-dt-portrait, .aww-dt-in { animation: none !important; clip-path: none !important; }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-[1500px] items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.45em] text-[#06b6d4]">
            <span>Duotone / Issue 04</span>
            <span>Cyan × Magenta</span>
          </div>
          <h1
            className="aww-dt-in mt-12 font-black uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3rem,11vw,9rem)" }}
          >
            <span className="block">Vivid</span>
            <span className="block text-[#ec4899]">Contrast</span>
            <span className="block text-transparent" style={{ WebkitTextStroke: "1.5px #06b6d4" }}>
              Stories
            </span>
          </h1>
          <p className="mt-10 max-w-md text-base leading-relaxed text-[#9fc4d4]">
            {en
              ? "Just two colors. An experimental layout that brings the tension of a printed photo spread to the screen, using nothing but the contrast of cyan and magenta."
              : "たった2色。シアンとマゼンタの対比だけで、紙のグラビアのような緊張感を画面に持ち込む実験的なレイアウト。"}
          </p>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-2xl ring-1 ring-[#06b6d4]/30">
          <div
            className="aww-dt-portrait absolute inset-0 mix-blend-screen"
            style={{
              backgroundImage:
                "linear-gradient(115deg,#0e7490,#06b6d4 35%,#ec4899 70%,#831843)",
              backgroundSize: "240% 240%",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(16,16,26,0.85))]" />
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.5) 3px,rgba(0,0,0,0.5) 4px)",
            }}
          />
          <div className="absolute bottom-5 left-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e9f7ff]/80">
            Subject 09
          </div>
        </div>
      </div>
    </section>
  );
}
