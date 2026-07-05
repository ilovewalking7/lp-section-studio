import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェーブテキスト",
  category: "テキストアニメ",
  description: "各文字が時間差でサイン波のように上下にうねる見出し。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "wave"],
};

const TEXT_JA = "WAVY MOTION 〜";
const TEXT_EN = "WAVY MOTION ~";

export default function WavyText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const TEXT = en ? TEXT_EN : TEXT_JA;
  const letters = TEXT.split("");

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-b from-sky-950 to-indigo-950 px-8 py-14 text-center">
      <h2
        aria-label={TEXT}
        className="flex flex-wrap justify-center text-4xl font-extrabold tracking-tight text-sky-100 sm:text-6xl"
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block [animation:wt-bob_1.6s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </h2>
      <p className="text-sm text-sky-300/70">
        {en ? "Each letter bobs up and down like a wave." : "波のように上下にうねります。"}
      </p>
      <style>{`
        @keyframes wt-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.35em); }
        }
      `}</style>
    </div>
  );
}
