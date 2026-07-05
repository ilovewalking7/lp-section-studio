import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "収益バーチャート",
  category: "ダッシュボード",
  description: "12 か月の収益を CSS フレックスで描くバーチャート。ホバーで強調表示。",
  align: "full",
};

type MonthBar = {
  month: string;
  monthEn: string;
  current: number;
  previous: number;
};

const DATA: MonthBar[] = [
  { month: "1月", monthEn: "Jan", current: 42, previous: 30 },
  { month: "2月", monthEn: "Feb", current: 38, previous: 34 },
  { month: "3月", monthEn: "Mar", current: 55, previous: 40 },
  { month: "4月", monthEn: "Apr", current: 49, previous: 44 },
  { month: "5月", monthEn: "May", current: 63, previous: 48 },
  { month: "6月", monthEn: "Jun", current: 71, previous: 52 },
  { month: "7月", monthEn: "Jul", current: 68, previous: 58 },
  { month: "8月", monthEn: "Aug", current: 82, previous: 61 },
  { month: "9月", monthEn: "Sep", current: 76, previous: 66 },
  { month: "10月", monthEn: "Oct", current: 91, previous: 70 },
  { month: "11月", monthEn: "Nov", current: 88, previous: 74 },
  { month: "12月", monthEn: "Dec", current: 100, previous: 80 },
];

const MAX = 110;
const TICKS = [0, 25, 50, 75, 100];

export default function RevenueBarChart() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState<number | null>(null);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>{en ? "Monthly revenue" : "月次収益"}</CardTitle>
          <CardDescription className="mt-1">
            {en ? "2024 · in millions of yen" : "2024年・百万円単位"}
          </CardDescription>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" />
            {en ? "This year" : "今年"}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-muted-foreground/30" />
            {en ? "Last year" : "前年"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <div className="flex h-48 flex-col justify-between py-1 text-[10px] tabular-nums text-muted-foreground">
            {[...TICKS].reverse().map((t) => (
              <span key={t}>¥{t}M</span>
            ))}
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-0 flex flex-col justify-between py-1">
              {TICKS.map((t) => (
                <div key={t} className="border-t border-dashed border-border/60" />
              ))}
            </div>
            <div className="relative flex h-48 items-end gap-1.5 sm:gap-2.5">
              {DATA.map((d, i) => {
                const isActive = active === i;
                const dimmed = active !== null && !isActive;
                return (
                  <div
                    key={d.month}
                    className="group flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-1"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <div className="relative flex h-full w-full items-end justify-center gap-0.5">
                      <span
                        className="absolute -top-1 -translate-y-full whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-[10px] font-medium tabular-nums opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                        role="status"
                      >
                        ¥{d.current}M
                      </span>
                      <div
                        className="w-1/2 rounded-t-[3px] bg-muted-foreground/25 transition-all"
                        style={{ height: `${(d.previous / MAX) * 100}%` }}
                      />
                      <div
                        className={cn(
                          "w-1/2 rounded-t-[3px] bg-primary transition-all",
                          isActive && "bg-primary",
                          dimmed && "opacity-40"
                        )}
                        style={{ height: `${(d.current / MAX) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex gap-1.5 sm:gap-2.5">
              {DATA.map((d, i) => (
                <span
                  key={d.month}
                  className={cn(
                    "flex-1 text-center text-[10px] tabular-nums transition-colors",
                    active === i ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {en ? d.monthEn : d.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
