import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "データテーブル",
  category: "ダッシュボード",
  description: "ステータスバッジ・アバター・ホバー行を備えたユーザー一覧テーブル。",
  align: "full",
};

type Status = "active" | "pending" | "suspended";

type Row = {
  name: { ja: string; en: string };
  email: string;
  initials: string;
  tone: string;
  role: { ja: string; en: string };
  status: Status;
};

const ROWS: Row[] = [
  { name: { ja: "佐藤 ひかり", en: "Hikari Sato" }, email: "hikari@example.com", initials: "SH", tone: "bg-violet-500/15 text-violet-500", role: { ja: "管理者", en: "Admin" }, status: "active" },
  { name: { ja: "田中 健", en: "Ken Tanaka" }, email: "ken.t@example.com", initials: "TK", tone: "bg-sky-500/15 text-sky-500", role: { ja: "開発者", en: "Developer" }, status: "active" },
  { name: { ja: "鈴木 あおい", en: "Aoi Suzuki" }, email: "aoi.s@example.com", initials: "SA", tone: "bg-emerald-500/15 text-emerald-500", role: { ja: "デザイナー", en: "Designer" }, status: "pending" },
  { name: { ja: "山本 涼", en: "Ryo Yamamoto" }, email: "ryo.y@example.com", initials: "YR", tone: "bg-amber-500/15 text-amber-500", role: { ja: "編集者", en: "Editor" }, status: "active" },
  { name: { ja: "中村 美咲", en: "Misaki Nakamura" }, email: "misaki@example.com", initials: "NM", tone: "bg-rose-500/15 text-rose-500", role: { ja: "閲覧者", en: "Viewer" }, status: "suspended" },
];

const STATUS_STYLE: Record<Status, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  suspended: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

const STATUS_LABEL: Record<Status, { ja: string; en: string }> = {
  active: { ja: "稼働中", en: "Active" },
  pending: { ja: "保留", en: "Pending" },
  suspended: { ja: "停止", en: "Suspended" },
};

function StatusDot({ status }: { status: Status }) {
  const c =
    status === "active" ? "bg-emerald-500" : status === "pending" ? "bg-amber-500" : "bg-rose-500";
  return <span className={cn("size-1.5 rounded-full", c)} />;
}

export default function DataTable() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>{en ? "Members" : "メンバー"}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">{en ? "Name" : "名前"}</th>
                <th className="px-6 py-3 font-medium">{en ? "Role" : "役割"}</th>
                <th className="px-6 py-3 font-medium">{en ? "Status" : "ステータス"}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.email} className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold", r.tone)}>
                        {r.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">{en ? r.name.en : r.name.ja}</div>
                        <div className="truncate text-xs text-muted-foreground">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">{en ? r.role.en : r.role.ja}</td>
                  <td className="px-6 py-3.5">
                    <Badge variant="outline" className={cn("gap-1.5 font-medium", STATUS_STYLE[r.status])}>
                      <StatusDot status={r.status} />
                      {en ? STATUS_LABEL[r.status].en : STATUS_LABEL[r.status].ja}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
          <span className="tabular-nums">{en ? `${ROWS.length} members` : `${ROWS.length} 件のメンバー`}</span>
          <span>{en ? "Updated: just now" : "更新: たった今"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
