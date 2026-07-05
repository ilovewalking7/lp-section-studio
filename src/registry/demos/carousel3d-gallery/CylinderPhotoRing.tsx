import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "円筒フォトリング",
  category: "3Dカルーセル",
  description: "写真パネルを円筒状に並べてドラッグ風に回転。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const PANELS = [
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-600",
  "from-lime-400 to-emerald-600",
  "from-cyan-400 to-sky-600",
  "from-indigo-400 to-violet-600",
  "from-fuchsia-400 to-purple-600",
];

export default function CylinderPhotoRing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [rot, setRot] = useState(0);
  const count = PANELS.length;
  const step = 360 / count;
  const radius = 220;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 200, height: 160, perspective: "1000px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rot}deg)`,
          }}
        >
          {PANELS.map((grad, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br text-3xl font-bold text-white/90 shadow-2xl",
                grad
              )}
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <input
        type="range"
        min={-180}
        max={180}
        value={rot}
        onChange={(e) => setRot(Number(e.target.value))}
        className="w-64 accent-primary"
        aria-label={en ? "Rotate" : "回転"}
      />
    </div>
  );
}
