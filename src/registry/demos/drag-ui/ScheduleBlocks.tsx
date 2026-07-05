import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "予定ブロック移動",
  category: "ドラッグ操作",
  description: "タイムライン上の予定を縦にドラッグして時間を変更する。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Block = {
  id: string;
  label: string;
  labelEn: string;
  slot: number;
  span: number;
  color: string;
};

const HOURS = 10; // 9:00 - 19:00
const SLOT_H = 28;

const INITIAL: Block[] = [
  { id: "b1", label: "朝会", labelEn: "Standup", slot: 0, span: 1, color: "bg-sky-500" },
  { id: "b2", label: "設計", labelEn: "Design", slot: 2, span: 2, color: "bg-violet-500" },
  { id: "b3", label: "ランチ", labelEn: "Lunch", slot: 5, span: 1, color: "bg-amber-500" },
  { id: "b4", label: "レビュー", labelEn: "Review", slot: 7, span: 2, color: "bg-emerald-500" },
];

export default function ScheduleBlocks() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [blocks, setBlocks] = useState<Block[]>(INITIAL);
  const colRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; offset: number } | null>(null);

  function onDown(e: React.PointerEvent, b: Block) {
    const col = colRef.current;
    if (!col) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const r = col.getBoundingClientRect();
    const rel = (e.clientY - r.top) / SLOT_H;
    drag.current = { id: b.id, offset: rel - b.slot };
  }
  function onMove(e: React.PointerEvent) {
    const col = colRef.current;
    if (!col || !drag.current) return;
    const r = col.getBoundingClientRect();
    const rel = (e.clientY - r.top) / SLOT_H;
    const d = drag.current;
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== d.id) return b;
        const slot = Math.max(
          0,
          Math.min(HOURS - b.span, Math.round(rel - d.offset))
        );
        return { ...b, slot };
      })
    );
  }
  function onUp() {
    drag.current = null;
  }

  return (
    <div className="flex w-full max-w-xs gap-2 rounded-xl border bg-card p-3">
      <div className="flex flex-col text-[10px] text-muted-foreground">
        {Array.from({ length: HOURS }, (_, i) => (
          <div key={i} style={{ height: SLOT_H }} className="leading-none">
            {9 + i}:00
          </div>
        ))}
      </div>
      <div
        ref={colRef}
        onPointerMove={onMove}
        onPointerUp={onUp}
        style={{ height: HOURS * SLOT_H }}
        className="relative flex-1 touch-none rounded-md bg-muted/40"
      >
        {Array.from({ length: HOURS }, (_, i) => (
          <div
            key={i}
            style={{ top: i * SLOT_H, height: SLOT_H }}
            className="absolute w-full border-t border-border/60"
          />
        ))}
        {blocks.map((b) => (
          <button
            key={b.id}
            type="button"
            onPointerDown={(e) => onDown(e, b)}
            style={{ top: b.slot * SLOT_H + 1, height: b.span * SLOT_H - 2 }}
            className={cn(
              "absolute left-1 right-1 cursor-grab touch-none rounded px-2 text-left text-xs font-medium text-white shadow active:cursor-grabbing",
              b.color
            )}
          >
            {en ? b.labelEn : b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
