import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スプリット文字リビール",
  category: "Awwwards",
  description: "マスクの下から一文字ずつ滑り上がって現れる見出しリビール。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const LINES = ["CREATIVE", "MOTION"];

export default function SplitTextReveal() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [runId, setRunId] = useState(0);
  let idx = 0;

  return (
    <section className="aww-str relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-12 bg-neutral-50 px-6 py-28 text-neutral-950">
      <h2
        key={runId}
        className="text-center font-black uppercase leading-[0.9] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.5rem, 12vw, 11rem)" }}
      >
        {LINES.map((line, li) => (
          <span key={li} className="block">
            {line.split("").map((ch, ci) => {
              const d = idx * 0.045;
              idx += 1;
              return (
                <span
                  key={ci}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ verticalAlign: "bottom" }}
                >
                  <span
                    className="aww-str-ch inline-block"
                    style={{ animationDelay: `${d}s` }}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </h2>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-50"
      >
        <RefreshCw className="size-4" />
        {en ? "Replay" : "リプレイ"}
      </button>
      <style>{`
        .aww-str-ch {
          transform: translateY(110%);
          animation: aww-str-rise 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes aww-str-rise {
          0% { transform: translateY(110%); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-str-ch { animation: none; transform: none; }
        }
      `}</style>
    </section>
  );
}
