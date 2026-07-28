import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "テーブル行ドラッグ",
  category: "ドラッグ操作",
  description: "ハンドルで表の行を並べ替えるデータテーブル。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Row = { id: string; name: string; nameEn: string; score: number };

const INITIAL: Row[] = [
  { id: "r1", name: "佐藤", nameEn: "Sato", score: 92 },
  { id: "r2", name: "鈴木", nameEn: "Suzuki", score: 81 },
  { id: "r3", name: "高橋", nameEn: "Takahashi", score: 76 },
  { id: "r4", name: "田中", nameEn: "Tanaka", score: 88 },
  { id: "r5", name: "伊藤", nameEn: "Ito", score: 64 },
];

export default function TableRowDragHandle() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rows, setRows] = useState<Row[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  function onMove(e: React.PointerEvent, id: string) {
    if (dragId !== id) return;
    const body = bodyRef.current;
    if (!body) return;
    const trs = Array.from(body.querySelectorAll<HTMLTableRowElement>("tr"));
    let target = rows.findIndex((r) => r.id === id);
    for (let i = 0; i < trs.length; i++) {
      const r = trs[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) {
        target = i;
        break;
      }
      target = i;
    }
    const from = rows.findIndex((r) => r.id === id);
    if (target === from) return;
    setRows((prev) => {
      const next = prev.slice();
      const [m] = next.splice(from, 1);
      next.splice(target, 0, m);
      return next;
    });
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left text-xs text-muted-foreground">
            <th className="w-8 px-2 py-2">
              <span className="sr-only">{en ? "Reorder" : "並び替え"}</span>
            </th>
            <th className="px-3 py-2 font-medium">{en ? "Name" : "名前"}</th>
            <th className="px-3 py-2 text-right font-medium">
              {en ? "Score" : "スコア"}
            </th>
          </tr>
        </thead>
        <tbody ref={bodyRef}>
          {rows.map((r) => (
            <tr
              key={r.id}
              onPointerMove={(e) => onMove(e, r.id)}
              className={cn(
                "border-b last:border-0",
                dragId === r.id && "bg-primary/10"
              )}
            >
              <td className="px-2 py-2 align-middle">
                <button
                  type="button"
                  aria-label={en ? "Drag row" : "行をドラッグ"}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDragId(r.id);
                  }}
                  onPointerUp={() => setDragId(null)}
                  className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              </td>
              <td className="px-3 py-2 text-foreground">
                {en ? r.nameEn : r.name}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-foreground">
                {r.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
