import { useState } from "react";
import {
  Calendar,
  FileText,
  Grid3x3,
  Mail,
  MessageSquare,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アプリランチャー",
  category: "ナビゲーション",
  description:
    "グリッドボタンで開くアプリ一覧パネル。各タイルがスタガーでポップインするランチャー。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type App = { icon: LucideIcon; ja: string; en: string; color: string };

const APPS: App[] = [
  { icon: Mail, ja: "メール", en: "Mail", color: "text-rose-500 bg-rose-500/10" },
  { icon: Calendar, ja: "予定", en: "Calendar", color: "text-blue-500 bg-blue-500/10" },
  { icon: FileText, ja: "ドキュメント", en: "Docs", color: "text-amber-500 bg-amber-500/10" },
  { icon: MessageSquare, ja: "チャット", en: "Chat", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Video, ja: "会議", en: "Meet", color: "text-violet-500 bg-violet-500/10" },
  { icon: Users, ja: "連絡先", en: "Contacts", color: "text-sky-500 bg-sky-500/10" },
  { icon: Wallet, ja: "経費", en: "Expenses", color: "text-pink-500 bg-pink-500/10" },
  { icon: Grid3x3, ja: "もっと", en: "More", color: "text-slate-500 bg-slate-500/10" },
];

export default function AppLauncherGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-muted/30 p-6 sm:p-10">
      <div className="relative mx-auto flex max-w-lg justify-end">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={en ? "Apps" : "アプリ"}
          aria-expanded={open}
          className={cn(
            "grid size-10 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            open && "bg-accent text-foreground"
          )}
        >
          <Grid3x3 className="size-5" />
        </button>

        <div
          className={cn(
            "absolute right-0 top-12 z-20 origin-top-right transition-all duration-200",
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          )}
        >
          <div className="w-72 rounded-2xl border bg-popover p-3 shadow-xl">
            <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">
              {en ? "Apps" : "アプリ"}
            </p>
            <div className="grid grid-cols-3 gap-1">
              {APPS.map((app, i) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.en}
                    type="button"
                    className="group flex flex-col items-center gap-1.5 rounded-xl p-3 transition-colors hover:bg-accent"
                    style={{
                      animation: open
                        ? `applauncherpop 260ms ease-out ${i * 35}ms both`
                        : "none",
                    }}
                  >
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl transition-transform group-hover:scale-110",
                        app.color
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[11px] text-foreground">{en ? app.en : app.ja}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes applauncherpop{from{opacity:0;transform:scale(.8) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
