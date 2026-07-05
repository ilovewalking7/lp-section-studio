import type { DemoMeta } from "@/registry";
import { Terminal } from "lucide-react";

export const meta: DemoMeta = {
  name: "テックブラケット",
  category: "ボタン",
  description: "切り欠きコーナーと点滅カーソルを備えた、端末風テックボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function TechBracket() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#05080a] p-8">
      <style>{`
        @keyframes tb-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 border border-emerald-400/60 bg-emerald-400/5 px-7 py-3.5 font-mono text-sm font-semibold text-emerald-300 transition-colors duration-300 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none"
        style={{
          clipPath:
            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        }}
      >
        <Terminal className="size-4" />
        <span>execute</span>
        <span
          className="ml-0.5 inline-block h-4 w-2 bg-emerald-400"
          style={{ animation: "tb-blink 1s step-end infinite" }}
        />
      </button>
    </div>
  );
}
