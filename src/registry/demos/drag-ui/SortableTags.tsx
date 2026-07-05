import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "並べ替えタグ",
  category: "ドラッグ操作",
  description: "タグチップをドラッグして優先順位を並べ替える。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Tag = { id: string; label: string };

const INITIAL: Tag[] = [
  { id: "g1", label: "React" },
  { id: "g2", label: "TypeScript" },
  { id: "g3", label: "Tailwind" },
  { id: "g4", label: "Vite" },
  { id: "g5", label: "Node.js" },
  { id: "g6", label: "Design" },
];

export default function SortableTags() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [tags, setTags] = useState<Tag[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const chips = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-chip]")
    );
    let target = -1;
    for (let i = 0; i < chips.length; i++) {
      const r = chips[i].getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (e.clientY < cy + r.height / 2 && e.clientX < cx) {
        target = i;
        break;
      }
    }
    const from = tags.findIndex((t) => t.id === id);
    if (target === -1) target = tags.length - 1;
    if (target === from) return;
    setTags((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        {en ? "Skill priority" : "スキル順"}
      </h3>
      <div ref={wrapRef} className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t.id}
            data-chip
            type="button"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragId(t.id);
            }}
            onPointerMove={(e) => onMove(e, t.id)}
            onPointerUp={() => setDragId(null)}
            className={cn(
              "cursor-grab touch-none select-none rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition active:cursor-grabbing",
              dragId === t.id && "scale-105 border-primary bg-primary/10 shadow"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
