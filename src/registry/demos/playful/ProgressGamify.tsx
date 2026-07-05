import { useState } from "react";
import { Trophy, Flame, Star, Zap, Lock, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ゲーミフィ進捗",
  category: "プレイフル",
  description: "バッジ付きの楽しいXP・レベル進捗ウィジェット。",
  align: "center",
  isNew: true,
  tags: ["playful", "rounded", "gamify"],
};

const badges = [
  { icon: Flame, color: "#ff8fab", label: "7日連続", labelEn: "7-day streak", earned: true },
  { icon: Star, color: "#ffd166", label: "初投稿", labelEn: "First post", earned: true },
  { icon: Zap, color: "#4cc9f0", label: "スピード", labelEn: "Speedster", earned: true },
  { icon: Crown, color: "#b388ff", label: "達人", labelEn: "Master", earned: false },
];

export default function ProgressGamify() {
  const [xp, setXp] = useState(640);
  const goal = 1000;
  const pct = Math.min(100, Math.round((xp / goal) * 100));
  const level = 5;
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="font-rounded w-full max-w-sm rounded-3xl border-2 border-slate-100 bg-white p-7 shadow-[0_12px_0_#eef1f4]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="relative inline-flex size-14 items-center justify-center rounded-2xl text-white"
            style={{ backgroundColor: "#ffd166", boxShadow: "0 5px 0 #e0b94a" }}
          >
            <Trophy className="size-7" />
            <span
              className="absolute -bottom-2 -right-2 inline-flex size-7 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold text-white"
              style={{ backgroundColor: "#ff8fab" }}
            >
              {level}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">{en ? `Level ${level}` : `レベル ${level}`}</p>
            <h3 className="text-lg font-extrabold text-slate-800">{en ? "Adventurer" : "冒険者"}</h3>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold text-white"
          style={{ backgroundColor: "#06d6a0" }}
        >
          <Flame className="size-3.5" /> 7
        </span>
      </div>

      {/* XP bar */}
      <div className="mt-6">
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500">XP</span>
          <span className="text-slate-700">
            {xp} / {goal}
          </span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg,#4cc9f0,#06d6a0)",
            }}
          />
        </div>
        <p className="mt-1.5 text-xs font-semibold text-slate-400">
          {en ? `${goal - xp} XP to the next level` : `次のレベルまであと ${goal - xp} XP`}
        </p>
      </div>

      {/* badges */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-400">
          {en ? "Badges" : "バッジ"}
        </p>
        <div className="grid grid-cols-4 gap-2.5">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.labelEn} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-2xl transition-transform",
                    b.earned ? "text-white hover:scale-110" : "text-slate-300"
                  )}
                  style={{
                    backgroundColor: b.earned ? b.color : "#f1f5f9",
                  }}
                >
                  {b.earned ? <Icon className="size-6" /> : <Lock className="size-5" />}
                </div>
                <span className="text-[10px] font-bold text-slate-400">{en ? b.labelEn : b.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setXp((v) => Math.min(goal, v + 80))}
        className="mt-6 w-full rounded-full py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 active:translate-y-1"
        style={{ backgroundColor: "#b388ff", boxShadow: "0 6px 0 #9166da" }}
      >
        {en ? "Complete a quest (+80 XP)" : "クエストをこなす（+80 XP）"}
      </button>
    </div>
  );
}
