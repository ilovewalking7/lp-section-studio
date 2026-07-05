import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "締切カウントダウン",
  category: "コンバージョン",
  description:
    "日・時・分・秒が刻むライブカウントダウンと限定オファーのCTAバンド。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["countdown", "urgency", "deadline"],
  principle:
    "刻一刻と減る残り時間を見せる締切効果が損失回避を強く喚起し、「後で」を「今」に変えて先延ばしによる離脱を防ぐ。",
};

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  const totalSec = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    mins: Math.floor((totalSec % 3600) / 60),
    secs: totalSec % 60,
  };
}

const UNITS: { key: keyof Parts; ja: string; en: string }[] = [
  { key: "days", ja: "日", en: "Days" },
  { key: "hours", ja: "時間", en: "Hours" },
  { key: "mins", ja: "分", en: "Mins" },
  { key: "secs", ja: "秒", en: "Secs" },
];

export default function CountdownUrgency() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [target] = useState(
    () => Date.now() + (2 * 86400 + 6 * 3600 + 42 * 60 + 18) * 1000
  );
  const [parts, setParts] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const t = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <section className="w-full px-6 py-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-rose-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-500">
              <Clock className="size-3.5" />
              {en ? "Limited time · 40% OFF" : "期間限定 40% OFF"}
            </span>
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {en ? "Once-a-year anniversary sale" : "年に一度のアニバーサリーセール"}
            </h2>
            <p className="mt-2 max-w-md text-pretty text-sm text-muted-foreground">
              {en
                ? "When this timer hits zero, prices return to normal. No restock planned."
                : "このタイマーが0になると価格は通常に戻ります。再販の予定はありません。"}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="flex items-stretch gap-2 sm:gap-3">
              {UNITS.map(({ key, ja, en: enLabel }, i) => (
                <div key={key} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex w-16 flex-col items-center rounded-xl border bg-background/60 py-3 sm:w-[72px]">
                    <span
                      className={cn(
                        "text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
                        key === "secs" && "text-rose-500"
                      )}
                    >
                      {String(parts[key]).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 text-[11px] text-muted-foreground">
                      {en ? enLabel : ja}
                    </span>
                  </div>
                  {i < UNITS.length - 1 && (
                    <span className="text-2xl font-light text-muted-foreground/50">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full gap-2 sm:w-auto">
              {en ? "Claim the discount now" : "今すぐ割引を確保"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
