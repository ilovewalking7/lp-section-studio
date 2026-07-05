import { ArrowRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・ヒーロー",
  category: "グラスモーフィズム",
  description: "鮮やかなグラデーションとぼかしブロブの上にフロステッドガラスのカードを重ねたヒーロー。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "blur", "hero"],
};

export default function GlassHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-rose-500 via-fuchsia-600 to-indigo-700 px-6 py-28 sm:py-36">
      {/* color blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[-6rem] size-[28rem] rounded-full bg-amber-400/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-[-8rem] size-[32rem] rounded-full bg-cyan-400/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[24rem] -translate-x-1/2 rounded-full bg-violet-500/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Sparkles className="size-3.5" />
            {en ? "A new design experience" : "新しいデザイン体験"}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {en ? (
              <>
                A translucent,
                <br className="hidden sm:block" />
                next-generation interface.
              </>
            ) : (
              <>
                透明感のある、
                <br className="hidden sm:block" />
                次世代のインターフェース。
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-pretty text-base text-white/80 sm:text-lg">
            {en
              ? "Frosted glass textures combine depth and refinement. Build UIs that elevate your content, instantly."
              : "フロステッドガラスの質感で、奥行きと洗練を両立。コンテンツを引き立てるUIを、すぐに。"}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-white/90 sm:w-auto">
              {en ? "Get started" : "はじめる"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto">
              {en ? "Learn more" : "詳しく見る"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
