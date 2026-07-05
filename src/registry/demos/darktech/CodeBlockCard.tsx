import { useState, type ReactNode } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コードブロック・カード",
  category: "ダークテック",
  description: "ファイルタブとコピー機能付きのシンタックスハイライト・コードカード。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Tab = { name: string; lang: string; lines: ReactNode[]; raw: string };

const TABS: Tab[] = [
  {
    name: "client.ts",
    lang: "TypeScript",
    raw: 'import { createClient } from "@forge/sdk"\n\nexport const db = createClient({\n  url: process.env.DATABASE_URL,\n  cache: "edge",\n})',
    lines: [
      <>
        <span className="text-violet-400">import</span>{" "}
        <span className="text-zinc-300">{"{ createClient }"}</span>{" "}
        <span className="text-violet-400">from</span>{" "}
        <span className="text-emerald-300">"@forge/sdk"</span>
      </>,
      <>&nbsp;</>,
      <>
        <span className="text-violet-400">export const</span>{" "}
        <span className="text-cyan-300">db</span>{" "}
        <span className="text-zinc-500">=</span>{" "}
        <span className="text-cyan-300">createClient</span>
        <span className="text-zinc-300">({"{"}</span>
      </>,
      <>
        {"  "}
        <span className="text-zinc-300">url:</span>{" "}
        <span className="text-zinc-300">process.env.</span>
        <span className="text-cyan-300">DATABASE_URL</span>
        <span className="text-zinc-500">,</span>
      </>,
      <>
        {"  "}
        <span className="text-zinc-300">cache:</span>{" "}
        <span className="text-emerald-300">"edge"</span>
        <span className="text-zinc-500">,</span>
      </>,
      <>
        <span className="text-zinc-300">{"})"}</span>
      </>,
    ],
  },
  {
    name: "schema.sql",
    lang: "SQL",
    raw: "CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT now()\n);",
    lines: [
      <>
        <span className="text-violet-400">CREATE TABLE</span>{" "}
        <span className="text-cyan-300">users</span>{" "}
        <span className="text-zinc-300">(</span>
      </>,
      <>
        {"  "}
        <span className="text-zinc-300">id</span>{" "}
        <span className="text-emerald-300">UUID</span>{" "}
        <span className="text-violet-400">PRIMARY KEY</span>
        <span className="text-zinc-500">,</span>
      </>,
      <>
        {"  "}
        <span className="text-zinc-300">email</span>{" "}
        <span className="text-emerald-300">TEXT</span>{" "}
        <span className="text-violet-400">UNIQUE NOT NULL</span>
        <span className="text-zinc-500">,</span>
      </>,
      <>
        {"  "}
        <span className="text-zinc-300">created_at</span>{" "}
        <span className="text-emerald-300">TIMESTAMPTZ</span>{" "}
        <span className="text-violet-400">DEFAULT</span>{" "}
        <span className="text-cyan-300">now()</span>
      </>,
      <>
        <span className="text-zinc-300">);</span>
      </>,
    ],
  },
];

export default function CodeBlockCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const tab = TABS[active];

  return (
    <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#0d1117] font-mono shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 pr-2">
        <div className="flex">
          {TABS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-xs transition-colors",
                i === active
                  ? "border-emerald-400 text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              <FileCode2 className="size-3.5" />
              {t.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(tab.raw).catch(() => {});
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label={en ? "Copy code" : "コードをコピー"}
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
      <div className="flex overflow-x-auto p-4 text-[13px] leading-6">
        <div className="select-none pr-4 text-right text-zinc-700">
          {tab.lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="flex-1">
          <code>
            {tab.lines.map((l, i) => (
              <div key={i} className="whitespace-pre">
                {l}
              </div>
            ))}
          </code>
        </pre>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-zinc-500">
        <span>{tab.lang}</span>
        <span>UTF-8 · LF</span>
      </div>
    </div>
  );
}
