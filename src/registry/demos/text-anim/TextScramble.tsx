import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクランブル復号",
  category: "テキストアニメ",
  description: "ランダム文字から最終テキストへ解読されるスクランブル効果。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "scramble"],
};

const TARGET = "DECRYPTING ACCESS";
const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789";

export default function TextScramble() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [display, setDisplay] = useState(TARGET);
  const [runId, setRunId] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    // each char resolves at a staggered time
    const reveals = TARGET.split("").map((_, i) => 300 + i * 70);

    const tick = (now: number) => {
      const elapsed = now - start;
      let allDone = true;
      const out = TARGET.split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (elapsed >= reveals[i]) return ch;
          allDone = false;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(out);
      if (!allDone && elapsed < duration + 400) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(TARGET);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [runId]);

  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-2xl bg-neutral-950 px-8 py-14 text-center">
      <h2 className="font-mono text-3xl font-bold tracking-[0.15em] text-emerald-400 sm:text-5xl [text-shadow:0_0_18px_rgba(16,185,129,0.45)]">
        {display}
      </h2>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
      >
        <RefreshCw className="size-4" />
        {en ? "Re-decode" : "再解読"}
      </button>
    </div>
  );
}
