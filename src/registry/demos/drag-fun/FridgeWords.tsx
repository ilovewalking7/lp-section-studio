import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "冷蔵庫マグネット",
  category: "ドラッグ操作",
  description: "言葉のマグネットタイルを自由に動かして並べる。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

type Tile = { id: number; ja: string; en: string; x: number; y: number; rot: number };

const WORDS = [
  { ja: "きょう", en: "today" },
  { ja: "は", en: "is" },
  { ja: "とても", en: "such" },
  { ja: "たのしい", en: "a fun" },
  { ja: "いちにち", en: "day" },
];

const INITIAL: Tile[] = WORDS.map((w, i) => ({
  id: i,
  ja: w.ja,
  en: w.en,
  x: 16 + (i % 3) * 92,
  y: 16 + Math.floor(i / 3) * 48,
  rot: (i % 2 ? 1 : -1) * (2 + i),
}));

export default function FridgeWords() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [tiles, setTiles] = useState<Tile[]>(INITIAL);
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; offX: number; offY: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent, t: Tile) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      id: t.id,
      offX: e.clientX - rect.left - t.x,
      offY: e.clientY - rect.top - t.y,
    };
    setTiles((arr) => {
      const found = arr.find((a) => a.id === t.id);
      if (!found) return arr;
      return [...arr.filter((a) => a.id !== t.id), found];
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(rect.width - 80, e.clientX - rect.left - d.offX));
    const y = Math.max(0, Math.min(rect.height - 36, e.clientY - rect.top - d.offY));
    setTiles((arr) => arr.map((t) => (t.id === d.id ? { ...t, x, y } : t)));
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div
        ref={fieldRef}
        className="relative h-44 w-full max-w-sm overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner ring-1 ring-slate-400/40"
      >
        {tiles.map((t) => (
          <div
            key={t.id}
            onPointerDown={(e) => onPointerDown(e, t)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="absolute cursor-grab touch-none select-none rounded-sm bg-white px-3 py-1.5 text-sm font-bold text-slate-800 shadow active:cursor-grabbing"
            style={{ transform: `translate(${t.x}px, ${t.y}px) rotate(${t.rot}deg)` }}
          >
            {en ? t.en : t.ja}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{en ? "Drag the tiles to make a sentence" : "タイルをドラッグして文を作る"}</p>
    </div>
  );
}
