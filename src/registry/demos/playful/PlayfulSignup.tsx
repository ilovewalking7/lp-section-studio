import { useState } from "react";
import { Mail, User, Sparkles, Check, PartyPopper } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ・サインアップ",
  category: "プレイフル",
  description: "成功状態つきの丸くてフレンドリーな登録フォーム。",
  align: "center",
  isNew: true,
  tags: ["playful", "rounded", "form"],
};

export default function PlayfulSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) setDone(true);
  };

  return (
    <div className="font-rounded w-full max-w-sm overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-[0_12px_0_#eef1f4]">
      {done ? (
        <div className="flex flex-col items-center py-6 text-center">
          <div
            className="mb-5 inline-flex size-20 animate-bounce items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "#06d6a0", animationDuration: "1.6s" }}
          >
            <PartyPopper className="size-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800">
            {en ? <>Welcome, {name}!</> : <>ようこそ、{name}さん！</>}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {en
              ? "We've sent you a confirmation email. Let's get started!"
              : "確認メールを送りました。さっそくはじめましょう。"}
          </p>
          <button
            onClick={() => {
              setDone(false);
              setName("");
              setEmail("");
            }}
            className="mt-6 rounded-full px-6 py-2.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 active:translate-y-1"
            style={{ backgroundColor: "#4cc9f0", boxShadow: "0 6px 0 #37a8cc" }}
          >
            {en ? "Again" : "もう一度"}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <div
              className="mb-3 inline-flex size-14 items-center justify-center rounded-2xl text-white"
              style={{ backgroundColor: "#ff8fab" }}
            >
              <Sparkles className="size-7" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800">{en ? "Nice to meet you!" : "はじめまして！"}</h3>
            <p className="mt-1 text-sm text-slate-500">{en ? "Create an account in 30 seconds." : "30秒でアカウント作成。"}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-slate-600">{en ? "Name" : "おなまえ"}</span>
              <div className="relative">
                <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-300" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={en ? "Jane Doe" : "やまだ はなこ"}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-[#ff8fab] focus:bg-white"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-slate-600">{en ? "Email" : "メール"}</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition-colors placeholder:text-slate-300 focus:border-[#4cc9f0] focus:bg-white"
                />
              </div>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 active:translate-y-1"
              style={{ backgroundColor: "#ff8fab", boxShadow: "0 6px 0 #e26d8c" }}
            >
              <Check className="size-4" strokeWidth={3} /> {en ? "Sign up free" : "無料で登録する"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            {en
              ? "By signing up you agree to our terms of service."
              : "登録すると利用規約に同意したことになります。"}
          </p>
        </>
      )}
    </div>
  );
}
