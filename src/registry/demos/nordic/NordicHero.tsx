import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "北欧ヒーロー",
  category: "北欧",
  description: "ムード豊かな自然色とライン画の落ち着いたヒーロー。",
  align: "full",
  isNew: true,
  tags: ["nordic", "scandinavian", "hygge"],
  principle: "余白とくすんだ自然色が静けさを生み、視線を見出しへ集中させる。",
};

export default function NordicHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] font-sans text-[#3a3a38]">
      {/* soft line-art backdrop */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full text-[#8a9a7b]/30"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 160 L180 90 L320 150 L520 60 L720 140 L900 80 L1080 150 L1200 110"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 190 L240 130 L460 180 L680 110 L900 170 L1120 120 L1200 160"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#7d92a3]/30"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#c08457]/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c08457]">
            <Sun />
            Hygge Living
          </span>
          <h1 className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
            {en ? (
              <>
                Calm, at the
                <br />
                center of living.
              </>
            ) : (
              <>
                静けさを、
                <br />
                暮らしのまんなかに。
              </>
            )}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#3a3a38]/70">
            {en
              ? "Natural warmth and soft light. Unadorned yet comforting tools for everyday life, born of Nordic wisdom."
              : "自然のぬくもりとやわらかな光。北欧の知恵から生まれた、飾らないけれど心地よい日々のための道具たち。"}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-[#3a3a38] px-7 py-3 text-sm font-medium text-[#f4f1ea] transition-colors hover:bg-[#3a3a38]/90">
              {en ? "View the collection" : "コレクションを見る"}
            </button>
            <button className="rounded-full px-5 py-3 text-sm font-medium text-[#3a3a38]/70 underline-offset-4 transition-colors hover:text-[#3a3a38] hover:underline">
              {en ? "Read our story" : "物語を読む"}
            </button>
          </div>
        </div>

        {/* line-art scene card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="aspect-[4/5] w-full rounded-[2rem] bg-[#faf8f3] p-8 shadow-[0_24px_60px_-30px_rgba(58,58,56,0.25)]">
            <svg viewBox="0 0 200 250" className="h-full w-full" fill="none">
              <circle cx="150" cy="55" r="26" stroke="#c08457" strokeWidth="2" />
              <path
                d="M30 200 L70 120 L100 175 L135 95 L170 200 Z"
                stroke="#8a9a7b"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M20 200 L100 200 L180 200"
                stroke="#3a3a38"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M100 200 L100 150 M100 165 C88 158 82 168 90 175 M100 168 C112 160 118 172 110 178"
                stroke="#7d92a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
    </svg>
  );
}
