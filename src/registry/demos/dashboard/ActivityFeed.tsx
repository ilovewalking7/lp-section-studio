import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アクティビティフィード",
  category: "ダッシュボード",
  description: "接続線とイニシャルアバター付きの縦型アクティビティタイムライン。",
  align: "center",
};

type Activity = {
  name: { ja: string; en: string };
  initials: string;
  tone: string;
  action: { ja: string; en: string };
  target: { ja: string; en: string };
  time: { ja: string; en: string };
};

const ACTIVITIES: Activity[] = [
  { name: { ja: "佐藤 ひかり", en: "Hikari Sato" }, initials: "SH", tone: "bg-violet-500/15 text-violet-500", action: { ja: "が請求書を承認しました", en: " approved an invoice" }, target: { ja: "INV-2041", en: "INV-2041" }, time: { ja: "2分前", en: "2 min ago" } },
  { name: { ja: "田中 健", en: "Ken Tanaka" }, initials: "TK", tone: "bg-sky-500/15 text-sky-500", action: { ja: "が新しいデプロイを公開しました", en: " shipped a new deploy" }, target: { ja: "v2.8.0", en: "v2.8.0" }, time: { ja: "26分前", en: "26 min ago" } },
  { name: { ja: "鈴木 あおい", en: "Aoi Suzuki" }, initials: "SA", tone: "bg-emerald-500/15 text-emerald-500", action: { ja: "がコメントを追加しました", en: " left a comment on" }, target: { ja: "#892", en: "#892" }, time: { ja: "1時間前", en: "1 hour ago" } },
  { name: { ja: "山本 涼", en: "Ryo Yamamoto" }, initials: "YR", tone: "bg-amber-500/15 text-amber-500", action: { ja: "がメンバーを招待しました", en: " invited members" }, target: { ja: "3名", en: "3 people" }, time: { ja: "3時間前", en: "3 hours ago" } },
  { name: { ja: "中村 美咲", en: "Misaki Nakamura" }, initials: "NM", tone: "bg-rose-500/15 text-rose-500", action: { ja: "がプランをアップグレードしました", en: " upgraded the plan to" }, target: { ja: "Pro", en: "Pro" }, time: { ja: "昨日", en: "Yesterday" } },
];

export default function ActivityFeed() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{en ? "Recent activity" : "最近のアクティビティ"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative">
          {ACTIVITIES.map((a, i) => {
            const last = i === ACTIVITIES.length - 1;
            return (
              <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                {!last && (
                  <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-border" aria-hidden />
                )}
                <div
                  className={cn(
                    "z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-card",
                    a.tone
                  )}
                >
                  {a.initials}
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-sm leading-snug text-foreground">
                    <span className="font-semibold">{en ? a.name.en : a.name.ja}</span>
                    <span className="text-muted-foreground">{en ? a.action.en : a.action.ja} </span>
                    <span className="font-medium tabular-nums text-foreground">{en ? a.target.en : a.target.ja}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{en ? a.time.en : a.time.ja}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
