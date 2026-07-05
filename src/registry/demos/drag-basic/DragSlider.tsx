import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドラッグ値スライダー",
  category: "ドラッグ操作",
  description: "つまみをドラッグして 0〜100 の値を設定するシンプルなスライダー。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function DragSlider() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(40);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setValue(Math.round(Math.min(1, Math.max(0, ratio)) * 100));
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
    <div className="w-72 select-none">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">
          {en ? "Brightness" : "明るさ"}
        </span>
        <span className="text-2xl font-semibold tabular-nums text-foreground">
          {value}
        </span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={onDown}
        className="relative h-3 cursor-pointer rounded-full bg-muted"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary shadow"
          style={{ left: `${value}%` }}
        />
      </div>
    </div>
  );
}
