import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マーキー画像ストリップ",
  category: "Awwwards",
  description:
    "グラデーションのタイルが無限に流れる、逆方向2段のマーキー画像ストリップヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

const ROW_A = [
  "linear-gradient(135deg,#6366f1,#a855f7)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#06b6d4,#3b82f6)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
];
const ROW_B = [
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#f97316,#facc15)",
  "linear-gradient(135deg,#14b8a6,#34d399)",
  "linear-gradient(135deg,#e11d48,#9333ea)",
];

function Strip({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max gap-4" data-dir={reverse ? "r" : "l"}>
      {doubled.map((bg, i) => (
        <div
          key={i}
          className="aww-mq-tile h-40 w-60 flex-none rounded-2xl ring-1 ring-white/10 sm:h-56 sm:w-80"
          style={{ background: bg }}
        />
      ))}
    </div>
  );
}

export default function MarqueeImageStrip() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-mq relative w-full overflow-hidden bg-[#0a0a0f] py-20 text-white">
      <style>{`
        @keyframes aww-mq-l { from{ transform: translateX(0);} to{ transform: translateX(-50%);} }
        @keyframes aww-mq-r { from{ transform: translateX(-50%);} to{ transform: translateX(0);} }
        .aww-mq-row-l{ animation: aww-mq-l 30s linear infinite; }
        .aww-mq-row-r{ animation: aww-mq-r 34s linear infinite; }
        .aww-mq-tile{ transition: transform .35s ease; }
        .aww-mq-tile:hover{ transform: scale(1.06); }
        @media (prefers-reduced-motion: reduce){ .aww-mq-row-l,.aww-mq-row-r{ animation:none!important; } }
      `}</style>

      <div className="relative z-10 mx-auto mb-12 max-w-[1400px] px-5 text-center sm:px-10">
        <h1
          className="font-black leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.6rem,9vw,7.5rem)" }}
        >
          {en ? (
            <>
              Visuals that{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                keep flowing
              </span>
            </>
          ) : (
            <>
              流れ続ける
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                ビジュアル
              </span>
            </>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-white/55">
          {en
            ? "An infinitely looping marquee. Every tile is drawn with nothing but CSS gradients."
            : "無限ループするマーキー。すべてのタイルはCSSグラデーションだけで描かれています。"}
        </p>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="aww-mq-row-l">
          <Strip items={ROW_A} />
        </div>
        <div className="aww-mq-row-r">
          <Strip items={ROW_B} reverse />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent" />
    </section>
  );
}
