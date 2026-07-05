import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カンバンチップ移動",
  category: "ドラッグ操作",
  description: "チップをドラッグして3つのレーン間を移動。離した位置のレーンへ吸着。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

const LANES = [
  { ja: "未着手", en: "To do" },
  { ja: "進行中", en: "In progress" },
  { ja: "完了", en: "Done" },
];

export default function KanbanChip() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [lane, setLane] = useState(0);
  const [dx, setDx] = useState(0);
  const drag = useRef<{ sx: number } | null>(null);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setDx(e.clientX - d.sx);
  }, []);

  const onUp = useCallback(() => {
    const el = ref.current;
    if (!drag.current || !el) {
      drag.current = null;
      setDx(0);
      return;
    }
    drag.current = null;
    const laneW = el.getBoundingClientRect().width / LANES.length;
    setLane((cur) => {
      const moved = Math.round(dx / laneW);
      return Math.min(LANES.length - 1, Math.max(0, cur + moved));
    });
    setDx(0);
  }, [dx]);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  function onDown(e: React.PointerEvent) {
    drag.current = { sx: e.clientX };
  }

  return (
    <div ref={ref} className="grid w-80 select-none grid-cols-3 gap-2">
      {LANES.map((laneItem, i) => (
        <div key={i} className="rounded-lg bg-muted/50 p-2">
          <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
            {en ? laneItem.en : laneItem.ja}
          </p>
          <div className="min-h-16">
            {lane === i && (
              <div
                onPointerDown={onDown}
                style={{
                  transform: `translateX(${dx}px)`,
                  transition: drag.current ? "none" : "transform 0.25s",
                }}
                className="cursor-grab rounded-md border bg-card p-2 text-xs text-foreground shadow active:cursor-grabbing"
              >
                {en ? "Task A" : "タスクA"}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
