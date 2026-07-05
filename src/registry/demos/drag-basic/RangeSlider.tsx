import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レンジスライダー",
  category: "ドラッグ操作",
  description: "2つのつまみをドラッグして範囲を指定する価格帯フィルター風スライダー。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function RangeSlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [lo, setLo] = useState(25);
  const [hi, setHi] = useState(70);
  const active = useRef<"lo" | "hi" | null>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el || !active.current) return;
    const rect = el.getBoundingClientRect();
    const v = Math.round(
      Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * 100
    );
    if (active.current === "lo") setLo(Math.min(v, hi - 1));
    if (active.current === "hi") setHi(Math.max(v, lo + 1));
  }, [hi, lo]);

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (active.current) update(e.clientX);
    },
    [update]
  );
  const onUp = useCallback(() => {
    active.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  function start(which: "lo" | "hi") {
    return () => {
      active.current = which;
    };
  }

  return (
    <div className="w-72 select-none">
      <div className="mb-3 flex justify-between text-sm text-foreground">
        <span>¥{lo}00</span>
        <span>¥{hi}00</span>
      </div>
      <div ref={ref} className="relative h-2 rounded-full bg-muted">
        <div
          className="absolute inset-y-0 rounded-full bg-primary"
          style={{ left: `${lo}%`, right: `${100 - hi}%` }}
        />
        <button
          type="button"
          onPointerDown={start("lo")}
          style={{ left: `${lo}%` }}
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-background bg-primary shadow active:cursor-grabbing"
          aria-label={en ? "Lower bound" : "下限"}
        />
        <button
          type="button"
          onPointerDown={start("hi")}
          style={{ left: `${hi}%` }}
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-background bg-primary shadow active:cursor-grabbing"
          aria-label={en ? "Upper bound" : "上限"}
        />
      </div>
    </div>
  );
}
