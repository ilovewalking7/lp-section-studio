import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "色相ピッカー",
  category: "ドラッグ操作",
  description: "ハンドルを横にドラッグして色相を選ぶカラーピッカー。HSLで描画。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function ColorPickerHandle() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(210);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setHue(Math.round(Math.min(1, Math.max(0, ratio)) * 360));
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
      <div
        className="mb-4 h-16 rounded-xl border"
        style={{ background: `hsl(${hue} 80% 55%)` }}
      />
      <div
        ref={ref}
        onPointerDown={onDown}
        className="relative h-4 cursor-pointer rounded-full"
        style={{
          background:
            "linear-gradient(to right, hsl(0 80% 55%), hsl(60 80% 55%), hsl(120 80% 55%), hsl(180 80% 55%), hsl(240 80% 55%), hsl(300 80% 55%), hsl(360 80% 55%))",
        }}
      >
        <div
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: `${(hue / 360) * 100}%`, background: `hsl(${hue} 80% 55%)` }}
        />
      </div>
      <p className="mt-2 text-center text-xs tabular-nums text-muted-foreground">
        {en ? "Hue" : "色相"} {hue}°
      </p>
    </div>
  );
}
