import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドラッグ星評価",
  category: "ドラッグ操作",
  description: "星の上をドラッグして0.5刻みで評価を決める星レーティング。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

const MAX = 5;

export default function DragRating() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(3.5);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const raw = Math.min(1, Math.max(0, ratio)) * MAX;
    setValue(Math.max(0.5, Math.round(raw * 2) / 2));
  }, []);

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (dragging.current) update(e.clientX);
    },
    [update]
  );
  const onUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  function onDown(e: React.PointerEvent) {
    dragging.current = true;
    update(e.clientX);
  }

  return (
    <div className="flex select-none flex-col items-center gap-3">
      <div ref={ref} onPointerDown={onDown} className="flex cursor-pointer gap-1">
        {Array.from({ length: MAX }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, value - i));
          return (
            <div key={i} className="relative h-8 w-8">
              <Star className="absolute h-8 w-8 text-muted-foreground/40" />
              <div
                className="absolute h-8 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={cn("h-8 w-8 fill-amber-400 text-amber-400")}
                />
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        {value.toFixed(1)} / {MAX}
      </span>
    </div>
  );
}
