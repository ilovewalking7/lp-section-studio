import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "価格レンジスライダー",
  category: "ドラッグ操作",
  description: "2つのつまみをドラッグして価格帯を絞り込む。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

const MIN = 0;
const MAX = 1000;

export default function PriceRangeSlider() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [lo, setLo] = useState(200);
  const [hi, setHi] = useState(700);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = useRef<"lo" | "hi" | null>(null);

  function valueAt(clientX: number): number {
    const track = trackRef.current;
    if (!track) return lo;
    const r = track.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round((MIN + t * (MAX - MIN)) / 10) * 10;
  }
  function onDown(which: "lo" | "hi") {
    return (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      active.current = which;
    };
  }
  function onMove(e: React.PointerEvent) {
    if (!active.current) return;
    const v = valueAt(e.clientX);
    if (active.current === "lo") setLo(Math.min(v, hi - 10));
    else setHi(Math.max(v, lo + 10));
  }
  function onUp() {
    active.current = null;
  }

  const loPct = ((lo - MIN) / (MAX - MIN)) * 100;
  const hiPct = ((hi - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">{en ? "Price" : "価格"}</span>
        <span className="tabular-nums text-muted-foreground">
          ¥{lo} 〜 ¥{hi}
        </span>
      </div>
      <div
        ref={trackRef}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className="relative h-8 touch-none select-none"
      >
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-muted" />
        <div
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
        />
        <button
          type="button"
          aria-label={en ? "Minimum" : "下限"}
          onPointerDown={onDown("lo")}
          style={{ left: `${loPct}%` }}
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-background shadow active:cursor-grabbing"
        />
        <button
          type="button"
          aria-label={en ? "Maximum" : "上限"}
          onPointerDown={onDown("hi")}
          style={{ left: `${hiPct}%` }}
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-background shadow active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
