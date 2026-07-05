import { Activity, Droplet, Flame, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフト統計リング",
  category: "ニューモーフィズム",
  description: "押し込み式の進捗リング（SVG）を備えた、柔らかな統計タイル。",
  align: "full",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "stats", "rings"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";

const stats = [
  { icon: Footprints, label: "歩数", labelEn: "Steps", value: "8,420", pct: 72, accent: false },
  { icon: Flame, label: "消費カロリー", labelEn: "Calories", value: "612", unit: "kcal", pct: 58, accent: true },
  { icon: Activity, label: "心拍", labelEn: "Heart rate", value: "74", unit: "bpm", pct: 49, accent: false },
  { icon: Droplet, label: "水分", labelEn: "Water", value: "1.6", unit: "L", pct: 64, accent: false },
];

function Ring({ pct, accent }: { pct: number; accent: boolean }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative grid size-[84px] place-items-center rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
      <svg viewBox="0 0 80 80" className="size-[72px] -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#cdd4de" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={accent ? "#6366f1" : "#94a3b8"}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-sm font-bold text-slate-700">{pct}%</span>
    </div>
  );
}

export default function SoftStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full rounded-3xl bg-[#e0e5ec] p-6 text-slate-600 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">
            {en ? "Today's activity" : "今日のアクティビティ"}
          </h3>
          <p className="text-sm text-slate-500">
            {en ? "Almost at your goal." : "目標まであと一息。"}
          </p>
        </div>
        <span className="rounded-full bg-[#e0e5ec] px-3 py-1.5 text-xs font-semibold text-indigo-500 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]">
          {en ? "61% done" : "61% 達成"}
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.labelEn} className={cn("flex flex-col items-center rounded-2xl bg-[#e0e5ec] p-5 text-center", RAISED)}>
            <Ring pct={s.pct} accent={s.accent} />
            <span className={cn("mt-4 inline-flex items-center gap-1.5 text-xs font-medium", s.accent ? "text-indigo-500" : "text-slate-500")}>
              <s.icon className="size-4" />
              {en ? s.labelEn : s.label}
            </span>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-700">
              {s.value}
              {s.unit && <span className="ml-1 text-sm font-medium text-slate-500">{s.unit}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
