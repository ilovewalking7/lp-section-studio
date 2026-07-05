import { useMemo, useState } from "react";
import { Search, Home, Settings, User, FileText, CreditCard, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コマンドパレット",
  category: "フォーム",
  description: "⌘K 風の検索パレット。矢印キーで選択がスライド。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

const COMMANDS = [
  { id: "dashboard", icon: Home, label: "ダッシュボードへ移動", labelEn: "Go to dashboard", hint: "G then D" },
  { id: "profile", icon: User, label: "プロフィールを開く", labelEn: "Open profile", hint: "G then P" },
  { id: "newdoc", icon: FileText, label: "新規ドキュメント", labelEn: "New document", hint: "N" },
  { id: "billing", icon: CreditCard, label: "請求設定", labelEn: "Billing settings", hint: "G then B" },
  { id: "settings", icon: Settings, label: "設定を開く", labelEn: "Open settings", hint: "," },
];

export default function CommandKSearch() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const list = useMemo(
    () =>
      COMMANDS.filter((c) =>
        (en ? c.labelEn : c.label).toLowerCase().includes(q.toLowerCase())
      ),
    [q, en]
  );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(list.length - 1, a + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
  };

  return (
    <div className="flex min-h-[340px] w-full max-w-md items-start justify-center pt-6">
      <style>{`@keyframes ck-in{from{opacity:0;transform:scale(.97) translateY(-6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900" style={{ animation: "ck-in .25s ease-out" }}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={onKey}
            placeholder={en ? "Search commands…" : "コマンドを検索…"}
            className="w-full bg-transparent py-3.5 text-sm outline-none dark:text-white"
          />
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800">ESC</kbd>
        </div>

        <div className="max-h-64 overflow-y-auto p-2">
          {list.length === 0 && <p className="px-3 py-6 text-center text-sm text-slate-400">該当する項目がありません</p>}
          {list.map((c, i) => {
            const Icon = c.icon;
            const on = i === active;
            return (
              <button
                key={c.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  on ? "bg-indigo-500 text-white" : "text-slate-700 dark:text-slate-200"
                )}
              >
                <Icon className={cn("h-4 w-4", on ? "text-white" : "text-slate-400")} />
                <span className="flex-1">{c.label}</span>
                {on ? <CornerDownLeft className="h-3.5 w-3.5 text-white/80" /> : <span className="text-[11px] text-slate-400">{c.hint}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
