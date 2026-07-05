import { useState } from "react";
import {
  AlertTriangle,
  CheckCheck,
  GitPullRequest,
  MessageSquare,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "通知センター",
  category: "ダッシュボード",
  description: "グループ化された項目・未読ドット・アイコン・「すべて既読」操作を持つ通知パネル。",
  align: "center",
  isNew: true,
  tags: ["analytics", "notifications", "panel"],
};

type Item = {
  id: number;
  group: string;
  groupEn: string;
  icon: typeof TrendingUp;
  title: string;
  titleEn: string;
  detail: string;
  detailEn: string;
  time: string;
  timeEn: string;
  tone: "primary" | "emerald" | "amber" | "rose";
};

const TONES: Record<Item["tone"], string> = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
  rose: "bg-rose-500/10 text-rose-500",
};

const ITEMS: Item[] = [
  {
    id: 1,
    group: "今日",
    groupEn: "Today",
    icon: TrendingUp,
    title: "コンバージョンが急上昇",
    titleEn: "Conversions are spiking",
    detail: "過去1時間で +18.4%",
    detailEn: "+18.4% in the last hour",
    time: "12分前",
    timeEn: "12m ago",
    tone: "emerald",
  },
  {
    id: 2,
    group: "今日",
    groupEn: "Today",
    icon: AlertTriangle,
    title: "API エラー率が上昇",
    titleEn: "API error rate rising",
    detail: "p99 レイテンシ 1.2s",
    detailEn: "p99 latency 1.2s",
    time: "47分前",
    timeEn: "47m ago",
    tone: "amber",
  },
  {
    id: 3,
    group: "今日",
    groupEn: "Today",
    icon: UserPlus,
    title: "新規メンバーが参加",
    titleEn: "New member joined",
    detail: "山田 由衣 がチームに参加",
    detailEn: "Yui Yamada joined the team",
    time: "2時間前",
    timeEn: "2h ago",
    tone: "primary",
  },
  {
    id: 4,
    group: "昨日",
    groupEn: "Yesterday",
    icon: GitPullRequest,
    title: "デプロイが完了",
    titleEn: "Deploy finished",
    detail: "production v2.14.0",
    detailEn: "production v2.14.0",
    time: "昨日 18:20",
    timeEn: "Yesterday 18:20",
    tone: "primary",
  },
  {
    id: 5,
    group: "昨日",
    groupEn: "Yesterday",
    icon: MessageSquare,
    title: "新しいコメント",
    titleEn: "New comments",
    detail: "週次レポートに3件",
    detailEn: "3 on the weekly report",
    time: "昨日 14:05",
    timeEn: "Yesterday 14:05",
    tone: "rose",
  },
];

export default function NotificationCenter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [read, setRead] = useState<Record<number, boolean>>({ 4: true });
  const unread = ITEMS.filter((i) => !read[i.id]).length;
  const groups = Array.from(new Set(ITEMS.map((i) => i.group)));

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight">
              {en ? "Notifications" : "通知"}
            </h3>
            {unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold tabular-nums text-primary-foreground">
                {unread}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            disabled={unread === 0}
            onClick={() =>
              setRead(Object.fromEntries(ITEMS.map((i) => [i.id, true])))
            }
          >
            <CheckCheck className="size-3.5" />
            {en ? "Mark all read" : "すべて既読"}
          </Button>
        </div>

        <div className="mt-3 space-y-4">
          {groups.map((g) => (
            <div key={g}>
              <p className="mb-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {en ? ITEMS.find((i) => i.group === g)?.groupEn : g}
              </p>
              <ul className="space-y-1">
                {ITEMS.filter((i) => i.group === g).map((item) => {
                  const isRead = read[item.id];
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setRead((r) => ({ ...r, [item.id]: true }))
                        }
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted/50",
                          !isRead && "bg-muted/30"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                            TONES[item.tone]
                          )}
                        >
                          <item.icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "truncate text-sm",
                                isRead ? "font-medium" : "font-semibold"
                              )}
                            >
                              {en ? item.titleEn : item.title}
                            </span>
                            {!isRead && (
                              <span className="size-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {en ? item.detailEn : item.detail}
                          </span>
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                          {en ? item.timeEn : item.time}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
