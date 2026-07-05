import { useRef, useState } from "react";
import { Home, Search, Bell, Settings, User, Folder } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドック並べ替え",
  category: "ドラッグ操作",
  description: "アイコンをドラッグして並べ替えるドックバー。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type DockItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  labelEn: string;
};

const INITIAL: DockItem[] = [
  { id: "d1", icon: Home, label: "ホーム", labelEn: "Home" },
  { id: "d2", icon: Search, label: "検索", labelEn: "Search" },
  { id: "d3", icon: Folder, label: "ファイル", labelEn: "Files" },
  { id: "d4", icon: Bell, label: "通知", labelEn: "Notifications" },
  { id: "d5", icon: User, label: "プロフィール", labelEn: "Profile" },
  { id: "d6", icon: Settings, label: "設定", labelEn: "Settings" },
];

export default function DockIcons() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [items, setItems] = useState<DockItem[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const dock = dockRef.current;
    if (!dock) return;
    const els = Array.from(dock.querySelectorAll<HTMLElement>("[data-icon]"));
    let target = -1;
    for (let i = 0; i < els.length; i++) {
      const r = els[i].getBoundingClientRect();
      if (e.clientX < r.left + r.width / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = items.findIndex((it) => it.id === id);
    if (target === from || target < 0) return;
    setItems((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div
      ref={dockRef}
      className="flex items-end gap-2 rounded-2xl border bg-card/80 p-3 shadow-lg backdrop-blur"
    >
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            data-icon
            type="button"
            title={en ? it.labelEn : it.label}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragId(it.id);
            }}
            onPointerMove={(e) => onMove(e, it.id)}
            onPointerUp={() => setDragId(null)}
            className={cn(
              "flex h-12 w-12 cursor-grab touch-none items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-foreground transition active:cursor-grabbing hover:-translate-y-1",
              dragId === it.id && "-translate-y-2 scale-110 ring-2 ring-primary"
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}
