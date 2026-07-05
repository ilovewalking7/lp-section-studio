import { useState } from "react";
import { Bell, Moon, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "設定パネル",
  category: "フォーム",
  description: "トグル付き設定パネル。スイッチが滑らかにスライド。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

type Toggle = { key: string; icon: typeof Bell; label: string; labelEn: string; desc: string; descEn: string };

const ITEMS: Toggle[] = [
  { key: "notify", icon: Bell, label: "通知", labelEn: "Notifications", desc: "重要な更新をメールで受け取る", descEn: "Get important updates by email" },
  { key: "dark", icon: Moon, label: "ダークモード", labelEn: "Dark mode", desc: "暗い配色を使用する", descEn: "Use a dark color scheme" },
  { key: "public", icon: Globe, label: "公開プロフィール", labelEn: "Public profile", desc: "誰でも閲覧可能にする", descEn: "Make it visible to everyone" },
  { key: "twofa", icon: Lock, label: "二段階認証", labelEn: "Two-factor auth", desc: "ログイン時に追加確認", descEn: "Extra check at sign-in" },
];

export default function SettingsPanel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [state, setState] = useState<Record<string, boolean>>({
    notify: true,
    dark: false,
    public: true,
    twofa: false,
  });

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Settings" : "設定"}</h2>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          const on = state[it.key];
          return (
            <div key={it.key} className="flex items-center gap-4 py-4">
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors", on ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" : "bg-slate-100 text-slate-400 dark:bg-slate-800")}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{en ? it.labelEn : it.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{en ? it.descEn : it.desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={en ? it.labelEn : it.label}
                onClick={() => setState((s) => ({ ...s, [it.key]: !s[it.key] }))}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                  on ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-700"
                )}
              >
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300", on ? "translate-x-[22px]" : "translate-x-0.5")} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
