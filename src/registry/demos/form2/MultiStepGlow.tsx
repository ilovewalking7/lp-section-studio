import { useState } from "react";
import { ChevronLeft, ChevronRight, User, Building2, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マルチステップ・グロウ",
  category: "フォーム",
  description: "進捗バー付きの段階フォーム。ステップ移動でグローが流れる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

const STEPS = [
  { icon: User, label: "個人情報", labelEn: "Personal" },
  { icon: Building2, label: "会社情報", labelEn: "Company" },
  { icon: CreditCard, label: "お支払い", labelEn: "Payment" },
];

export default function MultiStepGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [card, setCard] = useState("");

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <style>{`@keyframes msg-flow{0%{background-position:0% 0}100%{background-position:200% 0}}`}</style>

      <div className="mb-6">
        <div className="mb-3 flex justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i <= step;
            return (
              <div key={s.labelEn} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                    active
                      ? "border-violet-500 bg-violet-500 text-white shadow-lg shadow-violet-500/40"
                      : "border-slate-300 text-slate-400 dark:border-slate-700"
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={cn("text-[11px]", active ? "font-medium text-violet-600 dark:text-violet-300" : "text-slate-400")}>{en ? s.labelEn : s.label}</span>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#ec4899,#8b5cf6)] bg-[length:200%_100%] transition-all duration-500"
            style={{ width: `${pct}%`, animation: "msg-flow 2s linear infinite" }}
          />
        </div>
      </div>

      <div className="min-h-[120px]">
        {step === 0 && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Full name" : "お名前"}</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={en ? "John Smith" : "山田 太郎"}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-slate-700 dark:text-white" />
          </label>
        )}
        {step === 1 && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Company name" : "会社名"}</span>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder={en ? "Acme Inc." : "株式会社サンプル"}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-slate-700 dark:text-white" />
          </label>
        )}
        {step === 2 && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Card number" : "カード番号"}</span>
            <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric"
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-slate-700 dark:text-white" />
          </label>
        )}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" /> {en ? "Back" : "戻る"}
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-700 disabled:opacity-40"
        >
          {step === STEPS.length - 1 ? (en ? "Done" : "完了") : (en ? "Next" : "次へ")} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
