import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リップルボタン",
  category: "ボタン演出",
  description: "クリック地点から波紋が広がるマテリアル風リップル。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "ripple"],
};

type Ripple = { id: number; x: number; y: number; size: number };

export default function RippleButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 650);
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <style>{`
        @keyframes ba-ripple {
          from { transform: scale(0); opacity: 0.5; }
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>

      <button
        onClick={addRipple}
        className="relative overflow-hidden rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-500 active:bg-emerald-700"
      >
        <span className="relative z-10">{en ? "Click me" : "クリックしてね"}</span>
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/60"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              animation: "ba-ripple 0.65s ease-out forwards",
            }}
          />
        ))}
      </button>
      <p className="text-xs text-muted-foreground">{en ? "Ripples spread from where you click" : "波紋がクリック位置から広がる"}</p>
    </div>
  );
}
