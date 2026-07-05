import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リサイズパネル",
  category: "ドラッグ操作",
  description: "右端のハンドルをドラッグして幅を変えられるパネル。最小/最大で固定。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function ResizePanel() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [width, setWidth] = useState(220);
  const drag = useRef<{ sx: number; sw: number } | null>(null);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setWidth(Math.min(320, Math.max(120, d.sw + (e.clientX - d.sx))));
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
    drag.current = { sx: e.clientX, sw: width };
  }

  return (
    <div className="flex h-48 select-none items-stretch rounded-xl border bg-muted/30">
      <div
        className="flex flex-col gap-2 p-4"
        style={{ width }}
      >
        <span className="text-sm font-medium text-foreground">{en ? "Sidebar" : "サイドバー"}</span>
        <span className="text-xs text-muted-foreground">{en ? "Width" : "幅"} {Math.round(width)}px</span>
        <div className="mt-2 h-2 w-full rounded bg-muted" />
        <div className="h-2 w-2/3 rounded bg-muted" />
      </div>
      <div
        onPointerDown={onDown}
        className="flex w-3 cursor-ew-resize items-center justify-center bg-border hover:bg-primary/40"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 p-4 text-xs text-muted-foreground">{en ? "Content area" : "本文エリア"}</div>
    </div>
  );
}
