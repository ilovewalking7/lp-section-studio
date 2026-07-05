import { useState } from "react";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "お問い合わせフォーム",
  category: "フォーム",
  description: "名前・メール・本文の問い合わせ。フォーカスで枠線が伸びる。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function ContactForm() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">{en ? "Contact Us" : "お問い合わせ"}</h2>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{en ? "We usually reply within one business day." : "通常1営業日以内に返信します。"}</p>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Name" : "お名前"}</span>
          <div className="group relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-sky-500" />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={en ? "John Smith" : "山田 太郎"}
              className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 dark:border-slate-700 dark:text-white" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Email" : "メール"}</span>
          <div className="group relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-sky-500" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 dark:border-slate-700 dark:text-white" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{en ? "Message" : "メッセージ"}</span>
          <div className="group relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-sky-500" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={en ? "How can we help you?" : "ご用件をご記入ください…"}
              className="w-full resize-none rounded-lg border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25 dark:border-slate-700 dark:text-white" />
          </div>
        </label>

        <button type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-700 active:scale-95">
          {en ? "Send" : "送信する"} <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </button>
      </form>
    </div>
  );
}
