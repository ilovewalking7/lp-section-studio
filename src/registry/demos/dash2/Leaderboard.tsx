import { useEffect, useRef, useState } from "react";
import { Crown, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リーダーボード",
  category: "ダッシュボード",
  description: "進捗バーが伸び、行が順にスライドインするランキングボード。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const ROWS = [
  { name: "佐藤 ひかり", nameEn: "Hikari Sato", initials: "SH", score: 9820, trend: "up", color: "bg-violet-500" },
  { name: "田中 健", nameEn: "Ken Tanaka", initials: "TK", score: 8640, trend: "up", color: "bg-sky-500" },
  { name: "鈴木 あおい", nameEn: "Aoi Suzuki", initials: "SA", score: 7430, trend: "down", color: "bg-emerald-500" },
  { name: "山本 涼", nameEn: "Ryo Yamamoto", initials: "YR", score: 6210, trend: "same", color: "bg-amber-500" },
  { name: "中村 美咲", nameEn: "Misaki Nakamura", initials: "NM", score: 4980, trend: "up", color: "bg-rose-500" },
];

const trendIcon = { up: TrendingUp, down: TrendingDown, same: Minus } as const;
const trendColor = { up: "text-emerald-500", down: "text-rose-500", same: "text-muted-foreground" } as const;

export default function Leaderboard() {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const max = ROWS[0].score;

  return (
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-4 text-sm font-semibold">{en ? "Leaderboard" : "リーダーボード"}</h3>
      <ul className="space-y-3">
        {ROWS.map((r, i) => {
          const Icon = trendIcon[r.trend as keyof typeof trendIcon];
          return (
            <li
              key={r.name}
              className="flex items-center gap-3"
              style={{
                opacity: run ? 1 : 0,
                transform: run ? "translateX(0)" : "translateX(-12px)",
                transition: "opacity 450ms ease-out, transform 450ms ease-out",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                  i === 0
                    ? "bg-amber-400 text-amber-950"
                    : i === 1
                    ? "bg-zinc-300 text-zinc-800"
                    : i === 2
                    ? "bg-orange-400/80 text-orange-950"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {i === 0 ? <Crown className="size-3.5" /> : i + 1}
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                {r.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-medium">{en ? r.nameEn : r.name}</span>
                  <span className="text-sm tabular-nums">{r.score.toLocaleString("en-US")}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", r.color)}
                    style={{
                      width: run ? `${(r.score / max) * 100}%` : "0%",
                      transition: "width 800ms ease-out",
                      transitionDelay: `${i * 80 + 150}ms`,
                    }}
                  />
                </div>
              </div>
              <Icon className={cn("size-4 shrink-0", trendColor[r.trend as keyof typeof trendColor])} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
