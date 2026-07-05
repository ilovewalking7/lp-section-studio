import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・オーロラCTA",
  category: "マーケティング",
  description: "ゆらめくオーロラ/グラデーション背景の上にメール取得フォームを置いたCTAバンド。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

export default function AuroraCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 sm:px-8">
      <style>{`
        @keyframes aurora-drift {
          0% { transform: translate3d(-10%, -10%, 0) rotate(0deg) scale(1.2); }
          50% { transform: translate3d(10%, 5%, 0) rotate(180deg) scale(1.4); }
          100% { transform: translate3d(-10%, -10%, 0) rotate(360deg) scale(1.2); }
        }
      `}</style>
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-neutral-950" />
        <div
          className="absolute -z-10 h-[140%] w-[140%] opacity-70 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #ec4899, #8b5cf6, #22d3ee, #6366f1)",
            animation: "aurora-drift 14s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-neutral-950/55" />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />{" "}
          {en ? "Early access open" : "早期アクセス受付中"}
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          {en ? "Your next move, starting today." : "次の一手を、今日から。"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
          {en
            ? "Just enter your email. Get the latest news and exclusive features first."
            : "メールを登録するだけ。最新情報と限定機能をいち早くお届けします。"}
        </p>

        {sent ? (
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm font-medium text-emerald-200">
            {en
              ? "Thanks for signing up. We've sent you a confirmation email."
              : "登録ありがとうございます。確認メールをお送りしました。"}
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
            >
              {en ? "Sign up" : "登録する"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
