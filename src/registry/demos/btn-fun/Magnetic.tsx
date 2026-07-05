import type { DemoMeta } from "@/registry";
import { useRef, useState } from "react";
import { MousePointer2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "マグネティック",
  category: "ボタン",
  description: "カーソルに引き寄せられるように追従し、離れると弾性で戻るマグネティック・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Magnetic() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.4, y: y * 0.4 });
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <button
        ref={ref}
        type="button"
        onMouseMove={onMove}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-[0_8px_30px_-6px_rgba(45,212,191,0.6)] transition-transform duration-300 ease-out hover:shadow-[0_12px_40px_-6px_rgba(45,212,191,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        <MousePointer2 className="size-4" />
        {en ? "Chase me" : "追いかけて"}
      </button>
    </div>
  );
}
