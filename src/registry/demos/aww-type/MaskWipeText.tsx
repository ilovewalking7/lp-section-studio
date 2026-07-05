import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ワイプ表示テキスト",
  category: "Awwwards",
  description: "カラーバーが横断し、その通過跡から文字が現れるマスクワイプ見出し。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

const LINES = ["UNVEIL", "THE WORD"];

export default function MaskWipeText() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [runId, setRunId] = useState(0);

  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-12 bg-neutral-950 px-6 py-28 text-neutral-50">
      <div key={runId} className="flex flex-col items-center gap-2">
        {LINES.map((line, i) => (
          <span
            key={i}
            className="aww-mw relative inline-block overflow-hidden font-black uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 14vw, 12rem)" }}
          >
            <span
              className="aww-mw-text inline-block"
              style={{ animationDelay: `${0.35 + i * 0.18}s` }}
            >
              {line}
            </span>
            <span
              className="aww-mw-bar absolute inset-0"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800"
      >
        <RefreshCw className="size-4" />
        {en ? "Replay" : "リプレイ"}
      </button>
      <style>{`
        .aww-mw-text {
          opacity: 0;
          animation: aww-mw-show 0.01s linear both;
        }
        @keyframes aww-mw-show { to { opacity: 1; } }
        .aww-mw-bar {
          background: linear-gradient(90deg,#f43f5e,#f59e0b);
          transform: scaleX(0);
          transform-origin: left center;
          animation: aww-mw-wipe 1s cubic-bezier(0.76,0,0.24,1) both;
        }
        @keyframes aww-mw-wipe {
          0% { transform: scaleX(0); transform-origin: left center; }
          50% { transform: scaleX(1); transform-origin: left center; }
          51% { transform: scaleX(1); transform-origin: right center; }
          100% { transform: scaleX(0); transform-origin: right center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-mw-text { animation: none; opacity: 1; }
          .aww-mw-bar { display: none; }
        }
      `}</style>
    </section>
  );
}
