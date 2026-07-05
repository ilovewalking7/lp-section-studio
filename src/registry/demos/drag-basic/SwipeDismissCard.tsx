import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, X } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スワイプ削除カード",
  category: "ドラッグ操作",
  description: "横にドラッグして一定量を超えると消えるカード。リセットで復活します。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function SwipeDismissCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [dx, setDx] = useState(0);
  const [gone, setGone] = useState(false);
  const drag = useRef<{ sx: number } | null>(null);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setDx(e.clientX - d.sx);
  }, []);

  const onUp = useCallback(() => {
    if (!drag.current) return;
    drag.current = null;
    setDx((cur) => {
      if (Math.abs(cur) > 120) {
        setGone(true);
        return cur > 0 ? 400 : -400;
      }
      return 0;
    });
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
    if (gone) return;
    drag.current = { sx: e.clientX };
  }

  function reset() {
    setGone(false);
    setDx(0);
  }

  return (
    <div className="flex h-56 w-80 items-center justify-center">
      {gone ? (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm text-foreground"
        >
          <RotateCcw className="h-4 w-4" /> {en ? "Again" : "もう一度"}
        </button>
      ) : (
        <div
          onPointerDown={onDown}
          style={{
            transform: `translateX(${dx}px) rotate(${dx * 0.04}deg)`,
            transition: drag.current ? "none" : "transform 0.25s",
            opacity: 1 - Math.min(Math.abs(dx) / 250, 0.6),
          }}
          className="flex w-64 cursor-grab select-none flex-col gap-2 rounded-xl border bg-card p-5 shadow-lg active:cursor-grabbing"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{en ? "Notification #1" : "通知 #1"}</span>
            <X className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            {en ? "Swipe left or right to dismiss." : "左右にスワイプして消去できます。"}
          </p>
        </div>
      )}
    </div>
  );
}
