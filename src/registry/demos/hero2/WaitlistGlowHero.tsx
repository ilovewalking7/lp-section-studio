import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ウェイトリスト・グロー",
  category: "ヒーロー・LP",
  description: "光るリングのメール登録フォーム。送信で成功状態へ切り替わる。",
  align: "full",
  isNew: true,
  tags: ["hero", "animation"],
};

export default function WaitlistGlowHero() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#05050a] py-32 text-white">
      <style>{`
        @keyframes wg-spin{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){.wg-ring{animation:none!important}}
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[100px]" />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur">
          🔒 {en ? "Exclusive early access" : "限定先行アクセス"}
        </span>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">
          {en ? "Be the very first to try it." : "いちばん最初に、触れる。"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/55">
          {en
            ? "A pre-release product, for a chosen few. Just your email to join."
            : "リリース前のプロダクトを、選ばれた人だけに。登録はメールアドレスだけ。"}
        </p>

        <div className="relative mx-auto mt-9 max-w-md">
          <div
            className="wg-ring absolute -inset-0.5 rounded-xl opacity-70 blur-[6px]"
            style={{
              background:
                "conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)",
              animation: "wg-spin 6s linear infinite",
            }}
          />
          {done ? (
            <div className="relative flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0c0c14] px-5 py-4 text-sm font-medium text-emerald-300">
              <Check className="size-4" />
              {en ? "You're in! We'll notify you when it's your turn." : "登録完了！順番が来たらお知らせします。"}
            </div>
          ) : (
            <form onSubmit={submit} className="relative flex gap-2 rounded-xl border border-white/10 bg-[#0c0c14] p-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Mail className="size-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
              <Button type="submit" className="group bg-white text-black hover:bg-white/90">
                {en ? "Join" : "登録"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>
          )}
        </div>
        <p className="mt-3 text-xs text-white/35">
          {en ? "Over 3,200 people already waiting." : "既に 3,200 人以上が待機中。"}
        </p>
      </div>
    </section>
  );
}
