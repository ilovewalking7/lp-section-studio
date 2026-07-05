import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ターミナル・ログ",
  category: "ダークテック",
  description: "色分けされたログレベルとタイピング行付きのコンソール出力パネル。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Level = "info" | "warn" | "error" | "ok" | "debug";

const LEVEL_COLOR: Record<Level, string> = {
  info: "text-cyan-400",
  warn: "text-amber-400",
  error: "text-rose-400",
  ok: "text-emerald-400",
  debug: "text-violet-400",
};

type Line = { t: string; level: Level; msg: string };

const LINES: Line[] = [
  { t: "12:04:01", level: "info", msg: "Starting build pipeline…" },
  { t: "12:04:01", level: "debug", msg: "resolved 248 modules" },
  { t: "12:04:02", level: "ok", msg: "compiled client in 1.2s" },
  { t: "12:04:02", level: "ok", msg: "compiled server in 0.9s" },
  { t: "12:04:03", level: "warn", msg: "unused export 'helper' in utils.ts" },
  { t: "12:04:03", level: "info", msg: "uploading artifacts → edge" },
  { t: "12:04:05", level: "error", msg: "rate limit hit on region iad1, retrying" },
  { t: "12:04:06", level: "ok", msg: "deployment ready ✓ https://app.forge.dev" },
];

const TYPING = "forge deploy --prod";

export default function TerminalLog() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % (TYPING.length + 12);
      setTyped(TYPING.slice(0, Math.min(i, TYPING.length)));
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f] font-mono shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1117] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-zinc-500">zsh — forge</span>
      </div>
      <div className="space-y-1 p-4 text-[13px] leading-6">
        {LINES.map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="select-none text-zinc-600">{l.t}</span>
            <span className={cn("w-12 shrink-0 uppercase", LEVEL_COLOR[l.level])}>
              {l.level}
            </span>
            <span className="text-zinc-300">{l.msg}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 text-zinc-200">
          <span className="text-emerald-400">➜</span>
          <span className="text-cyan-400">~/app</span>
          <span>
            {typed}
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-zinc-200 align-middle" />
          </span>
        </div>
      </div>
    </div>
  );
}
