import { useRef, useState } from "react";
import { Music, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プレイリスト並べ替え",
  category: "ドラッグ操作",
  description: "曲をドラッグして再生順を入れ替えるプレイリスト。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Track = { id: string; title: string; time: string };

const INITIAL: Track[] = [
  { id: "m1", title: "Morning Light", time: "3:21" },
  { id: "m2", title: "Neon City", time: "4:05" },
  { id: "m3", title: "Quiet Rain", time: "2:48" },
  { id: "m4", title: "Skyline", time: "3:59" },
  { id: "m5", title: "Afterglow", time: "5:12" },
];

export default function PlaylistReorder() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [tracks, setTracks] = useState<Track[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLLIElement>("[data-tr]"));
    let target = tracks.findIndex((t) => t.id === id);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = tracks.findIndex((t) => t.id === id);
    if (from === target) return;
    setTracks((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-3">
      <div className="mb-2 flex items-center gap-2 px-1">
        <Music className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">My Mix</h3>
      </div>
      <ol ref={listRef} className="space-y-1">
        {tracks.map((t, i) => (
          <li
            key={t.id}
            data-tr
            onPointerMove={(e) => onMove(e, t.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
              dragId === t.id ? "bg-primary/10 shadow" : "hover:bg-muted/50"
            )}
          >
            <button
              type="button"
              aria-label={en ? "Reorder" : "並べ替え"}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragId(t.id);
              }}
              onPointerUp={() => setDragId(null)}
              className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <span className="w-4 text-xs tabular-nums text-muted-foreground">
              {i + 1}
            </span>
            <span className="flex-1 truncate text-foreground">{t.title}</span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {t.time}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
