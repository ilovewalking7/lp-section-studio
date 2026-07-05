import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スイス・ヒーロー",
  category: "ミニマル",
  description: "グリッド基準の大見出しヒーロー。極小メタラベルで構成。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "monochrome"],
  principle: "巨大な余白と整列で1点に視線を集め、説得力を生む。",
};

export default function SwissHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 flex items-baseline justify-between border-b border-neutral-200 pb-6 md:col-span-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Studio / 2026
            </span>
            <span className="text-[11px] tabular-nums uppercase tracking-[0.25em] text-neutral-500">
              01 — 12
            </span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h1 className="text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight">
              {en ? (
                <>
                  Whitespace is
                  <br />
                  the finest ornament.
                </>
              ) : (
                <>
                  余白こそ
                  <br />
                  最上の装飾。
                </>
              )}
            </h1>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-6 self-end md:col-span-3 md:grid-cols-1">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Index
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">
                {en
                  ? "Minimal building blocks for disciplined grids and precise typography."
                  : "規律あるグリッドと精密なタイポグラフィのための、最小限の構成要素。"}
              </p>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Color
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">
                {en
                  ? "A monochrome base allows just a single accent."
                  : "モノクロームを基調に、ただ一点のみアクセントを許す。"}
              </p>
            </div>
          </div>

          <div className="col-span-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-neutral-200 pt-6">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="border-b border-neutral-900 pb-0.5">
                {en ? "Get started" : "はじめる"}
              </span>
              <span className="text-[#e5341a] transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              International Typographic Style
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
