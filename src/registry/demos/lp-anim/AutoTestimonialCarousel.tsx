import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメ・自動切替の声",
  category: "マーケティング",
  description: "クロスフェードで自動送りする推薦コメントのカルーセル（ドット・操作付き）。",
  align: "full",
  isNew: true,
  tags: ["marketing", "animation", "section"],
};

type Item = {
  quoteJa: string;
  quoteEn: string;
  nameJa: string;
  nameEn: string;
  roleJa: string;
  roleEn: string;
  initial: string;
};

const ITEMS: Item[] = [
  {
    quoteJa: "導入から2週間でリードが1.7倍に。チーム全員が手放せないツールになりました。",
    quoteEn:
      "Leads grew 1.7x within two weeks. It's become a tool no one on the team can do without.",
    nameJa: "佐藤 美咲",
    nameEn: "Misaki Sato",
    roleJa: "マーケ責任者 / Lumen Inc.",
    roleEn: "Head of Marketing / Lumen Inc.",
    initial: "S",
  },
  {
    quoteJa: "ダッシュボードの見やすさが圧倒的。意思決定のスピードが明確に上がりました。",
    quoteEn:
      "The dashboard is remarkably easy to read. Our decision-making got noticeably faster.",
    nameJa: "田中 拓也",
    nameEn: "Takuya Tanaka",
    roleJa: "CTO / Northwind",
    roleEn: "CTO / Northwind",
    initial: "T",
  },
  {
    quoteJa: "サポートの速さと丁寧さに感動。乗り換えて本当に良かったです。",
    quoteEn:
      "I was impressed by how fast and thoughtful the support was. So glad we switched.",
    nameJa: "鈴木 杏",
    nameEn: "An Suzuki",
    roleJa: "プロダクト責任者 / Atlas",
    roleEn: "Head of Product / Atlas",
    initial: "S",
  },
];

export default function AutoTestimonialCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % ITEMS.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const go = (n: number) => setIdx((n + ITEMS.length) % ITEMS.length);

  return (
    <section
      className="w-full bg-neutral-950 px-4 py-20 text-white sm:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          {en ? "What our customers say" : "お客様の声"}
        </h2>

        <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
          {ITEMS.map((it, i) => (
            <div
              key={it.nameJa}
              aria-hidden={i !== idx}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center px-8 transition-all duration-700 ease-out sm:px-12",
                i === idx
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <Quote className="mb-6 h-8 w-8 text-indigo-400/60" />
              <p className="text-balance text-lg font-medium leading-relaxed sm:text-xl">
                “{en ? it.quoteEn : it.quoteJa}”
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold">
                  {it.initial}
                </span>
                <div className="text-left">
                  <div className="text-sm font-semibold">
                    {en ? it.nameEn : it.nameJa}
                  </div>
                  <div className="text-xs text-white/55">
                    {en ? it.roleEn : it.roleJa}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(idx - 1)}
            aria-label={en ? "Previous" : "前へ"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {ITEMS.map((it, i) => (
              <button
                key={it.nameJa}
                type="button"
                aria-label={en ? `Slide ${i + 1}` : `スライド ${i + 1}`}
                onClick={() => setIdx(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === idx ? "w-6 bg-indigo-400" : "w-2 bg-white/25 hover:bg-white/40",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            aria-label={en ? "Next" : "次へ"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
