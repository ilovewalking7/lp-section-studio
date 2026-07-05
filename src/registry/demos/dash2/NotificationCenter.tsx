import { useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "通知センター",
  category: "ダッシュボード",
  description: "未読バッジと滑らかに消える行を備えた通知センター。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

type Notif = {
  id: number;
  type: "success" | "warning" | "info";
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  time: string;
  timeEn: string;
  read: boolean;
};

const INITIAL: Notif[] = [
  { id: 1, type: "success", title: "デプロイ成功", titleEn: "Deploy succeeded", body: "v2.9.1 が本番環境に反映されました。", bodyEn: "v2.9.1 is now live in production.", time: "2分前", timeEn: "2 min ago", read: false },
  { id: 2, type: "warning", title: "API 使用量警告", titleEn: "API usage warning", body: "今月の上限の85%に達しました。", bodyEn: "You've reached 85% of this month's limit.", time: "1時間前", timeEn: "1 hour ago", read: false },
  { id: 3, type: "info", title: "新機能のお知らせ", titleEn: "New feature available", body: "ダッシュボードに新しいウィジェットが追加。", bodyEn: "A new widget was added to the dashboard.", time: "3時間前", timeEn: "3 hours ago", read: true },
  { id: 4, type: "success", title: "支払い完了", titleEn: "Payment complete", body: "Proプランの請求が処理されました。", bodyEn: "Your Pro plan billing was processed.", time: "昨日", timeEn: "Yesterday", read: true },
];

const cfg = {
  success: { icon: CheckCircle2, tone: "bg-emerald-500/15 text-emerald-500" },
  warning: { icon: AlertTriangle, tone: "bg-amber-500/15 text-amber-500" },
  info: { icon: Info, tone: "bg-sky-500/15 text-sky-500" },
};

export default function NotificationCenter() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [items, setItems] = useState(INITIAL);
  const unread = items.filter((i) => !i.read).length;

  const dismiss = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const markAll = () => setItems((p) => p.map((i) => ({ ...i, read: true })));

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-card text-card-foreground">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <span className="relative">
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white tabular-nums">
                {unread}
              </span>
            )}
          </span>
          <h3 className="text-sm font-semibold">{en ? "Notifications" : "通知"}</h3>
        </div>
        <button
          type="button"
          onClick={markAll}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {en ? "Mark all read" : "すべて既読"}
        </button>
      </div>
      <ul className="divide-y">
        {items.length === 0 && (
          <li className="p-8 text-center text-sm text-muted-foreground">
            {en ? "No notifications" : "通知はありません"}
          </li>
        )}
        {items.map((n) => {
          const { icon: Icon, tone } = cfg[n.type];
          return (
            <li
              key={n.id}
              className={cn(
                "group flex gap-3 p-4 transition-colors hover:bg-muted/40",
                !n.read && "bg-muted/20"
              )}
            >
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", tone)}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{en ? n.titleEn : n.title}</p>
                  {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-sky-500" />}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{en ? n.bodyEn : n.body}</p>
                <p className="mt-1 text-[10px] text-muted-foreground/70">{en ? n.timeEn : n.time}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(n.id)}
                aria-label={en ? "Dismiss" : "閉じる"}
                className="shrink-0 self-start rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
              >
                <X className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
