/**
 * ウィザードのフォーム部品（ステップ2以降で共用）。
 *
 * すべての入力は useId() で発行したidを <label for> と結び付ける（ラベルで包む書き方は
 * スクリーンリーダー・自動テストの双方で関連付けが曖昧になるため使わない）。
 */
import { useId, type ReactNode } from "react";
import { EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * 見出し付きの入力グループ。長い1列のフォームを意味のまとまりに分ける。
 *
 * sectionLabel を渡すと「どのセクションに出る入力なのか」を明示する。入力欄の見出し
 * （例:「特徴（3つ）」）と、LP上のセクション名（例:「お品書き」）は一致しないことが
 * あり、セクションをOFFにすると入力が黙ってLPから消える事故につながるため、
 * 対応関係と現在の表示状態をここで見せる。
 */
export function FieldGroup({
  title,
  description,
  children,
  contentClassName,
  sectionLabel,
  sectionHidden = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  /** 中身のレイアウト（省略時は縦積み） */
  contentClassName?: string;
  /** この入力が実際に出るセクション名（例: 「お品書き」）。省略時は表示しない */
  sectionLabel?: string;
  /** そのセクションが現在非表示か（非表示なら控えめにして注記を出す） */
  sectionHidden?: boolean;
}) {
  return (
    <Card className={cn(sectionHidden && "opacity-60")}>
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {sectionLabel && (
          <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span>「{sectionLabel}」セクションに表示されます。</span>
            {sectionHidden && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-400">
                <EyeOff className="size-3 shrink-0" aria-hidden />
                現在このセクションは非表示です
              </span>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={contentClassName ?? "space-y-4"}>
        {children}
      </CardContent>
    </Card>
  );
}

/** 目安文字数に対する現在の文字数。超過しても入力はブロックしない。 */
function CharCount({ value, guide }: { value: string; guide: number }) {
  const over = value.length > guide;
  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        over ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"
      )}
    >
      {value.length} / 目安 {guide} 文字
    </span>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** 入力のコツ（label の下ではなく入力の下に置き aria-describedby で関連付ける） */
  hint?: string;
  /** 目安文字数（指定するとカウンタを表示） */
  guideLength?: number;
}

export function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
  guideLength,
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {guideLength !== undefined && (
          <CharCount value={value} guide={guideLength} />
        )}
      </div>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={hint ? hintId : undefined}
      />
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function LabeledTextarea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  guideLength,
  rows = 3,
}: FieldProps & { rows?: number }) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {guideLength !== undefined && (
          <CharCount value={value} guide={guideLength} />
        )}
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-describedby={hint ? hintId : undefined}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

/** 補足・注意書き（控えめなトーンで、操作をブロックしないお知らせ） */
export function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  );
}
