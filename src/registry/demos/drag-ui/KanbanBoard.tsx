import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カンバン移動",
  category: "ドラッグ操作",
  description: "カードを列から列へドラッグして状態を変えるボード。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Card = { id: string; title: string; titleEn: string };
type ColId = "todo" | "doing" | "done";

const COLS: { id: ColId; label: string; labelEn: string }[] = [
  { id: "todo", label: "未着手", labelEn: "To do" },
  { id: "doing", label: "進行中", labelEn: "In progress" },
  { id: "done", label: "完了", labelEn: "Done" },
];

const SEED: Record<ColId, Card[]> = {
  todo: [
    { id: "k1", title: "ロゴ調整", titleEn: "Tweak logo" },
    { id: "k2", title: "API 設計", titleEn: "API design" },
  ],
  doing: [{ id: "k3", title: "認証実装", titleEn: "Auth implementation" }],
  done: [{ id: "k4", title: "環境構築", titleEn: "Set up environment" }],
};

export default function KanbanBoard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [cols, setCols] = useState<Record<ColId, Card[]>>(SEED);
  const [dragId, setDragId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  function findCard(id: string): { col: ColId; card: Card } | null {
    for (const c of COLS) {
      const card = cols[c.id].find((x) => x.id === id);
      if (card) return { col: c.id, card };
    }
    return null;
  }

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const board = boardRef.current;
    if (!board) return;
    const colEls = Array.from(
      board.querySelectorAll<HTMLElement>("[data-col]")
    );
    let overCol: ColId | null = null;
    for (const el of colEls) {
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right) {
        overCol = el.dataset.col as ColId;
        break;
      }
    }
    const cur = findCard(id);
    if (!cur || !overCol || overCol === cur.col) return;
    setCols((prev) => {
      const next: Record<ColId, Card[]> = {
        todo: prev.todo.slice(),
        doing: prev.doing.slice(),
        done: prev.done.slice(),
      };
      next[cur.col] = next[cur.col].filter((x) => x.id !== id);
      next[overCol as ColId] = [...next[overCol as ColId], cur.card];
      return next;
    });
  }

  return (
    <div ref={boardRef} className="grid w-full max-w-md grid-cols-3 gap-2">
      {COLS.map((c) => (
        <div
          key={c.id}
          data-col={c.id}
          className="flex flex-col rounded-xl border bg-muted/40 p-2"
        >
          <h4 className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
            {en ? c.labelEn : c.label}
          </h4>
          <div className="flex min-h-[80px] flex-col gap-1.5">
            {cols[c.id].map((card) => (
              <button
                key={card.id}
                type="button"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setDragId(card.id);
                }}
                onPointerMove={(e) => onMove(e, card.id)}
                onPointerUp={() => setDragId(null)}
                className={cn(
                  "cursor-grab touch-none rounded-lg border bg-card px-2.5 py-2 text-left text-xs font-medium text-foreground shadow-sm transition active:cursor-grabbing",
                  dragId === card.id && "scale-105 ring-2 ring-primary"
                )}
              >
                {en ? card.titleEn : card.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
