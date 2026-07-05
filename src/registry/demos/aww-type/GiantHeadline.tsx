import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "巨大見出し",
  category: "Awwwards",
  description: "画面いっぱいの超特大タイポと余白で構成した実験的なヒーロー見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function GiantHeadline() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-gh relative w-full overflow-hidden bg-neutral-950 px-6 py-28 text-neutral-50 sm:px-12 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.4em] text-neutral-500">
          <span>Studio / 2026</span>
          <span>Vol. 01</span>
        </div>
        <h1
          className="font-black leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 17vw, 16rem)" }}
        >
          <span className="aww-gh-line block" style={{ animationDelay: "0s" }}>
            DESIGN
          </span>
          <span
            className="aww-gh-line block text-transparent"
            style={{
              WebkitTextStroke: "1.5px #fafafa",
              animationDelay: "0.12s",
            }}
          >
            BEYOND
          </span>
          <span
            className="aww-gh-line block"
            style={{ animationDelay: "0.24s" }}
          >
            LIMITS<span className="text-neutral-600">.</span>
          </span>
        </h1>
        <p className="mt-12 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
          {en
            ? "Speaking through whitespace and scale alone. We stack small decisions to build a vast calm."
            : "余白とスケールだけで語る。私たちは小さな決断を積み重ね、大きな静けさをつくる。"}
        </p>
      </div>
      <style>{`
        .aww-gh-line {
          opacity: 0;
          animation: aww-gh-up 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes aww-gh-up {
          0% { opacity: 0; transform: translateY(28%); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-gh-line { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
