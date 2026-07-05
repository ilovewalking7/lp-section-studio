import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "周回アバター",
  category: "3Dカルーセル",
  description: "中心を周回するアバターが自動で回り続ける軌道カルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const AVATARS = [
  { ja: "佐", en: "S", grad: "from-rose-500 to-orange-500" },
  { ja: "M", en: "M", grad: "from-violet-500 to-indigo-500" },
  { ja: "K", en: "K", grad: "from-emerald-500 to-teal-500" },
  { ja: "A", en: "A", grad: "from-sky-500 to-blue-500" },
  { ja: "L", en: "L", grad: "from-amber-500 to-yellow-500" },
  { ja: "R", en: "R", grad: "from-fuchsia-500 to-purple-500" },
];

export default function OrbitingAvatars() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
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
      setRot((r) => (r + dt * 0.02) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const count = AVATARS.length;
  const step = 360 / count;

  return (
    <div className="flex w-full justify-center py-10">
      <div
        className="relative"
        style={{ width: 220, height: 220, perspective: "800px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 ring-2 ring-primary/30"
          aria-hidden
        />
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(65deg) rotateZ(${rot}deg)`,
          }}
        >
          {AVATARS.map((a, i) => (
            <div
              key={a.en}
              className={cn(
                "absolute left-1/2 top-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white shadow-lg",
                a.grad
              )}
              style={{
                transform: `rotateZ(${i * step}deg) translateY(-90px) rotateZ(${-i * step}deg) rotateX(-65deg) rotateZ(${-rot}deg)`,
              }}
            >
              {en ? a.en : a.ja}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
