import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マグネティックボタン",
  category: "ボタン演出",
  description: "カーソルに引き寄せられ、離れるとバネのように戻る磁石ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "magnetic"],
};

export default function MagneticButton() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.4, y: y * 0.4 });
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      >
        <span
          style={{ transform: `translate(${pos.x * 0.4}px, ${pos.y * 0.4}px)` }}
          className="inline-block transition-transform duration-300 ease-out"
        >
          {en ? "Pull me" : "引き寄せて"}
        </span>
      </button>
      <p className="text-xs text-muted-foreground">{en ? "Move your cursor closer" : "カーソルを近づけてみて"}</p>
    </div>
  );
}
