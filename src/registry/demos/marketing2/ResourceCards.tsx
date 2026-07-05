import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リソースカード",
  category: "マーケティング",
  description:
    "カテゴリタグ・タイトル・読了時間・グラデーションサムネイルを備えた3枚のブログ/資料カード。",
  align: "full",
  isNew: true,
  tags: ["marketing", "blog", "resources"],
  principle:
    "読了時間とカテゴリを明示すると認知コストが下がり、クリック率が上がる。価値あるコンテンツは信頼の入口になる。",
};

type Resource = {
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  readTime: string;
  readTimeEn: string;
  tone: string;
  badge: string;
};

const RESOURCES: Resource[] = [
  {
    category: "グロース",
    categoryEn: "Growth",
    title: "オンボーディング離脱を半減させた5つの改善",
    titleEn: "5 fixes that halved onboarding drop-off",
    excerpt:
      "初回体験のどこでユーザーが離れるのかを特定し、最小の変更で歩留まりを改善した実例。",
    excerptEn:
      "A real case of pinpointing where users drop off in the first experience and improving retention with minimal changes.",
    readTime: "6分",
    readTimeEn: "6 min",
    tone: "from-violet-500 via-indigo-500 to-blue-500",
    badge: "Gr",
  },
  {
    category: "プロダクト",
    categoryEn: "Product",
    title: "計測すべき本当に重要な北極星指標",
    titleEn: "The north star metrics that truly matter",
    excerpt:
      "売上に直結する指標の選び方と、チーム全員を同じ方向に向けるダッシュボード設計。",
    excerptEn:
      "How to choose revenue-driving metrics and design a dashboard that points the whole team in the same direction.",
    readTime: "9分",
    readTimeEn: "9 min",
    tone: "from-emerald-500 via-teal-500 to-cyan-500",
    badge: "Pr",
  },
  {
    category: "事例",
    categoryEn: "Case study",
    title: "導入3カ月でCVRが2.1倍になった理由",
    titleEn: "Why CVR jumped 2.1x in three months",
    excerpt:
      "あるSaaS企業が実施したA/Bテストの設計と、勝ちパターンを横展開するまでの全工程。",
    excerptEn:
      "A SaaS company's full process — from A/B test design to rolling out the winning patterns everywhere.",
    readTime: "5分",
    readTimeEn: "5 min",
    tone: "from-rose-500 via-orange-500 to-amber-500",
    badge: "Cs",
  },
];

export default function ResourceCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {en ? "Latest resources" : "最新のリソース"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {en
                ? "Hand-picked reads from teams that get results."
                : "成果を出すチームが読んでいる記事を厳選。"}
            </p>
          </div>
          <button
            type="button"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {en ? "View all" : "すべて見る"}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <article
              key={r.title}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={cn(
                  "relative aspect-[16/9] overflow-hidden bg-gradient-to-br",
                  r.tone
                )}
              >
                <svg
                  aria-hidden
                  className="absolute inset-0 size-full opacity-20 mix-blend-overlay"
                  viewBox="0 0 100 56"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id={`grid-${r.badge}`}
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M8 0H0V8"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="56" fill={`url(#grid-${r.badge})`} />
                </svg>
                <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-xl bg-white/20 text-sm font-bold text-white backdrop-blur">
                  {r.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {en ? r.categoryEn : r.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {en ? r.readTimeEn : r.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-balance font-semibold leading-snug transition-colors group-hover:text-primary">
                  {en ? r.titleEn : r.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {en ? r.excerptEn : r.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {en ? "Read more" : "続きを読む"}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
