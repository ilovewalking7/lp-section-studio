/**
 * ウィザードのフォーム部品（ステップ2以降で共用）。
 *
 * すべての入力は useId() で発行したidを <label for> と結び付ける（ラベルで包む書き方は
 * スクリーンリーダー・自動テストの双方で関連付けが曖昧になるため使わない）。
 */
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** 見出し付きの入力グループ。長い1列のフォームを意味のまとまりに分ける。 */
export function FieldGroup({
  title,
  description,
  children,
  contentClassName,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  /** 中身のレイアウト（省略時は縦積み） */
  contentClassName?: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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
        over ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
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
