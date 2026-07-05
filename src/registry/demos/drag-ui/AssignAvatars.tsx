import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "担当者アサイン",
  category: "ドラッグ操作",
  description: "アバターをタスクへドラッグして担当者を割り当てる。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Person = { id: string; name: string; hue: number };

const PEOPLE: Person[] = [
  { id: "p1", name: "あ", hue: 10 },
  { id: "p2", name: "い", hue: 130 },
  { id: "p3", name: "う", hue: 220 },
  { id: "p4", name: "え", hue: 290 },
];

const TASKS = [
  { id: "ta", label: "デザイン", labelEn: "Design" },
  { id: "tb", label: "開発", labelEn: "Development" },
  { id: "tc", label: "QA", labelEn: "QA" },
];

export default function AssignAvatars() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [assigned, setAssigned] = useState<Record<string, string | null>>({
    ta: null,
    tb: null,
    tc: null,
  });
  const [dragId, setDragId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  function onUp(e: React.PointerEvent, personId: string) {
    const root = rootRef.current;
    if (root) {
      const slots = Array.from(
        root.querySelectorAll<HTMLElement>("[data-task]")
      );
      for (const el of slots) {
        const r = el.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          const tid = el.dataset.task;
          if (tid) setAssigned((prev) => ({ ...prev, [tid]: personId }));
          break;
        }
      }
    }
    setDragId(null);
  }

  function avatar(p: Person, size = "h-9 w-9") {
    return (
      <span
        style={{ backgroundColor: `hsl(${p.hue} 65% 55%)` }}
        className={cn(
          "flex items-center justify-center rounded-full text-sm font-bold text-white",
          size
        )}
      >
        {p.name}
      </span>
    );
  }

  return (
    <div ref={rootRef} className="w-full max-w-md rounded-xl border bg-card p-4">
      <div className="mb-4 flex gap-2">
        {PEOPLE.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={en ? `Assign ${p.name}` : `${p.name} を割り当て`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragId(p.id);
            }}
            onPointerUp={(e) => onUp(e, p.id)}
            className={cn(
              "cursor-grab touch-none rounded-full transition active:cursor-grabbing",
              dragId === p.id && "scale-110 ring-2 ring-primary ring-offset-2"
            )}
          >
            {avatar(p)}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {TASKS.map((t) => {
          const who = PEOPLE.find((p) => p.id === assigned[t.id]);
          return (
            <div
              key={t.id}
              data-task={t.id}
              className="flex items-center justify-between rounded-lg border border-dashed bg-background px-3 py-2"
            >
              <span className="text-sm text-foreground">
                {en ? t.labelEn : t.label}
              </span>
              {who ? (
                avatar(who, "h-7 w-7 text-xs")
              ) : (
                <span className="text-xs text-muted-foreground">
                  {en ? "Unassigned" : "未割当"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
