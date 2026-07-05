import { useState } from "react";
import { Check, Copy, Terminal, ArrowRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デベロッパー・ヒーロー",
  category: "ダークテック",
  description: "ターミナル風コードパネルとインストールコマンド付きのダークヒーロー。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

function CopyButton({ text }: { text: string }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
      aria-label={en ? "Copy" : "コピー"}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-400" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? (en ? "Copied" : "コピー済み") : en ? "Copy" : "コピー"}
    </button>
  );
}

export default function DevHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f] px-6 py-20 text-zinc-200 sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-40 size-[320px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400">
            <Sparkles className="size-3.5 text-emerald-400" />
            {en ? "v2.0 released" : "v2.0 リリース"}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {en ? (
              <>
                The build toolkit
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  for developers
                </span>
              </>
            ) : (
              <>
                開発者のための
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  ビルドツールキット
                </span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
            {en
              ? "Type-safe APIs, zero-config deploys, and a runtime that lives on the edge. The shortest path to production."
              : "型安全なAPI、ゼロ設定のデプロイ、エッジで動くランタイム。プロダクションまで最短距離で。"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0d1117] px-3 py-2">
              <Terminal className="size-4 text-emerald-400" />
              <code className="font-mono text-sm text-zinc-300">
                <span className="text-zinc-500">$</span> npm i @forge/cli
              </code>
              <CopyButton text="npm i @forge/cli" />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-transform hover:scale-[1.02]"
            >
              {en ? "Docs" : "ドキュメント"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-zinc-500">
              api/route.ts
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
            <code>
              <span className="text-violet-400">import</span>{" "}
              <span className="text-zinc-300">{"{ forge }"}</span>{" "}
              <span className="text-violet-400">from</span>{" "}
              <span className="text-emerald-300">"@forge/cli"</span>
              {"\n\n"}
              <span className="text-violet-400">export const</span>{" "}
              <span className="text-cyan-300">handler</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-violet-400">async</span>{" "}
              <span className="text-zinc-300">(req)</span>{" "}
              <span className="text-zinc-500">{"=> {"}</span>
              {"\n  "}
              <span className="text-violet-400">const</span>{" "}
              <span className="text-zinc-300">user</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-violet-400">await</span>{" "}
              <span className="text-cyan-300">forge</span>
              <span className="text-zinc-300">.auth(req)</span>
              {"\n  "}
              <span className="text-violet-400">return</span>{" "}
              <span className="text-cyan-300">forge</span>
              <span className="text-zinc-300">.json(</span>
              <span className="text-zinc-300">{"{ user }"}</span>
              <span className="text-zinc-300">)</span>
              {"\n"}
              <span className="text-zinc-500">{"}"}</span>
            </code>
          </pre>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
            <span className="font-mono text-xs text-emerald-400">
              ● ready in 42ms
            </span>
            <span className="font-mono text-xs text-zinc-500">TypeScript</span>
          </div>
        </div>
      </div>
    </section>
  );
}
