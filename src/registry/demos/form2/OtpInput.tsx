import { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "OTPコード入力",
  category: "フォーム",
  description: "6桁ワンタイムコード。自動フォーカス送り・貼り付け対応。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function OtpInput() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const LEN = 6;
  const [vals, setVals] = useState<string[]>(Array(LEN).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const complete = vals.every((v) => v !== "");

  const setAt = (i: number, v: string) => {
    setVals((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const handleChange = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(-1);
    setAt(i, v);
    if (v && i < LEN - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN).split("");
    if (digits.length) {
      const next = Array(LEN).fill("").map((_, i) => digits[i] ?? "");
      setVals(next);
      refs.current[Math.min(digits.length, LEN - 1)]?.focus();
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <style>{`@keyframes otp-bounce{0%{transform:scale(.8)}50%{transform:scale(1.08)}100%{transform:scale(1)}}`}</style>
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Verify it's you" : "本人確認"}</h2>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{en ? "Enter the 6-digit code sent via SMS" : "SMSに届いた6桁のコードを入力"}</p>

      <div className="mb-6 flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {vals.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={v}
            inputMode="numeric"
            maxLength={1}
            aria-label={en ? `Code digit ${i + 1}` : `コード ${i + 1} 桁目`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            className={cn(
              "h-12 w-10 rounded-lg border-2 text-center text-lg font-semibold outline-none transition-all sm:h-14 sm:w-12",
              v
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200"
                : "border-slate-300 dark:border-slate-700 dark:text-white",
              "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            )}
            style={v ? { animation: "otp-bounce .25s ease-out" } : undefined}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={!complete}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {en ? "Verify" : "確認する"}
      </button>
      <p className="mt-4 text-xs text-slate-400">{en ? "Didn't get the code? " : "コードが届かない？ "}<button type="button" className="text-indigo-500 hover:underline">{en ? "Resend" : "再送信"}</button></p>
    </div>
  );
}
