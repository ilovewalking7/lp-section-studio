import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・ログイン",
  category: "グラスモーフィズム",
  description: "オーシャン調のグラデーション上に浮かぶフロステッドなログインフォーム。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "login", "form"],
};

export default function GlassLogin() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 size-72 rounded-full bg-cyan-300/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-12 size-80 rounded-full bg-violet-500/40 blur-3xl"
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="text-2xl font-semibold text-white">
          {en ? "Welcome back" : "おかえりなさい"}
        </h2>
        <p className="mt-1.5 text-sm text-white/75">
          {en ? "Sign in to your account." : "アカウントにサインインしてください。"}
        </p>

        <div className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/90">
              {en ? "Email" : "メールアドレス"}
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 backdrop-blur focus-within:border-white/50">
              <Mail className="size-4 text-white/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/90">
              {en ? "Password" : "パスワード"}
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 backdrop-blur focus-within:border-white/50">
              <Lock className="size-4 text-white/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </label>
        </div>

        <div className="mt-3 text-right">
          <a href="#" className="text-xs text-white/70 hover:text-white">
            {en ? "Forgot password?" : "パスワードをお忘れですか？"}
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-white/90"
        >
          {en ? "Sign in" : "サインイン"}
        </button>

        <p className="mt-5 text-center text-xs text-white/70">
          {en ? "Don't have an account? " : "アカウントをお持ちでない方は"}
          {" "}
          <a href="#" className="font-semibold text-white hover:underline">
            {en ? "Sign up" : "新規登録"}
          </a>
        </p>
      </form>
    </div>
  );
}
