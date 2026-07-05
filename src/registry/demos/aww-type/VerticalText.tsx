import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "縦組みタイポ",
  category: "Awwwards",
  description: "縦書きの大型タイポと罫線で構成した編集的な縦組みレイアウト。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function VerticalText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-vt relative flex min-h-[70vh] w-full items-stretch justify-center gap-6 overflow-hidden bg-[#f5f3ee] px-6 py-20 text-neutral-950 sm:gap-12">
      <div className="flex flex-col justify-between border-r border-neutral-300 pr-6 text-[11px] uppercase tracking-[0.4em] text-neutral-500">
        <span>{en ? "Tokyo — 2026" : "東京 — 2026"}</span>
        <span style={{ writingMode: "vertical-rl" }}>Editorial Series</span>
      </div>

      <h2
        className="aww-vt-main font-black leading-[0.9] tracking-tight"
        style={{
          writingMode: "vertical-rl",
          fontSize: "clamp(3rem, 13vw, 11rem)",
        }}
      >
        {en ? "Quiet Composition" : "静寂の構図"}
      </h2>

      <div
        className="aww-vt-sub flex items-center text-base leading-relaxed text-neutral-700"
        style={{ writingMode: "vertical-rl", animationDelay: "0.2s" }}
      >
        {en
          ? "Negative space speaks. The flow of vertical time and the aesthetic of ma dwelling between the lines."
          : "余白は語る。縦に流れる時間と、行間に宿る間（ま）の美学。"}
      </div>

      <div className="ml-auto flex flex-col justify-between border-l border-neutral-300 pl-6 text-[11px] uppercase tracking-[0.4em] text-neutral-500">
        <span style={{ writingMode: "vertical-rl" }}>Vol.07</span>
        <span>{en ? "Type / Vertical" : "Type / 縦"}</span>
      </div>

      <style>{`
        .aww-vt-main, .aww-vt-sub { opacity: 0; animation: aww-vt-in 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes aww-vt-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-vt-main, .aww-vt-sub { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
