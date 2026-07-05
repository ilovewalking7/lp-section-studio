import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転ダイヤル",
  category: "ドラッグ操作",
  description: "中心まわりにドラッグして角度を決めるダイヤル。atan2 で角度算出。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function RotateDial() {
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);

  const update = useCallback((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const deg = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
    setAngle((deg + 360) % 360);
  }, []);

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (dragging.current) update(e.clientX, e.clientY);
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
    update(e.clientX, e.clientY);
  }

  return (
    <div className="flex select-none flex-col items-center gap-4">
      <div
        ref={ref}
        onPointerDown={onDown}
        className="relative h-32 w-32 cursor-grab rounded-full border-4 border-muted bg-card active:cursor-grabbing"
      >
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-1.5 origin-bottom -translate-x-1/2 rounded-full bg-primary"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)`, top: 0 }}
        />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        {Math.round(angle)}°
      </span>
    </div>
  );
}
