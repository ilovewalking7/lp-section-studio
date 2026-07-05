import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グリッチテキスト",
  category: "テキストアニメ",
  description: "RGBずれとスライスで揺れるサイバーなグリッチ見出し。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "glitch"],
};

const TEXT = "SYSTEM ERROR";

export default function GlitchText() {
  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-black px-8 py-14 text-center">
      <h2
        data-text={TEXT}
        className="glitch relative font-mono text-4xl font-black tracking-[0.1em] text-white sm:text-6xl"
      >
        {TEXT}
      </h2>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-400/70">
        signal corrupted
      </p>
      <style>{`
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip-path: inset(0 0 0 0);
          animation: glitch-top 2s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9;
          clip-path: inset(0 0 0 0);
          animation: glitch-bottom 1.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-top {
          0% { clip-path: inset(0 0 85% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 50% 0); transform: translate(-3px, 1px); }
          40% { clip-path: inset(60% 0 5% 0); transform: translate(3px, -1px); }
          60% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(45% 0 35% 0); transform: translate(2px, 1px); }
          100% { clip-path: inset(0 0 90% 0); transform: translate(0); }
        }
        @keyframes glitch-bottom {
          0% { clip-path: inset(80% 0 0 0); transform: translate(0); }
          25% { clip-path: inset(50% 0 30% 0); transform: translate(3px, -1px); }
          50% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
          75% { clip-path: inset(65% 0 10% 0); transform: translate(2px, 0); }
          100% { clip-path: inset(90% 0 0 0); transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
