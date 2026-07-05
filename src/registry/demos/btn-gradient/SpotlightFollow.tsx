import { useState } from "react";
import type { DemoMeta } from "@/registry";
import { MousePointer2 } from "lucide-react";

export const meta: DemoMeta = {
  name: "スポットライト追従",
  category: "ボタン",
  description: "カーソル位置に光のスポットが追従するインタラクティブなボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function SpotlightFollow() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
          });
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-[#15161f] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(120px circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.55), transparent 70%)`,
          }}
        />
        <MousePointer2 className="relative size-4" />
        <span className="relative">{en ? "Hover me" : "カーソルを乗せて"}</span>
      </button>
    </div>
  );
}
