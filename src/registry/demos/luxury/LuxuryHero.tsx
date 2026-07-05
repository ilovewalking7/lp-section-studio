import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・ヒーロー",
  category: "ラグジュアリー",
  description: "漆黒の背景に金のセリフ見出しと細罫の CTA を据えた高級ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "hero"],
  principle: "黒地×金・広い余白・細い線が視線を一点に集め、希少性と格を感じさせる。",
};

export default function LuxuryHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] px-6 py-24 text-stone-100 sm:py-32">
      {/* ほのかな金のオーラ */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,179,90,0.14),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#d4af37_1px,transparent_1px),linear-gradient(to_bottom,#d4af37_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-amber-300/80">
          Maison · Est. 1924
        </p>

        <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <h1 className="mt-8 font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Timeless
              <span className="mt-2 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Aesthetic Perfection
              </span>
            </>
          ) : (
            <>
              時を超える
              <span className="mt-2 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                完璧なる美学
              </span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
          {en
            ? "A collection crafted piece by piece by master artisans, reserved for the discerning few. The luxury not of owning, but of passing on."
            : "熟練の職人が一点ずつ仕立てる、限られた人のためのコレクション。所有ではなく、継承するという贅沢を。"}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-amber-400/40 px-9 py-3.5 text-[11px] uppercase tracking-[0.3em] text-amber-200 transition-colors hover:text-[#0a0a0a]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">{en ? "View Collection" : "コレクションを見る"}</span>
            <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="text-[11px] uppercase tracking-[0.3em] text-stone-400 underline-offset-8 transition-colors hover:text-amber-200 hover:underline"
          >
            {en ? "Our Story" : "ストーリー"}
          </a>
        </div>
      </div>
    </section>
  );
}
