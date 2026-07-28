import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Rocket,
  Settings,
  GitBranch,
  KeyRound,
  Terminal,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドメニュー",
  category: "ダークテック",
  description: "useStateで絞り込む⌘Kコマンドメニュー（相対フレーム内に内包）。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Cmd = {
  id: string;
  labelJa: string;
  labelEn: string;
  groupJa: string;
  groupEn: string;
  icon: typeof Search;
  hint?: string;
};

const COMMANDS: Cmd[] = [
  { id: "new", labelJa: "新規デプロイ", labelEn: "New deploy", groupJa: "アクション", groupEn: "Actions", icon: Rocket, hint: "D" },
  { id: "branch", labelJa: "ブランチを切り替え", labelEn: "Switch branch", groupJa: "アクション", groupEn: "Actions", icon: GitBranch },
  { id: "term", labelJa: "ターミナルを開く", labelEn: "Open terminal", groupJa: "アクション", groupEn: "Actions", icon: Terminal, hint: "T" },
  { id: "docs", labelJa: "ドキュメントを検索", labelEn: "Search docs", groupJa: "移動", groupEn: "Navigate", icon: FileText },
  { id: "settings", labelJa: "設定を開く", labelEn: "Open settings", groupJa: "移動", groupEn: "Navigate", icon: Settings },
  { id: "keys", labelJa: "APIキーを管理", labelEn: "Manage API keys", groupJa: "移動", groupEn: "Navigate", icon: KeyRound },
];

export default function CommandMenu() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMANDS.filter((c) =>
      (en ? c.labelEn : c.labelJa).toLowerCase().includes(q)
    );
  }, [query, en]);

  const groups = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      const key = en ? c.groupEn : c.groupJa;
      const arr = map.get(key) ?? [];
      arr.push(c);
      map.set(key, arr);
    });
    return Array.from(map.entries());
  }, [filtered, en]);

  let flatIndex = -1;

  return (
    <div className="relative w-full max-w-lg overflow-x-hidden px-6">
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(52,211,153,0.18), transparent)",
        }}
      />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/95 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="size-4 text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder={en ? "Type a command or search…" : "コマンドを入力するか検索…"}
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-3 py-10 text-center font-mono text-sm text-zinc-600">
              {en ? `No results for "${query}"` : `"${query}" の結果はありません`}
            </div>
          ) : (
            groups.map(([group, cmds]) => (
              <div key={group} className="mb-1">
                <div className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                  {group}
                </div>
                {cmds.map((c) => {
                  flatIndex += 1;
                  const idx = flatIndex;
                  const Icon = c.icon;
                  const isSel = idx === selected;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onMouseEnter={() => setSelected(idx)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        isSel ? "bg-white/[0.06] text-zinc-100" : "text-zinc-400"
                      )}
                    >
                      <Icon
                        className={cn("size-4", isSel ? "text-emerald-400" : "text-zinc-500")}
                      />
                      <span className="flex-1">{en ? c.labelEn : c.labelJa}</span>
                      {c.hint && (
                        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                          {c.hint}
                        </kbd>
                      )}
                      {isSel && (
                        <CornerDownLeft className="size-3.5 text-zinc-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5 font-mono text-[10px] text-zinc-600">
          <span className="flex items-center gap-1">
            <ArrowUp className="size-3" />
            <ArrowDown className="size-3" />
            {en ? "Navigate" : "移動"}
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="size-3" />
            {en ? "Select" : "選択"}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">⌘</kbd>
            <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
