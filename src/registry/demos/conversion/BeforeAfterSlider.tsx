import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ビフォーアフター比較",
  category: "コンバージョン",
  description:
    "ポインターでドラッグできるビフォー/アフター比較スライダー（CSSグラデーション）。",
  align: "center",
  level: "advanced",
  isNew: true,
  tags: ["before-after", "comparison", "interactive"],
  principle:
    "変化を直接対比して見せる具体性が、抽象的な約束よりも『どれだけ良くなるか』を一瞬で実感させ、ベネフィットの信憑性を高める。",
};

export default function BeforeAfterSlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [update]);

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-3 flex items-center justify-between text-xs font-medium">
        <span className="text-muted-foreground">{en ? "Before" : "導入前"}</span>
        <span className="text-emerald-500">{en ? "After" : "導入後"}</span>
      </div>

      <div
        ref={ref}
        onPointerDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border shadow-sm"
      >
        {/* AFTER (base layer) */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500">
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center text-white">
              <p className="text-4xl font-bold tabular-nums drop-shadow">
                +186%
              </p>
              <p className="mt-1 text-sm font-medium opacity-90">
                {en ? "Conversion rate" : "コンバージョン率"}
              </p>
            </div>
          </div>
        </div>

        {/* BEFORE (clipped overlay) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-zinc-900"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center text-white/70">
              <p className="text-4xl font-bold tabular-nums">
                {en ? "Baseline" : "基準値"}
              </p>
              <p className="mt-1 text-sm font-medium">
                {en ? "No optimization" : "最適化なし"}
              </p>
            </div>
          </div>
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-white/15 backdrop-blur transition-transform",
              "hover:scale-105 active:scale-95"
            )}
          >
            <MoveHorizontal className="size-5 text-white" />
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {en
          ? "Drag the handle to compare the change"
          : "ハンドルをドラッグして変化を比較"}
      </p>
    </div>
  );
}
