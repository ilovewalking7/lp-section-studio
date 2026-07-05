import { useState } from "react";
import { Home, Search, Heart, Settings, User, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "サークルメニューダイヤル",
  category: "3Dカルーセル",
  description: "ダイヤルを回して上部の選択枠にアイコンを合わせるメニュー。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const ITEMS: { Icon: LucideIcon; labelJa: string; labelEn: string }[] = [
  { Icon: Home, labelJa: "ホーム", labelEn: "Home" },
  { Icon: Search, labelJa: "検索", labelEn: "Search" },
  { Icon: Heart, labelJa: "お気に入り", labelEn: "Favorites" },
  { Icon: Bell, labelJa: "通知", labelEn: "Notifications" },
  { Icon: User, labelJa: "アカウント", labelEn: "Account" },
  { Icon: Settings, labelJa: "設定", labelEn: "Settings" },
];

export default function CircularMenuDial() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);
  const count = ITEMS.length;
  const step = 360 / count;
  const active = ((index % count) + count) % count;

  return (
    <div className="flex w-full flex-col items-center gap-5 py-8">
      <div
        className="relative"
        style={{ width: 240, height: 130, perspective: "900px" }}
      >
        <div
          className="relative left-1/2 h-full w-0"
          style={{ transformStyle: "preserve-3d", transform: `rotateX(${index * step}deg)` }}
        >
          {ITEMS.map(({ Icon, labelEn }, i) => (
            <div
              key={labelEn}
              className="absolute -left-7 -top-7 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-border bg-card text-primary shadow"
              style={{ transform: `rotateX(${-i * step}deg) translateZ(120px)` }}
            >
              <Icon className="h-6 w-6" />
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground">
        {en ? ITEMS[active].labelEn : ITEMS[active].labelJa}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIndex((v) => v - 1)}
          className={cn(
            "h-9 rounded-lg bg-muted px-4 text-sm font-medium hover:bg-muted/70"
          )}
        >
          {en ? "Prev" : "前"}
        </button>
        <button
          type="button"
          onClick={() => setIndex((v) => v + 1)}
          className="h-9 rounded-lg bg-muted px-4 text-sm font-medium hover:bg-muted/70"
        >
          {en ? "Next" : "次"}
        </button>
      </div>
    </div>
  );
}
