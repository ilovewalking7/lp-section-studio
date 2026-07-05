import { useState } from "react";
import { Eye, EyeOff, Fingerprint, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトログイン",
  category: "ニューモーフィズム",
  description: "押し込み式の入力欄を備えた、柔らかなログインフォーム。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "login", "form"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]";

export default function SoftLogin() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-[#e0e5ec] p-8 text-slate-600", RAISED)}>
      <div className={cn("mx-auto grid size-14 place-items-center rounded-2xl bg-[#e0e5ec] text-indigo-500", RAISED)}>
        <Fingerprint className="size-7" />
      </div>
      <h3 className="mt-5 text-center text-xl font-semibold text-slate-700">
        {en ? "Welcome back" : "おかえりなさい"}
      </h3>
      <p className="mt-1 text-center text-sm text-slate-500">
        {en ? "Log in to your account" : "アカウントにログイン"}
      </p>

      <form className="mt-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-500">
            {en ? "Email" : "メールアドレス"}
          </span>
          <div className={cn("flex items-center gap-3 rounded-2xl bg-[#e0e5ec] px-4", INSET)}>
            <Mail className="size-4 shrink-0 text-slate-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-slate-500">
            {en ? "Password" : "パスワード"}
          </span>
          <div className={cn("flex items-center gap-3 rounded-2xl bg-[#e0e5ec] px-4", INSET)}>
            <Lock className="size-4 shrink-0 text-slate-400" />
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-transparent py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              aria-label={show ? (en ? "Hide" : "隠す") : en ? "Show" : "表示"}
              onClick={() => setShow((v) => !v)}
              className="shrink-0 text-slate-400 transition hover:text-slate-600"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setRemember((v) => !v)}
            className="flex items-center gap-2 text-sm text-slate-500"
          >
            <span
              className={cn(
                "grid size-5 place-items-center rounded-md bg-[#e0e5ec] transition",
                remember ? cn(INSET, "text-indigo-500") : RAISED,
              )}
            >
              {remember && <span className="text-[11px] leading-none">✓</span>}
            </span>
            {en ? "Remember me" : "記憶する"}
          </button>
          <a href="#" className="text-sm font-medium text-indigo-500">
            {en ? "Forgot?" : "お忘れですか？"}
          </a>
        </div>

        <button
          type="submit"
          className={cn("mt-2 w-full rounded-2xl bg-[#e0e5ec] py-3 text-sm font-semibold text-indigo-600 transition active:scale-[0.98]", RAISED)}
        >
          {en ? "Log in" : "ログイン"}
        </button>
      </form>
    </div>
  );
}
