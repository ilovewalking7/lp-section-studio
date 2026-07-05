import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボトムシート",
  category: "ドラッグ操作",
  description: "ハンドルを上下にドラッグして開閉するボトムシート。離すとスナップ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

const CLOSED = 180; // 下にずらす量(px)

export default function BottomSheet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [y, setY] = useState(CLOSED);
  const drag = useRef<{ sy: number; oy: number } | null>(null);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setY(Math.min(CLOSED, Math.max(0, d.oy + (e.clientY - d.sy))));
  }, []);

  const onUp = useCallback(() => {
    if (!drag.current) return;
    drag.current = null;
    setY((cur) => (cur < CLOSED / 2 ? 0 : CLOSED));
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
    drag.current = { sy: e.clientY, oy: y };
  }

  return (
    <div className="relative h-72 w-72 select-none overflow-hidden rounded-2xl border bg-muted/40">
      <div className="p-4 text-xs text-muted-foreground">
        {en ? "Background content" : "背景コンテンツ"}
      </div>
      <div
        style={{
          transform: `translateY(${y}px)`,
          transition: drag.current ? "none" : "transform 0.3s",
        }}
        className="absolute inset-x-0 bottom-0 h-56 rounded-t-2xl border-t bg-card shadow-2xl"
      >
        <div
          onPointerDown={onDown}
          className="flex cursor-grab justify-center py-3 active:cursor-grabbing"
        >
          <span className="h-1.5 w-12 rounded-full bg-muted-foreground/40" />
        </div>
        <div className="px-5">
          <h3 className="text-sm font-semibold text-foreground">詳細パネル</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            ハンドルを上下にドラッグして開閉できます。
          </p>
        </div>
      </div>
    </div>
  );
}
