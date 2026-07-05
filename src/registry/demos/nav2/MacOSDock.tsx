import { useState } from "react";
import {
  Calendar,
  Camera,
  Compass,
  Mail,
  Music,
  Settings,
  Image as ImageIcon,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "macOS ドック",
  category: "ナビゲーション",
  description:
    "ホバー位置に応じて近隣アイコンが拡大する macOS 風のドック。マグニファイ効果を CSS で再現。",
  align: "full",
  isNew: true,
  tags: ["navigation", "animation"],
};

type App = { icon: LucideIcon; ja: string; en: string; color: string };

const APPS: App[] = [
  { icon: Compass, ja: "ブラウザ", en: "Browser", color: "bg-sky-500" },
  { icon: Mail, ja: "メール", en: "Mail", color: "bg-blue-500" },
  { icon: Calendar, ja: "カレンダー", en: "Calendar", color: "bg-rose-500" },
  { icon: Music, ja: "ミュージック", en: "Music", color: "bg-pink-500" },
  { icon: ImageIcon, ja: "写真", en: "Photos", color: "bg-amber-500" },
  { icon: Camera, ja: "カメラ", en: "Camera", color: "bg-emerald-500" },
  { icon: Terminal, ja: "ターミナル", en: "Terminal", color: "bg-zinc-700" },
  { icon: Settings, ja: "設定", en: "Settings", color: "bg-slate-500" },
];

export default function MacOSDock() {
  const [hover, setHover] = useState<number | null>(null);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const scaleFor = (i: number) => {
    if (hover === null) return 1;
    const dist = Math.abs(hover - i);
    if (dist === 0) return 1.5;
    if (dist === 1) return 1.28;
    if (dist === 2) return 1.1;
    return 1;
  };

  return (
    <div className="relative w-full overflow-hidden p-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0f172a,#334155,#0f172a)]" />
      <div className="flex min-h-40 items-end justify-center">
        <div
          onMouseLeave={() => setHover(null)}
          className="flex items-end gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 shadow-2xl backdrop-blur-xl"
        >
          {APPS.map((app, i) => {
            const Icon = app.icon;
            const scale = scaleFor(i);
            return (
              <button
                key={app.en}
                type="button"
                aria-label={en ? app.en : app.ja}
                onMouseEnter={() => setHover(i)}
                className="group relative origin-bottom transition-transform duration-200 ease-out"
                style={{ transform: `scale(${scale})` }}
              >
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl text-white shadow-lg",
                    app.color
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <span
                  className={cn(
                    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white transition-opacity",
                    hover === i ? "opacity-100" : "opacity-0"
                  )}
                >
                  {en ? app.en : app.ja}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
