import { useEffect, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フリップワード",
  category: "テキストアニメ",
  description: "文中の一語が複数の候補へ回転して切り替わる見出し。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "flip"],
};

const WORDS = ["美しく", "速く", "賢く", "大胆に"];
const WORDS_EN = ["beautiful", "fast", "smart", "bold"];
const COLORS = [
  "text-rose-400",
  "text-sky-400",
  "text-amber-400",
  "text-violet-400",
];

export default function FlipWords() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const words = en ? WORDS_EN : WORDS;

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-background px-8 py-14 text-center">
      <h2 className="flex flex-wrap items-center justify-center gap-x-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        <span>{en ? "Build it" : "もっと"}</span>
        <span className="relative inline-flex h-[1.2em] min-w-[3.5em] items-center justify-center overflow-hidden">
          <span
            key={index}
            className={`inline-block [animation:fw-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both] ${COLORS[index]}`}
          >
            {words[index]}
          </span>
        </span>
        <span>{en ? "." : "作ろう。"}</span>
      </h2>
      <p className="text-sm text-muted-foreground">
        {en
          ? "One word flips as it swaps out."
          : "一語が回転しながら切り替わります。"}
      </p>
      <style>{`
        @keyframes fw-in {
          0% { opacity: 0; transform: translateY(60%) rotateX(-90deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
      `}</style>
    </div>
  );
}
