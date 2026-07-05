import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

export const meta: DemoMeta = {
  name: "コイン積み",
  category: "ドラッグ操作",
  description: "コインをドラッグして貯金箱に重ねて積み上げる。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

export default function CoinStack() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [available, setAvailable] = useState(6);
  const [stacked, setStacked] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const jarRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (available <= 0) return;
    activeRef.current = true;
    setGrabbing(true);
    startRef.current = { x: e.clientX, y: e.clientY };
    setPos({ x: 0, y: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    setPos({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setGrabbing(false);
    const j = jarRef.current?.getBoundingClientRect();
    if (j && e.clientX >= j.left && e.clientX <= j.right && e.clientY >= j.top && e.clientY <= j.bottom) {
      setAvailable((a) => a - 1);
      setStacked((s) => s + 1);
    }
    setPos({ x: 0, y: 0 });
  };

  return (
    <div className="flex w-full items-center justify-around gap-6 py-6">
      <div className="flex flex-col items-center gap-2">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "flex h-14 w-14 touch-none select-none items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-2xl text-amber-900 shadow-lg ring-2 ring-amber-200",
            available > 0 ? "cursor-grab active:cursor-grabbing" : "opacity-30",
            grabbing ? "z-20 scale-110" : "transition-transform"
          )}
          style={grabbing ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
        >
          ¥
        </div>
        <span className="text-xs text-muted-foreground">{en ? `${available} left` : `残り ${available}`}</span>
      </div>

      <div ref={jarRef} className="flex flex-col items-center">
        <div className="relative flex h-32 w-24 flex-col-reverse items-center justify-start overflow-hidden rounded-b-2xl rounded-t-md border-2 border-muted-foreground/30 bg-muted/20 p-1">
          {Array.from({ length: stacked }).map((_, i) => (
            <div
              key={i}
              className="my-[1px] h-4 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 shadow-sm"
            />
          ))}
        </div>
        <span className="mt-2 text-sm font-bold text-amber-600">{en ? `${stacked} coins` : `${stacked} 枚`}</span>
        {available === 0 && (
          <button
            onClick={() => {
              setAvailable(6);
              setStacked(0);
            }}
            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3" /> {en ? "Reset" : "リセット"}
          </button>
        )}
      </div>
    </div>
  );
}
