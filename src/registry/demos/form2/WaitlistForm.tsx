import { useState } from "react";
import { Mail, Check, Users } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェイトリスト登録",
  category: "フォーム",
  description: "順番待ちリスト登録。成功時にチェックがポップする。",
  align: "center",
  isNew: true,
  tags: ["form", "auth", "animation"],
};

export default function WaitlistForm() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center shadow-xl">
      <style>{`@keyframes wl-pop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.2) rotate(8deg)}100%{transform:scale(1) rotate(0);opacity:1}}@keyframes wl-pulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}50%{box-shadow:0 0 0 14px rgba(16,185,129,0)}}`}</style>

      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-emerald-300">
        <Users className="h-3.5 w-3.5" /> {en ? "2,481 already joined" : "2,481人が登録済み"}
      </div>
      <h2 className="mb-1.5 text-2xl font-bold text-white">{en ? "Join early access" : "早期アクセスに参加"}</h2>
      <p className="mb-6 text-sm text-white/60">{en ? "Be the first to know when we launch." : "公開時に真っ先にお知らせします。"}</p>

      {done ? (
        <div className="flex flex-col items-center gap-3 py-2">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500"
            style={{ animation: "wl-pop .5s ease-out, wl-pulse 1.8s ease-out .5s infinite" }}
          >
            <Check className="h-7 w-7 text-white" />
          </div>
          <p className="text-sm font-medium text-white">{en ? "You're on the list! Hang tight." : "登録完了！順番をお待ちください。"}</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
          className="flex flex-col gap-2.5 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95"
          >
            {en ? "Join" : "参加する"}
          </button>
        </form>
      )}
    </div>
  );
}
