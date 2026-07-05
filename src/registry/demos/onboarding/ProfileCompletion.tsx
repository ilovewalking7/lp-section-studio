import { useMemo, useState } from "react";
import { Check, ChevronRight, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プロフィール達成率メーター",
  category: "オンボーディング",
  description: "X%完了のメーターと残り項目で、プロフィール入力の完了を後押しする。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "profile", "completion"],
  principle:
    "あと少しで100%という表示が完了欲求を刺激し、すでに入力済みの自分のプロフィールを「自分のもの」と感じる賦与効果が残りの埋め合わせを促す。",
};

type Field = { id: string; label: string; labelEn: string; weight: number };

const FIELDS: Field[] = [
  { id: "avatar", label: "アイコンを追加", labelEn: "Add an avatar", weight: 20 },
  { id: "name", label: "氏名を入力", labelEn: "Enter your name", weight: 20 },
  { id: "bio", label: "自己紹介を書く", labelEn: "Write a bio", weight: 20 },
  { id: "role", label: "役割を選択", labelEn: "Pick your role", weight: 20 },
  { id: "verify", label: "メールを認証", labelEn: "Verify your email", weight: 20 },
];

export default function ProfileCompletion() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [filled, setFilled] = useState<Record<string, boolean>>({
    avatar: true,
    name: true,
  });

  const pct = useMemo(
    () => FIELDS.reduce((sum, f) => sum + (filled[f.id] ? f.weight : 0), 0),
    [filled]
  );
  const remaining = FIELDS.filter((f) => !filled[f.id]);
  const complete = pct >= 100;

  // SVG リングの寸法
  const R = 26;
  const C = 2 * Math.PI * R;

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative grid size-[68px] place-items-center">
          <svg className="size-[68px] -rotate-90" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r={R}
              fill="none"
              strokeWidth="6"
              className="stroke-muted"
            />
            <circle
              cx="34"
              cy="34"
              r={R}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={cn(
                "transition-all duration-700 ease-out",
                complete ? "stroke-emerald-500" : "stroke-primary"
              )}
              strokeDasharray={C}
              strokeDashoffset={C - (C * pct) / 100}
            />
          </svg>
          <span className="absolute text-sm font-bold tabular-nums">
            {pct}%
          </span>
        </div>
        <div>
          <h3 className="flex items-center gap-1.5 text-base font-semibold">
            <UserCircle2 className="size-4 text-muted-foreground" />
            {en ? "Profile completeness" : "プロフィール完成度"}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {complete
              ? en
                ? "Perfect! Your profile is all set."
                : "完璧です！プロフィールが整いました。"
              : en
                ? `${remaining.length} item${remaining.length === 1 ? "" : "s"} left to complete`
                : `あと ${remaining.length} 項目で完了`}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        {FIELDS.map((f) => {
          const done = !!filled[f.id];
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilled((s) => ({ ...s, [f.id]: !s[f.id] }))}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                done ? "text-muted-foreground" : "hover:bg-accent"
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  done
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-muted-foreground/40 group-hover:border-primary"
                )}
              >
                {done && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className={cn("flex-1", done && "line-through")}>
                {en ? f.labelEn : f.label}
              </span>
              {!done && (
                <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  +{f.weight}%
                  <ChevronRight className="size-3.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
