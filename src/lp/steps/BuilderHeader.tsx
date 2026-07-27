/**
 * ウィザード共通のヘッダー（戻る導線・ステップ表示・作業中の名前と自動保存の状態）。
 * 見た目だけを持ち、状態は LpBuilder から受け取る。
 */
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Step = 1 | 2 | 3 | 4;

export const STEP_LABELS: Record<Step, string> = {
  1: "業種選択",
  2: "内容入力",
  3: "プレビュー",
  4: "書き出し",
};

export default function BuilderHeader({
  step,
  onGoTo,
  onHome,
  title,
  draftMessage,
}: {
  step: Step;
  onGoTo: (s: Step) => void;
  onHome: () => void;
  /** 作業中のプロジェクト名（未設定なら店名） */
  title: string;
  /** 自動保存の状態（無いときは空文字。領域自体は常設して読み上げを届ける） */
  draftMessage: string;
}) {
  return (
    /*
     * 狭い画面（375px）では折り返さず必ず1段に収める。折り返してヘッダーが高くなると、
     * プレビューのツールバー（sticky top-16 / z-30）がこのヘッダー（z-40）の下に潜り、
     * 「編集に戻る」と表示幅切替が押せなくなるため。作業中の名前は sm 未満で隠す
     * （自動保存の読み上げは sr-only で残す）。
     */
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onHome}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 size-4" aria-hidden />
          戻る
        </Button>

        <StepIndicator step={step} onGoTo={onGoTo} />

        <div className="text-right sm:max-w-xs">
          <p
            className="hidden truncate text-sm font-medium text-muted-foreground sm:block"
            title={title}
          >
            {title || "ミセテLP"}
          </p>
          {/* 自動保存の状態は狭い画面でも読み上げに届くよう、視覚的にだけ隠す */}
          <p
            aria-live="polite"
            className="sr-only truncate text-[11px] text-muted-foreground sm:not-sr-only"
          >
            {draftMessage}
          </p>
        </div>
      </div>
    </header>
  );
}

/** ステップ表示。完了済みのステップへは押して戻れる（現在地は aria-current="step"）。 */
function StepIndicator({
  step,
  onGoTo,
}: {
  step: Step;
  onGoTo: (s: Step) => void;
}) {
  return (
    <ol className="flex items-center gap-1.5 text-xs sm:text-sm">
      {([1, 2, 3, 4] as Step[]).map((s) => {
        const done = s < step;
        const current = s === step;
        const marker = (
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded-full border text-xs font-medium",
              current
                ? "border-primary bg-primary text-primary-foreground"
                : done
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
            )}
          >
            {done ? <Check className="size-3.5" aria-hidden /> : s}
          </span>
        );
        const label = (
          <span
            className={cn(
              "hidden sm:inline",
              current ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {STEP_LABELS[s]}
          </span>
        );
        return (
          <li
            key={s}
            className="flex items-center gap-1.5"
            aria-current={current ? "step" : undefined}
          >
            {done ? (
              <button
                type="button"
                onClick={() => onGoTo(s)}
                className="flex items-center gap-1.5 rounded-md px-0.5 py-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {marker}
                {label}
                <span className="sr-only">に戻る</span>
              </button>
            ) : (
              <span className="flex items-center gap-1.5 px-0.5 py-0.5">
                {marker}
                {label}
              </span>
            )}
            {s < 4 && (
              <span className="mx-1 h-px w-3 bg-border sm:w-6" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
