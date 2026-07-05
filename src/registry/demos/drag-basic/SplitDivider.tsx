import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "分割ペイン",
  category: "ドラッグ操作",
  description: "中央の仕切りをドラッグして左右の割合を変える2ペインレイアウト。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function SplitDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPct(Math.min(80, Math.max(20, ((clientX - rect.left) / rect.width) * 100)));
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

  function onDown() {
    dragging.current = true;
  }

  return (
    <div
      ref={ref}
      className="flex h-48 w-80 select-none overflow-hidden rounded-xl border"
    >
      <div
        className="flex items-center justify-center bg-primary/10 text-sm text-foreground"
        style={{ width: `${pct}%` }}
      >
        {Math.round(pct)}%
      </div>
      <div
        onPointerDown={onDown}
        className="w-1.5 cursor-ew-resize bg-border hover:bg-primary"
      />
      <div className="flex flex-1 items-center justify-center bg-muted/40 text-sm text-foreground">
        {Math.round(100 - pct)}%
      </div>
    </div>
  );
}
