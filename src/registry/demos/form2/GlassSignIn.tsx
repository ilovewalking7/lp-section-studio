import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・サインイン",
  category: "フォーム",
  description: "ぼかしガラス質感のサインインカード。フォーカスでグローが灯る。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function GlassSignIn() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-6 sm:p-10">
      <style>{`
        @keyframes gsi-blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(.95)} }
        @keyframes gsi-glow { 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>
      <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-indigo-500/40 blur-3xl" style={{ animation: "gsi-blob 9s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/40 blur-3xl" style={{ animation: "gsi-blob 11s ease-in-out infinite reverse" }} />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-6">
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-white shadow-lg">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold text-white">{en ? "Welcome back" : "おかえりなさい"}</h2>
          <p className="text-sm text-white/60">{en ? "Sign in to your account" : "アカウントにサインイン"}</p>
        </div>

        <label className="mb-4 block">
          <span className="mb-1.5 block text-xs font-medium text-white/70">{en ? "Email address" : "メールアドレス"}</span>
          <div className="group relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 transition-colors group-focus-within:text-indigo-300" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition-shadow focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>
        </label>

        <label className="mb-4 block">
          <span className="mb-1.5 block text-xs font-medium text-white/70">{en ? "Password" : "パスワード"}</span>
          <div className="group relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 transition-colors group-focus-within:text-indigo-300" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/40 outline-none transition-shadow focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/40"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              aria-label={en ? "Toggle password visibility" : "パスワードの表示切替"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        <div className="mb-5 flex items-center justify-between text-xs">
          <label className="flex cursor-pointer items-center gap-2 text-white/70">
            <button
              type="button"
              role="checkbox"
              aria-checked={remember}
              onClick={() => setRemember((r) => !r)}
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded border transition-colors",
                remember ? "border-indigo-400 bg-indigo-500" : "border-white/30 bg-transparent"
              )}
            >
              {remember && <span className="text-[10px] leading-none text-white">✓</span>}
            </button>
            {en ? "Keep me signed in" : "ログイン状態を保持"}
          </label>
          <a href="#" className="text-indigo-300 hover:text-indigo-200">{en ? "Forgot?" : "お忘れですか？"}</a>
        </div>

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02] active:scale-95"
        >
          {en ? "Sign in" : "サインイン"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
