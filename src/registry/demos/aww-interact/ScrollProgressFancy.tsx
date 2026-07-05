import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "凝ったスクロール進捗",
  category: "Awwwards",
  description: "フレーム内スクロールに連動するバーと円形インジケータの進捗演出。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const chapters = [
  { ja: "序章", en: "Prologue" },
  { ja: "構想", en: "Concept" },
  { ja: "制作", en: "Production" },
  { ja: "検証", en: "Testing" },
  { ja: "公開", en: "Launch" },
];

export default function ScrollProgressFancy() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setP(max > 0 ? el.scrollTop / max : 0);
  }

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-3xl border border-neutral-800">
        <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-amber-300 to-rose-400"
            style={{ width: `${p * 100}%` }}
          />
        </div>

        <div className="pointer-events-none absolute right-5 top-5 z-10">
          <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
            <circle cx="28" cy="28" r={r} fill="none" stroke="#404040" strokeWidth="4" />
            <circle
              cx="28"
              cy="28"
              r={r}
              fill="none"
              stroke="#fcd34d"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - p)}
            />
          </svg>
          <span className="absolute inset-0 flex rotate-0 items-center justify-center text-[11px] font-semibold">
            {Math.round(p * 100)}
          </span>
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="h-[440px] overflow-y-auto scroll-smooth bg-neutral-900 p-8"
        >
          {chapters.map((ch, i) => (
            <div key={ch.en} className="border-b border-neutral-800 py-10 last:border-0">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
                {en ? `Chapter 0${i + 1}` : `章 0${i + 1}`}
              </span>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{en ? ch.en : ch.ja}</h3>
              <p className="mt-3 max-w-prose text-neutral-400">
                {en
                  ? "As you scroll within the frame, the top bar and the circular indicator at the top right advance in sync."
                  : "フレーム内をスクロールすると、上部のバーと右上の円形インジケータが連動して進みます。"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
