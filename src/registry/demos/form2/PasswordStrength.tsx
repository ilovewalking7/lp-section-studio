import { useState } from "react";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パスワード強度メーター",
  category: "フォーム",
  description: "入力に応じて強度バーと条件チェックがリアルタイム更新。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function PasswordStrength() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const checks = [
    { label: "8文字以上", labelEn: "At least 8 characters", ok: pw.length >= 8 },
    { label: "大文字を含む", labelEn: "Contains uppercase", ok: /[A-Z]/.test(pw) },
    { label: "数字を含む", labelEn: "Contains a number", ok: /\d/.test(pw) },
    { label: "記号を含む", labelEn: "Contains a symbol", ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const levels = en
    ? ["", "Weak", "Fair", "Strong", "Very strong"]
    : ["", "弱い", "普通", "強い", "非常に強い"];
  const colors = ["bg-slate-200", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Set a password" : "パスワードを設定"}</h2>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "New password" : "新しいパスワード"}</span>
        <div className="group relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 dark:border-slate-700 dark:text-white"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={en ? "Toggle visibility" : "表示切替"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </label>

      <div className="mb-1 mt-4 flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={cn("h-full rounded-full transition-all duration-500", i < score ? colors[score] : "bg-transparent")} />
          </div>
        ))}
      </div>
      <p className={cn("mb-4 text-xs font-medium transition-colors", score >= 3 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500")}>
        {en ? "Strength: " : "強度: "}{levels[score] || (en ? "Empty" : "未入力")}
      </p>

      <ul className="grid grid-cols-2 gap-2">
        {checks.map((c) => (
          <li key={c.label} className={cn("flex items-center gap-1.5 text-xs transition-colors", c.ok ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400")}>
            <span className={cn("flex h-4 w-4 items-center justify-center rounded-full transition-colors", c.ok ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400 dark:bg-slate-800")}>
              {c.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </span>
            {en ? c.labelEn : c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
