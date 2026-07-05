import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "テキストにグラデ充填",
  category: "Awwwards",
  description: "動くグラデーションを文字でマスクし、文字内に流れる色面を見せる見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const LINES = ["AURORA", "GRADIENT"];

export default function TextMaskImage() {
  return (
    <section className="aww-tmi relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-1 bg-neutral-950 px-6 py-28">
      {LINES.map((line, i) => (
        <h2
          key={i}
          className="aww-tmi-text bg-clip-text font-black uppercase leading-[0.86] tracking-[-0.03em] text-transparent"
          style={{ fontSize: "clamp(3rem, 16vw, 14rem)" }}
        >
          {line}
        </h2>
      ))}
      <p className="mt-12 text-xs uppercase tracking-[0.4em] text-neutral-600">
        Gradient text fill
      </p>
      <style>{`
        .aww-tmi-text {
          background-image: linear-gradient(110deg,#22d3ee,#a855f7,#f43f5e,#f59e0b,#22d3ee);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          animation: aww-tmi-flow 8s linear infinite;
        }
        @keyframes aww-tmi-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-tmi-text { animation: none; }
        }
      `}</style>
    </section>
  );
}
