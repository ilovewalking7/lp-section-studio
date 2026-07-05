import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "オーロラ背景",
  category: "背景アニメ",
  description: "北極光のようなグラデーションの光が背後でゆっくり漂うヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "aurora"],
};

export default function Aurora() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#05060f] py-28 text-white">
      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate3d(-10%, -10%, 0) rotate(0deg) scale(1.1); }
          50% { transform: translate3d(15%, 10%, 0) rotate(25deg) scale(1.3); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate3d(10%, 5%, 0) rotate(0deg) scale(1.2); }
          50% { transform: translate3d(-15%, -8%, 0) rotate(-20deg) scale(1); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate3d(-8%, 12%, 0) scale(1.25); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-blob absolute left-[10%] top-[-20%] h-[60vh] w-[60vh] rounded-full opacity-70 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.7), transparent 70%)",
            animation: "aurora-drift-1 14s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute right-[5%] top-[0%] h-[55vh] w-[55vh] rounded-full opacity-60 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.7), transparent 70%)",
            animation: "aurora-drift-2 18s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute left-[30%] top-[20%] h-[50vh] w-[70vh] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.6), transparent 70%)",
            animation: "aurora-drift-3 16s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[#05060f]/30" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Aurora Background
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A night-sky backdrop with shimmering light"
            : "光がゆらめく、夜空のような背景"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          {en
            ? "Gradients drifting like the aurora, moving quietly behind your content."
            : "オーロラのように漂うグラデーション。コンテンツの背後で静かに動き続けます。"}
        </p>
      </div>
    </section>
  );
}
