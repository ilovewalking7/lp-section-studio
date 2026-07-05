import { useRef, useState } from "react";
import { Activity, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "タブ",
  category: "アプリUI",
  description: "ARIA 対応のタブグループ。スライドするアクティブインジケーターと個別のパネル。",
  align: "center",
};

type TabId = "overview" | "security" | "notifications";

const TABS: {
  id: TabId;
  label: string;
  labelEn: string;
  icon: typeof Activity;
}[] = [
  { id: "overview", label: "概要", labelEn: "Overview", icon: Activity },
  { id: "security", label: "セキュリティ", labelEn: "Security", icon: Shield },
  { id: "notifications", label: "通知", labelEn: "Notifications", icon: Bell },
];

const PANELS: Record<
  TabId,
  { title: string; titleEn: string; body: string; bodyEn: string }
> = {
  overview: {
    title: "アクティビティの概要",
    titleEn: "Activity overview",
    body: "直近30日間で 1,284 件のイベントを記録しました。前月比で稼働率は 12% 向上しています。",
    bodyEn:
      "You logged 1,284 events in the last 30 days. Uptime is up 12% compared to last month.",
  },
  security: {
    title: "セキュリティ設定",
    titleEn: "Security settings",
    body: "二要素認証は有効です。最後のログインは東京から、3 件のアクティブなセッションがあります。",
    bodyEn:
      "Two-factor authentication is enabled. Last login was from Tokyo, with 3 active sessions.",
  },
  notifications: {
    title: "通知の環境設定",
    titleEn: "Notification preferences",
    body: "メンションとデプロイ完了時にメール通知を送信します。ダイジェストは毎週月曜の朝に届きます。",
    bodyEn:
      "We email you on mentions and when deploys finish. Your digest arrives every Monday morning.",
  },
};

export default function Tabs() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState<TabId>("overview");
  const refs = useRef<Record<TabId, HTMLButtonElement | null>>({
    overview: null,
    security: null,
    notifications: null,
  });

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(idx + dir + TABS.length) % TABS.length];
    setActive(next.id);
    refs.current[next.id]?.focus();
  };

  const activeIndex = TABS.findIndex((t) => t.id === active);

  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-1.5">
      <div
        role="tablist"
        aria-label={en ? "Account settings" : "アカウント設定"}
        className="relative grid grid-cols-3 gap-1 rounded-lg bg-muted/50 p-1"
      >
        {/* スライドするインジケーター */}
        <div
          aria-hidden
          className="absolute inset-y-1 rounded-md bg-background shadow-sm transition-transform duration-300 ease-out"
          style={{
            width: `calc((100% - 0.5rem) / 3)`,
            transform: `translateX(calc(${activeIndex} * (100% + 0.25rem)))`,
          }}
        />
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative z-10 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {en ? tab.labelEn : tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="px-3 py-4 duration-200 animate-in fade-in"
      >
        <h3 className="text-sm font-semibold text-foreground">
          {en ? PANELS[active].titleEn : PANELS[active].title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {en ? PANELS[active].bodyEn : PANELS[active].body}
        </p>
      </div>
    </div>
  );
}
