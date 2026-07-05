import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "360度プロダクトスピナー",
  category: "3Dカルーセル",
  description: "ドラッグで擬似360度回転するCSS製プロダクトビューア。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const FRAMES = 24;

export default function ProductSpinner360() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [frame, setFrame] = useState(0);
  const dragging = useState(false);
  const [isDown, setIsDown] = dragging;
  const startRef = useState(0);

  const angle = (frame / FRAMES) * 360;

  function onMove(clientX: number, startX: number, base: number) {
    const delta = clientX - startX;
    const f = Math.round(base + delta / 8);
    setFrame(((f % FRAMES) + FRAMES) % FRAMES);
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 py-8">
      <div
        className="relative cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ width: 220, height: 220, perspective: "700px" }}
        onPointerDown={(e) => {
          setIsDown(true);
          startRef[1](e.clientX);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDown) onMove(e.clientX, startRef[0], frame);
        }}
        onPointerUp={() => setIsDown(false)}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg)` }}
        >
          <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 shadow-2xl">
            <div
              className="absolute inset-3 rounded-xl bg-gradient-to-br from-rose-500 to-indigo-600"
              style={{ transform: "translateZ(8px)" }}
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white"
              style={{ transform: "translateZ(12px)" }}
            >
              3D
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setFrame(0)}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-muted px-3 text-sm font-medium hover:bg-muted/70"
        >
          <RotateCcw className="h-4 w-4" /> {en ? "Reset" : "リセット"}
        </button>
        <span className="text-xs text-muted-foreground">
          {Math.round(angle)}° / {en ? "Frame" : "フレーム"} {frame + 1}
        </span>
      </div>
    </div>
  );
}
