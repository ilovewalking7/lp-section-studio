import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "付箋メモ",
  category: "ドラッグ操作",
  description: "ヘッダーを掴んで動かせる付箋。掴んでいる間は少し持ち上がる演出。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

export default function StickyNote() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(
    null
  );
  const [lifted, setLifted] = useState(false);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPos({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) });
  }, []);
  const onUp = useCallback(() => {
    drag.current = null;
    setLifted(false);
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
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    setLifted(true);
  }

  return (
    <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-muted/30">
      <div
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) rotate(-3deg) scale(${
            lifted ? 1.05 : 1
          })`,
        }}
        className={
          "w-44 select-none rounded-sm bg-yellow-200 text-yellow-900 transition-shadow " +
          (lifted ? "shadow-2xl" : "shadow-md")
        }
      >
        <div
          onPointerDown={onDown}
          className="cursor-grab rounded-t-sm bg-yellow-300/70 px-3 py-2 text-xs font-medium active:cursor-grabbing"
        >
          {en ? "Note" : "メモ"}
        </div>
        <p className="px-3 py-3 text-sm leading-relaxed">
          {en ? "Grab the header and drag anywhere." : "ヘッダーを掴んで好きな場所へ。"}
        </p>
      </div>
    </div>
  );
}
