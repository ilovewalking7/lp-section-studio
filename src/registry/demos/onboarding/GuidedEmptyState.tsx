import { useState } from "react";
import {
  FolderPlus,
  UserPlus,
  Sparkles,
  ArrowRight,
  Check,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ガイド付き空状態",
  category: "オンボーディング",
  description: "番号付きの最初の一歩を示し、空の画面を行動の入口に変える空状態。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["onboarding", "empty-state", "first-run"],
  principle:
    "何もない画面は離脱を招くが、初期行動の誘導として小さく明確な次の一手を番号で示すことで、認知負荷を下げつつ目標勾配で着手率を高める。",
};

type Action = {
  id: string;
  icon: typeof FolderPlus;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
};

const ACTIONS: Action[] = [
  {
    id: "create",
    icon: FolderPlus,
    title: "最初のプロジェクトを作成",
    titleEn: "Create your first project",
    desc: "テンプレートから30秒で開始",
    descEn: "Start from a template in 30 seconds",
  },
  {
    id: "invite",
    icon: UserPlus,
    title: "チームを招待",
    titleEn: "Invite your team",
    desc: "一緒に進めると続きやすい",
    descEn: "It's easier to keep going together",
  },
  {
    id: "explore",
    icon: Sparkles,
    title: "サンプルを見る",
    titleEn: "Explore samples",
    desc: "ベストプラクティスを参考に",
    descEn: "Learn from best practices",
  },
];

export default function GuidedEmptyState() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <div className="w-full max-w-md rounded-2xl border border-dashed bg-card p-7 text-center shadow-sm">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Inbox className="size-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        {en ? "Nothing here yet" : "まだ何もありません"}
      </h3>
      <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">
        {en
          ? "Your projects will show up here. Get started with the steps below."
          : "ここにプロジェクトが表示されます。下のステップから始めましょう。"}
      </p>

      <ol className="mt-6 space-y-2 text-left">
        {ACTIONS.map((action, i) => {
          const isDone = !!done[action.id];
          const Icon = action.icon;
          return (
            <li key={action.id}>
              <button
                type="button"
                onClick={() =>
                  setDone((d) => ({ ...d, [action.id]: !d[action.id] }))
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
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {isDone ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium",
                      isDone && "text-muted-foreground"
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    {en ? action.titleEn : action.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {en ? action.descEn : action.desc}
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground/50 transition-transform",
                    "group-hover:translate-x-0.5 group-hover:text-primary",
                    isDone && "opacity-0"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
