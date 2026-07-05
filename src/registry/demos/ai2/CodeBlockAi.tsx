import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "AIコードブロック",
  category: "AI / チャット",
  description: "言語ラベルとコピーボタン付きのシンタックス風コード。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

const CODE = `export function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}`;

export default function CodeBlockAi() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(CODE).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-xl border bg-[#0b0d17] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </span>
          <span className="ml-2 text-xs font-medium text-slate-400">
            useDebounce.ts
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            copied
              ? "text-emerald-400"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          )}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {en ? (copied ? "Copied" : "Copy") : copied ? "コピー済み" : "コピー"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono">
          <span className="text-violet-400">export function</span>{" "}
          <span className="text-sky-400">useDebounce</span>
          <span className="text-amber-300">&lt;T&gt;</span>
          <span className="text-slate-300">(value: T, delay = </span>
          <span className="text-emerald-400">300</span>
          <span className="text-slate-300">) {"{"}</span>
          {"\n  "}
          <span className="text-violet-400">const</span>
          <span className="text-slate-300"> [v, setV] = </span>
          <span className="text-sky-400">useState</span>
          <span className="text-slate-300">(value);</span>
          {"\n  "}
          <span className="text-sky-400">useEffect</span>
          <span className="text-slate-300">(() ={">"} {"{"}</span>
          {"\n    "}
          <span className="text-violet-400">const</span>
          <span className="text-slate-300"> id = </span>
          <span className="text-sky-400">setTimeout</span>
          <span className="text-slate-300">(() ={">"} setV(value), delay);</span>
          {"\n    "}
          <span className="text-violet-400">return</span>
          <span className="text-slate-300"> () ={">"} clearTimeout(id);</span>
          {"\n  "}
          <span className="text-slate-300">{"}"}, [value, delay]);</span>
          {"\n  "}
          <span className="text-violet-400">return</span>
          <span className="text-slate-300"> v;</span>
          {"\n"}
          <span className="text-slate-300">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}
