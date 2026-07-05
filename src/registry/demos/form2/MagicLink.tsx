import { useState } from "react";
import { Mail, Wand2, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マジックリンク",
  category: "フォーム",
  description: "パスワード不要のメールリンク認証。送信後に封筒が舞う。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function MagicLink() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50 to-white p-8 text-center shadow-xl dark:border-indigo-500/20 dark:from-indigo-950 dark:to-slate-900">
      <style>{`@keyframes ml-float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-8px) rotate(4deg)}}@keyframes ml-pop{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>

      {sent ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg" style={{ animation: "ml-float 3s ease-in-out infinite" }}>
              <Mail className="h-7 w-7" />
            </div>
            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow" style={{ animation: "ml-pop .4s ease-out" }}>
              <Check className="h-3.5 w-3.5" />
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{en ? "Check your email" : "メールを確認してください"}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {en ? (
                <>
                  We sent a login link to <span className="font-medium text-indigo-600 dark:text-indigo-300">{email}</span>.
                </>
              ) : (
                <>
                  <span className="font-medium text-indigo-600 dark:text-indigo-300">{email}</span> にログインリンクを送信しました。
                </>
              )}
            </p>
          </div>
          <button type="button" onClick={() => setSent(false)} className="text-sm text-indigo-600 hover:underline dark:text-indigo-300">
            {en ? "Try a different email" : "別のメールで試す"}
          </button>
        </div>
      ) : (
        <>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg" style={{ animation: "ml-float 3s ease-in-out infinite" }}>
            <Wand2 className="h-6 w-6" />
          </div>
          <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Sign in with a magic link" : "マジックリンクでログイン"}</h2>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{en ? "No password needed. We'll send you a link." : "パスワード不要。リンクを送ります。"}</p>
          <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}>
            <div className="group relative mb-3">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
            </div>
            <button type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 active:scale-95">
              {en ? "Send link" : "リンクを送信"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
