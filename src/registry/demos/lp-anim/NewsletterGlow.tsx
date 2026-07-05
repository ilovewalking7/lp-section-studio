import { useState } from "react";
import { Check, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・ニュースレター発光",
  category: "マーケティング",
  description: "脈打つグロー背景と、送信時の成功アニメ付きニュースレター登録。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

export default function NewsletterGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 900);
  }

  return (
    <section className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8">
      <style>{`
        @keyframes nl-pulse { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity: .7; transform: scale(1.08); } }
        @keyframes nl-pop { 0% { transform: scale(0); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
      `}</style>
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center sm:px-12">
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 blur-[90px]"
          style={{ animation: "nl-pulse 4s ease-in-out infinite" }}
        />
        <div className="relative z-10">
          <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-indigo-300 ring-1 ring-white/10">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {en ? "Weekly newsletter" : "週刊ニュースレター"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
            {en
              ? "The latest product news and practical, field-tested insights every week. Unsubscribe anytime."
              : "プロダクトの最新情報と、現場で使える知見を毎週お届け。いつでも解除できます。"}
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              disabled={state === "done"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state !== "idle"}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold transition",
                state === "done"
                  ? "bg-emerald-500 text-white"
                  : "bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-70",
              )}
            >
              {state === "done" ? (
                <>
                  <Check className="h-4 w-4" style={{ animation: "nl-pop 0.5s ease-out" }} />{" "}
                  {en ? "Done" : "完了"}
                </>
              ) : state === "loading" ? (
                en ? (
                  "Sending…"
                ) : (
                  "送信中…"
                )
              ) : (
                <>
                  {en ? "Subscribe" : "登録"} <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div
            className={cn(
              "mt-4 text-sm text-emerald-300 transition-all duration-500",
              state === "done" ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            {en
              ? "Thanks for subscribing. Please check your inbox for a confirmation."
              : "ご登録ありがとうございます。確認メールをご確認ください。"}
          </div>
        </div>
      </div>
    </section>
  );
}
