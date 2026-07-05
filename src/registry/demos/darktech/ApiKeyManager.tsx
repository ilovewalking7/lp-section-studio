import { useState } from "react";
import { Check, Copy, Eye, EyeOff, KeyRound, RefreshCw, Plus } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "APIキー・マネージャ",
  category: "ダークテック",
  description: "表示・コピー・再生成ができるダーク設定パネル（APIキー管理）。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type KeyItem = { id: string; label: string; envJa: string; envEn: string; secret: string };

function randomSecret() {
  const chars = "abcdef0123456789";
  let s = "";
  for (let i = 0; i < 32; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `sk_live_${s}`;
}

const INITIAL: KeyItem[] = [
  { id: "1", label: "Production", envJa: "本番", envEn: "Live", secret: "sk_live_9f3a7c21b8e04d65a1f2c9b7e3d4801f" },
  { id: "2", label: "Development", envJa: "開発", envEn: "Dev", secret: "sk_test_2a8b1d40e7f93c56b0a4d8e1f6c70293" },
];

function mask(secret: string) {
  return secret.slice(0, 8) + "•".repeat(20) + secret.slice(-4);
}

export default function ApiKeyManager() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [keys, setKeys] = useState<KeyItem[]>(INITIAL);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0d1117] text-zinc-200 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
            <KeyRound className="size-4 text-emerald-400" />
          </span>
          <div>
            <h3 className="text-sm font-medium text-white">{en ? "API Keys" : "APIキー"}</h3>
            <p className="font-mono text-xs text-zinc-500">
              {keys.length} {en ? "active" : "アクティブ"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            setKeys((k) => [
              ...k,
              { id: crypto.randomUUID(), label: "New Key", envJa: "新規", envEn: "New", secret: randomSecret() },
            ])
          }
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20"
        >
          <Plus className="size-3.5" />
          {en ? "Create" : "作成"}
        </button>
      </div>

      <ul className="divide-y divide-white/5">
        {keys.map((k) => {
          const show = revealed[k.id];
          return (
            <li key={k.id} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{k.label}</span>
                    <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      {en ? k.envEn : k.envJa}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setKeys((arr) =>
                      arr.map((x) => (x.id === k.id ? { ...x, secret: randomSecret() } : x))
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
                >
                  <RefreshCw className="size-3.5" />
                  {en ? "Regenerate" : "再生成"}
                </button>
              </div>

              <div className="mt-2.5 flex items-center gap-1 rounded-lg border border-white/10 bg-[#0a0a0f] px-3 py-2">
                <code className="flex-1 truncate font-mono text-xs text-zinc-300">
                  {show ? k.secret : mask(k.secret)}
                </code>
                <button
                  type="button"
                  onClick={() => setRevealed((r) => ({ ...r, [k.id]: !r[k.id] }))}
                  className="grid size-6 place-items-center rounded text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  aria-label={show ? (en ? "Hide" : "隠す") : en ? "Show" : "表示"}
                >
                  {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(k.secret).catch(() => {});
                    setCopied(k.id);
                    window.setTimeout(() => setCopied(null), 1400);
                  }}
                  className="grid size-6 place-items-center rounded text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  aria-label={en ? "Copy" : "コピー"}
                >
                  {copied === k.id ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
