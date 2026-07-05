import { useEffect, useRef, useState } from "react";
import {
  AtSign,
  Bell,
  CheckCheck,
  GitPullRequest,
  Heart,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "通知ドロップダウン",
  category: "ナビゲーション",
  description:
    "未読バッジがパルスするベルから開く通知パネル。各行がスタガーでスライドインする。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type Notif = {
  icon: LucideIcon;
  textJa: string;
  textEn: string;
  timeJa: string;
  timeEn: string;
  unread: boolean;
};

const INITIAL: Notif[] = [
  { icon: Heart, textJa: "田中さんがあなたの投稿にいいねしました", textEn: "Tanaka liked your post", timeJa: "2分前", timeEn: "2m ago", unread: true },
  { icon: UserPlus, textJa: "鈴木さんがフォローしました", textEn: "Suzuki started following you", timeJa: "10分前", timeEn: "10m ago", unread: true },
  { icon: AtSign, textJa: "@you がコメントでメンションされました", textEn: "@you was mentioned in a comment", timeJa: "1時間前", timeEn: "1h ago", unread: true },
  { icon: GitPullRequest, textJa: "PR #42 がマージされました", textEn: "PR #42 was merged", timeJa: "昨日", timeEn: "Yesterday", unread: false },
];

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(INITIAL);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter((i) => i.unread).length;
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="mx-auto flex max-w-md justify-end" ref={ref}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={en ? `Notifications (${unread} unread)` : `通知 (${unread}件未読)`}
            aria-expanded={open}
            className="relative grid size-10 place-items-center rounded-full border bg-background transition-colors hover:bg-accent"
          >
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose-500" />
              </span>
            )}
          </button>

          <div
            className={cn(
              "absolute right-0 top-12 z-20 w-80 origin-top-right transition-all duration-200",
              open
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-95 opacity-0"
            )}
          >
            <div className="overflow-hidden rounded-xl border bg-popover shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium">{en ? "Notifications" : "通知"}</p>
                <button
                  type="button"
                  onClick={() =>
                    setItems((arr) => arr.map((n) => ({ ...n, unread: false })))
                  }
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <CheckCheck className="size-3.5" />
                  {en ? "Mark all read" : "すべて既読"}
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {items.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <li
                      key={i}
                      style={{
                        animation: open
                          ? `notifin 260ms ease-out ${i * 50}ms both`
                          : "none",
                      }}
                    >
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
                          n.unread && "bg-primary/5"
                        )}
                      >
                        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm leading-snug">
                            {en ? n.textEn : n.textJa}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {en ? n.timeEn : n.timeJa}
                          </span>
                        </span>
                        {n.unread && (
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes notifin{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
