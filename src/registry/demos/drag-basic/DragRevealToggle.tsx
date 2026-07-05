import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スライドで承認",
  category: "ドラッグ操作",
  description: "つまみを右端までドラッグして確定する「スライドして実行」トグル。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function DragRevealToggle() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [done, setDone] = useState(false);
  const dragging = useRef(false);
  const maxRef = useRef(0);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const max = rect.width - 48;
    maxRef.current = max;
    setX(Math.min(max, Math.max(0, clientX - rect.left - 24)));
  }, []);

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (dragging.current && !done) update(e.clientX);
    },
    [update, done]
  );

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setX((cur) => {
      if (maxRef.current > 0 && cur >= maxRef.current - 4) {
        setDone(true);
        return maxRef.current;
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
    if (done) return;
    dragging.current = true;
    update(e.clientX);
  }

  return (
    <div
      ref={ref}
      className="relative h-14 w-72 select-none overflow-hidden rounded-full bg-muted"
    >
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground">
        {done
          ? en
            ? "Approved"
            : "承認しました"
          : en
            ? "Slide to approve"
            : "スライドして承認"}
      </span>
      <div
        onPointerDown={onDown}
        style={{
          transform: `translateX(${x}px)`,
          transition: dragging.current ? "none" : "transform 0.25s",
        }}
        className="absolute left-1 top-1 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-primary text-primary-foreground active:cursor-grabbing"
      >
        {done ? <Check className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </div>
    </div>
  );
}
