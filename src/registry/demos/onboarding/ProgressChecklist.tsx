import { useMemo, useState } from "react";
import { Check, Rocket, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "進捗チェックリスト",
  category: "オンボーディング",
  description: "項目をチェックすると進捗バーが100%へ向けて伸びる初期設定リスト。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "completion", "checklist"],
  principle:
    "未完了タスクが記憶に残り続けるツァイガルニク効果と、ゴールが近づくほど行動が加速する目標勾配仮説により、残りの項目の完了を強く促す。",
};

type Step = {
  id: string;
  label: string;
  labelEn: string;
  hint: string;
  hintEn: string;
};

const STEPS: Step[] = [
  {
    id: "profile",
    label: "プロフィールを作成",
    labelEn: "Create your profile",
    hint: "名前とアイコンを設定",
    hintEn: "Set your name and avatar",
  },
  {
    id: "team",
    label: "チームを招待",
    labelEn: "Invite your team",
    hint: "メンバーを1人追加",
    hintEn: "Add one member",
  },
  {
    id: "project",
    label: "最初のプロジェクト",
    labelEn: "First project",
    hint: "テンプレから作成",
    hintEn: "Create from a template",
  },
  {
    id: "integrate",
    label: "連携を接続",
    labelEn: "Connect an integration",
    hint: "Slack または GitHub",
    hintEn: "Slack or GitHub",
  },
  {
    id: "ship",
    label: "公開して完了",
    labelEn: "Ship it and finish",
    hint: "あと一歩！",
    hintEn: "Almost there!",
  },
];

export default function ProgressChecklist() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [done, setDone] = useState<Record<string, boolean>>({
    profile: true,
  });

  const completed = useMemo(
    () => STEPS.filter((s) => done[s.id]).length,
    [done]
  );
  const pct = Math.round((completed / STEPS.length) * 100);
  const allDone = completed === STEPS.length;

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">
            {en ? "Finish your setup" : "セットアップを完了しよう"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {allDone
              ? en
                ? "All done. You're ready to go."
                : "すべて完了しました。準備万端です。"
              : en
                ? `${STEPS.length - completed} step${STEPS.length - completed === 1 ? "" : "s"} left to complete`
                : `あと ${STEPS.length - completed} ステップで完了です`}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums transition-colors",
            allDone
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-primary/10 text-primary"
          )}
        >
          {pct}%
        </span>
      </div>

      <div className="mt-4">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              allDone
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                : "bg-gradient-to-r from-primary/70 to-primary"
            )}
            style={{ width: `${Math.max(pct, 3)}%` }}
          />
        </div>
      </div>

      <ul className="mt-5 space-y-1.5">
        {STEPS.map((step) => {
          const isDone = !!done[step.id];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() =>
                  setDone((d) => ({ ...d, [step.id]: !d[step.id] }))
                }
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                  isDone
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-border hover:border-primary/40 hover:bg-accent"
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border transition-all",
                    isDone
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-muted-foreground/30 text-transparent group-hover:border-primary"
                  )}
                >
                  {isDone ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : (
                    <CircleDashed className="size-3.5 text-muted-foreground/40" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-sm font-medium transition-colors",
                      isDone && "text-muted-foreground line-through"
                    )}
                  >
                    {en ? step.labelEn : step.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {en ? step.hintEn : step.hint}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {allDone && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm font-medium text-emerald-500">
          <Rocket className="size-4" />
          オンボーディング完了 — ようこそ！
        </div>
      )}
    </div>
  );
}
