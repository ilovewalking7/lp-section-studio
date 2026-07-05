import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドラッグ可能ウィンドウ",
  category: "ドラッグ操作",
  description: "タイトルバーを掴んで自由に移動できるウィンドウ。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

export default function DraggableWindow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 40, y: 24 });
  const [open, setOpen] = useState(true);
  const drag = useRef<{ ox: number; oy: number } | null>(null);

  function onDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
  }
  function onMove(e: React.PointerEvent) {
    if (!drag.current) return;
    const x = Math.max(0, Math.min(220, e.clientX - drag.current.ox));
    const y = Math.max(0, Math.min(140, e.clientY - drag.current.oy));
    setPos({ x, y });
  }
  function onUp() {
    drag.current = null;
  }

  return (
    <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl border bg-muted/40">
      {open ? (
        <div
          style={{ left: pos.x, top: pos.y }}
          className="absolute w-56 rounded-lg border bg-card shadow-xl"
        >
          <div
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="flex cursor-grab touch-none items-center justify-between rounded-t-lg border-b bg-muted px-3 py-2 active:cursor-grabbing"
          >
            <span className="text-xs font-semibold text-foreground">
              {en ? "Settings panel" : "設定パネル"}
            </span>
            <button
              type="button"
              aria-label={en ? "Close" : "閉じる"}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
              className="rounded p-0.5 text-muted-foreground hover:bg-background"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-2 p-3 text-xs text-muted-foreground">
            <p>
              {en
                ? "Drag the title bar to move the window."
                : "タイトルバーをドラッグして移動できます。"}
            </p>
            <div className="h-1.5 w-full rounded bg-primary/30" />
            <div className="h-1.5 w-2/3 rounded bg-primary/20" />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setPos({ x: 40, y: 24 });
            setOpen(true);
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow"
        >
          {en ? "Open window" : "ウィンドウを開く"}
        </button>
      )}
    </div>
  );
}
