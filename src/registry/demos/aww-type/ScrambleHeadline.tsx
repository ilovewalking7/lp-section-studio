import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクランブル見出し",
  category: "Awwwards",
  description: "ランダム文字から正しい文字へ収束する暗号風スクランブル見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const TARGET = "DECRYPT";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@";

export default function ScrambleHeadline() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [text, setText] = useState(TARGET);
  const [runId, setRunId] = useState(0);
  const rafRef = useRef<number | null>(null);

  const run = useCallback(() => {
    const start = performance.now();
    const duration = 1400;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(TARGET);
      return;
    }
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(p * TARGET.length);
      let out = "";
      for (let i = 0; i < TARGET.length; i += 1) {
        out +=
          i < revealed
            ? TARGET[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(TARGET);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run, runId]);

  return (
    <section className="flex min-h-[55vh] w-full flex-col items-center justify-center gap-12 bg-neutral-950 px-6 py-28 text-emerald-300">
      <h2
        className="text-center font-black uppercase leading-none tracking-[0.02em] tabular-nums"
        style={{ fontSize: "clamp(3rem, 16vw, 13rem)", fontVariantLigatures: "none" }}
      >
        {text}
      </h2>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-5 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10"
      >
        <RefreshCw className="size-4" />
        {en ? "Decrypt again" : "再解読"}
      </button>
    </section>
  );
}
