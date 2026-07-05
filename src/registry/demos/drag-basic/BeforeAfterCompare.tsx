import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ビフォーアフター比較",
  category: "ドラッグ操作",
  description: "仕切りをドラッグして2枚を見比べる比較スライダー。CSSグラデで描画。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function BeforeAfterCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPct(Math.min(100, Math.max(0, ratio * 100)));
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
    <div
      ref={ref}
      onPointerDown={onDown}
      className="relative h-56 w-80 cursor-ew-resize select-none overflow-hidden rounded-xl border"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-600" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-300 to-rose-500"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      />
      <div
        className="absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow"
        style={{ left: `${pct}%` }}
      >
        <ChevronsLeftRight className="h-4 w-4" />
      </div>
    </div>
  );
}
