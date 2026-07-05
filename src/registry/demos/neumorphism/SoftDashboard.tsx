import { useState } from "react";
import { ArrowUpRight, Bell, Moon, TrendingUp, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトUIダッシュボード",
  category: "ニューモーフィズム",
  description: "柔らかな押し出し陰影のスタットタイルとトグル行を備えたダッシュボード。",
  align: "full",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "dashboard"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

const stats = [
  { id: "revenue", icon: Wallet, labelJa: "総売上", labelEn: "Total revenue", valueJa: "¥482万", valueEn: "¥4.82M", delta: "+12.4%", accent: true },
  { id: "active", icon: Users, labelJa: "アクティブ", labelEn: "Active", valueJa: "8,924", valueEn: "8,924", delta: "+3.1%" },
  { id: "conversion", icon: TrendingUp, labelJa: "コンバージョン", labelEn: "Conversion", valueJa: "4.8%", valueEn: "4.8%", delta: "+0.6%" },
];

const toggles = [
  { id: "weekly", labelJa: "週次レポート", labelEn: "Weekly report", descJa: "毎週月曜にメール送信", descEn: "Emailed every Monday", on: true },
  { id: "realtime", labelJa: "リアルタイム通知", labelEn: "Real-time alerts", descJa: "重要イベントを即時通知", descEn: "Notify on key events instantly", on: false },
  { id: "darksync", labelJa: "ダークモード同期", labelEn: "Dark mode sync", descJa: "システム設定に追従", descEn: "Follow system settings", on: true },
];

export default function SoftDashboard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rows, setRows] = useState(toggles.map((t) => t.on));

  return (
    <div className="w-full rounded-3xl bg-[#e0e5ec] p-6 text-slate-600 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">{en ? "Overview" : "概要"}</h3>
          <p className="text-sm text-slate-500">
            {en ? "Performance for June 2026" : "2026年6月のパフォーマンス"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label={en ? "Notifications" : "通知"}
            className={cn(
              "grid size-11 place-items-center rounded-2xl bg-[#e0e5ec] text-slate-500 transition active:scale-95",
              RAISED,
            )}
          >
            <Bell className="size-5" />
          </button>
          <button
            aria-label={en ? "Theme" : "テーマ"}
            className={cn(
              "grid size-11 place-items-center rounded-2xl bg-[#e0e5ec] text-indigo-500 transition active:scale-95",
              RAISED,
            )}
          >
            <Moon className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.id} className={cn("rounded-2xl bg-[#e0e5ec] p-5", RAISED)}>
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-xl bg-[#e0e5ec]",
                  INSET,
                  s.accent ? "text-indigo-500" : "text-slate-500",
                )}
              >
                <s.icon className="size-5" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e0e5ec] px-2.5 py-1 text-xs font-semibold text-emerald-600 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]">
                <ArrowUpRight className="size-3.5" />
                {s.delta}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500">{en ? s.labelEn : s.labelJa}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-700">
              {en ? s.valueEn : s.valueJa}
            </p>
          </div>
        ))}
      </div>

      <div className={cn("mt-6 rounded-2xl bg-[#e0e5ec] p-2", INSET)}>
        <ul className="divide-y divide-slate-300/40">
          {toggles.map((t, i) => (
            <li key={t.id} className="flex items-center justify-between gap-4 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-slate-700">{en ? t.labelEn : t.labelJa}</p>
                <p className="text-xs text-slate-500">{en ? t.descEn : t.descJa}</p>
              </div>
              <button
                role="switch"
                aria-checked={rows[i]}
                aria-label={en ? t.labelEn : t.labelJa}
                onClick={() => setRows((r) => r.map((v, j) => (j === i ? !v : v)))}
                className={cn(
                  "relative h-8 w-14 shrink-0 rounded-full bg-[#e0e5ec] transition",
                  INSET,
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 size-6 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] transition-all",
                    rows[i] ? "left-7 bg-indigo-500" : "left-1",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
