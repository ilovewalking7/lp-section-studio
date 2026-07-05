import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フローティングラベル",
  category: "フォーム",
  description: "入力するとラベルが上へ浮上する。下線がスッと伸びる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

function Field({ id, label, type = "text", value, onChange }: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="peer w-full border-0 border-b-2 border-slate-300 bg-transparent pb-2 pt-5 text-sm outline-none transition-colors dark:border-slate-700 dark:text-white"
      />
      <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-indigo-500 transition-transform duration-300 peer-focus:scale-x-100" />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-200",
          floated ? "top-0 text-xs text-indigo-500" : "top-5 text-sm text-slate-400"
        )}
      >
        {label}
      </label>
    </div>
  );
}

export default function FloatingLabelForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-7 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Create account" : "アカウント登録"}</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-7">
        <Field id="fl-name" label={en ? "Name" : "お名前"} value={name} onChange={setName} />
        <Field id="fl-email" label={en ? "Email address" : "メールアドレス"} type="email" value={email} onChange={setEmail} />
        <Field id="fl-pw" label={en ? "Password" : "パスワード"} type="password" value={password} onChange={setPassword} />
        <button type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-700 active:scale-95">
          {en ? "Continue" : "続ける"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
