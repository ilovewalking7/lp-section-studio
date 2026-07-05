import { useState, useRef } from "react";
import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "傾き3Dカード",
  category: "ドラッグ操作",
  description: "ドラッグでカードを3Dに傾け、離すと水平へ戻る。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "playful"],
};

export default function TiltCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    activeRef.current = true;
    setDragging(true);
    const r = cardRef.current?.getBoundingClientRect();
    if (r) centerRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeRef.current) return;
    const dx = e.clientX - centerRef.current.x;
    const dy = e.clientY - centerRef.current.y;
    const clamp = (v: number) => Math.max(-18, Math.min(18, v));
    setTilt({ rx: clamp(-dy / 6), ry: clamp(dx / 6) });
  };

  const onPointerUp = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setDragging(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 py-8" style={{ perspective: "900px" }}>
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-56 w-44 cursor-grab touch-none select-none overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 text-white shadow-2xl active:cursor-grabbing"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: dragging ? "none" : "transform 0.4s ease",
        }}
      >
        <Sparkles className="h-6 w-6" />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.ry * 2}% ${50 - tilt.rx * 2}%, rgba(255,255,255,0.6), transparent 55%)`,
          }}
        />
        <div className="absolute bottom-5 left-5">
          <p className="text-xs opacity-80">MEMBER</p>
          <p className="text-lg font-bold tracking-wide">PLAYFUL</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {en ? "Grab the card and tilt it" : "カードを掴んで傾ける"}
      </p>
    </div>
  );
}
