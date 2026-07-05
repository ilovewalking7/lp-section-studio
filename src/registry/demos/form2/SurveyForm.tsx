import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アンケートフォーム",
  category: "フォーム",
  description: "単一選択＋自由記述のアンケート。選択肢が滑らかに点灯。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

const ROLES = [
  { ja: "エンジニア", en: "Engineer" },
  { ja: "デザイナー", en: "Designer" },
  { ja: "プロダクトマネージャー", en: "Product manager" },
  { ja: "経営者", en: "Executive" },
  { ja: "その他", en: "Other" },
];
const FREQ = [
  { ja: "毎日", en: "Daily" },
  { ja: "週数回", en: "A few times a week" },
  { ja: "たまに", en: "Occasionally" },
];

export default function SurveyForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [role, setRole] = useState("");
  const [freq, setFreq] = useState("週数回");
  const [comment, setComment] = useState("");

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Quick survey" : "かんたんアンケート"}</h2>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{en ? "Takes about a minute." : "1分で完了します。"}</p>

      <fieldset className="mb-6">
        <legend className="mb-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "What's your role?" : "あなたの職種は？"}</legend>
        <div className="space-y-2">
          {ROLES.map((r) => {
            const active = role === r.ja;
            return (
              <button key={r.ja} type="button" onClick={() => setRole(r.ja)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-all",
                  active
                    ? "border-violet-500 bg-violet-50 text-violet-700 shadow-sm dark:bg-violet-500/10 dark:text-violet-200"
                    : "border-slate-300 text-slate-600 hover:border-violet-300 dark:border-slate-700 dark:text-slate-300"
                )}>
                <span className={cn("flex h-4 w-4 items-center justify-center rounded-full border transition-all", active ? "border-violet-500 bg-violet-500" : "border-slate-400")}>
                  {active && <Check className="h-2.5 w-2.5 text-white" />}
                </span>
                {en ? r.en : r.ja}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "How often do you use it?" : "利用頻度は？"}</legend>
        <div className="flex gap-2">
          {FREQ.map((f) => (
            <button key={f.ja} type="button" onClick={() => setFreq(f.ja)}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                freq === f.ja
                  ? "border-violet-500 bg-violet-500 text-white shadow-md shadow-violet-500/30"
                  : "border-slate-300 text-slate-600 hover:border-violet-300 dark:border-slate-700 dark:text-slate-300"
              )}>
              {en ? f.en : f.ja}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Comments (optional)" : "ご意見（任意）"}</span>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder={en ? "What could we improve?…" : "改善してほしい点など…"}
          className="w-full resize-none rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25 dark:border-slate-700 dark:text-white" />
      </label>

      <button type="button"
        className="mt-5 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700 active:scale-95">
        {en ? "Submit response" : "回答を送信"}
      </button>
    </div>
  );
}
