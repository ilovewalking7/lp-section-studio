import { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Settings,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コーチマーク・ツアー",
  category: "オンボーディング",
  description: "UI要素を順にスポットライトし「次へ」で案内するプロダクトツアー。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "tour", "coachmark", "spotlight"],
  principle:
    "新機能を一度に見せず一つずつ提示することで認知負荷を下げ、ステップ X/Y の提示が完了欲求（ツァイガルニク効果）を生んで最後まで案内を見せ切る。",
};

type Target = {
  id: string;
  icon: typeof Search;
  label: string;
  labelEn: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
};

const TARGETS: Target[] = [
  {
    id: "create",
    icon: Plus,
    label: "新規作成",
    labelEn: "Create",
    title: "ここから始めましょう",
    titleEn: "Start right here",
    body: "プロジェクトやタスクはこのボタンから作成できます。",
    bodyEn: "Create projects and tasks from this button.",
  },
  {
    id: "search",
    icon: Search,
    label: "検索",
    labelEn: "Search",
    title: "なんでも素早く検索",
    titleEn: "Find anything fast",
    body: "⌘K でどこからでも横断検索が開きます。",
    bodyEn: "Press ⌘K to open search from anywhere.",
  },
  {
    id: "alerts",
    icon: Bell,
    label: "通知",
    labelEn: "Alerts",
    title: "更新を見逃さない",
    titleEn: "Never miss an update",
    body: "重要な変更やメンションはここに届きます。",
    bodyEn: "Important changes and mentions land here.",
  },
  {
    id: "settings",
    icon: Settings,
    label: "設定",
    labelEn: "Settings",
    title: "あなた好みに調整",
    titleEn: "Make it yours",
    body: "テーマや通知の設定はいつでもここから。",
    bodyEn: "Adjust theme and notifications anytime.",
  },
];

export default function Coachmark() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(true);
  const [step, setStep] = useState(0);

  const current = TARGETS[step];
  const isLast = step === TARGETS.length - 1;

  const restart = () => {
    setStep(0);
    setActive(true);
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-sm">
      {/* mock app chrome */}
      <div className="flex items-center justify-between gap-2 border-b bg-background/60 px-4 py-3">
        <span className="text-sm font-semibold">Acme Studio</span>
        <div className="flex items-center gap-1.5">
          {TARGETS.map((t, i) => {
            const Icon = t.icon;
            const isTarget = active && i === step;
            return (
              <span
                key={t.id}
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all",
                  isTarget
                    ? "z-20 bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card"
                    : "hover:bg-accent"
                )}
              >
                <Icon className="size-4" />
                {isTarget && (
                  <span className="absolute inset-0 -z-10 animate-ping rounded-lg bg-primary/40" />
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* mock body */}
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted/70" />
        <div className="h-20 rounded-lg bg-muted/50" />
        <div className="h-3 w-2/3 rounded bg-muted/70" />
      </div>

      {/* dim overlay (contained, not fixed) */}
      {active && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-background/70 backdrop-blur-[1px]" />
      )}

      {/* coachmark tooltip */}
      {active && (
        <div className="absolute inset-x-4 top-16 z-30 rounded-xl border border-primary/30 bg-popover p-4 shadow-lg">
          <div
            className="absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-primary/30 bg-popover"
            style={{
              left: `${12 + step * 38}px`,
              right: "auto",
            }}
          />
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                {en ? current.labelEn : current.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActive(false)}
              aria-label={en ? "Close tour" : "ツアーを閉じる"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <h4 className="mt-2 text-sm font-semibold">
            {en ? current.titleEn : current.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {en ? current.bodyEn : current.body}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {en ? "Step" : "ステップ"} {step + 1}/{TARGETS.length}
            </span>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStep((s) => s - 1)}
                >
                  <ArrowLeft className="size-3.5" />
                  {en ? "Back" : "戻る"}
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => {
                  if (isLast) setActive(false);
                  else setStep((s) => s + 1);
                }}
              >
                {isLast ? (en ? "Done" : "完了") : en ? "Next" : "次へ"}
                {!isLast && <ArrowRight className="size-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {!active && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <Button onClick={restart} variant="secondary">
            {en ? "Replay tour" : "ツアーを再生"}
          </Button>
        </div>
      )}
    </div>
  );
}
