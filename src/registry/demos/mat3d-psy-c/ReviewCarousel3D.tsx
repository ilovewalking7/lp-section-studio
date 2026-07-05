import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レビューカルーセル3D",
  category: "3Dアニメ",
  description:
    "3Dカバーフロー状に湾曲したレビュー群。各カードに★評価とイニシャルのアバター。自動送り＋前後ボタン付き。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "実名・顔（イニシャル）・星評価を伴う他者の声を立体的に並べる社会的証明が、『多くの人が満足している』という安心を与え、購入の不安を下げる。",
};

type Review = {
  id: string;
  nameJa: string;
  nameEn: string;
  roleJa: string;
  roleEn: string;
  bodyJa: string;
  bodyEn: string;
  rating: number;
  hue: string;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    nameJa: "佐藤 美咲",
    nameEn: "Misaki Sato",
    roleJa: "プロダクト責任者",
    roleEn: "Head of Product",
    bodyJa: "導入初日でチームの生産性が体感で倍に。もう手放せません。",
    bodyEn: "Doubled our team's output on day one. We can't go back.",
    rating: 5,
    hue: "linear-gradient(135deg, #f472b6, #db2777)",
  },
  {
    id: "r2",
    nameJa: "田中 健",
    nameEn: "Ken Tanaka",
    roleJa: "スタートアップ創業者",
    roleEn: "Startup Founder",
    bodyJa: "競合を全部試したけど、結局これが一番速くて美しい。",
    bodyEn: "Tried every competitor — this is the fastest and the prettiest.",
    rating: 5,
    hue: "linear-gradient(135deg, #818cf8, #4f46e5)",
  },
  {
    id: "r3",
    nameJa: "鈴木 葵",
    nameEn: "Aoi Suzuki",
    roleJa: "デザインリード",
    roleEn: "Design Lead",
    bodyJa: "細部の手触りが本当に気持ちいい。毎日触りたくなる道具。",
    bodyEn: "The micro-details feel so good. A tool I actually want to use.",
    rating: 4,
    hue: "linear-gradient(135deg, #34d399, #059669)",
  },
  {
    id: "r4",
    nameJa: "山本 大輔",
    nameEn: "Daisuke Yamamoto",
    roleJa: "エンジニア",
    roleEn: "Engineer",
    bodyJa: "セットアップ5分。サポートも爆速で、安心して任せられる。",
    bodyEn: "Set up in 5 minutes. Support is lightning-fast and reassuring.",
    rating: 5,
    hue: "linear-gradient(135deg, #fbbf24, #d97706)",
  },
  {
    id: "r5",
    nameJa: "中村 彩",
    nameEn: "Aya Nakamura",
    roleJa: "マーケター",
    roleEn: "Marketer",
    bodyJa: "数字がはっきり伸びた。費用対効果で迷う理由がない。",
    bodyEn: "The numbers clearly went up. The ROI makes it a no-brainer.",
    rating: 5,
    hue: "linear-gradient(135deg, #22d3ee, #0891b2)",
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function ReviewCarousel3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = REVIEWS.length;

  const go = (dir: number) =>
    setActive((a) => (a + dir + count) % count);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, 3800);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // refs not needed for layout; keep handlers self-contained
  const regionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#0b1020_0%,#04060d_72%)] px-4 py-16">
      <style>{`
        @media (prefers-reduced-motion: reduce) { .rc-card { transition: none !important; } }
      `}</style>

      <div className="mx-auto mb-10 max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
          {en ? "Loved by teams" : "選ばれています"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          {en ? "Real voices, real results" : "リアルな声、確かな成果"}
        </h2>
      </div>

      <div
        ref={regionRef}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="relative mx-auto h-[340px] max-w-5xl"
        style={{ perspective: "1500px" }}
        role="group"
        aria-roledescription="carousel"
        aria-label={en ? "Customer reviews" : "お客様の声"}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {REVIEWS.map((rev, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const abs = Math.abs(offset);
            const visible = abs <= 2;
            const isCenter = offset === 0;

            return (
              <article
                key={rev.id}
                aria-hidden={!isCenter}
                className="rc-card absolute -left-[150px] -top-[150px] flex h-[300px] w-[300px] flex-col justify-between rounded-[26px] p-7"
                style={{
                  transform: `translateX(${offset * 170}px) translateZ(${-abs * 160}px) rotateY(${offset * -32}deg) scale(${isCenter ? 1 : 0.92})`,
                  opacity: visible ? (isCenter ? 1 : 0.45) : 0,
                  pointerEvents: isCenter ? "auto" : "none",
                  zIndex: 10 - abs,
                  transition:
                    "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease",
                  background:
                    "linear-gradient(165deg, #1a2138 0%, #11162a 100%)",
                  boxShadow: isCenter
                    ? "0 40px 60px -26px rgba(99,102,241,0.45), 0 0 0 1px rgba(165,180,252,0.25)"
                    : "0 24px 40px -28px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                <div>
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4"
                        fill={s < rev.rating ? "#fbbf24" : "none"}
                        color={s < rev.rating ? "#fbbf24" : "#475569"}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/90">
                    “{en ? rev.bodyEn : rev.bodyJa}”
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ background: rev.hue }}
                  >
                    {initials(en ? rev.nameEn : rev.nameJa)}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">
                      {en ? rev.nameEn : rev.nameJa}
                    </p>
                    <p className="text-xs text-white/55">
                      {en ? rev.roleEn : rev.roleJa}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* controls */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={en ? "Previous review" : "前のレビュー"}
          className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={en ? "Next review" : "次のレビュー"}
          className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* dots */}
      <div className="mt-8 flex justify-center gap-2">
        {REVIEWS.map((rev, i) => (
          <button
            key={rev.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${en ? "Go to review" : "レビューへ"} ${i + 1}`}
            aria-current={i === active}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === active ? 24 : 8,
              background: i === active ? "#818cf8" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
