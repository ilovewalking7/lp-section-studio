import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "傾けて注ぐ",
  category: "ドラッグ操作",
  description: "ボトルをドラッグで傾けてコップに液体を注ぐ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

export default function DragToPour() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [angle, setAngle] = useState(0);
  const [level, setLevel] = useState(0);
  const activeRef = useRef(false);
  const startRef = useRef(0);
  const startAngleRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    activeRef.current = true;
    startRef.current = e.clientX;
    startAngleRef.current = angle;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const delta = (e.clientX - startRef.current) * 0.5;
    const a = Math.max(0, Math.min(110, startAngleRef.current + delta));
    setAngle(a);
    if (a > 55) {
      setLevel((l) => Math.min(100, l + (a - 55) * 0.04));
    }
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setAngle(0);
  };

  const pouring = angle > 55;

  return (
    <div className="flex w-full items-end justify-center gap-8 py-6">
      <div className="flex flex-col items-center">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-32 w-12 cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ transform: `rotate(${angle}deg)`, transformOrigin: "bottom right", transition: activeRef.current ? "none" : "transform 0.3s" }}
        >
          <div className="absolute bottom-0 h-24 w-12 rounded-b-lg rounded-t-md bg-gradient-to-b from-emerald-600 to-emerald-700 shadow-md" />
          <div className="absolute -top-2 left-3 h-8 w-6 rounded-t-md bg-emerald-700" />
          <div className="absolute bottom-2 left-1.5 h-16 w-9 rounded-b-sm bg-amber-400/70" />
        </div>
        <span className="mt-2 text-xs text-muted-foreground">{en ? "Drag to tilt" : "ドラッグで傾ける"}</span>
      </div>

      <div className="relative flex flex-col items-center">
        {pouring && (
          <div className="absolute -top-6 right-2 h-8 w-1 animate-pulse bg-amber-400/70" />
        )}
        <div className="relative h-24 w-16 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-muted-foreground/30 bg-muted/10">
          <div
            className={cn("absolute bottom-0 w-full bg-gradient-to-t from-amber-500 to-amber-300")}
            style={{ height: `${level}%`, transition: "height 0.1s linear" }}
          />
        </div>
        <span className="mt-2 text-sm font-bold text-amber-600">{Math.round(level)}%</span>
      </div>
    </div>
  );
}
