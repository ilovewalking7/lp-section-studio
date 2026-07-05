import { useRef, useState } from "react";
import { FileText, Image as ImageIcon, FileArchive } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ファイル並べ替えゾーン",
  category: "ドラッグ操作",
  description: "アップロード済みファイルをドラッグして順序を変える。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type FileItem = { id: string; name: string; size: string; icon: LucideIcon };

const INITIAL: FileItem[] = [
  { id: "f1", name: "report.pdf", size: "1.2MB", icon: FileText },
  { id: "f2", name: "cover.png", size: "820KB", icon: ImageIcon },
  { id: "f3", name: "assets.zip", size: "4.7MB", icon: FileArchive },
  { id: "f4", name: "notes.txt", size: "12KB", icon: FileText },
];

export default function FileDropReorder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [files, setFiles] = useState<FileItem[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const zone = zoneRef.current;
    if (!zone) return;
    const rows = Array.from(zone.querySelectorAll<HTMLElement>("[data-f]"));
    let target = files.findIndex((f) => f.id === id);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = files.findIndex((f) => f.id === id);
    if (from === target) return;
    setFiles((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div
      ref={zoneRef}
      className="w-full max-w-sm space-y-2 rounded-xl border-2 border-dashed bg-card p-4"
    >
      <p className="text-xs text-muted-foreground">
        {en
          ? `Drag to reorder (${files.length})`
          : `ドラッグして並べ替え（${files.length} 件）`}
      </p>
      {files.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.id}
            data-f
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragId(f.id);
            }}
            onPointerMove={(e) => onMove(e, f.id)}
            onPointerUp={() => setDragId(null)}
            className={cn(
              "flex cursor-grab touch-none items-center gap-3 rounded-lg border bg-background px-3 py-2.5 transition active:cursor-grabbing",
              dragId === f.id && "scale-[1.02] shadow-lg ring-2 ring-primary/40"
            )}
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <span className="flex-1 truncate text-sm text-foreground">
              {f.name}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {f.size}
            </span>
          </div>
        );
      })}
    </div>
  );
}
