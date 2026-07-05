import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "並べ替えリスト",
  category: "ドラッグ操作",
  description: "ハンドルをドラッグして行を並べ替えるリスト。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Task = { id: string; label: string; labelEn: string };

const INITIAL: Task[] = [
  { id: "t1", label: "要件をまとめる", labelEn: "Gather requirements" },
  { id: "t2", label: "ワイヤーフレーム作成", labelEn: "Create wireframes" },
  { id: "t3", label: "デザインレビュー", labelEn: "Design review" },
  { id: "t4", label: "実装に着手", labelEn: "Start implementation" },
  { id: "t5", label: "テストとリリース", labelEn: "Test and release" },
];

export default function ReorderList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [items, setItems] = useState<Task[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  function handleMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLLIElement>("[data-row]")
    );
    const y = e.clientY;
    let target = items.findIndex((it) => it.id === id);
    for (let i = 0; i < rows.length; i++) {
      const rect = rows[i].getBoundingClientRect();
      if (y < rect.top + rect.height / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = items.findIndex((it) => it.id === id);
    if (target === from || target < 0) return;
    setItems((prev) => {
      const next = prev.slice();
      const [moved] = next.splice(from, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        {en ? "Task order" : "タスク順序"}
      </h3>
      <ul ref={listRef} className="space-y-1.5">
        {items.map((it) => (
          <li
            key={it.id}
            data-row
            onPointerMove={(e) => handleMove(e, it.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm transition-shadow",
              dragId === it.id && "shadow-lg ring-2 ring-primary/40"
            )}
          >
            <button
              type="button"
              aria-label={en ? "Drag to reorder" : "ドラッグして並べ替え"}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragId(it.id);
              }}
              onPointerUp={() => setDragId(null)}
              className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <span className="text-foreground">
              {en ? it.labelEn : it.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
