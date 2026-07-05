import { useEffect, useRef, useState } from "react";
import { CheckCircle2, GitCommit, MessageSquare, UserPlus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アクティビティフィード2",
  category: "ダッシュボード",
  description: "順にスライドインするアイコン付きタイムライン型アクティビティフィード。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const ITEMS = [
  { icon: GitCommit, tone: "bg-sky-500/15 text-sky-500", text: "デプロイ v2.9.1 が本番に反映", textEn: "Deploy v2.9.1 shipped to production", who: "CI Bot", whoEn: "CI Bot", time: "たった今", timeEn: "Just now" },
  { icon: UserPlus, tone: "bg-violet-500/15 text-violet-500", text: "新しいメンバー 田中 健 が参加", textEn: "New member Ken Tanaka joined", who: "Workspace", whoEn: "Workspace", time: "8分前", timeEn: "8 min ago" },
  { icon: CheckCircle2, tone: "bg-emerald-500/15 text-emerald-500", text: "請求書 INV-2041 が承認されました", textEn: "Invoice INV-2041 was approved", who: "佐藤", whoEn: "Sato", time: "32分前", timeEn: "32 min ago" },
  { icon: MessageSquare, tone: "bg-amber-500/15 text-amber-500", text: "課題 #892 に新しいコメント", textEn: "New comment on issue #892", who: "鈴木", whoEn: "Suzuki", time: "1時間前", timeEn: "1 hr ago" },
  { icon: Zap, tone: "bg-rose-500/15 text-rose-500", text: "API 利用が上限の80%に到達", textEn: "API usage hit 80% of the limit", who: "Monitor", whoEn: "Monitor", time: "2時間前", timeEn: "2 hr ago" },
];

export default function ActivityFeed() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLOListElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-4 text-sm font-semibold">{en ? "Activity" : "アクティビティ"}</h3>
      <ol ref={ref} className="relative">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          const last = i === ITEMS.length - 1;
          return (
            <li
              key={i}
              className="relative flex gap-4 pb-5 last:pb-0"
              style={{
                opacity: run ? 1 : 0,
                transform: run ? "translateX(0)" : "translateX(-10px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {!last && (
                <span
                  className="absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "z-10 flex size-9 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
                  it.tone
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 pt-1">
                <p className="text-sm leading-snug">{en ? it.textEn : it.text}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {en ? it.whoEn : it.who} · {en ? it.timeEn : it.time}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
