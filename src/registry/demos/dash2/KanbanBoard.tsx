import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カンバンボード",
  category: "ダッシュボード",
  description: "カードがフェードインで現れる3カラムのカンバンボード。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

type Card = { title: string; titleEn: string; tag: string; tone: string; who: string };

const COLUMNS: { name: string; nameEn: string; dot: string; cards: Card[] }[] = [
  {
    name: "予定",
    nameEn: "To do",
    dot: "bg-muted-foreground",
    cards: [
      { title: "オンボーディング改善", titleEn: "Improve onboarding", tag: "UX", tone: "bg-violet-500/15 text-violet-500", who: "SA" },
      { title: "請求バグ調査", titleEn: "Investigate billing bug", tag: "Bug", tone: "bg-rose-500/15 text-rose-500", who: "TK" },
    ],
  },
  {
    name: "進行中",
    nameEn: "In progress",
    dot: "bg-sky-500",
    cards: [
      { title: "ダッシュボード再設計", titleEn: "Redesign dashboard", tag: "Design", tone: "bg-sky-500/15 text-sky-500", who: "HK" },
      { title: "API レート制限", titleEn: "API rate limiting", tag: "Infra", tone: "bg-amber-500/15 text-amber-500", who: "YR" },
      { title: "i18n 対応", titleEn: "i18n support", tag: "Feature", tone: "bg-emerald-500/15 text-emerald-500", who: "NM" },
    ],
  },
  {
    name: "完了",
    nameEn: "Done",
    dot: "bg-emerald-500",
    cards: [
      { title: "ログインフロー", titleEn: "Login flow", tag: "Auth", tone: "bg-violet-500/15 text-violet-500", who: "SA" },
      { title: "メール通知", titleEn: "Email notifications", tag: "Feature", tone: "bg-emerald-500/15 text-emerald-500", who: "TK" },
    ],
  },
];

export default function KanbanBoard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let idx = 0;
  return (
    <div ref={ref} className="grid w-full gap-4 sm:grid-cols-3">
      {COLUMNS.map((col) => (
        <div key={col.name} className="rounded-xl border bg-muted/30 p-3">
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className={cn("size-2 rounded-full", col.dot)} />
            <span className="text-xs font-semibold">{en ? col.nameEn : col.name}</span>
            <span className="ml-auto rounded-full bg-background px-1.5 text-[10px] tabular-nums text-muted-foreground">
              {col.cards.length}
            </span>
          </div>
          <div className="space-y-2.5">
            {col.cards.map((c) => {
              const d = idx++;
              return (
                <div
                  key={c.title}
                  className="cursor-grab rounded-lg border bg-card p-3 text-card-foreground transition-shadow hover:shadow-md active:cursor-grabbing"
                  style={{
                    opacity: run ? 1 : 0,
                    transform: run ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 450ms ease-out, transform 450ms ease-out",
                    transitionDelay: `${d * 70}ms`,
                  }}
                >
                  <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", c.tone)}>
                    {c.tag}
                  </span>
                  <p className="mt-2 text-sm leading-snug">{en ? c.titleEn : c.title}</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                      {c.who}
                    </span>
                    <span className="text-[10px] text-muted-foreground">#{1200 + d}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
