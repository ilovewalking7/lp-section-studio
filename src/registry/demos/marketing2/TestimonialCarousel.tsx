import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "お客様の声カルーセル",
  category: "マーケティング",
  description:
    "自動送りのお客様の声カルーセル。ドット・前後ボタン・ホバーで一時停止に対応。",
  align: "full",
  isNew: true,
  tags: ["marketing", "testimonial", "carousel"],
  principle:
    "実名・所属・星評価を添えた推薦は信頼を高める。自動送りで複数の声を負担なく見せられる。",
};

type Testimonial = {
  quote: string;
  quoteEn: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  initials: string;
  initialsEn: string;
  tone: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "導入から2週間で問い合わせ対応の工数が4割減りました。チーム全員がもう手放せないと言っています。",
    quoteEn:
      "Within two weeks of rollout, support workload dropped 40%. The whole team says they can't go back.",
    name: "佐藤 美咲",
    nameEn: "Misaki Sato",
    role: "カスタマーサクセス責任者 / Aria Inc.",
    roleEn: "Head of Customer Success / Aria Inc.",
    initials: "佐",
    initialsEn: "MS",
    tone: "from-violet-500 to-indigo-500",
    rating: 5,
  },
  {
    quote:
      "他のツールから乗り換えましたが、セットアップの速さに驚きました。初日から成果が出ています。",
    quoteEn:
      "We switched from another tool and were stunned by how fast setup was. We saw results from day one.",
    name: "John Carter",
    nameEn: "John Carter",
    role: "VP of Growth / Northwind",
    roleEn: "VP of Growth / Northwind",
    initials: "JC",
    initialsEn: "JC",
    tone: "from-sky-500 to-cyan-500",
    rating: 5,
  },
  {
    quote:
      "数字に強い経営層への報告が楽になりました。ダッシュボードをそのまま見せるだけで会話が進みます。",
    quoteEn:
      "Reporting to a metrics-focused leadership team got so much easier. Just showing the dashboard moves the conversation forward.",
    name: "田中 健",
    nameEn: "Ken Tanaka",
    role: "プロダクトマネージャー / Lumen",
    roleEn: "Product Manager / Lumen",
    initials: "田",
    initialsEn: "KT",
    tone: "from-rose-500 to-orange-500",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="w-full px-6 py-12">
      <div
        className="mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-12 sm:px-12">
          <Quote
            aria-hidden
            className="absolute -left-2 -top-2 size-24 text-primary/[0.06]"
          />

          <div className="relative">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                aria-hidden={i !== index}
                className={cn(
                  "transition-opacity duration-500",
                  i === index
                    ? "opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0"
                )}
              >
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 text-center text-lg font-medium leading-relaxed text-balance sm:text-xl">
                  {en ? <>“{t.quoteEn}”</> : <>「{t.quote}」</>}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                      t.tone
                    )}
                  >
                    {en ? t.initialsEn : t.initials}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold">
                      {en ? t.nameEn : t.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {en ? t.roleEn : t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="relative mt-8 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => go(-1)}
              aria-label={en ? "Previous testimonial" : "前の声へ"}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={
                    en ? `Testimonial ${i + 1}` : `${i + 1}番目の声へ`
                  }
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => go(1)}
              aria-label={en ? "Next testimonial" : "次の声へ"}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
