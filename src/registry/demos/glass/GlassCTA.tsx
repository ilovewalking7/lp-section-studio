import { ArrowRight, Rocket } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・CTAバンド",
  category: "グラスモーフィズム",
  description: "鮮烈なグラデーションの上に、フロステッドガラスのCTAバンドを配置。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "cta"],
};

export default function GlassCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-indigo-700 via-fuchsia-600 to-rose-500 px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-cyan-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-amber-300/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Rocket className="size-3.5" />
            {en ? "Get started now" : "今すぐ始めよう"}
          </span>

          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {en ? (
              <>
                Give your next project
                <br className="hidden sm:block" />
                the best experience.
              </>
            ) : (
              <>
                次のプロジェクトを、
                <br className="hidden sm:block" />
                最高の体験で。
              </>
            )}
          </h2>

          <p className="max-w-lg text-pretty text-white/80">
            {en
              ? "No credit card required. Set up in minutes and start building frosted UIs right away."
              : "クレジットカード不要。数分でセットアップし、すぐにフロステッドなUIを構築できます。"}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-white/90 sm:w-auto">
              {en ? "Start for free" : "無料で始める"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto">
              {en ? "Book a demo" : "デモを予約"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
