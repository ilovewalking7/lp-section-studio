import { useState } from "react";
import { Send, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ニュースレター・グロウ",
  category: "フォーム",
  description: "回転するグラデ枠の購読フォーム。送信でボタンが弾ける。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function NewsletterGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <style>{`
        @keyframes ng-spin{to{transform:rotate(360deg)}}
        @keyframes ng-pop{0%{transform:scale(.9)}60%{transform:scale(1.06)}100%{transform:scale(1)}}
      `}</style>
      <div className="relative overflow-hidden rounded-2xl p-[1.5px]">
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#6366f1,#ec4899,#f59e0b,#6366f1)]" style={{ animation: "ng-spin 6s linear infinite" }} />
        <div className="relative rounded-2xl bg-slate-950 p-7 text-center">
          <h2 className="mb-1.5 text-xl font-semibold text-white">{en ? "Get the latest updates" : "最新情報を受け取る"}</h2>
          <p className="mb-6 text-sm text-white/60">{en ? "A handpicked digest delivered once a week." : "週に一度、厳選した記事をお届けします。"}</p>

          <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setOk(true); }} className="flex flex-col gap-2.5 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/30"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-105 active:scale-95"
              style={ok ? { animation: "ng-pop .4s ease-out" } : undefined}
            >
              {ok ? <><Check className="h-4 w-4" /> {en ? "Subscribed" : "登録済み"}</> : <><Send className="h-4 w-4" /> {en ? "Subscribe" : "購読"}</>}
            </button>
          </form>
          <p className="mt-3 text-[11px] text-white/40">{en ? "Unsubscribe anytime. No spam, ever." : "いつでも解除できます。スパムはありません。"}</p>
        </div>
      </div>
    </div>
  );
}
