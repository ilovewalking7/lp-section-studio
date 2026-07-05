import { useEffect, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タイプライター見出し",
  category: "テキストアニメ",
  description: "複数フレーズを点滅カーソルで打鍵・消去し続けるタイプライター効果。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "typewriter"],
};

const PHRASES_JA = [
  "未来をデザインする。",
  "アイデアを、形に。",
  "コードは、詩になる。",
  "自信を持って、つくる。",
];
const PHRASES_EN = [
  "Design the future.",
  "Turn ideas into form.",
  "Code becomes poetry.",
  "Build with confidence.",
];

export default function Typewriter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const PHRASES = en ? PHRASES_EN : PHRASES_JA;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PHRASES[phraseIndex];
    let delay = deleting ? 45 : 90;

    if (!deleting && text === full) {
      delay = 1400; // pause at full phrase
    } else if (deleting && text === "") {
      delay = 350;
    }

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      } else {
        const next = deleting
          ? full.slice(0, text.length - 1)
          : full.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, phraseIndex, en]);

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-background px-8 py-14 text-center">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Component Studio
      </span>
      <h2 className="min-h-[1.4em] text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        {text}
        <span className="ml-0.5 inline-block w-[3px] -translate-y-1 animate-[tw-caret_1s_steps(1)_infinite] bg-foreground align-middle">
          &nbsp;
        </span>
      </h2>
      <p className="text-sm text-muted-foreground">
        {en
          ? "Type → erase → next phrase, looping forever."
          : "打鍵 → 消去 → 次のフレーズを無限ループ。"}
      </p>
      <style>{`
        @keyframes tw-caret {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
