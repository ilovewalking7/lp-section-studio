import { useState } from "react";
import { User, Mail, Lock, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・サインアップ",
  category: "フォーム",
  description: "新規登録ガラスカード。規約同意のチェックがアニメーション。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function GlassSignUp() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const fields = [
    { key: "name", label: "お名前", labelEn: "Name", icon: User, type: "text", value: name, set: setName, ph: "山田 太郎", phEn: "Jane Doe" },
    { key: "email", label: "メール", labelEn: "Email", icon: Mail, type: "email", value: email, set: setEmail, ph: "you@example.com", phEn: "you@example.com" },
    { key: "password", label: "パスワード", labelEn: "Password", icon: Lock, type: "password", value: password, set: setPassword, ph: "••••••••", phEn: "••••••••" },
  ];

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 p-6 sm:p-10">
      <style>{`@keyframes gsu-shine{from{background-position:0% 50%}to{background-position:200% 50%}}`}</style>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-2 text-white/90">
          <Sparkles className="h-5 w-5 text-violet-300" />
          <h2 className="text-xl font-semibold">{en ? "Create account" : "アカウントを作成"}</h2>
        </div>

        {fields.map((f) => {
          const Icon = f.icon;
          return (
            <label key={f.key} className="mb-4 block">
              <span className="mb-1.5 block text-xs font-medium text-white/70">{en ? f.labelEn : f.label}</span>
              <div className="group relative">
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 transition-colors group-focus-within:text-violet-300" />
                <input
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={en ? f.phEn : f.ph}
                  className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition-shadow focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/40"
                />
              </div>
            </label>
          );
        })}

        <label className="mb-5 flex cursor-pointer items-start gap-2.5 text-xs text-white/70">
          <button
            type="button"
            role="checkbox"
            aria-checked={agree}
            onClick={() => setAgree((a) => !a)}
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
              agree ? "scale-110 border-violet-400 bg-violet-500" : "border-white/30"
            )}
          >
            {agree && <Check className="h-3 w-3 text-white" />}
          </button>
          <span>
            {en ? (
              <>
                I agree to the <a href="#" className="text-violet-300 underline">Terms of Service</a> and
                <a href="#" className="text-violet-300 underline"> Privacy Policy</a>
              </>
            ) : (
              <>
                <a href="#" className="text-violet-300 underline">利用規約</a> と
                <a href="#" className="text-violet-300 underline"> プライバシーポリシー</a> に同意します
              </>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={!agree}
          className="w-full rounded-lg bg-[linear-gradient(110deg,#7c3aed,#a855f7,#7c3aed)] bg-[length:200%_100%] py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ animation: agree ? "gsu-shine 3s linear infinite" : undefined }}
        >
          {en ? "Sign up" : "登録する"}
        </button>
      </form>
    </div>
  );
}
