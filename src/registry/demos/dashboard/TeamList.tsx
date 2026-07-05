import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チームリスト",
  category: "ダッシュボード",
  description: "オンライン状態ドットと行ごとのアクションを備えたチームメンバー一覧。",
  align: "center",
};

type Member = {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  initials: string;
  tone: string;
  status: "online" | "away" | "offline";
};

const MEMBERS: Member[] = [
  { name: "佐藤 ひかり", nameEn: "Hikari Sato", role: "プロダクトリード", roleEn: "Product lead", initials: "SH", tone: "bg-violet-500/15 text-violet-500", status: "online" },
  { name: "田中 健", nameEn: "Ken Tanaka", role: "フロントエンド", roleEn: "Frontend", initials: "TK", tone: "bg-sky-500/15 text-sky-500", status: "online" },
  { name: "鈴木 あおい", nameEn: "Aoi Suzuki", role: "UX デザイナー", roleEn: "UX designer", initials: "SA", tone: "bg-emerald-500/15 text-emerald-500", status: "away" },
  { name: "山本 涼", nameEn: "Ryo Yamamoto", role: "QA エンジニア", roleEn: "QA engineer", initials: "YR", tone: "bg-amber-500/15 text-amber-500", status: "offline" },
];

const STATUS: Record<
  Member["status"],
  { dot: string; label: string; labelEn: string }
> = {
  online: { dot: "bg-emerald-500", label: "オンライン", labelEn: "Online" },
  away: { dot: "bg-amber-500", label: "離席中", labelEn: "Away" },
  offline: { dot: "bg-muted-foreground/40", label: "オフライン", labelEn: "Offline" },
};

export default function TeamList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{en ? "Team members" : "チームメンバー"}</CardTitle>
        <span className="text-xs tabular-nums text-muted-foreground">
          {en ? `${MEMBERS.length} members` : `${MEMBERS.length} 名`}
        </span>
      </CardHeader>
      <CardContent className="space-y-1">
        {MEMBERS.map((m) => {
          const s = STATUS[m.status];
          return (
            <div
              key={m.name}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
            >
              <div className="relative shrink-0">
                <div className={cn("flex size-10 items-center justify-center rounded-full text-xs font-semibold", m.tone)}>
                  {m.initials}
                </div>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-card",
                    s.dot
                  )}
                  title={en ? s.labelEn : s.label}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {en ? m.nameEn : m.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {en ? m.roleEn : m.role}
                </p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {en ? s.labelEn : s.label}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={en ? `Menu for ${m.nameEn}` : `${m.name} のメニュー`}
              >
                <MoreHorizontal />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
