import { useEffect, useState } from "react";
import { Check, Globe, Loader2, Search, Terminal, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エージェント実行トレース",
  category: "AI / チャット",
  description: "推論→検索→実行と進む工程を順に点灯させるトレース。",
  align: "center",
  isNew: true,
  tags: ["ai", "chat", "animation"],
};

type Step = {
  id: number;
  icon: typeof Search;
  labelJa: string;
  labelEn: string;
  detailJa: string;
  detailEn: string;
};

const STEPS: Step[] = [
  { id: 1, icon: Search, labelJa: "クエリを解析", labelEn: "Parse query", detailJa: "意図を3つのサブタスクに分解", detailEn: "Break intent into 3 subtasks" },
  { id: 2, icon: Globe, labelJa: "Webを検索", labelEn: "Search the web", detailJa: "12件の関連ソースを取得", detailEn: "Fetched 12 relevant sources" },
  { id: 3, icon: FileText, labelJa: "結果を読み込み", labelEn: "Read results", detailJa: "上位5件を要約・統合", detailEn: "Summarize and merge top 5" },
  { id: 4, icon: Terminal, labelJa: "コードを実行", labelEn: "Run code", detailJa: "集計スクリプトを実行", detailEn: "Execute aggregation script" },
];

export default function AgentStepsTrace() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    const t = window.setInterval(() => {
      setActive((a) => {
        if (a >= STEPS.length) {
          window.clearInterval(t);
          return a;
        }
        return a + 1;
      });
    }, 900);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-[440px] rounded-2xl border bg-card p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {en ? "Agent execution log" : "エージェント実行ログ"}
      </p>
      <ol className="space-y-1">
        {STEPS.map((s, i) => {
          const state =
            i < active ? "done" : i === active ? "running" : "pending";
          return (
            <li key={s.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    state === "done" &&
                      "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
                    state === "running" &&
                      "border-violet-500/40 bg-violet-500/10 text-violet-500",
                    state === "pending" &&
                      "border-border bg-muted text-muted-foreground"
                  )}
                >
                  {state === "done" ? (
                    <Check className="size-4" />
                  ) : state === "running" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <s.icon className="size-4" />
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "my-1 w-px flex-1 transition-colors duration-500",
                      i < active ? "bg-emerald-500/40" : "bg-border"
                    )}
                  />
                )}
              </div>
              <div className={cn("pb-4 transition-opacity", state === "pending" && "opacity-50")}>
                <p className="text-sm font-medium leading-tight">{en ? s.labelEn : s.labelJa}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{en ? s.detailEn : s.detailJa}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
