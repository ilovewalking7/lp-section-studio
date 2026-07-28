import { useRef, useState } from "react";
import {
  Calendar,
  Camera,
  Compass,
  Mail,
  Music,
  Settings,
  Image as ImageIcon,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "Macドック",
  category: "インタラクション",
  description: "カーソルの近さでアイコンが拡大するmacOS風ドック。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "dock"],
};

const ICONS = [
  { icon: Compass, color: "from-sky-400 to-blue-600", label: "ブラウザ", labelEn: "Browser" },
  { icon: Mail, color: "from-cyan-400 to-sky-600", label: "メール", labelEn: "Mail" },
  { icon: MessageCircle, color: "from-green-400 to-emerald-600", label: "メッセージ", labelEn: "Messages" },
  { icon: Music, color: "from-pink-400 to-rose-600", label: "ミュージック", labelEn: "Music" },
  { icon: Camera, color: "from-zinc-500 to-zinc-800", label: "カメラ", labelEn: "Camera" },
  { icon: ImageIcon, color: "from-violet-400 to-purple-600", label: "写真", labelEn: "Photos" },
  { icon: Calendar, color: "from-orange-400 to-red-500", label: "カレンダー", labelEn: "Calendar" },
  { icon: Settings, color: "from-slate-400 to-slate-700", label: "設定", labelEn: "Settings" },
] as const;

const BASE = 44;
const MAX_EXTRA = 30;
const RANGE = 90;

export default function MacDock() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const sizeFor = (centerX: number) => {
    if (mouseX === null) return BASE;
    const dist = Math.abs(mouseX - centerX);
    if (dist > RANGE) return BASE;
    const t = 1 - dist / RANGE;
    return BASE + MAX_EXTRA * t;
  };

  return (
    <div className="flex w-full justify-center overflow-x-auto py-6">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) setMouseX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setMouseX(null)}
        className="flex items-end gap-2 rounded-2xl border border-white/20 bg-white/40 px-3 pb-2 pt-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/10"
      >
        {ICONS.map((item, i) => {
          const center = 12 + 8 * i + BASE * i + BASE / 2;
          const size = sizeFor(center);
          const Icon = item.icon;
          return (
            <div key={item.labelEn} className="group/icon relative flex flex-col items-center">
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover/icon:opacity-100">
                {en ? item.labelEn : item.label}
              </span>
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-[width,height] duration-150 ease-out",
                  item.color
                )}
                style={{ width: size, height: size }}
              >
                <Icon style={{ width: size * 0.5, height: size * 0.5 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
