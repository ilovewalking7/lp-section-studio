import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "回転ノブ",
  category: "ドラッグ操作",
  description: "縦方向のドラッグで回転するノブ。ボリュームつまみのような操作感。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function DragKnob() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [value, setValue] = useState(30); // 0-100
  const drag = useRef<{ sy: number; sv: number } | null>(null);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const delta = (d.sy - e.clientY) * 0.5;
    setValue(Math.min(100, Math.max(0, d.sv + delta)));
  }, []);
  const onUp = useCallback(() => {
    drag.current = null;
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
    drag.current = { sy: e.clientY, sv: value };
  }

  const angle = -135 + (value / 100) * 270;

  return (
    <div className="flex select-none flex-col items-center gap-4">
      <div
        onPointerDown={onDown}
        className="relative h-28 w-28 cursor-ns-resize rounded-full border-4 border-muted bg-card shadow-inner"
      >
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-1 -translate-x-1/2 origin-bottom rounded-full bg-primary"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        {en ? "Volume" : "音量"} {Math.round(value)}
      </span>
    </div>
  );
}
