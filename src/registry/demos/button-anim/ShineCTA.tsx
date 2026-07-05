import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シャインCTA",
  category: "ボタン演出",
  description: "斜めの光沢とグラデーション文字を備えた大型プレミアムCTA。",
  align: "center",
  isNew: true,
  tags: ["button", "animation", "cta", "shine"],
};

export default function ShineCTA() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLButtonElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50, on: false });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setShine({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  }

  return (
    <div className="py-4">
      <style>{`
        @keyframes ba-shine-diag {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
      `}</style>

      <button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setShine((s) => ({ ...s, on: false }))}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 px-10 py-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
      >
        {/* カーソル追従グロー */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.16), transparent 65%)`,
            opacity: shine.on ? 1 : undefined,
          }}
        />
        {/* 斜めシャイン */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ animation: "ba-shine-diag 3.5s ease-in-out infinite" }}
        />
        <span className="relative z-10 flex items-center gap-3">
          <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-indigo-300 bg-clip-text text-lg font-bold text-transparent">
            {en ? "Start Premium" : "プレミアムを開始"}
          </span>
          <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </button>
    </div>
  );
}
