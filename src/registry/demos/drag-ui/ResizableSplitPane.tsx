import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "分割ペイン",
  category: "ドラッグ操作",
  description: "中央の境界をドラッグして左右の幅を調整する。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "ui"],
};

export default function ResizableSplitPane() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [ratio, setRatio] = useState(0.5);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function onDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
  }
  function onMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const next = (e.clientX - r.left) / r.width;
    setRatio(Math.max(0.15, Math.min(0.85, next)));
  }
  function onUp() {
    dragging.current = false;
  }

  return (
    <div className="w-full max-w-md">
      <div
        ref={wrapRef}
        className="flex h-48 w-full overflow-hidden rounded-xl border bg-card"
      >
        <div
          style={{ width: `${ratio * 100}%` }}
          className="flex items-center justify-center bg-primary/10 text-sm font-medium text-foreground"
        >
          {en ? "Editor" : "エディタ"}
        </div>
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          role="separator"
          aria-orientation="vertical"
          className="flex w-2 shrink-0 cursor-col-resize touch-none items-center justify-center bg-border hover:bg-primary"
        >
          <div className="h-8 w-0.5 rounded bg-background/70" />
        </div>
        <div className="flex flex-1 items-center justify-center bg-muted/50 text-sm font-medium text-muted-foreground">
          {en ? "Preview" : "プレビュー"}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {en ? "Left" : "左"} {Math.round(ratio * 100)}% /{" "}
        {en ? "Right" : "右"} {Math.round((1 - ratio) * 100)}%
      </p>
    </div>
  );
}
