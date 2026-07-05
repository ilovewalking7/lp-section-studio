import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブラーイン見出し",
  category: "テキストアニメ",
  description: "語ごとにブラー解除＋フェードアップで順次表示する見出し。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "blur"],
};

const WORDS = ["静寂", "から", "言葉が", "立ち上がる。"];
const WORDS_EN = ["From", "silence,", "words", "rise."];

export default function BlurInText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [runId, setRunId] = useState(0);
  const words = en ? WORDS_EN : WORDS;

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-2xl bg-background px-8 py-14 text-center">
      <h2
        key={runId}
        className="flex flex-wrap items-center justify-center gap-x-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
      >
        {words.map((w, i) => (
          <span
            key={`${runId}-${i}`}
            className="inline-block opacity-0 [animation:blur-in_0.7s_ease-out_both]"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            {w}
          </span>
        ))}
      </h2>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <RefreshCw className="size-4" />
        {en ? "Replay" : "リプレイ"}
      </button>
      <style>{`
        @keyframes blur-in {
          0% { opacity: 0; filter: blur(12px); transform: translateY(14px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
