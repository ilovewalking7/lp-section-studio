import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "特大引用",
  category: "Awwwards",
  description: "巨大な引用符と超特大セリフ体で構成した、印象的なビッグクオート。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "typography", "animation"],
};

export default function BigQuote() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-bq relative w-full overflow-hidden bg-neutral-950 px-6 py-32 text-neutral-50 sm:px-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 -top-10 select-none font-serif leading-none text-neutral-800"
        style={{ fontSize: "clamp(12rem, 40vw, 34rem)" }}
      >
        &ldquo;
      </span>
      <blockquote className="relative mx-auto max-w-[1100px]">
        <p
          className="aww-bq-text text-balance font-serif font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)" }}
        >
          {en ? (
            <>
              Great typography is{" "}
              <span className="italic text-amber-300">felt</span> before it&apos;s
              read.
            </>
          ) : (
            <>
              良いタイポグラフィは、読まれる前に
              <span className="italic text-amber-300">感じられる</span>。
            </>
          )}
        </p>
        <footer className="aww-bq-cite mt-12 flex items-center gap-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
          <span className="h-px w-12 bg-neutral-600" />
          {en ? "Studio Director" : "スタジオ・ディレクター"}
        </footer>
      </blockquote>
      <style>{`
        .aww-bq-text, .aww-bq-cite {
          opacity: 0;
          animation: aww-bq-in 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .aww-bq-cite { animation-delay: 0.2s; }
        @keyframes aww-bq-in {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aww-bq-text, .aww-bq-cite { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
