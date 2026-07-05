import { useRef, useState } from "react";
import { Move } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "クロップ枠",
  category: "ドラッグ操作",
  description: "枠をドラッグして移動・隅で拡縮する切り抜きフレーム。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

type Rect = { x: number; y: number; w: number; h: number };
const BOUND = { w: 320, h: 200 };
const MINW = 60;
const MINH = 40;

export default function CropFrame() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rect, setRect] = useState<Rect>({ x: 80, y: 50, w: 160, h: 100 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const mode = useRef<"move" | "resize" | null>(null);
  const startPt = useRef<{ mx: number; my: number; r: Rect } | null>(null);

  function local(e: React.PointerEvent) {
    const wrap = wrapRef.current;
    if (!wrap) return { mx: 0, my: 0 };
    const b = wrap.getBoundingClientRect();
    return { mx: e.clientX - b.left, my: e.clientY - b.top };
  }
  function begin(m: "move" | "resize") {
    return (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      mode.current = m;
      startPt.current = { ...local(e), r: rect };
    };
  }
  function onMove(e: React.PointerEvent) {
    if (!mode.current || !startPt.current) return;
    const { mx, my } = local(e);
    const s = startPt.current;
    const dx = mx - s.mx;
    const dy = my - s.my;
    if (mode.current === "move") {
      const x = Math.max(0, Math.min(BOUND.w - s.r.w, s.r.x + dx));
      const y = Math.max(0, Math.min(BOUND.h - s.r.h, s.r.y + dy));
      setRect({ ...s.r, x, y });
    } else {
      const w = Math.max(MINW, Math.min(BOUND.w - s.r.x, s.r.w + dx));
      const h = Math.max(MINH, Math.min(BOUND.h - s.r.y, s.r.h + dy));
      setRect({ ...s.r, w, h });
    }
  }
  function onUp() {
    mode.current = null;
    startPt.current = null;
  }

  return (
    <div className="w-full max-w-md">
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerUp={onUp}
        style={{ width: BOUND.w, height: BOUND.h }}
        className="relative mx-auto touch-none overflow-hidden rounded-lg bg-gradient-to-br from-sky-400 via-violet-400 to-rose-400 select-none"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
          className="absolute"
        >
          <button
            type="button"
            aria-label={en ? "Move frame" : "枠を移動"}
            onPointerDown={begin("move")}
            className="absolute inset-0 flex cursor-move touch-none items-center justify-center rounded-sm bg-transparent ring-2 ring-white"
            style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.0)" }}
          >
            <Move className="h-4 w-4 text-white/80" />
          </button>
          <button
            type="button"
            aria-label={en ? "Resize" : "サイズ変更"}
            onPointerDown={begin("resize")}
            className="absolute -bottom-1.5 -right-1.5 h-4 w-4 cursor-nwse-resize touch-none rounded-full border-2 border-sky-600 bg-white"
          />
        </div>
      </div>
      <p className="mt-2 text-center text-xs tabular-nums text-muted-foreground">
        {Math.round(rect.w)} × {Math.round(rect.h)} px
      </p>
    </div>
  );
}
