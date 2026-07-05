import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "反転ヒーロー",
  category: "ミニマル",
  description: "暗転したダーク基調のヒーロー。明暗反転の対称設計。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "dark"],
  principle: "明暗の反転が強いコントラストを生み、見出しに重みを与える。",
};

export default function InvertHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-neutral-950 font-sans text-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 flex items-baseline justify-between border-b border-neutral-800 pb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Inverted / Dark
            </span>
            <span className="text-[11px] tabular-nums uppercase tracking-[0.25em] text-neutral-500">
              09 — 12
            </span>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h1 className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
              {en ? (
                <>
                  In the dark,
                  <br />
                  form becomes clear.
                </>
              ) : (
                <>
                  闇の中でこそ、
                  <br />
                  形は明瞭になる。
                </>
              )}
            </h1>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-neutral-800 pt-8 md:grid-cols-12">
            <p className="col-span-12 max-w-md text-sm leading-relaxed text-neutral-400 md:col-span-6">
              {en
                ? "Truly minimal design holds together even when light and dark are reversed — same grid, same discipline."
                : "明暗を反転しても崩れない設計こそ、真にミニマルである。同じグリッド、同じ規律。"}
            </p>
            <div className="col-span-12 flex items-center gap-6 md:col-span-6 md:justify-end">
              <a
                href="#"
                className="inline-flex h-11 items-center justify-center bg-neutral-50 px-7 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
              >
                {en ? "Get started" : "はじめる"}
              </a>
              <a
                href="#"
                className="text-sm text-neutral-300 underline-offset-4 hover:underline"
              >
                {en ? "Docs →" : "ドキュメント →"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
