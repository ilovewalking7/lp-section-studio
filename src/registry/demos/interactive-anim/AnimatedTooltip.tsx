import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメツールチップ",
  category: "インタラクション",
  description: "ホバーでバネのように立ち上がり、カーソルに少し追従するツールチップ付きアバター。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "tooltip"],
};

const PEOPLE = [
  { name: "佐藤 美咲", nameEn: "Misaki Sato", role: "デザイナー", roleEn: "Designer", initials: "MS", color: "from-rose-400 to-pink-600" },
  { name: "鈴木 健太", nameEn: "Kenta Suzuki", role: "エンジニア", roleEn: "Engineer", initials: "KS", color: "from-sky-400 to-blue-600" },
  { name: "高橋 由紀", nameEn: "Yuki Takahashi", role: "PM", roleEn: "PM", initials: "YT", color: "from-amber-400 to-orange-600" },
  { name: "田中 涼", nameEn: "Ryo Tanaka", role: "リサーチャー", roleEn: "Researcher", initials: "RT", color: "from-emerald-400 to-teal-600" },
  { name: "伊藤 葵", nameEn: "Aoi Ito", role: "マーケター", roleEn: "Marketer", initials: "AI", color: "from-violet-400 to-purple-600" },
] as const;

export default function AnimatedTooltip() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hover, setHover] = useState<number | null>(null);
  const [tilt, setTilt] = useState(0);

  return (
    <div className="flex min-h-[7rem] w-full items-center justify-center">
      <div className="flex">
        {PEOPLE.map((p, i) => (
          <div
            key={p.name}
            className="group relative -ml-2 first:ml-0"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => {
              setHover(null);
              setTilt(0);
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const rel = (e.clientX - rect.left) / rect.width - 0.5;
              setTilt(rel * 16);
            }}
          >
            <div
              role="tooltip"
              style={hover === i ? { transform: `translateX(calc(-50% + ${tilt}px)) translateY(0) scale(1)` } : undefined}
              className={cn(
                "pointer-events-none absolute -top-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-background shadow-lg transition-all duration-200 ease-[cubic-bezier(0.34,1.6,0.64,1)]",
                hover === i ? "opacity-100" : "translate-y-1 scale-90 opacity-0"
              )}
            >
              <span className="text-xs font-semibold">{en ? p.nameEn : p.name}</span>
              <span className="text-[10px] text-background/70">{en ? p.roleEn : p.role}</span>
              <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
            </div>
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out",
                p.color,
                hover === i ? "-translate-y-1 scale-110" : ""
              )}
            >
              {p.initials}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
