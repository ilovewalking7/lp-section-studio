import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソーシャルログイン",
  category: "フォーム",
  description: "Google/GitHub/Apple のSVGボタン＋メール。ホバーで浮上。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 1a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-1.9c-3.06.67-3.7-1.3-3.7-1.3-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.47-2.44-.28-5-1.22-5-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.57 5.16-5.02 5.43.4.34.74 1 .74 2.03v3c0 .3.2.64.76.53A11 11 0 0 0 12 1Z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.37 12.78c.02 2.35 2.06 3.13 2.08 3.14-.02.05-.33 1.13-1.08 2.24-.65.96-1.32 1.92-2.39 1.94-1.04.02-1.38-.62-2.57-.62-1.2 0-1.57.6-2.55.64-1.02.04-1.8-1.04-2.46-2-1.35-1.95-2.38-5.52-1-7.93a3.83 3.83 0 0 1 3.24-1.97c1.01-.02 1.96.68 2.57.68.62 0 1.77-.84 2.99-.72.51.02 1.94.21 2.86 1.55-.07.05-1.71 1-1.69 2.98ZM14.46 4.6c.54-.66.9-1.57.8-2.48-.78.03-1.72.52-2.27 1.17-.5.58-.93 1.5-.82 2.4.87.06 1.76-.44 2.29-1.09Z" />
    </svg>
  );
}

export default function SocialLogin() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const providers = [
    { name: "Google", icon: <GoogleIcon /> },
    { name: "GitHub", icon: <GithubIcon /> },
    { name: "Apple", icon: <AppleIcon /> },
  ];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-1 text-center text-xl font-semibold text-slate-900 dark:text-white">{en ? "Sign in" : "ログイン"}</h2>
      <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">{en ? "Choose your preferred method" : "お好みの方法でどうぞ"}</p>

      <div className="space-y-2.5">
        {providers.map((p) => (
          <button
            key={p.name}
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {p.icon} {en ? `Continue with ${p.name}` : `${p.name} で続行`}
          </button>
        ))}
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" /> {en ? "or" : "または"} <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="group relative mb-3">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-700 dark:group-focus-within:text-white" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 dark:border-slate-700 dark:text-white" />
        </div>
        <button type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
          {en ? "Continue with email" : "メールで続行"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
