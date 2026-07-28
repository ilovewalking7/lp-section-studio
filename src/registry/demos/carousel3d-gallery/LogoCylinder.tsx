import { useEffect, useRef, useState } from "react";
import { Aperture, Boxes, Cloud, Cpu, Hexagon, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴ円筒",
  category: "3Dカルーセル",
  description: "ブランドロゴが円筒を回るパートナー紹介カルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const LOGOS: { Icon: LucideIcon; name: string }[] = [
  { Icon: Aperture, name: "Aperture" },
  { Icon: Boxes, name: "Boxes" },
  { Icon: Cloud, name: "Cloud" },
  { Icon: Cpu, name: "Cpu" },
  { Icon: Hexagon, name: "Hexa" },
  { Icon: Layers, name: "Layers" },
];

export default function LogoCylinder() {
  const [rot, setRot] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRot((r) => (r + dt * 0.025) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const count = LOGOS.length;
  const step = 360 / count;
  const radius = 200;

  return (
    <div className="flex w-full justify-center py-10 overflow-x-hidden">
      <div
        className="relative"
        style={{ width: 160, height: 100, perspective: "1000px" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rot}deg)`,
          }}
        >
          {LOGOS.map(({ Icon, name }, i) => (
            <div
              key={name}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-foreground shadow-md"
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              <Icon className="h-7 w-7 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
