import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "カスタムカーソル",
  category: "Awwwards",
  description: "枠内でマウスに滑らかに追従する、二重リング型のカスタムカーソル。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

export default function CustomCursor() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div
        ref={frameRef}
        onMouseMove={move}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative mx-auto flex aspect-[16/9] w-full max-w-[1000px] cursor-none items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />
        <button
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative z-10 cursor-none rounded-full border border-neutral-700 px-8 py-4 text-sm uppercase tracking-[0.3em] text-neutral-300 transition-colors hover:border-neutral-500"
        >
          {en ? "Hover me" : "ホバーしてみて"}
        </button>

        <div
          aria-hidden
          className="pointer-events-none absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-amber-300/80 transition-[width,height,margin,opacity,transform] duration-300 ease-out"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${hover ? 1.8 : 1})`,
            opacity: active ? 1 : 0,
          }}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-amber-300 transition-opacity duration-150",
            active ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        />
      </div>
    </section>
  );
}
