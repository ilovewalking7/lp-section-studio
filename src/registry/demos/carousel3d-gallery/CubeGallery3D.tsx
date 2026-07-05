import { useState } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "立方体ギャラリー",
  category: "3Dカルーセル",
  description: "X軸とY軸の2方向に転がる立方体ギャラリー。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const FACES = [
  { t: "front", grad: "from-rose-500 to-red-600", tf: "translateZ(110px)" },
  { t: "back", grad: "from-sky-500 to-blue-600", tf: "rotateY(180deg) translateZ(110px)" },
  { t: "right", grad: "from-emerald-500 to-green-600", tf: "rotateY(90deg) translateZ(110px)" },
  { t: "left", grad: "from-amber-500 to-orange-600", tf: "rotateY(-90deg) translateZ(110px)" },
  { t: "top", grad: "from-violet-500 to-purple-600", tf: "rotateX(90deg) translateZ(110px)" },
  { t: "bottom", grad: "from-pink-500 to-fuchsia-600", tf: "rotateX(-90deg) translateZ(110px)" },
];

export default function CubeGallery3D() {
  const [rx, setRx] = useState(-20);
  const [ry, setRy] = useState(25);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 220, height: 220, perspective: "900px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          }}
        >
          {FACES.map((f) => (
            <div
              key={f.t}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold uppercase tracking-wider text-white/90 shadow-xl",
                f.grad
              )}
              style={{ transform: f.tf, backfaceVisibility: "hidden" }}
            >
              {f.t}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRy((v) => v - 90)}
          className="inline-flex h-9 items-center gap-1 rounded-lg bg-muted px-3 text-sm font-medium hover:bg-muted/70"
        >
          <RotateCw className="h-4 w-4 -scale-x-100" />Y-
        </button>
        <button
          type="button"
          onClick={() => setRx((v) => v + 90)}
          className="inline-flex h-9 items-center gap-1 rounded-lg bg-muted px-3 text-sm font-medium hover:bg-muted/70"
        >
          X+
        </button>
        <button
          type="button"
          onClick={() => setRy((v) => v + 90)}
          className="inline-flex h-9 items-center gap-1 rounded-lg bg-muted px-3 text-sm font-medium hover:bg-muted/70"
        >
          <RotateCw className="h-4 w-4" />Y+
        </button>
      </div>
    </div>
  );
}
