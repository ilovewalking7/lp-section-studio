import { useState } from "react";
import { Play } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レター・スタッガー",
  category: "テキストアニメ",
  description: "一文字ずつ時間差で立ち上がる文字単位リビール。再生ボタン付き。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "stagger"],
};

const TEXT = "HELLO WORLD";

export default function LetterStagger() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [runId, setRunId] = useState(0);
  const letters = TEXT.split("");

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-2xl bg-neutral-950 px-8 py-14 text-center">
      <h2
        key={runId}
        aria-label={TEXT}
        className="flex flex-wrap justify-center text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
      >
        {letters.map((ch, i) => (
          <span
            key={`${runId}-${i}`}
            aria-hidden="true"
            className="inline-block opacity-0 [animation:ls-rise_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </h2>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
      >
        <Play className="size-4" />
        {en ? "Play" : "再生"}
      </button>
      <style>{`
        @keyframes ls-rise {
          0% { opacity: 0; transform: translateY(0.6em) rotate(8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
