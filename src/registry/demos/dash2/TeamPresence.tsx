import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "チームプレゼンス",
  category: "ダッシュボード",
  description: "オンライン状態をパルスドットで示すチームメンバー一覧。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
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
  { name: "佐藤 ひかり", nameEn: "Hikari Sato", role: "プロダクト", roleEn: "Product", initials: "SH", tone: "bg-violet-500/15 text-violet-500", status: "online" },
  { name: "田中 健", nameEn: "Ken Tanaka", role: "エンジニア", roleEn: "Engineering", initials: "TK", tone: "bg-sky-500/15 text-sky-500", status: "online" },
  { name: "鈴木 あおい", nameEn: "Aoi Suzuki", role: "デザイン", roleEn: "Design", initials: "SA", tone: "bg-emerald-500/15 text-emerald-500", status: "away" },
  { name: "山本 涼", nameEn: "Ryo Yamamoto", role: "マーケ", roleEn: "Marketing", initials: "YR", tone: "bg-amber-500/15 text-amber-500", status: "online" },
  { name: "中村 美咲", nameEn: "Misaki Nakamura", role: "サポート", roleEn: "Support", initials: "NM", tone: "bg-rose-500/15 text-rose-500", status: "offline" },
];

const statusCfg = {
  online: { ring: "bg-emerald-500", label: "オンライン", labelEn: "Online", pulse: true },
  away: { ring: "bg-amber-500", label: "離席中", labelEn: "Away", pulse: false },
  offline: { ring: "bg-zinc-400", label: "オフライン", labelEn: "Offline", pulse: false },
};

export default function TeamPresence() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const online = MEMBERS.filter((m) => m.status === "online").length;
  return (
    <div className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{en ? "Team status" : "チームの状況"}</h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {en ? `${online} online` : `${online}名がオンライン`}
        </span>
      </div>
      <ul className="space-y-1">
        {MEMBERS.map((m) => {
          const s = statusCfg[m.status];
          return (
            <li
              key={m.name}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <span className="relative">
                <span className={cn("flex size-9 items-center justify-center rounded-full text-xs font-semibold", m.tone)}>
                  {m.initials}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full ring-2 ring-card">
                  {s.pulse && (
                    <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-75", s.ring)} />
                  )}
                  <span className={cn("relative size-3 rounded-full", s.ring)} />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{en ? m.nameEn : m.name}</p>
                <p className="text-xs text-muted-foreground">{en ? m.roleEn : m.role}</p>
              </div>
              <span className="text-xs text-muted-foreground">{en ? s.labelEn : s.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
